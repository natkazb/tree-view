document.addEventListener('DOMContentLoaded', function() {
    Tree.init();
});

const Tree = {
    selector: '.Nzbiranik-tree-view .Nzbiranik-tree details',
    init: function () {
        document.querySelector('.Nzbiranik-tree-view .Nzbiranik__buttons .Nzbiranik_button-open').addEventListener('click', Tree.open);
        document.querySelector('.Nzbiranik-tree-view .Nzbiranik__buttons .Nzbiranik_button-close').addEventListener('click', Tree.close);

        const dragElements = document.querySelectorAll('.Nzbiranik-tree-view .Nzbiranik-tree_draggable_item');
        dragElements.forEach(element => {
            element.addEventListener('dragstart', Tree.startMove);
            element.addEventListener('dragend', Tree.stopMove);
            element.addEventListener('dragenter', Tree.dragenter);
            element.addEventListener('dragleave', Tree.dragleave);

            /*element.addEventListener('dragover', (event) => {
                console.log('dragover');
                console.log(event.target);
                event.preventDefault();
            });*/
        });
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
    stopMove: function (e) {
        console.log('dragend');
        console.log(e.target);
        e.target.classList.remove('Nzbiranik-tree_draggable-item_moved');
        const elemFromCoords = document.elementFromPoint(e.clientX, e.clientY);
        const parentElem = elemFromCoords.closest('details.Nzbiranik-tree_draggable_item');
        parentElem.classList.remove('Nzbiranik-tree__draggable-item_dragging');
        const from = {
            id: e.target.getAttribute('data-id'),
            title: e.target.getAttribute('data-title')
        };
        const to = {
            id: parentElem.getAttribute('data-id'),
            title: parentElem.getAttribute('data-title')
        };
        const yes = confirm(`Переместить '${from.title}' в '${to.title}'?`);
        if (yes) {
            parentElem.querySelector('.Nzbiranik-tree__children').append(e.target);
            parentElem.dispatchEvent(new CustomEvent("move-parent", {
                bubbles: true,
                cancelable: true,
                detail: {
                    child: from.id,
                    parent: to.id
                }
            }));
        }
        e.stopImmediatePropagation();
    },
    dragenter: function (e) {
        const draggableElem = e.target.closest('details.Nzbiranik-tree_draggable_item');
        console.log('dragenter');
        console.log(draggableElem);
        draggableElem.classList.add('Nzbiranik-tree__draggable-item_dragging');
    },
    dragleave: function (e) {
        const draggableElem = e.target.closest('details.Nzbiranik-tree_draggable_item');
        console.log('dragleave');
        console.log(draggableElem);
        draggableElem.classList.remove('Nzbiranik-tree__draggable-item_dragging');
    },
    startMove: function (e) {
        e.target.classList.add('Nzbiranik-tree_draggable-item_moved');
    },
};
