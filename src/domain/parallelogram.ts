import { Point } from './point';
import { Line } from './line';

export class Parallelogram {
  public readonly centerOfMass: Point = this.findCenterOfMass();
  public readonly area: number = this.calculateArea();

  constructor(
    public readonly point1: Point,
    public readonly point2: Point,
    public readonly point3: Point,
    public readonly point4: Point,
  ) { }

  private findCenterOfMass(): Point {
    const diagonal1: Line = Line.givenPoints(this.point1, this.point4);
    const diagonal2: Line = Line.givenPoints(this.point2, this.point3);
    return diagonal1.getIntersectionPointWith(diagonal2);
  }

  private calculateArea(): number {
    const bottom: Line = Line.givenPoints(this.point1, this.point2);
    const top: Line = Line.givenPoints(this.point3, this.point4);
    const perpendicularToBase: Line = bottom.getPerpendicularLineAtPoint(this.point1);
    const perpendicularIntersectionPointWithTop: Point = perpendicularToBase.getIntersectionPointWith(top);
    const height: number = this.point1.getDistanceTo(perpendicularIntersectionPointWithTop);
    const base: number = this.point1.getDistanceTo(this.point2);
    return base * height;
  }
}
