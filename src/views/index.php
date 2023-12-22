<?php

use Nzbiranik\TreeView\Tree;

/** @var array $items */
/** @var Tree $widget */
?>
<div class="faq_tree">
    <?php echo $widget->render('_children', [
        'items' => $items,
        'widget' => $widget,
        'parentId' => null,
    ]); ?>
</div>
