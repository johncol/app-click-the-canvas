import { InfoBar } from './info-bar';
import { Painter } from './painter';
import { Point, Parallelogram, Circle } from '../domain';

export class AppService {
  constructor(
    private readonly painter: Painter,
    private readonly infoBar: InfoBar,
  ) { }

  addPoint(point: Point): void {
    this.painter.paintPoint(point);
    this.infoBar.displayPointInfo(point);
  }

  addParallelogram(parallelogram: Parallelogram): void {
    this.painter.paintParallelogram(parallelogram);
    this.infoBar.displayCenterOfMassInfo(parallelogram.centerOfMass);
    this.infoBar.displayAreaInfo(parallelogram.area);
  }

  addCircle(circle: Circle): void {
    this.painter.paintCircle(circle);
  }

}
