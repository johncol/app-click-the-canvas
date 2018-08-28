import { Point } from './point';

export class Line {

  constructor(
    public readonly m: number, 
    public readonly b: number
  ) { }

  static givenPoints(point1: Point, point2: Point): Line {
    if (point1.isEqualTo(point2)) {
      throw new Error(`Points are the same: ${point1}`);
    }
    const m: number = (point1.y - point2.y) / (point1.x - point2.x);
    const b: number = point1.y - point1.x * m;
    return new Line(m, b);
  }

  isParellelTo(otherLine: Line): boolean {
    return this.m === otherLine.m;
  }

  getIntersectionPointWith(otherLine: Line): Point {
    if (this.isParellelTo(otherLine)) {
      throw new Error(`Lines are parallell: ${this} and ${otherLine}`);
    }
    const x: number = (otherLine.b - this.b) / (this.m - otherLine.m);
    const y: number = this.m * x + this.b;
    return new Point(x, y);
  }

  getPerpendicularLineAtPoint(point: Point): Line {
    if ((this.m * point.x) + this.b !== point.y) {
      throw new Error(`Point does not belong to line: point ${point} line: ${this}`);
    }
    const perpedicularLineM: number = 1 / this.m;
    const perpedicularLineB: number = point.y - (perpedicularLineM * point.x);
    return new Line(perpedicularLineM, perpedicularLineB);
  }
}
