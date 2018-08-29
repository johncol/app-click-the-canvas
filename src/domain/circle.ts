import { Point } from './point';

export class Circle {

  constructor(
    public readonly center: Point,
    public readonly radius: number,
  ) { }

  static getRadiusGivenArea(circleArea: number): number {
    return Math.sqrt(circleArea / Math.PI);
  }
}
