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
        <summary><?= Html::a($item->title, ['view', 'id' => $item->id]); ?></summary>
        <div class="faq_tree_children">
            <?php echo $widget->render('_children', [
                'items' => $widget->getItems($item->id),
                'widget' => $widget,
                'parentId' => $item->id,
            ]); ?>
        </div>
    </details>
<?php endforeach; ?>
<div class="add">
    <a href="<?= Url::to(['create', 'parent' => $parentId]) ?>">
        <i class="fa fa-plus"></i>
    </a>
</div>