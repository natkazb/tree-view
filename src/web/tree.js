$(function () {
    Tree.init();
});

const Tree = {
    selector: '.Nzbiranik_tree_view .tree details',
    init: function () {
        $('.Nzbiranik_tree_view .open-all').on('click', Tree.open);
        $('.Nzbiranik_tree_view .close-all').on('click', Tree.close);
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
