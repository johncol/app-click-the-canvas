import { IEvent } from 'fabric/fabric-impl';

import { CanvasStore } from './src/service/canvas-store';

import { Point } from './src/domain/point';
import { Parallelogram } from './src/domain/parallelogram';
import { Circle } from './src/domain/circle';
import { Painter } from './src/service/painter';

const store: CanvasStore = new CanvasStore();
const painter: Painter = new Painter('canvas', store);

function listenAndPaintFirstPoints(amount: number): Promise<Point[]> {
  return new Promise((resolve: (points: Point[]) => void) => {
    const points: Point[] = [];
    
    let clicks: number = 0;
    const paintNewPoint: (event: IEvent) => void = event => {
      clicks += 1;

      const mouseEvent: MouseEvent = event.e as MouseEvent;
      const point: Point = new Point(mouseEvent.x, mouseEvent.y);
      points.push(point);
      painter.paint(point);

      if (clicks === amount) {
        painter.canvas.off('mouse:up', paintNewPoint);    
        resolve(points);
      }
    };

    painter.canvas.on('mouse:up', paintNewPoint);
  });
}

listenAndPaintFirstPoints(3).then((points: Point[]) => {
  const parallelogram: Parallelogram = Parallelogram.givenThreePoints(points[0], points[1], points[2]);
  const circle: Circle = new Circle(parallelogram.centerOfMass, Circle.getRadiusGivenArea(parallelogram.area));
  
  painter.paint(parallelogram.point4);
  painter.paint(parallelogram);
  painter.paint(circle);
  painter.makePointsSelectable();
});
