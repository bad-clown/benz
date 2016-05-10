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
		<?= $this->render('menu') ?>
	</div>
	<div class="right-main">
		<div class="shipment-list reservation-list">
			<div class="search-box">
				<input type="text" class="text-search" id="J_searchTxt" name="" value="" placeholder="请输入单号">
				<a href="javascript:;" class="btn-search" id="J_searchBtn" title="查询">查询</a>
			</div>
			<div class="lists-titl">所有预约列表</div>
			<div class="lists-cont">
				<table>
					<thead>
						<tr>
							<th width="40%" class="pl42">检验日期</th>
							<th width="20%"><span class="l-line pl20">提单号</span></th>
							<th width="20%"><span class="l-line pl20">发货号</span></th>
							<th width="20%"><span class="l-line pl20">到厂日期</span></th>
						</tr>
					</thead>
					<tbody id="J_lists"></tbody>
				</table>
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
<script type="text/javascript" src="/js/common.js"></script>
<script type="text/javascript" src="/js/port.js"></script>
<script type="text/x-jquery-tmpl" id="shipmentListTmpl">
<tr>
	<td class="pl42"><a href="http://120.26.50.11:8010/index.php?r=benz/reservation-detail&id=${_id['$id']}" title="">${shipmentNo}</a></td>
	<td class="pl20"><span class="c7f7e7e">${uploadTime}</span></td>
	<td class="pl20"><span class="c7f7e7e">${uploadTime}</span></td>
	<td class="pl20"></td>
</tr>
</script>
<script type="text/javascript" src="/js/reservation.js"></script>
<?php $this->endBlock();  ?>