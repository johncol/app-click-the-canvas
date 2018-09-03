import { take } from 'rxjs/operators';

import { InfoBar } from './service/info-bar/info-bar';
import { Painter } from './service/canvas/painter';

import { Point } from './domain/point';
import { Parallelogram } from './domain/parallelogram';
import { Circle } from './domain/circle';
import { Delta } from './domain/delta';
import { Updatable } from './domain/updatable';
import { Dialog } from './service/dialog/dialog';
import { About } from './service/about/about';
import { InputValidator, ValidationResult } from './service/validator/input-validator';

export class Application {
  private updatables: Updatable<any>[] = [];
  private circle: Circle;
  private parallelogram: Parallelogram;
  private allowedToRestart: boolean = false;

  constructor(
    private readonly painter: Painter,
    private readonly infoBar: InfoBar,
    private readonly dialog: Dialog,
    private readonly about: About,
    private readonly validator: InputValidator,
  ) { }

  init(): void {
    const userPoints: Point[] = [];
    this.painter.onCanvasClicked()
      .pipe(take(3))
      .subscribe({
        next: (point: Point) => {
          this.displayPoint(point);
          userPoints.push(point);
        },
        error: (error: any) => console.warn(error),
        complete: () => {
          const state: ValidationResult = this.validator.parallelogramCanBeBuilt(userPoints);
          if (state.valid) {
            this.continueApplicationExecution(userPoints);
          } else {
            console.warn(state.error);
            this.dialog.show();
            this.restart(true);
          }
        },
      });
  }

  restart(force: boolean = false): void {
    if (force || this.allowedToRestart) {
      this.clearAppState();
      this.init();
    }
  }

  private continueApplicationExecution(userPoints: Point[]) {
    this.parallelogram = Parallelogram.givenThreePoints(userPoints[0], userPoints[1], userPoints[2]);
    this.circle = new Circle(this.parallelogram.centerOfMass, Circle.getRadiusGivenArea(this.parallelogram.area));

    this.displayPoint(this.parallelogram.point4);
    this.displayParallelogram(this.parallelogram);
    this.displayCircle(this.circle);

    this.subscribeToPointsUpdates();

    this.painter.makePointsSelectable();
    this.infoBar.enableStartAgainButton();
    this.allowedToRestart = true;
  }

  private displayPoint(point: Point): void {
    this.painter.paintPoint(point);
    this.infoBar.displayPointInfo(point);
    this.updatables.push(point);
  }

  private displayParallelogram(parallelogram: Parallelogram): void {
    this.painter.paintParallelogram(parallelogram);
    this.infoBar.displayParallelogramInfo(parallelogram);
    this.updatables.push(parallelogram);
  }

  private displayCircle(circle: Circle): void {
    this.painter.paintCircle(circle);
  }

  private subscribeToPointsUpdates(): void {
    const points: Point[] = this.parallelogram.points;
    points.forEach((point, index) => {
      point.whenUpdated((delta: Delta) => {
        const pointToMove: Point = points[(index + 1) % points.length];
        pointToMove.updateTo(pointToMove.x - delta.x, pointToMove.y - delta.y, false);
        this.infoBar.updatePointInfo(pointToMove);

        this.circle.update(this.parallelogram.centerOfMass, Circle.getRadiusGivenArea(this.parallelogram.area));

        this.painter.movePoint(pointToMove);
        this.painter.moveParallelogram(this.parallelogram);
        this.painter.moveCircle(this.circle);
      });
    });
  }

  private clearAppState(): void {
    this.painter.clear();
    this.infoBar.clear();
    this.clearUpdatables();
    this.clearState();
  }

  private clearUpdatables(): void {
    this.updatables.forEach((updatable) => {
      updatable.destroySubscriptions();
    });
    this.updatables.splice(0, this.updatables.length);
  }

  private clearState(): void {
    this.circle = null as any;
    this.parallelogram = null as any;
    this.allowedToRestart = false;
  }

}
