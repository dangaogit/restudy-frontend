export class VNode {
    public constructor(private readonly tag: string, private readonly children: string | VNode | VNode[]) {}

    public toInstance(): Node {
        const el = document.createElement(this.tag);
        if (typeof this.children === 'string') {
            el.innerText = this.children;
        }
        return el;
    }
}
