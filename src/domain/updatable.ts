import { Subject } from 'rxjs';

export abstract class Updatable<T> {
  private readonly _whenUpdated: Subject<T> = new Subject();

  public whenUpdated(callback: (value: T) => void): void {
    this._whenUpdated.subscribe(value => callback(value));
  }

  protected notifyUpdate(value: T): void {
    this._whenUpdated.next(value);
  }

}
