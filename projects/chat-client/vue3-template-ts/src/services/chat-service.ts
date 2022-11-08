export interface Message {
    username: string;
    content: string;
}

export type ReceiverCall = (message: Message) => void;

class ChatService {
    private receivers: ReceiverCall[] = [];

    private messages: Message[] = [];

    public constructor() {
        new Proxy(this.receivers, {
            set: () => {
                setTimeout(() => {
                    this.receivers.forEach(r => {
                        this.messages.forEach(m => r(m))
                    })
                })
                return true
            }
        })
    }

    public send(message: Message): void {
        this.messages.push(message)
        setTimeout(() => {
            this.receivers.forEach(r => r(message))
        })
    }

    public injectReceiver(call: ReceiverCall): void {
        this.receivers.push(call);
    }
}

export const chatService = new ChatService()