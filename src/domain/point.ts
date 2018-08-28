export class Point {
  constructor(
    public readonly x: number,
    public readonly y: number,
  ) { }

  isEqualTo(other: Point): boolean {
    return this.x === other.x && this.y === other.y;
  }

  getDistanceTo(otherPoint: Point): number {
    const deltaX: number = this.x - otherPoint.x;
    const deltaY: number = this.y - otherPoint.y;
    return Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
  }
}
