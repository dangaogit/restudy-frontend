import { PubSubService } from '../main/pub-sub.service';
import { Publisher } from '../main/publisher';

describe('接口定义', () => {
    const pubSubService = new PubSubService();
    test('该服务提供发布接口', () => {
        expect(typeof pubSubService.publish).toBe('function');
    });
    test('该服务提供订阅接口', () => {
        expect(typeof pubSubService.subscribe).toBe('function');
    });
    test('该服务提供取消订阅接口', () => {
        expect(typeof pubSubService.subscribe).toBe('function');
    });
    test('该服务提供注册发布者接口', () => {
        expect(typeof pubSubService.register).toBe('function');
    });
});

class PublisherStub implements Publisher {
    public static NORMAL_ID = 'normal-id';
    private id: string;
    public constructor(id: string) {
        this.id = id;
    }
    public getId(): string {
        return this.id;
    }
}

describe('注册发布者接口', () => {
    const pubSubService = new PubSubService();
    test('注册一个发布者', () => {
        expect(
            pubSubService.register(new PublisherStub(PublisherStub.NORMAL_ID))
        ).toBe(void 0);
    });
});
