import { RepresentableInCanvas } from './representable-in-canvas';
import { Point } from './point';
import { Line } from './line';

export class Parallelogram extends RepresentableInCanvas {

  constructor(
    public readonly point1: Point,
    public readonly point2: Point,
    public readonly point3: Point,
    public readonly point4: Point,
  ) {
    super();
  }

  static givenThreePoints(point1: Point, point2: Point, point3: Point): Parallelogram {
    const line1: Line = Line.givenPoints(point1, point2);
    const line2: Line = Line.givenPoints(point1, point3);
    const parallelToLine1: Line = line1.getParallelLineAtPoint(point3);
    const parallelToLine2: Line = line2.getParallelLineAtPoint(point2);
    const point4: Point = parallelToLine1.getIntersectionPointWith(parallelToLine2);
    return new Parallelogram(point1, point2, point3, point4);
  }

  get points(): Point[] {
    return [this.point1, this.point2, this.point4, this.point3];
  }

  get centerOfMass(): Point {
    const diagonal1: Line = Line.givenPoints(this.point1, this.point4);
    const diagonal2: Line = Line.givenPoints(this.point2, this.point3);
    return diagonal1.getIntersectionPointWith(diagonal2);
  }

  get area(): number {
    const bottom: Line = Line.givenPoints(this.point1, this.point2);
    const top: Line = Line.givenPoints(this.point3, this.point4);
    const perpendicularToBase: Line = bottom.getPerpendicularLineAtPoint(this.point1);
    const perpendicularIntersectionPointWithTop: Point = perpendicularToBase.getIntersectionPointWith(top);
    const height: number = this.point1.getDistanceTo(perpendicularIntersectionPointWithTop);
    const base: number = this.point1.getDistanceTo(this.point2);
    return base * height;
  }
}
