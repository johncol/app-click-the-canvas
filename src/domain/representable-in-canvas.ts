export abstract class RepresentableInCanvas {

  private _representation: CanvasRepresentation;

  get representation(): CanvasRepresentation { return this._representation; }
  
  saveRepresentation(representation: CanvasRepresentation): void {
    this._representation = representation;
  }

}
