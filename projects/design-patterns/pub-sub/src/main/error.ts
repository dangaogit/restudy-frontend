export class PubSubError extends Error {
    private code: PubSubErrorCode;
    public constructor(code: PubSubErrorCode) {
        super();
        this.code = code;
    }
    public getCode(): PubSubErrorCode {
        return this.code;
    }
}

export enum PubSubErrorCode {
    NOT_FOUND_ID = 'NOT_FOUND_ID',
}
