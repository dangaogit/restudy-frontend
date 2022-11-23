import { PubSubError, PubSubErrorCode } from './error';
import { Message } from './message';
import { Publisher } from './publisher';
import { Subscriber } from './subscriber';

export class PubSubService {
    private publishers = new Set<Publisher>();
    private subscribers = new Set<Subscriber>();

    public register(publisher: Publisher): void {
        this.publishers.add(publisher);
    }

    public async publish<T>(message: Message<T>): Promise<void> {
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
