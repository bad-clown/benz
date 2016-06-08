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
		<div class="shipment-list reservation-list">
			<div class="search-box">
				<input type="text" class="text-search" id="J_searchTxt" name="" value="" placeholder="请输入提单号">
				<a href="javascript:;" class="btn-search" id="J_searchBtn" title="查询">查询</a>
			</div>
			<div class="lists-titl">所有预约列表</div>
			<div class="lists-cont">
				<div class="lists-table-cont">
					<table>
						<thead>
							<tr>
								<th width="40%" class=" pl42">提单号</th>
								<th width="20%"><span class="l-line pl20">检验日期</span></th>
								<th width="20%"><span class="l-line pl20">发货号</span></th>
								<th width="20%"><span class="l-line pl20">到厂日期</span></th>
							</tr>
						</thead>
						<tbody id="J_lists"></tbody>
					</table>
				</div>
				<div class="lists-pages">
					<div class="count">共<span id="J_count"></span>页</div>
					<ul class="pages clearfix" id="J_pages"></ul>
				</div>
			</div>
		</div>
	</div>
</div>

<?php $this->beginBlock("bottomcode"); ?>
<script type="text/javascript" src="/js/jquery.tmpl.min.js"></script>
<script type="text/javascript" src="/js/layer/layer.js"></script>
<script type="text/javascript" src="/js/common.js"></script>
<script type="text/javascript" src="/js/port.js"></script>
<script type="text/x-jquery-tmpl" id="shipmentListTmpl">
<tr>
	<td class="pl20"><a href="<?= $Path;?>index.php?r=benz/reservation-detail&id=${_id}" title="">${shipmentNo}</a></td>
	<td class="pl42">${checkDate}</td>
	<td class="pl20">${BLNo}</td>
	<td class="pl20">${arrivalDate}</td>
</tr>
</script>
<script type="text/javascript">
$(function() {
	$('#benzMenu').find('li:eq(2)').addClass('active');
	window.reservationUrl = urlPort.reservationList;
})
</script>
<script type="text/javascript" src="/js/reservation.js"></script>
<?php $this->endBlock();  ?>
