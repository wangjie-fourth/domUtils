// JQuery 不直接返回选择的元素对象；而是返回一个特定可以操作元素的对象
const api = window.jQuery(".test");
api.addClass('red').addClass('blue');

