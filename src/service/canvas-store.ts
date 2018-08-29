import { Point } from "../domain/point";

type CanvasPoints = {
  [point: string]: fabric.Circle
}

export class CanvasStore {
  private readonly points: CanvasPoints = {};

  addPoint(point: Point, canvasPoint: fabric.Circle): void {
    this.points[point.toString()] = canvasPoint;
  }

  forEachPoint(callback: (point: fabric.Circle) => void): void {
    for (let point in this.points) {
      callback(this.points[point]);
    }
  }
}
