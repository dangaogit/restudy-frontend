import { VNode } from '../vnode/vnode';

export interface ViewOptions {
    el: Element;
    component: VNode;
}

export class View {
    public static createApp(options: ViewOptions): View {
        return new View(options);
    }

    public constructor(private readonly options: ViewOptions) {
        this.render();
    }

    private render(): void {
        const { el, component } = this.options;
        el.appendChild(component.toInstance());
    }
}
