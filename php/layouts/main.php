<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;
use app\models\Dictionary;
$Path = Dictionary::indexKeyValue('App', 'Host', false);
AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<!--[if lt IE 7]><html class="lt-ie9 lt-ie8 lt-ie7" lang="<?= Yii::$app->language ?>"><![endif]-->
<!--[if IE 7]><html class="lt-ie9 lt-ie8" lang="<?= Yii::$app->language ?>" ><![endif]-->
<!--[if IE 8]><html class="lt-ie9" lang="<?= Yii::$app->language ?>" ><![endif]-->
<!--[if gt IE 8]><!--><html lang="<?= Yii::$app->language ?>"><!--<![endif]-->
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <script type="text/javascript">var $_Path='<?= $Path;?>';</script>
    <?php $this->head() ?>
</head>
<body>
<?php $this->beginBody() ?>
<div id="overlay__"></div>
<div class="wrap">
    <?= $content ?>
</div>

<?php $this->endBody() ?>
<?php if (isset($this->blocks['bottomcode'])): ?>
<?= $this->blocks['bottomcode'] ?>
<?php  endif; ?>
</body>
</html>
<?php $this->endPage() ?>
