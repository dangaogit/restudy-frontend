import { PubSubError, PubSubErrorCode } from '../main/error';
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
    public static NOT_FOUND_ID = 'not-found-id';

    public static normalPublisher = new PublisherStub(this.NORMAL_ID);

    private id: string;
    public constructor(id: string) {
        this.id = id;
    }
    public getId(): string {
        return this.id;
    }
}

describe('注册/订阅/发布流程', () => {
    const pubSubService = new PubSubService();
    pubSubService.register(PublisherStub.normalPublisher);
    test('订阅一个已注册的发布者', () => {
        expect(pubSubService.subscribe({ id: PublisherStub.NORMAL_ID, callback: () => {} })).toBe(void 0);
    });
    test('订阅一个未注册的发布者', () => {
        try {
            pubSubService.subscribe({ id: PublisherStub.NOT_FOUND_ID, callback: () => {} });
            fail();
        } catch (error: unknown) {
            if (error instanceof PubSubError) {
                expect(error.getCode()).toEqual(PubSubErrorCode.NOT_FOUND_ID);
            } else {
                fail();
            }
        }
    });
    test('已注册发布者发布', async () => {
        expect(
            await pubSubService.publish({
                id: PublisherStub.NORMAL_ID,
                data: undefined,
            })
        ).toBe(void 0);
    });
    test('接收发布者消息', async () => {
        const messageData = 'messageData';
        const promise = new Promise<boolean>((resolve, reject) => {
            pubSubService.subscribe({
                id: PublisherStub.NORMAL_ID,
                callback: (data) => {
                    resolve(data === messageData);
                },
            });
            // 一秒不出结果则失败
            // setTimeout(() => resolve(false), 1000 * 1);
        });
        pubSubService.publish({
            id: PublisherStub.NORMAL_ID,
            data: messageData,
        });
        expect(await promise).toEqual(true);
    });
});
