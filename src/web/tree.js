$(function () {
    Tree.init();
});

const Tree = {
    selector: '.faq_tree details',
    init: function () {
        $('.faq_expand .open-all').on('click', Tree.open);
        $('.faq_expand .close-all').on('click', Tree.close);
    },
    open: function () {
        const elements = document.querySelectorAll(Tree.selector);
        for (let elem of elements) {
            elem.open = true;
        }
    },
    close: function () {
        const elements = document.querySelectorAll(Tree.selector);
        for (let elem of elements) {
            elem.open = false;
        }
    },
};
