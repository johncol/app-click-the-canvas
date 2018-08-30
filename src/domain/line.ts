import { Point } from './point';

export class Line {

  constructor(
    public readonly m: number,
    public readonly b: number,
  ) { }

  static givenPoints(point1: Point, point2: Point): Line {
    const m: number = (point1.y - point2.y) / (point1.x - point2.x);
    const b: number = point1.y - point1.x * m;
    return new Line(m, b);
  }

  isParellelTo(otherLine: Line): boolean {
    return this.m === otherLine.m;
  }

  getIntersectionPointWith(otherLine: Line): Point {
    const x: number = (otherLine.b - this.b) / (this.m - otherLine.m);
    const y: number = this.m * x + this.b;
    return new Point(x, y);
  }

  getPerpendicularLineAtPoint(point: Point): Line {
    const perpedicularLineM: number = -1 / this.m;
    const perpedicularLineB: number = point.y - (perpedicularLineM * point.x);
    return new Line(perpedicularLineM, perpedicularLineB);
  }

  getParallelLineAtPoint(point: Point): Line {
    const parallelLineM: number = this.m;
    const parallelLineB: number = point.y - (parallelLineM * point.x);
    return new Line(parallelLineM, parallelLineB);
  }

  toString(): string {
    return `Line[m=${this.m} b=${this.b}]`;
  }
}
