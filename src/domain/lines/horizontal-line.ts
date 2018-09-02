import { DiagonalLine } from './diagonal-line';
import { Point } from '../point';
import { VerticalLine } from './vertical-line';
import { Line } from '../line';

export class HorizontalLine implements Line {

  constructor(public readonly y: number) { }

  isParellelTo(otherLine: Line): boolean {
    return otherLine instanceof HorizontalLine;
  }

  isPerpendicularTo(otherLine: Line): boolean {
    return otherLine instanceof VerticalLine;
  }

  getIntersectionPointWith(otherLine: Line): Point {
    if (this.isParellelTo(otherLine)) {
      throw new Error(`Lines are parallel so there is no intersection point (Y=${this.y})`);
    }
    if (this.isPerpendicularTo(otherLine)) {
      return new Point((otherLine as VerticalLine).x, this.y);
    }
    const diagonal: DiagonalLine = otherLine = otherLine as DiagonalLine;
    const x: number = (this.y - diagonal.b) / diagonal.m;
    return new Point(x, this.y);
  }

  getPerpendicularLineAtPoint(point: Point): VerticalLine {
    return new VerticalLine(point.x);
  }

  getParallelLineAtPoint(point: Point): HorizontalLine {
    return new HorizontalLine(point.y);
  }

  toString(): string {
    return `Line[y=${this.y}]`;
  }

}
