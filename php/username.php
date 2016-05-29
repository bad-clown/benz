<?php
use app\models\Dictionary;
$Path = Dictionary::indexKeyValue('App', 'Host', false);
?>
<div class="username">
	<a href="<?= $Path;?>index.php?r=benz/personal" class="name" title="<?= \Yii::$app->
		user->identity->username; ?>">
		<?= \Yii::$app->user->identity->username; ?></a>
	<span>欢迎您！</span>
	<a href="javascript:;" class="logout" id="logout" title="退出">退出</a>
</div>