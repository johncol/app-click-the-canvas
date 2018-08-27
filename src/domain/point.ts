export class Point {
  constructor(
    public x: number,
    public y: number,
  ) { }

  isEqualTo(other: Point): boolean {
    return this.x === other.x && this.y === other.y;
  }
}
