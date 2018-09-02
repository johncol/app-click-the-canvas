import { Point } from '../../domain/point';

export class CanvasStore {
  private readonly points: Map<string, CanvasPoint> = new Map();
  private readonly parallelogram: CanvasParallelogram = [];
  private circle: CanvasCircle;

  storePoint(point: Point, canvasPoint: CanvasPoint): void {
    this.points.set(point.id, canvasPoint);
  }

  storeParallelogram(lines: CanvasParallelogram): void {
    this.parallelogram.splice(0, this.parallelogram.length, ...lines);
  }

  storeCircle(circle: CanvasCircle): void {
    this.circle = circle;
  }

  forCanvasPoint(point: Point, callback: (canvasPoint: CanvasPoint) => void): void {
    callback(this.points.get(point.id) as CanvasPoint);
  }

  forEachPoint(callback: (point: CanvasPoint) => void): void {
    this.points.forEach(point => callback(point));
  }

  forEachParallelogramLine(callback: (line: CanvasLine) => void): void {
    this.parallelogram.forEach(line => callback(line));
  }

  forCircle(callback: (circle: CanvasCircle) => void): void {
    callback(this.circle);
  }

  clear(): void {
    this.points.clear();
    this.parallelogram.splice(0, this.parallelogram.length);
    this.circle = null as any;
  }

}
