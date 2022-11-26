import { View } from '../view/view';
import { VNode } from '../vnode/vnode';

window.addEventListener('load', () => {
    View.createApp({ el: document.body, component: new VNode('h1', 'Hello View.') });
});
