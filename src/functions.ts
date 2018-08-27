import { Point } from './domain/point';
import { Line } from './domain/line';
import { Parallelogram } from './domain/parallelogram';

function findLine(point1: Point, point2: Point): Line {
  if (point1.isEqualTo(point2)) {
    throw new Error('Points cannot be equal');
  }
  const m: number = (point1.y - point2.y) / (point1.x - point2.x);
  const b: number = point1.y - (point1.x * m);
  return new Line(m, b);
}

function findIntersection(line1: Line, line2: Line): Point {
  if (line1.isParellelTo(line2)) {
    throw new Error('Lines cannot be parallell');
  }
  const x: number = (line2.b - line1.b) / (line1.m - line2.m);
  const y: number = (line1.m * x) + line1.b;
  return new Point(x, y);
}

function findParallelogram(point1: Point, point2: Point, point3: Point): Parallelogram {
  const line1: Line = findLine(point1, point2);
  const line2: Line = findLine(point1, point3);
  const point4: Point = findIntersection(line1, line2);
  return { point1, point2, point3, point4 };
}
