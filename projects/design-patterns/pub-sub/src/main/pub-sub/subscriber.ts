export interface Subscriber<T = unknown> {
    id: string;
    callback: (value: T) => void;
}
