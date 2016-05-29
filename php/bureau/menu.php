<?php
use app\models\Dictionary;
$Path = Dictionary::indexKeyValue('App', 'Host', false);
?>
<ul id="benzMenu">
	<?php if(!\Yii::$app->user->identity->isAdmin){ ?>
	<li>
		<a href="<?= $Path;?>index.php?r=bureau/reservation" class="icon-yy" title="预约查验"><span>预约查验</span></a>
	</li>
	<?php };?>
	<li>
		<a href="<?= $Path;?>index.php?r=bureau/user" class="icon-zh" title="账户管理"><span>账户管理</span></a>
	</li>
</ul>