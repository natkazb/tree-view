document.addEventListener('DOMContentLoaded', function() {
    Tree.init();
});

const Tree = {
    selector: '.Nzbiranik_tree_view .Nzbiranik_tree details',
    init: function () {
        document.querySelector('.Nzbiranik_tree_view .Nzbiranik_buttons .Nzbiranik_button-open').addEventListener('click', Tree.open);
        document.querySelector('.Nzbiranik_tree_view .Nzbiranik_buttons .Nzbiranik_button-close').addEventListener('click', Tree.close);

        const dragElements = document.querySelectorAll('.Nzbiranik_tree_view .Nzbiranik_tree_draggable-item');
        dragElements.forEach(element => {
            element.addEventListener('dragend', Tree.finish);
            element.addEventListener('dragenter', Tree.dragging);
            element.addEventListener('dragover', Tree.dragover);

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
    finish: function (e) {
        const elemFromCoords = document.elementFromPoint(e.clientX, e.clientY);
        const parentElem = elemFromCoords.closest('details.Nzbiranik_tree_draggable-item');
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
            parentElem.querySelector('.Nzbiranik_tree_children').append(e.target);
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
    dragging: function (e) {
        e.target.classList.add('Nzbiranik_tree_draggable-item_dragging');
    },
    dragover: function (e) {
        e.target.classList.add('Nzbiranik_tree_draggable-item_dragging2');
    },
};
