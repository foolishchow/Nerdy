const {Vue} = window;
const on = (function() {
    if ( document.addEventListener) {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();

const nodeList = [];
const ctx = '@@clickoutsideContext';

let startClick;

on(document, 'mousedown', e => (startClick = e));

on(document, 'mouseup', e => {
    nodeList.forEach(node => node[ctx].documentHandler(e, startClick));
});
/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-element-clickoutside="handleClose">
 * ```
 */
exports = {
    bind(el, binding, vnode) {
        const id = nodeList.push(el) - 1;
        const documentHandler = function(mouseup, mousedown) {
            if (!vnode.context ||
                el.contains(mouseup.target) ||
                (vnode.context.popperElm &&
                (vnode.context.popperElm.contains(mouseup.target) ||
                vnode.context.popperElm.contains(mousedown.target)))) return;

            if (binding.expression &&
                el[ctx].methodName &&
                vnode.context[el[ctx].methodName]) {
                vnode.context[el[ctx].methodName]();
            } else {
                el[ctx].bindingFn && el[ctx].bindingFn();
            }
        };
        el[ctx] = {
            id,
            documentHandler,
            methodName: binding.expression,
            bindingFn: binding.value
        };
    },

    update(el, binding) {
        el[ctx].methodName = binding.expression;
        el[ctx].bindingFn = binding.value;
    },

    unbind(el) {
        let len = nodeList.length;

        for (let i = 0; i < len; i++) {
            if (nodeList[i][ctx].id === el[ctx].id) {
                nodeList.splice(i, 1);
                break;
            }
        }
    }
};
