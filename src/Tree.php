<?php

namespace Nzbiranik\TreeView;

use Closure;
use yii\base\Widget;
use Nzbiranik\TreeView\assets\TreeAsset;

class Tree extends Widget
{
    public string $parentField = 'parent_id';
    public ?Closure $functionItems;

    public function getItems(?int $parent = null): array
    {
        if (is_callable($this->functionItems)) {
            return call_user_func($this->functionItems, $parent);
        }
        return [];
    }

    public function init() {
        TreeAsset::register($this->getView());
        parent::init();
    }

    public function run()
    {
        return $this->render('index', [
            'items' => $this->getItems(),
            'widget' => $this,
        ]);
    }

}