import { take, tap } from 'rxjs/operators';

import { Point, Parallelogram, Circle } from './src/domain';
import { CanvasStore } from './src/service/canvas-store';
import { Painter } from './src/service/painter';

const store: CanvasStore = new CanvasStore();
const painter: Painter = new Painter('canvas', store);

const points: Point[] = [];

painter.onCanvasClicked()
  .pipe(take(3), tap(console.log))
  .subscribe({
    next: (point: Point) => {
      points.push(point);
      painter.paint(point);
    },
    error: (error) => {
      console.warn(error);
    },
    complete: () => {
      const parallelogram: Parallelogram = Parallelogram.givenThreePoints(points[0], points[1], points[2]);
      const circle: Circle = new Circle(parallelogram.centerOfMass, Circle.getRadiusGivenArea(parallelogram.area));
      
      painter.paint(parallelogram.point4);
      painter.paint(parallelogram);
      painter.paint(circle);
      painter.makePointsSelectable();
    }
  });
