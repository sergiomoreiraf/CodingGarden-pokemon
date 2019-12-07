/**
 * A type that defines a function that may have an arg of type T and returns nothing
 */
type SubscriberFn<T> = (data?: T) => void;

/**
 * A typescript implementation of Observer Pattern.
 */
export class Observable<T> {
  private subscribers: SubscriberFn<T>[] = [];

  subscribe(s: SubscriberFn<T>) {
    this.subscribers.push(s);
  }

  unsubscribe(s: SubscriberFn<T>) {
    this.subscribers = this.subscribers.filter(subscriber => subscriber !== s);
  }

  unsubscribeAll() {
    this.subscribers = [];
  }

  notify(data: T) {
    this.subscribers.forEach(subscriber => subscriber(data));
  }
}
