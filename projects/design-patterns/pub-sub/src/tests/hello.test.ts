import { HELLO } from '../main/hello';

describe('hello.ts', () => {
    test('hello', () => {
        expect(typeof HELLO).toEqual(typeof '');
    });
});
