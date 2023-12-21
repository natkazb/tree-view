<?php

use admin\modules\faq\models\Faq;
use admin\modules\faq\widgets\Tree;

/** @var Faq[] $items */
/** @var Tree $widget */
?>
<div class="faq_tree">
    <?php echo $widget->render('_tree', [
        'items' => $items,
        'widget' => $widget,
        'parentId' => null,
    ]); ?>
</div>
