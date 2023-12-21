<?php

namespace Nzbiranik\TreeView\assets;

use yii\web\AssetBundle;

class TreeAsset extends AssetBundle
{
    public $sourcePath = __DIR__ . '/../web';


    public $css = [
        'tree.css'
    ];

    public $js = [
        'tree.js',
    ];

    public $depends = [
        'admin\assets\BackendAsset',
    ];
}