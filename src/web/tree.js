document.addEventListener('DOMContentLoaded', function() {
    //Tree.init();
    const t = new Tree2();
    t.init();
});

class Tree2 {
    selectors = {
        items: '.Nzbiranik-tree-view .Nzbiranik-tree details'
    };

    init () {
        document.querySelector('.Nzbiranik-tree-view .Nzbiranik__buttons .Nzbiranik__button-open').addEventListener('click', this.open);
        document.querySelector('.Nzbiranik-tree-view .Nzbiranik__buttons .Nzbiranik__button-close').addEventListener('click', this.close);

        const dragElements = document.querySelectorAll('.Nzbiranik-tree-view .Nzbiranik-tree_draggable-item');
        dragElements.forEach(element => {
            element.addEventListener('dragstart', this.startMove);
            element.addEventListener('dragend', this.stopMove);
            element.addEventListener('dragenter', this.dragenter);
        });
    }

    open () {
        console.log(Tree2.selectors.items);
        onsole.log(this.selectors.items);
        const elements = document.querySelectorAll(Tree2.selectors.items);
        for (let elem of elements) {
            elem.open = true;
        }
    }

    close () {
        const elements = document.querySelectorAll(Tree2.selectors.items);
        for (let elem of elements) {
            elem.open = false;
        }
    }

    stopMove (e) {
        e.target.classList.remove('Nzbiranik-tree_draggable-item_moved');
        const elemFromCoords = document.elementFromPoint(e.clientX, e.clientY);
        const parentElem = elemFromCoords.closest('details.Nzbiranik-tree_draggable-item');
        parentElem.classList.remove('Nzbiranik-tree__draggable-item_dragging');
        const from = e.target.getAttribute('data-id');
        const to = parentElem.getAttribute('data-id');
        parentElem.querySelector('.Nzbiranik-tree__children').append(e.target);
        parentElem.dispatchEvent(new CustomEvent("move-parent", {
            bubbles: true,
            cancelable: true,
            detail: {
                child: from.id,
                parent: to.id
            }
        }));
        e.stopImmediatePropagation();
    }

    dragenter (e) {
        const draggableElem = e.target.closest('details.Nzbiranik-tree_draggable-item');
        const dragElements = document.querySelectorAll('.Nzbiranik-tree-view .Nzbiranik-tree_draggable-item');
        dragElements.forEach(element => {
            element.classList.remove('Nzbiranik-tree__draggable-item_dragging');
        });
        draggableElem.classList.add('Nzbiranik-tree__draggable-item_dragging');
    }

    startMove (e) {
        e.target.classList.add('Nzbiranik-tree_draggable-item_moved');
    }
}

/*const Tree = {
    selector: '.Nzbiranik-tree-view .Nzbiranik-tree details',
    init: function () {
        document.querySelector('.Nzbiranik-tree-view .Nzbiranik__buttons .Nzbiranik__button-open').addEventListener('click', Tree.open);
        document.querySelector('.Nzbiranik-tree-view .Nzbiranik__buttons .Nzbiranik__button-close').addEventListener('click', Tree.close);

        const dragElements = document.querySelectorAll('.Nzbiranik-tree-view .Nzbiranik-tree_draggable-item');
        dragElements.forEach(element => {
            element.addEventListener('dragstart', Tree.startMove);
            element.addEventListener('dragend', Tree.stopMove);
            element.addEventListener('dragenter', Tree.dragenter);
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
        e.target.classList.remove('Nzbiranik-tree_draggable-item_moved');
        const elemFromCoords = document.elementFromPoint(e.clientX, e.clientY);
        const parentElem = elemFromCoords.closest('details.Nzbiranik-tree_draggable-item');
        parentElem.classList.remove('Nzbiranik-tree__draggable-item_dragging');
        const from = e.target.getAttribute('data-id');
        const to = parentElem.getAttribute('data-id');
        parentElem.querySelector('.Nzbiranik-tree__children').append(e.target);
        parentElem.dispatchEvent(new CustomEvent("move-parent", {
            bubbles: true,
            cancelable: true,
            detail: {
                child: from.id,
                parent: to.id
            }
        }));
        e.stopImmediatePropagation();
    },
    dragenter: function (e) {
        const draggableElem = e.target.closest('details.Nzbiranik-tree_draggable-item');
        const dragElements = document.querySelectorAll('.Nzbiranik-tree-view .Nzbiranik-tree_draggable-item');
        dragElements.forEach(element => {
            element.classList.remove('Nzbiranik-tree__draggable-item_dragging');
        });
        draggableElem.classList.add('Nzbiranik-tree__draggable-item_dragging');
    },
    startMove: function (e) {
        e.target.classList.add('Nzbiranik-tree_draggable-item_moved');
    },
};*/
