import { Point } from './domain/point';
import { Line } from './domain/line';
import { Parallelogram } from './domain/parallelogram';
import { Circle } from './domain/circle';

function findParallelogram(point1: Point, point2: Point, point3: Point): Parallelogram {
  const line1: Line = Line.givenPoints(point1, point2);
  const line2: Line = Line.givenPoints(point1, point3);
  const point4: Point = line1.getIntersectionPointWith(line2);
  return new Parallelogram(point1, point2, point3, point4);
}

function getCircleRadious(circleArea: number): number {
  return Math.sqrt(circleArea / Math.PI);
}

function go(point1: Point, point2: Point, point3: Point): void {
  const parallelogram: Parallelogram = findParallelogram(point1, point2, point3);
  const circle: Circle = new Circle(parallelogram.centerOfMass, getCircleRadious(parallelogram.area));
}
