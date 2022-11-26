import { PubSubError, PubSubErrorCode } from './error';
import { Message } from './message';
import { Publisher } from './publisher';
import { Subscriber } from './subscriber';

export class PubSubService {
    private readonly publishers = new Set<Publisher>();
    private readonly subscribers = new Set<Subscriber>();

    public register(publisher: Publisher): void {
        this.publishers.add(publisher);
    }

    public publish<T>(message: Message<T>): void {
        this.ensurePublisherExist(message.id);
        const subscribers = this.querySubscribers(message.id);
        subscribers.forEach((s) => s.callback(message.data));
    }

    public subscribe(subscriber: Subscriber): void {
        this.ensurePublisherExist(subscriber.id);
        this.subscribers.add(subscriber);
    }

    public unsubscribe<T>(subscriber: Subscriber<T>): void {}

    private querySubscribers(id: string): Subscriber[] {
        const result: Subscriber[] = [];
        for (const subscriber of this.subscribers.values()) {
            if (subscriber.id === id) {
                result.push(subscriber);
            }
        }
        return result;
    }

    private ensurePublisherExist(id: string): void {
        for (const publisher of this.publishers.values()) {
            if (publisher.getId() === id) {
                return;
            }
        }
        throw new PubSubError(PubSubErrorCode.NOT_FOUND_ID);
    }
}
