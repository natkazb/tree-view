<?php

use Nzbiranik\TreeView\Tree;
use yii\helpers\Html;
use yii\helpers\Url;

/** @var array $items */
/** @var Tree $widget */
/** @var ?int $parentId */
?>

<?php foreach ($items as $item) : ?>
    <details>
        <summary><?= Html::a($item[$widget->titleField], ['view', 'id' => $item[$widget->idField]]); ?></summary>
        <div class="faq_tree_children">
            <?php echo $widget->render('_children', [
                'items' => $widget->getItems($item[$widget->idField]),
                'widget' => $widget,
                'parentId' => $item[$widget->idField],
            ]); ?>
        </div>
    </details>
<?php endforeach; ?>
<div class="add">
    <a href="<?= Url::to(['create', 'parent' => $parentId]) ?>">
        <i class="fa fa-plus"></i>
    </a>
</div>