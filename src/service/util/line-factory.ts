import { Point } from '../../domain/point';
import { Line } from '../../domain/line';
import { VerticalLine } from '../../domain/lines/vertical-line';
import { HorizontalLine } from '../../domain/lines/horizontal-line';
import { DiagonalLine } from '../../domain/lines/diagonal-line';

export class LineFactory {

  static givenPoints(point1: Point, point2: Point): Line {
    if (point1.y === point2.y) {
      return new HorizontalLine(point1.y);
    }
    if (point1.x === point2.x) {
      return new VerticalLine(point1.x);
    }
    const m: number = (point1.y - point2.y) / (point1.x - point2.x);
    const b: number = point1.y - point1.x * m;
    return new DiagonalLine(m, b);
  }

}
