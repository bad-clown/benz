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
			<li>
				<a href="http://120.26.50.11:8010/index.php?r=benz/shipment" class="icon-wl" title="物流信息"><span>物流信息</span></a>
			</li>
			<li class="active">
				<a href="http://120.26.50.11:8010/index.php?r=benz/cert" class="icon-3c" title="3C证书"><span>3C证书</span></a>
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
		<div class="cert-nav">
			<a href="javascript:;" class="active" title="全部">全部</a>
			<a href="javascript:;" title="将过期">将过期</a>
			<a href="javascript:;" title="已过期">已过期</a>
		</div>
		<div class="cert-main">
			<div class="cert-top clearfix">
				<div class="search-box">
					<input type="text" class="text-search" id="J_searchTxt" name="" value="" placeholder="请输入提单号或零件号">
					<a href="javascript:;" class="btn-search" id="J_searchBtn" title="查询">查询</a>
				</div>
				<a href="javascript:;" class="btn-upload" title="导入3C证书">导入3C证书</a>
				<a href="http://120.26.50.11:8010/提单号.xls" class="btn-download" title="导出全部3C证书">导出全部3C证书</a>
			</div>
			<div class="cert-list">
				<div class="lists-titl">所有零件列表</div>
				<div class="lists-cont">
					<table>
						<thead>
							<tr>
								<th class="pl42">零件号</th>
								<th><span class="l-line pl20">中文名</span></th>
								<th><span class="l-line pl20">证书号</span></th>
								<th><span class="l-line pl20">截止日期</span></th>
								<th><span class="l-line pl20">3C证书文件</span></th>
								<th><span class="l-line pl20">操作</span></th>
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
	<div class="upload-popup popup" id="uploadSuc">
		<h3>文件上传</h3>
		<div class="upload-state" id="uploadState"></div>
		<a href="javascript:;" class="btn-suc J_closeBtn" title="确定">确定</a>
	</div>
</div>
<?php $this->beginBlock("bottomcode"); ?>
<script type="text/javascript" src="/js/jquery.tmpl.min.js"></script>
<script type="text/javascript" src="/js/common.js"></script>
<script type="text/x-jquery-tmpl" id="shipmentListTmpl">
<tr>
	<td class="pl42"><a href="http://120.26.50.11:8010/index.php?r=benz/shipment-detail&id=${_id['$id']}" title="">${shipmentNo}</a></td>
	<td class="pl20"><span class="c7f7e7e">${uploadTime}</span></td>
	<td class="pl20"><a href="javascript:;" class="btn-delete"></a></td>
</tr>
</script>
<script type="text/javascript" src="/js/cert.js"></script>
<?php $this->endBlock();  ?>