import { IEvent } from 'fabric/fabric-impl';
import { fabric } from 'fabric';
import { Observable } from 'rxjs';

import { FABRIC_SETTINGS } from '../../config/fabric-settings';
import { Point } from '../../domain/point';
import { Parallelogram } from '../../domain/parallelogram';
import { Circle } from '../../domain/circle';
import { CanvasStore } from './canvas-store';

export class Painter {
  private readonly canvas: Canvas;

  constructor(
    canvasId: string,
    private readonly store: CanvasStore = new CanvasStore(),
  ) {
    this.canvas = new fabric.Canvas(canvasId, {
      ...FABRIC_SETTINGS.canvas,
      height: window.innerHeight,
      width: window.innerWidth,
    } as any);
    this.configureCanvasAdditionalSettings();
    this.updateCanvasDimensionOnWindowResize();
  }

  onCanvasClicked(): Observable<Point> {
    return new Observable((observer) => {
      this.canvas.on('mouse:up', (event: IEvent) => {
        const mouseEvent: MouseEvent = event.e as MouseEvent;
        observer.next(new Point(mouseEvent.x, mouseEvent.y));
      });
    });
  }

  paintPoint(point: Point): CanvasPoint {
    const canvasPoint: CanvasPoint = new fabric.Circle({
      ...FABRIC_SETTINGS.point,
      left: point.x,
      top: point.y,
    });
    canvasPoint.on('moving', (event: IEvent) => {
      const mouseEvent: MouseEvent = event.e as MouseEvent;
      point.updateTo(mouseEvent.x, mouseEvent.y);
    });
    this.addToCanvas(canvasPoint);
    this.store.storePoint(point, canvasPoint);
    return canvasPoint;
  }

  paintParallelogram(parallelogram: Parallelogram): void {
    const lines: CanvasParallelogram = [];
    lines.push(this.paintLineSegment(parallelogram.point1, parallelogram.point2));
    lines.push(this.paintLineSegment(parallelogram.point1, parallelogram.point3));
    lines.push(this.paintLineSegment(parallelogram.point2, parallelogram.point4));
    lines.push(this.paintLineSegment(parallelogram.point3, parallelogram.point4));
    this.store.storeParallelogram(lines);
  }

  paintCircle(circle: Circle): void {
    const canvasCircle: CanvasCircle = new fabric.Circle({
      ...FABRIC_SETTINGS.circle,
      left: circle.center.x,
      top: circle.center.y,
      radius: circle.radius,
    });
    this.addToCanvas(canvasCircle);
    canvasCircle.sendToBack();
    this.store.storeCircle(canvasCircle);
  }

  movePoint(point: Point): void {
    this.store.forCanvasPoint(point, (canvasPoint: CanvasPoint) => {
      this.canvas.remove(canvasPoint);
    });
    const canvasPoint: CanvasPoint = this.paintPoint(point);
    this.makeSelectable(canvasPoint);
  }

  moveParallelogram(parallelogram: Parallelogram): void {
    this.store.forEachParallelogramLine(line => this.canvas.remove(line));
    this.paintParallelogram(parallelogram);
  }

  moveCircle(circle: Circle): void {
    if (!isNaN(circle.radius)) {
      this.store.forCircle((canvasCircle: CanvasCircle) => {
        canvasCircle.set({
          radius: circle.radius,
          top: circle.center.y,
          left: circle.center.x,
        });
      });
    }
  }

  makePointsSelectable(): void {
    this.store.forEachPoint((point: CanvasPoint) => {
      this.makeSelectable(point);
    });
  }

  clear(): void {
    this.store.clear();
    this.canvas.getObjects().forEach((object: CanvasObject) => {
      this.canvas.remove(object);
    });
    this.canvas.renderAll();
  }

  private paintLineSegment(point1: Point, point2: Point): CanvasLine {
    const coords: number[] = [point1.x, point1.y, point2.x, point2.y];
    const line: CanvasLine = new fabric.Line(coords, { ...FABRIC_SETTINGS.line });
    this.addToCanvas(line);
    line.sendToBack();
    return line;
  }

  private addToCanvas(object: CanvasObject): void {
    this.canvas.add(object);
  }

  private makeSelectable(object: CanvasObject): void {
    object.set({
      selectable: true,
      hoverCursor: 'move',
    });
  }

  private updateCanvasDimensionOnWindowResize(): void {
    window.addEventListener('resize', () => {
      this.canvas.setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });
  }

  private configureCanvasAdditionalSettings(): void {
    fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
  }

}
