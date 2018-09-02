import { HorizontalLine } from './horizontal-line';
import { DiagonalLine } from './diagonal-line';
import { Point } from '../point';
import { Line } from '../line';

export class VerticalLine implements Line {

  constructor(public readonly x: number) { }

  isParellelTo(otherLine: Line): boolean {
    return otherLine instanceof VerticalLine;
  }

  isPerpendicularTo(otherLine: Line): boolean {
    return otherLine instanceof HorizontalLine;
  }

  getIntersectionPointWith(otherLine: Line): Point {
    if (this.isParellelTo(otherLine)) {
      throw new Error(`Lines are parallel, there is no intersection point, X=${this.x}`);
    }
    if (this.isPerpendicularTo(otherLine)) {
      return new Point(this.x, (otherLine as HorizontalLine).y);
    }
    const diagonal: DiagonalLine = otherLine = otherLine as DiagonalLine;
    const y: number = diagonal.m * this.x + diagonal.b;
    return new Point(this.x, y);
  }

  getPerpendicularLineAtPoint(point: Point): HorizontalLine {
    return new HorizontalLine(point.y);
  }

  getParallelLineAtPoint(point: Point): VerticalLine {
    return new VerticalLine(point.x);
  }

  toString(): string {
    return `Line[x=${this.x}]`;
  }

}
