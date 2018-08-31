type Representation = fabric.Object | fabric.Object[];

export abstract class CanvasRepresentable {
  private _representation: Representation;

  get representation(): Representation { return this._representation; }

  saveRepresentation(representation: Representation): void {
    this._representation = representation;
  }
}
