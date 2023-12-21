<?php

namespace Nzbiranik\TreeView;

use yii\base\Widget;
use Nzbiranik\TreeView\assets\TreeAsset;

class Tree extends Widget
{
    public function getItems(?int $parent = null): array
    {
        return [];
        /*return Faq::find()
            ->where(['parent_id' => $parent])
            ->andWhere(['locale' => WebsiteLanguageHelper::getLanguage()])
            ->orderBy(['priority' => SORT_ASC])
            ->all(); */
    }

    public function init() {
        TreeAsset::register($this->getView());
        parent::init();
    }

    public function run()
    {
        return $this->render('tree', [
            'items' => $this->getItems(),
            'widget' => $this,
        ]);
    }

}