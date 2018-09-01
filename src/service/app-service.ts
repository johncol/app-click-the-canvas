import { InfoBar } from './info-bar';
import { Painter } from './painter';
import { Point } from '../domain/point';
import { Parallelogram } from '../domain/parallelogram';
import { Circle } from '../domain/circle';

export class AppService {
  constructor(
    private readonly painter: Painter,
    private readonly infoBar: InfoBar,
  ) { }

  addPoint(point: Point): void {
    this.painter.paintPoint(point);
    this.infoBar.displayInfoFor(point);
  }

  addParallelogram(parallelogram: Parallelogram): void {
    this.painter.paintParallelogram(parallelogram);
    this.infoBar.displayInfoFor(parallelogram);
  }

  addCircle(circle: Circle): void {
    this.painter.paintCircle(circle);
  }

}
