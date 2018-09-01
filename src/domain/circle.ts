import { Point } from './point';
import { RepresentableInCanvas } from './representable-in-canvas';

export class Circle extends RepresentableInCanvas {

  constructor(
    public _center: Point,
    public _radius: number,
  ) {
    super();
  }

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
