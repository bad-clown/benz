<?php
use yii\helpers\Html;
use yii\widgets\ActiveForm;
use hipstercreative\user\widgets\Connect;
use app\models\Dictionary;
$Path = Dictionary::indexKeyValue('App', 'Host', false);
?>
<div class="username">
	<a href="<?= $Path;?>index.php?r=benz/personal" class="name" title="<?= \Yii::$app->
		user->identity->name; ?>">
		<?= \Yii::$app->user->identity->name; ?></a>
	<span>欢迎您！</span>
	<?php $form = ActiveForm::begin([
        'id' => 'logout-form',
        'action' => $Path.'index.php?r=user/security/logout'
    ]) ?>
    <?= Html::submitButton(Yii::t('user', '退出'), ['class' => 'logout']) ?>
    <?php ActiveForm::end(); ?>
</div>