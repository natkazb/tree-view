<?php

use Nzbiranik\TreeView\Tree;

/** @var array $items */
/** @var Tree $widget */
?>
<div class="Nzbiranik_tree_view">
    <div class="Nzbiranik_buttons">
        <button class="Nzbiranik_button-open"><?= Yii::t('backend', 'Развернуть все') ?></button>
        <button class="Nzbiranik_button-close"><?= Yii::t('backend', 'Свернуть все') ?></button>
    </div>
    <div class="Nzbiranik_tree">
        <?php echo $widget->render('_children', [
            'items' => $items,
            'widget' => $widget,
            'parentId' => null,
        ]); ?>
    </div>
</div>