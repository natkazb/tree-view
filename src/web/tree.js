document.addEventListener('DOMContentLoaded', function() {
    const t = new Tree();
    t.init();
});

class Tree {
    selectors = {
        root: '.Nzbiranik-tree-view',
        items: '.Nzbiranik-tree-view .Nzbiranik-tree details',
        item: '.Nzbiranik-tree_draggable-item',
        item_dragging: 'Nzbiranik-tree__draggable-item_dragging',
        item_moved: 'Nzbiranik-tree_draggable-item_moved',
        buttons: '.Nzbiranik-tree-view .Nzbiranik__buttons',
        button_move_down: '.Nzbiranik-tree__button-move-down',
        button_move_up: '.Nzbiranik-tree__button-move-up'
    };

    constructor() {
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.startMove = this.startMove.bind(this);
        this.stopMove = this.stopMove.bind(this);
        this.dragenter = this.dragenter.bind(this);
        this.moveDown = this.moveDown.bind(this);
        this.moveUp = this.moveUp.bind(this);
    }

    init () {
        document.querySelector(`${this.selectors.buttons} .Nzbiranik__button-open`).addEventListener('click', this.open);
        document.querySelector(`${this.selectors.buttons} .Nzbiranik__button-close`).addEventListener('click', this.close);

        const dragElements = document.querySelectorAll(`${this.selectors.root} ${this.selectors.item}`);
        dragElements.forEach(element => {
            element.addEventListener('dragstart', this.startMove);
            element.addEventListener('dragend', this.stopMove);
            element.addEventListener('dragenter', this.dragenter);
        });

        const moveDownButtons = document.querySelectorAll(`${this.selectors.root} ${this.selectors.button_move_down}`);
        moveDownButtons.forEach(element => {
            element.addEventListener('click', this.moveDown);
        });

        const moveUpButtons = document.querySelectorAll(`${this.selectors.root} ${this.selectors.button_move_up}`);
        moveUpButtons.forEach(element => {
            element.addEventListener('click', this.moveUp);
        });
    }

    open () {
        const elements = document.querySelectorAll(this.selectors.items);
        for (let elem of elements) {
            elem.open = true;
        }
    }

    close () {
        const elements = document.querySelectorAll(this.selectors.items);
        for (let elem of elements) {
            elem.open = false;
        }
    }

    startMove (e) {
        e.target.classList.add(this.selectors.item_moved);
    }

    stopMove (e) {
        e.target.classList.remove(this.selectors.item_moved);
        const elemFromCoords = document.elementFromPoint(e.clientX, e.clientY);
        const parentElem = elemFromCoords.closest(`details${this.selectors.item}`);
        parentElem.classList.remove(this.selectors.item_dragging);
        if (e.target.contains(parentElem) === false) { // родителя в потомка не переносим
            const from = e.target.getAttribute('data-id');
            const to = parentElem.getAttribute('data-id');
            if (from !== to) {
                parentElem.querySelector('.Nzbiranik-tree__children').append(e.target);
                parentElem.dispatchEvent(new CustomEvent("move-parent", {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        child: from,
                        parent: to
                    }
                }));
            }
        }
        e.stopImmediatePropagation();
    }

    dragenter (e) {
        const draggableElem = e.target.closest(`details${this.selectors.item}`);
        const dragElements = document.querySelectorAll(`${this.selectors.root} ${this.selectors.item}`);
        dragElements.forEach(element => {
            element.classList.remove(this.selectors.item_dragging);
        });
        draggableElem.classList.add(this.selectors.item_dragging);
    }

    moveDown (e) {
        const item = e.target.closest(`details${this.selectors.item}`);
        const sibling = item.nextSibling;
        sibling?.after(item);
        sibling?.dispatchEvent(new CustomEvent("move-down", {
            bubbles: true,
            cancelable: true,
            detail: {
                id: item.getAttribute('data-id')
            }
        }));
        e.preventDefault();
    }

    moveUp (e) {
        const item = e.target.closest(`details${this.selectors.item}`);
        const sibling = item.previousSibling;
        sibling?.before(item);
        sibling?.dispatchEvent(new CustomEvent("move-up", {
            bubbles: true,
            cancelable: true,
            detail: {
                id: item.getAttribute('data-id')
            }
        }));
        e.preventDefault();
    }
}
