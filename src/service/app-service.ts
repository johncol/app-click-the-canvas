import { InfoBar } from './info-bar';
import { Painter } from './painter';
import { Point, Parallelogram, Circle } from '../domain';

export class AppService {
  private readonly points: Point[] = [];

  constructor(
    private readonly painter: Painter,
    private readonly infoBar: InfoBar,
  ) { }

  addPoint(point: Point): void {
    this.points.push(point);
    this.painter.paint(point);
    this.infoBar.displayPointInfo(point);
  }

  addParallelogram(parallelogram: Parallelogram): void {
    this.painter.paint(parallelogram);
    this.infoBar.displayCenterOfMassInfo(parallelogram.centerOfMass);
    this.infoBar.displayAreaInfo(parallelogram.area);
  }

  addCircle(circle: Circle): void {
    this.painter.paint(circle);
  }

  getPoints(): Point[] {
    return this.points;
  }

}
