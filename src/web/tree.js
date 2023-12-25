$(function () {
    Tree.init();
});

const Tree = {
    selector: '.Nzbiranik_tree_view .Nzbiranik_tree details',
    init: function () {
        $('.Nzbiranik_tree_view .Nzbiranik_buttons .Nzbiranik_button-open').on('click', Tree.open);
        $('.Nzbiranik_tree_view .Nzbiranik_buttons .Nzbiranik_button-close').on('click', Tree.close);
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
