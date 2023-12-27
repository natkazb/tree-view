<?php

use Nzbiranik\TreeView\Tree;

/** @var array $items */
/** @var Tree $widget */
?>
<div class="Nzbiranik-tree-view">
    <div class="Nzbiranik__buttons">
        <button class="Nzbiranik__button-open"><?= Yii::t('backend', 'Развернуть все') ?></button>
        <button class="Nzbiranik__button-close"><?= Yii::t('backend', 'Свернуть все') ?></button>
    </div>
    <div class="Nzbiranik-tree">
        <?php echo $widget->render('_children', [
            'items' => $items,
            'widget' => $widget,
            'parentId' => null,
        ]); ?>
    </div>
</div>