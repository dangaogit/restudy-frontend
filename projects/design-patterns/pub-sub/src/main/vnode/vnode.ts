export interface VNodeProps {
    events: Record<string, EventListener>;
    attrs: Record<string, string>;
}

export class VNode {
    public constructor(
        private readonly tag: string,
        private readonly props: VNodeProps,
        private readonly children: string | VNode | VNode[]
    ) {}

    public toInstance(): Node {
        const el = document.createElement(this.tag);
        if (typeof this.children === 'string') {
            el.innerText = this.children;
        } else if (this.children instanceof VNode) {
            el.appendChild(this.children.toInstance());
        }

        for (const [key, value] of Object.entries(this.props.attrs)) {
            el.setAttribute(key, value);
        }

        for (const [key, value] of Object.entries(this.props.events)) {
            el.addEventListener(key, value);
        }
        return el;
    }
}
