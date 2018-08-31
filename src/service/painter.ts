import { IEvent } from 'fabric/fabric-impl';
import { fabric } from 'fabric';
import { Observable } from 'rxjs';

import { settings, pointSettings, circleSettings, lineSettings } from './../config/settings';
import { CanvasStore } from './canvas-store';
import { Point, Parallelogram, Circle } from '../domain';

export class Painter {
  public readonly canvas: fabric.Canvas;
  private readonly canvasProperties = {
    selection: false,
    backgroundColor: settings.color.white,
    height: window.innerHeight,
    width: window.innerWidth,
  };

  constructor(canvasId: string, private readonly store: CanvasStore) {
    this.canvas = new fabric.Canvas(canvasId, this.canvasProperties);
    this.configureCanvasAdditionalSettings();
    this.updateDimensionOnWindowResize(this.canvas);
  }

  paintPoint(point: Point): void {
    const canvasPoint: fabric.Circle = new fabric.Circle({
      ...pointSettings,
      left: point.x,
      top: point.y,
    });
    point.saveRepresentation(canvasPoint);
    canvasPoint.on('moved', (event: IEvent) => {
      const mouseEvent: MouseEvent = event.e as MouseEvent;
      point.updateTo(mouseEvent.x, mouseEvent.y)
    });
    this.addToCanvas(canvasPoint);
  }

  paintParallelogram(parallelogram: Parallelogram): void {
    const linesList: fabric.Line[] = [];
    linesList.push(this.paintLineSegment(parallelogram.point1, parallelogram.point2));
    linesList.push(this.paintLineSegment(parallelogram.point1, parallelogram.point3));
    linesList.push(this.paintLineSegment(parallelogram.point2, parallelogram.point4));
    linesList.push(this.paintLineSegment(parallelogram.point3, parallelogram.point4));
    parallelogram.saveRepresentation(linesList);
  }

  paintCircle(circle: Circle): void {
    const fabricCircle: fabric.Circle = new fabric.Circle({
      ...circleSettings,
      left: circle.center.x,
      top: circle.center.y,
      radius: circle.radius,
    });
    this.addToCanvas(fabricCircle);
  }

  makePointsSelectable(): void {
    this.store.forEachPoint((fabricPoint) => {
      fabricPoint.selectable = true;
      fabricPoint.hoverCursor = 'move';
      fabricPoint.bringToFront();
    });
    this.canvas.renderAll();
  }

  onCanvasClicked(): Observable<Point> {
    return new Observable((observer) => {
      this.canvas.on('mouse:up', (event: IEvent) => {
        const mouseEvent: MouseEvent = event.e as MouseEvent;
        observer.next(new Point(mouseEvent.x, mouseEvent.y));
      });
    });
  }

  movePoint(point: Point): void {
    (point.representation as fabric.Circle).set({
      top: point.y,
      left: point.x
    }).bringToFront();
    this.canvas.renderAll();
  }

  updateParallelogram(parallelogram: Parallelogram): void {
    (parallelogram.representation as fabric.Object[]).forEach((object) => {
      this.canvas.remove(object);
    });
    this.paintParallelogram(parallelogram);
  }

  private paintLineSegment(point1: Point, point2: Point): fabric.Line {
    const coords: number[] = [point1.x, point1.y, point2.x, point2.y];
    const line: fabric.Line = new fabric.Line(coords, { ...lineSettings });
    this.addToCanvas(line);
    return line;
  }

  private addToCanvas(object: fabric.Object): void {
    this.canvas.add(object);
    this.canvas.renderAll();
  }

  private updateDimensionOnWindowResize(canvas: fabric.Canvas): void {
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
