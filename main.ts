import { take, tap } from 'rxjs/operators';

import { Point, Parallelogram, Circle } from './src/domain';
import { CanvasStore } from './src/service/canvas-store';
import { Painter } from './src/service/painter';
import { InfoBar } from './src/service/info-bar';
import { AppService } from './src/service/app-service';

const store: CanvasStore = new CanvasStore();
const painter: Painter = new Painter('canvas', store);
const infoBar: InfoBar = new InfoBar('info-table');
const app: AppService = new AppService(painter, infoBar);

painter.onCanvasClicked()
  .pipe(take(3), tap(console.log))
  .subscribe({
    next: (point: Point) => app.addPoint(point),
    error: (error: any) => console.warn(error),
    complete: () => {
      const points: Point[] = app.getPoints();
      const parallelogram: Parallelogram = Parallelogram.givenThreePoints(points[0], points[1], points[2]);
      const circle: Circle = new Circle(parallelogram.centerOfMass, Circle.getRadiusGivenArea(parallelogram.area));

      app.addPoint(parallelogram.point4);
      app.addParallelogram(parallelogram);
      app.addCircle(circle);

      painter.makePointsSelectable();
    },
  });
