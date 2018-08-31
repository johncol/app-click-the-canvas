import { IEvent } from 'fabric/fabric-impl';
import { fabric } from 'fabric';
import { Observable } from 'rxjs';

import { settings, fabricSettings } from './../config/settings';
import { Point } from '../domain/point';
import { Parallelogram } from '../domain/parallelogram';
import { Circle } from '../domain/circle';

export class Painter {
  public readonly canvas: Canvas;
  private readonly canvasProperties = {
    selection: false,
    backgroundColor: settings.color.white,
    height: window.innerHeight,
    width: window.innerWidth,
  };

  constructor(canvasId: string) {
    this.canvas = new fabric.Canvas(canvasId, this.canvasProperties);
    this.configureCanvasAdditionalSettings();
    this.updateDimensionOnWindowResize(this.canvas);
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
      ...fabricSettings.point,
      left: point.x,
      top: point.y,
    });
    point.saveRepresentation(canvasPoint);
    canvasPoint.on('moving', (event: IEvent) => {
      const mouseEvent: MouseEvent = event.e as MouseEvent;
      point.updateTo(mouseEvent.x, mouseEvent.y)
    });
    this.addToCanvas(canvasPoint);
    return canvasPoint;
  }

  paintParallelogram(parallelogram: Parallelogram): void {
    const linesList: CanvasLine[] = [];
    linesList.push(this.paintLineSegment(parallelogram.point1, parallelogram.point2));
    linesList.push(this.paintLineSegment(parallelogram.point1, parallelogram.point3));
    linesList.push(this.paintLineSegment(parallelogram.point2, parallelogram.point4));
    linesList.push(this.paintLineSegment(parallelogram.point3, parallelogram.point4));
    parallelogram.saveRepresentation(linesList);
  }

  paintCircle(circle: Circle): void {
    const canvasCircle: CanvasCircle = new fabric.Circle({
      ...fabricSettings.circle,
      left: circle.center.x,
      top: circle.center.y,
      radius: circle.radius,
    });
    this.addToCanvas(canvasCircle);
    canvasCircle.sendToBack();
  }

  movePoint(point: Point): void {
    this.canvas.remove(point.representation as CanvasObject);
    const canvasPoint: CanvasPoint = this.paintPoint(point);
    this.makeSelectable(canvasPoint);
  }

  moveParallelogramLines(parallelogram: Parallelogram): void {
    (parallelogram.representation as CanvasObject[]).forEach((object) => {
      this.canvas.remove(object);
    });
    this.paintParallelogram(parallelogram);
  }

  makePointsSelectable(points: Point[]): void {
    points.map(point => point.representation as CanvasObject)
      .forEach(this.makeSelectable);
    this.canvas.renderAll();
  }

  private paintLineSegment(point1: Point, point2: Point): CanvasLine {
    const coords: number[] = [point1.x, point1.y, point2.x, point2.y];
    const line: CanvasLine = new fabric.Line(coords, { ...fabricSettings.line });
    this.addToCanvas(line);
    line.sendToBack();
    return line;
  }

  private addToCanvas(object: CanvasObject): void {
    this.canvas.add(object);
    this.canvas.renderAll();
  }

  private makeSelectable(object: CanvasObject): void {
    object.set({
      selectable: true,
      hoverCursor: 'move',
    });
  }

  private updateDimensionOnWindowResize(canvas: Canvas): void {
    window.addEventListener('resize', () => {
      canvas.setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });
  }

  private configureCanvasAdditionalSettings(): void {
    fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
  }

}
