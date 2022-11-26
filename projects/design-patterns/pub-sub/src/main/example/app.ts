import { View } from '../view/view';
import { VNode } from '../vnode/vnode';

window.addEventListener('load', () => {
    View.createApp({
        el: document.body,
        component: new VNode(
            'h1',
            {
                events: {
                    click: (e) => {
                        alert('hello');
                    },
                },
                attrs: { style: 'color: red;' },
            },
            'Hello View.'
        ),
    });
});
