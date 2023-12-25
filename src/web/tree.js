$(function () {
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
    finish: async function (e) {
        const elemFromCoords = document.elementFromPoint(e.clientX, e.clientY);
        const parentElem = elemFromCoords.closest('div.draggable_item');
        const from = {
            id: e.target.getAttribute('data-key'),
            title: e.target.getAttribute('data-title')
        };
        const to = {
            id: parentElem.getAttribute('data-key'),
            title: parentElem.getAttribute('data-title')
        };
        const yes = confirm(`Переместить '${from.title}' в '${to.title}'?`);
        if (yes) {
            const data = {
                child: from.id,
                parent: to.id
            };
            $.ajax({
                type: "POST",
                data,
                url: `/admin/website/website-menu/move-parent`,
                headers: {
                    "Accept": "application/json"
                },
                success: function(response) {
                    if (response.success) {
                        // при успехе перезагрузим страницу
                        window.location.href = `/admin/website/website-menu/index`;
                    } else {
                        $.notify({message: response.error}, {
                            type: "danger dark",
                            animate: {exit: 'hide'},
                            z_index: 2031
                        });
                    }
                },
                error: function(e) {
                    console.log(e);
                }
            });
        }
    },
};
