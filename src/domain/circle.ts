import { Point } from './point';

export class Circle {

  constructor(
    public _center: Point,
    public _radius: number,
  ) { }

  static getRadiusGivenArea(circleArea: number): number {
    return Math.sqrt(circleArea / Math.PI);
  }

  get center(): Point { return this._center; }
  get radius(): number { return this._radius; }

  update(center: Point, radius: number): void {
    this._center = center;
    this._radius = radius;
  }
}
