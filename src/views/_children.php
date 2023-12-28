<?php

use Nzbiranik\TreeView\Tree;
use yii\helpers\Html;
use yii\helpers\Url;

/** @var array $items */
/** @var Tree $widget */
/** @var ?int $parentId */
?>

<?php foreach ($items as $item) : ?>
    <details draggable="true" class="Nzbiranik-tree_draggable-item" data-id="<?php echo $item[$widget->idField] ?>">
        <summary>
            <?php if (!empty($widget->viewUrl)) : ?>
                <?php echo Html::a($item[$widget->titleField], [$widget->viewUrl, 'id' => $item[$widget->idField]]); ?>
            <?php else : ?>
                <?php echo $item[$widget->titleField]; ?>
            <?php endif; ?>
            <img class="Nzbiranik-tree__button-move-down" src="../web/move-down.svg" alt="move-down" data-id="<?php echo $item[$widget->idField] ?>"/>
            <img class="Nzbiranik-tree__button-move-up" src="../web/move-up.svg" alt="move-up" data-id="<?php echo $item[$widget->idField] ?>"/>
        </summary>
        <div class="Nzbiranik-tree__children">
            <?php echo $widget->render('_children', [
                'items' => $widget->getItems($item[$widget->idField]),
                'widget' => $widget,
                'parentId' => $item[$widget->idField],
            ]); ?>
        </div>
    </details>
<?php endforeach; ?>
<?php if (!empty($widget->addChildUrl)) : ?>
    <div class="Nzbiranik-tree__add-child">
        <a href="<?php echo Url::to([$widget->addChildUrl, 'parent' => $parentId]) ?>">
            <img src="../web/add.svg" alt="add"/>
        </a>
    </div>
<?php endif; ?>