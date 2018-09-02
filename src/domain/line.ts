import { Point } from './point';

export interface Line {

  isParellelTo(otherLine: Line): boolean;

  isPerpendicularTo(otherLine: Line): boolean;

  getIntersectionPointWith(otherLine: Line): Point;

  getPerpendicularLineAtPoint(point: Point): Line;

  getParallelLineAtPoint(point: Point): Line;

  toString(): string;

}
