// 简化jQuery变量名
window.$ = window.jQuery = function (selectorOrArray) {
    let elements;
    if (typeof selectorOrArray === 'string') {
        elements = document.querySelectorAll(selectorOrArray);
    } else if (selectorOrArray instanceof Array) {
        elements = selectorOrArray;
    }

    // 创建 jQuery 的原型对象
    // 创建一个对象，这就对象的 __proto__ 为 jQuery.prototype
    const api = Object.create(jQuery.prototype);

    // 返回一个可以操作元素 的对象
    // api.elements = elements;
    // api.oldApi = selectorOrArray.oldApi;
    Object.assign(api, {
        elements: elements,
        oldApi: selectorOrArray.oldApi
    });
    return api;
};

// jQuery 的原型对象，为了减少内存占用
jQuery.fn = jQuery.prototype = {
    // 不知道为什么要加
    constructor: jQuery,

    children() {
        const array = [];
        this.each((node) => {
            // ...arrays，这个语法就是将数组的子元素拆开
            array.push(...node.children)
        });
        return jQuery(array);
    },
    /**
     * 获取【JQuery内部的所有元素对象】中所有的父元素
     * @returns {any}
     */
    parent() {
        const array = [];
        this.each((element) => {
            if (array.indexOf(element.parentNode) === -1) {
                array.push(element.parentNode);
            }
        });
        return jQuery(array);
    },
    /**
     * 【JQuery内部的所有元素对象】，都执行一遍fn函数
     * @param fn
     * @returns {each}
     */
    each(fn) {
        for (let i = 0; i < this.elements.length; i++) {
            // fn函数根据这个参数来自定义执行
            fn.call(null, this.elements[i], i);
        }
        return this;
    },

    /**
     * 为当前【JQuery包含的所有元素对象】都添加一个class属性
     * @param className
     * @returns {addClass}
     */
    "addClass": function (className) {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].classList.add(className);
        }
        return this;
    },
    /**
     * 查询当前【JQuery包含的所有元素对象】 中所有符合条件的子元素对象
     * @param selector
     * @returns {any}
     */
    find: function (selector) {
        let array = [];
        for (let i = 0; i < this.elements.length; i++) {
            // 由于elements[i].querySelectorAll(selector)得到的是一个假数组
            // 所以需要Array.from将其转换以下
            array = array.concat(Array.from(this.elements[i].querySelectorAll(selector)));
        }
        // 保留上一个JQuery对象的引用
        array.oldApi = this;
        // 凡是修改JQuery中的元素对象，就需要重新创建一个JQuery对象；这是为了中间变量
        return jQuery(array);
    },
    /**
     * 返回上一个JQuery对象的引用
     * @returns {find}
     */
    end() {
        return this.oldApi;
    }
};

