import { IEvent } from 'fabric/fabric-impl';
import { fabric } from 'fabric';
import { Observable } from 'rxjs';

import { settings } from '../config/settings';
import { CanvasStore } from './canvas-store';
import { Point, Parallelogram, Circle } from '../domain';

export class Painter {
  public readonly canvas: fabric.Canvas;

  constructor(canvasId: string, private readonly store: CanvasStore) {
    this.canvas = new fabric.Canvas(canvasId, {
      selection: false,
      backgroundColor: settings.color.white,
      height: window.innerHeight,
      width: window.innerWidth,
    } as any);
    fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
    window.addEventListener('resize', () => this.canvas.setWidth(window.innerWidth));
  }

  paint(entity: Point | Parallelogram | Circle): void {
    if (entity instanceof Point) {
      this.paintPoint(entity);
    }
    if (entity instanceof Parallelogram) {
      this.paintParallelogram(entity);
    }
    if (entity instanceof Circle) {
      this.paintCircle(entity);
    }
  }

  makePointsSelectable(): void {
    this.store.forEachPoint((fabricPoint) => {
      fabricPoint.selectable = true;
      fabricPoint.hoverCursor = 'move';
      fabricPoint.bringToFront();
    });
    this.canvas.renderAll();
  }

  paintHelperLine(point1: Point, point2: Point, color: string = 'red'): void {
    const coords: number[] = [point1.x, point1.y, point2.x, point2.y];
    const line: fabric.Line = new fabric.Line(coords, {
      fill: color,
      stroke: color,
      strokeWidth: 1,
      hoverCursor: 'default',
      selectable: false,
    });
    this.addToCanvas(line);
  }

  onCanvasClicked(): Observable<Point> {
    return new Observable((observer) => {
      this.canvas.on('mouse:up', (event: IEvent) => {
        const mouseEvent: MouseEvent = event.e as MouseEvent;
        observer.next(new Point(mouseEvent.x, mouseEvent.y));
      });
    });
  }

  private paintPoint(point: Point): void {
    const circle: fabric.Circle = new fabric.Circle({
      left: point.x,
      top: point.y,
      strokeWidth: 1,
      radius: settings.strokeWidth.point / 2,
      fill: settings.color.red,
      stroke: settings.color.red,
      hoverCursor: 'default',
      selectable: false,
    });
    circle.hasControls = circle.hasBorders = false;
    this.store.addPoint(point, circle);
    this.addToCanvas(circle);
  }

  private paintParallelogram(parallelogram: Parallelogram): void {
    this.paintLineSegment(parallelogram.point1, parallelogram.point2);
    this.paintLineSegment(parallelogram.point1, parallelogram.point3);
    this.paintLineSegment(parallelogram.point2, parallelogram.point4);
    this.paintLineSegment(parallelogram.point3, parallelogram.point4);
  }

  private paintCircle(circle: Circle): void {
    const fabricCircle: fabric.Circle = new fabric.Circle({
      left: circle.center.x,
      top: circle.center.y,
      strokeWidth: settings.strokeWidth.circle,
      radius: circle.radius,
      stroke: settings.color.yellow,
      fill: 'transparent',
      hoverCursor: 'default',
      selectable: false,
    });
    fabricCircle.hasControls = fabricCircle.hasBorders = false;
    this.addToCanvas(fabricCircle);
  }

  private paintLineSegment(point1: Point, point2: Point): void {
    const coords: number[] = [point1.x, point1.y, point2.x, point2.y];
    const line: fabric.Line = new fabric.Line(coords, {
      fill: settings.color.blue,
      stroke: settings.color.blue,
      strokeWidth: settings.strokeWidth.line,
      hoverCursor: 'default',
      selectable: false,
    });
    this.addToCanvas(line);
  }

  private addToCanvas(object: fabric.Object): void {
    this.canvas.add(object);
    this.canvas.renderAll();
  }

}
