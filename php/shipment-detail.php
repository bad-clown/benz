<?php

/*
 * This file is part of the Dektrium project.
 *
 * (c) Dektrium project <http://github.com/dektrium>
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

use yii\helpers\Html;
use yii\widgets\ActiveForm;
use hipstercreative\user\widgets\Connect;
use app\modules\admin\models\Dictionary;
use app\modules\admin\logic\DictionaryLogic;
//$Path = DictionaryLogic::indexKeyValue('App', 'Host', false);
/**
 * @var yii\web\View $this
 * @var yii\widgets\ActiveForm $form
 * @var hipstercreative\user\models\LoginForm $model
 */

$this->title = Yii::t('user', 'Sign in');
$this->params['breadcrumbs'][] = $this->title;
?>

<div class="benzContainer">
	<div class="top-bar">
		<!-- 登录信息 -->
	</div>
	<div class="left-nav">
		<ul>
			<li class="active">
				<a href="http://120.26.50.11:8010/index.php?r=benz/shipment" class="icon-wl" title="物流信息"><span>物流信息</span></a>
			</li>
			<li>
				<a href="#" class="icon-3c" title="3C证书"><span>3C证书</span></a>
			</li>
			<li>
				<a href="#" class="icon-yy" title="预约查询"><span>预约查询</span></a>
			</li>
			<li>
				<a href="#" class="icon-zh" title="账户管理"><span>账户管理</span></a>
			</li>
		</ul>
	</div>
	<div class="right-main">
		<div class="shipment-detail">
			提单号：<?= $shipment->shipmentNo;?><br>
			发货号：<?= $shipment->BLNo;?><br>
			到厂日期：<?= $shipment->arrivalDate;?><br>
		</div>
		<div class="shipment-detail">
			<table width="100%">
				<thead>
					<tr>
						<th>集装箱号</th>
						<th>装船号</th>
						<th>船号</th>
						<th>零件号</th>
						<th>中文名</th>
						<th>数量</th>
					</tr>
				</thead>
				<tbody>
					<?php foreach($detail as $k => $v){	?>
					<tr>
						<td><?= $v['containerNo'];?></td>
						<td><?= $v['vesselNo'];?></td>
						<td><?= $v['vesselName'];?></td>
						<td><?= $v['partNo'];?></td>
						<td><?= $v['partName'];?></td>
						<td><?= $v['count'];?></td>
					</tr>
					<?php };?>
				</tbody>
			</table>
		</div>
	</div>
</div>
<?php $this->beginBlock("bottomcode"); ?>
<script type="text/javascript" src="/js/jquery.tmpl.min.js"></script>
<script type="text/javascript" src="/js/common.js"></script>

<?php $this->endBlock();  ?>