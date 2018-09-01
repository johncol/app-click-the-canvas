import { RandomGenerator } from '../service/random-generator';
import { Delta } from './delta';
import { Updatable } from './updatable';

export class Point extends Updatable<Delta> {
  public readonly id: string = RandomGenerator.identifier();

  constructor(
    public _x: number,
    public _y: number,
  ) {
    super();
  }

  get x(): number { return this._x; }
  get y(): number { return this._y; }

  isEqualTo(other: Point): boolean {
    return this.x === other.x && this.y === other.y;
  }

  getDistanceTo(otherPoint: Point): number {
    const deltaX: number = this.x - otherPoint.x;
    const deltaY: number = this.y - otherPoint.y;
    return Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
  }

  updateTo(x: number, y: number, notify: boolean = true): void {
    if (notify) {
      const delta: Delta = new Delta(this.x - x, this.y - y);
      this.notifyUpdate(delta);
    }
    this._x = x;
    this._y = y;
  }

  toString(): string {
    return `(${this.x.toFixed(0)}, ${this.y.toFixed(0)})`;
  }
}
