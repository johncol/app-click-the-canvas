import { take } from 'rxjs/operators';

import { Point } from './src/domain/point';
import { Parallelogram } from './src/domain/parallelogram';
import { Circle } from './src/domain/circle';
import { Delta } from './src/domain/delta';
import { Painter } from './src/service/painter';
import { InfoBar } from './src/service/info-bar';
import { AppService } from './src/service/app-service';

const painter: Painter = new Painter('canvas');
const infoBar: InfoBar = new InfoBar('info-table');
const app: AppService = new AppService(painter, infoBar);

const userPoints: Point[] = [];
painter.onCanvasClicked()
  .pipe(take(3))
  .subscribe({
    next: (point: Point) => {
      app.addPoint(point);
      userPoints.push(point);
    },
    error: (error: any) => console.warn(error),
    complete: () => {
      const parallelogram: Parallelogram = Parallelogram.givenThreePoints(userPoints[0], userPoints[1], userPoints[2]);
      const circle: Circle = new Circle(parallelogram.centerOfMass, Circle.getRadiusGivenArea(parallelogram.area));

      app.addPoint(parallelogram.point4);
      app.addParallelogram(parallelogram);
      app.addCircle(circle);

      const points: Point[] = parallelogram.points;
      painter.makePointsSelectable(points);

      points.forEach((point, index) => {
        point.whenMoved.subscribe({
          next: (delta: Delta) => {
            const pointToMove: Point = points[(index + 1) % points.length];
            pointToMove.updateTo(pointToMove.x - delta.x, pointToMove.y - delta.y, false);
            circle.update(parallelogram.centerOfMass, Circle.getRadiusGivenArea(parallelogram.area));

            painter.movePoint(pointToMove);
            painter.moveParallelogram(parallelogram);
            painter.moveCircle(circle)
          }
        });
      });
    }
  });
