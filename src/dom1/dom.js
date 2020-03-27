window.dom = {
    elementNode: {
        class: {},
        attr: {},
        style: {},
        text: {},
        event: {}
    },
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string;
        } else if (arguments.length === 1) {
            return node.innerHTML;
        }
    },
};

// 元素节点的增删改
window.dom.elementNode = {
    /**
     * 创建节点
     * @param string：要创建的标签字符串表示，如<div>hi</div>
     * @returns {ChildNode}
     */
    createNode: function (string) {
        const container = document.createElement('template');
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },
    /**
     * 新增弟弟
     * @param node
     * @param newBrother
     */
    createNewBrother(node, newBrother) {
        node.parentNode.insertBefore(newBrother, node.nextSibling);
    },
    /**
     * 新增哥哥
     * @param node
     * @param oldBrother
     */
    createOldBrother(node, oldBrother) {
        node.parentNode.insertBefore(oldBrother, node);
    },
    /**
     * 新增儿子
     * @param parent
     * @param child
     */
    createChild(parent, child) {
        parent.appendChild(child);
    },
    /**
     * 新增爸爸
     * @param node
     * @param parentNode
     */
    createParent(node, parentNode) {
        dom.before(node, parentNode);
        dom.append(parentNode, node)
    },


    /**
     * 删除该节点
     * @param node
     */
    removeNode(node) {
        node.parentNode.removeChild(node);
        return node;
    },
    /**
     * 删除该节点下的所有子节点
     * @param parent
     * @returns {[]}
     */
    removeAllChildNode(parent) {
        const array = [];
        let x = parent.firstChild;
        while (x) {
            array.push(dom.remove(parent.firstChild));
            x = parent.firstChild;
        }
        return array;
    },

    find(selector, targetScope) {
        return (targetScope || document).querySelectorAll(selector);
    },
    parent(node) {
        return node.parentNode;
    },
    children(node) {
        return node.children;
    },
    siblings(node) {
        return Array.from(node.parentNode.children).filter(n => n !== node);
    },
    next(node) {
        let x = node.nextSibling;
        while (x && x.nodeType === 3) {//
            x = x.nextSibling;
        }
        return x;
    },
    previous(node) {
        let x = node.previousSibling;
        while (x && x.nodeType === 3) {//
            x = x.previousSibling;
        }
        return x;
    },
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.size; i++) {
            fn.call(null, nodeList[i]);
        }
    },
    index: function (node) {
        let list = dom.children(node.parentNode);
        let i = 0;
        for (; i < list.size; i++) {
            if (list[i] === node) {
                break;
            }
        }
        return i;
    }
};

// 元素节点属性的CURD
window.dom.elementNode.attr = {
    /**
     * 修改指定节点的指定属性值
     * @param node
     * @param attrName
     * @param attrValue
     */
    attr(node, attrName, attrValue) {
        if (arguments.length === 3) {
            return node.setAttribute(attrName, attrValue);
        } else if (arguments.length === 2) {
            return node.getAttribute(attrName);
        }
    },
};

// class的CURD
window.dom.elementNode.class = {
    add(node, className) {
        node.classList.add(className);
    },
    remove(node, className) {
        return node.classList.remove(className);
    },
    contain(node, className) {
        return node.classList.contains(className);
    }
};

// style的CURD
window.dom.elementNode.style = {
    style(node, name, value) {
        if (arguments.length === 3) {
            // dom.style(div, 'color', 'red')
            node.style[name] = value;
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                // dom.style(div, 'color')
                return node.style[name];
            } else if (name instanceof Object) {
                for (let key in name) {
                    node.style[key] = name[key];
                }
            }
        }
    },
};

// text的CURD
window.dom.elementNode.text = {
    /**
     * 添加文本内容
     * @param node
     * @param string
     */
    text(node, string) {
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = string; // ie
            } else {
                node.textContent = string; // firefox、Chrome
            }
        } else if (arguments.length === 2) {
            if ('innerText' in node) {
                return node.innerText; // ie
            } else {
                return node.textContent; // firefox、Chrome
            }
        }
    },
};

// event的CURD
window.dom.elementNode.event = {
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn);
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn);
    },
}
