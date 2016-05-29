<?php
use app\models\Dictionary;
$Path = Dictionary::indexKeyValue('App', 'Host', false);
?>
<ul id="benzMenu">
	<li>
		<a href="<?= $Path;?>index.php?r=benz/shipment" class="icon-wl" title="物流信息"><span>物流信息</span></a>
	</li>
	<li>
		<a href="<?= $Path;?>index.php?r=benz/cert" class="icon-3c" title="3C证书"><span>3C证书</span></a>
	</li>
	<li>
		<a href="<?= $Path;?>index.php?r=benz/reservation" class="icon-yy" title="预约查询"><span>预约查询</span></a>
	</li>
	<li>
		<a href="<?= $Path;?>index.php?r=benz/user" class="icon-zh" title="账户管理"><span>账户管理</span></a>
	</li>
</ul>