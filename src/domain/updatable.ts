import { Subject } from 'rxjs';

export abstract class Updatable<T> {
  private readonly updateSubject: Subject<T> = new Subject();

  public whenUpdated(callback: (value: T) => void): void {
    this.updateSubject.subscribe(value => callback(value));
  }

  protected notifyUpdate(value: T): void {
    this.updateSubject.next(value);
  }

}
