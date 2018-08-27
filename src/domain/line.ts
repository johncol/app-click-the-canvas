export class Line {
  constructor(
    public m: number,
    public b: number,
  ) { }

  isParellelTo(other: Line): boolean {
    return this.m === other.m;
  }
}
