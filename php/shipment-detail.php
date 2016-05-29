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
use app\models\Dictionary;
$Path = Dictionary::indexKeyValue('App', 'Host', false);
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
		<?= $this->render('username') ?>
	</div>
	<div class="left-nav">
		<?= $this->render('menu') ?>
	</div>
	<div class="right-main">
		<div class="shipment-detail">
			<div class="shipment-detail-top clearfix">
				<div class="s-n">提单号：<?= $shipment->shipmentNo;?></div>
				<div class="s-n">发货号：<?= $shipment->BLNo;?></div>
				<div class="s-n">到厂日期：<?= $shipment->arrivalDate;?></div>
			</div>
			<div class="shipment-detail-list">
				<div class="shipment-detail-thead">
					<table>
						<thead>
							<tr>
								<th width="20%" class="pl32">集装箱号</th>
								<th width="13%"><span class="l-line pl10">装船号</span></th>
								<th width="15%"><span class="l-line pl10">船号</span></th>
								<th width="22%"><span class="l-line pl10">零件号</span></th>
								<th width="20%"><span class="l-line pl10">中文名</span></th>
								<th width="10%"><span class="l-line pl10">数量</span></th>
							</tr>
						</thead>
					</table>
				</div>
				<div class="shipment-detail-tbody">
					<table>
						<tbody>
							<?php foreach($detail as $k => $v){	?>
							<tr>
								<td width="20%" class="pl32"><?= $v['containerNo'];?></td>
								<td width="13%"><span class="pl10"><?= $v['vesselNo'];?></span></td>
								<td width="15%"><span class="pl10"><?= $v['vesselName'];?></span></td>
								<td width="22%"><span class="pl10"><?= $v['partNo'];?></span></td>
								<td width="20%" title="<?= $v['partName'];?>"><span class="partName pl10"><?= $v['partName'];?></span></td>
								<td width="10%"><span class="pl10"><?= $v['count'];?></span></td>
							</tr>
							<?php };?>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<?php $this->beginBlock("bottomcode"); ?>
<script type="text/javascript">
$(function() {
	$('#benzMenu').find('li:eq(0)').addClass('active');
})
</script>
<?php $this->endBlock();  ?>