import { Subject, Subscription } from 'rxjs';

export abstract class Updatable<T> {
  private readonly updateSubject: Subject<T> = new Subject();
  private readonly subscriptions: Subscription[] = [];

  public whenUpdated(callback: (value: T) => void): void {
    const subscription: Subscription = this.updateSubject.subscribe(value => callback(value));
    this.subscriptions.push(subscription);
  }

  public destroySubscriptions(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  protected notifyUpdate(value: T): void {
    this.updateSubject.next(value);
  }
}
