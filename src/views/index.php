<?php

use Nzbiranik\TreeView\Tree;

/** @var array $items */
/** @var Tree $widget */
?>
<div class="Nzbiranik_tree_view">
    <div class="expand">
        <button class="open-all"><?= Yii::t('backend', 'Развернуть все') ?></button>
        <button class="close-all"><?= Yii::t('backend', 'Свернуть все') ?></button>
    </div>
    <div class="tree">
        <?php echo $widget->render('_children', [
            'items' => $items,
            'widget' => $widget,
            'parentId' => null,
        ]); ?>
    </div>
</div>