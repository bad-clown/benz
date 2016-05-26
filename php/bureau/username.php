<?php
use yii\helpers\Html;
use yii\widgets\ActiveForm;
use hipstercreative\user\widgets\Connect;
use app\modules\admin\models\Dictionary;
use app\modules\admin\logic\DictionaryLogic;
//$Path = DictionaryLogic::indexKeyValue('App', 'Host', false);
// $Path = \Yii::$app->
?>
<div class="username">
	<a href="http://120.26.50.11:8010/index.php?r=benz/personal" class="name" title="<?= \Yii::$app->
		user->identity->username; ?>">
		<?= \Yii::$app->user->identity->username; ?></a>
	<span>欢迎您！</span>
	<a href="javascript:;" class="logout" id="logout" title="退出">退出</a>
	<!-- http://120.26.50.11:8010/index.php?r=user/security/logout -->
</div>