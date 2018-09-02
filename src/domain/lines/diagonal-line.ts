import { Point } from '../point';
import { Line } from '../line';

export class DiagonalLine implements Line {

  constructor(
    public readonly m: number,
    public readonly b: number,
  ) { }

  isParallelTo(otherLine: DiagonalLine): boolean {
    return this.m === otherLine.m;
  }

  isPerpendicularTo(otherLine: DiagonalLine): boolean {
    return this.m === (-1 / otherLine.m);
  }

  getIntersectionPointWith(otherLine: DiagonalLine): Point {
    const x: number = (otherLine.b - this.b) / (this.m - otherLine.m);
    const y: number = this.m * x + this.b;
    return new Point(x, y);
  }

  getPerpendicularLineAtPoint(point: Point): DiagonalLine {
    const perpedicularLineM: number = -1 / this.m;
    const perpedicularLineB: number = point.y - (perpedicularLineM * point.x);
    return new DiagonalLine(perpedicularLineM, perpedicularLineB);
  }

  getParallelLineAtPoint(point: Point): DiagonalLine {
    const parallelLineM: number = this.m;
    const parallelLineB: number = point.y - (parallelLineM * point.x);
    return new DiagonalLine(parallelLineM, parallelLineB);
  }

  toString(): string {
    return `Line[m=${this.m} b=${this.b}]`;
  }
}
