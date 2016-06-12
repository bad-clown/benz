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
		<div class="shipment-top clearfix">
			<a href="<?= $Path;?>提单号.xls" class="btn-download" title="下载模版">下载模版</a>
			<div class="upload-box">
				<a href="javascript:;" class="btn-upload" title="上传信息">上传信息</a>
				<?php $form = ActiveForm::begin([
                    'id' => 'upload-form',
                ]) ?>
                <input name="file" type="file" id="J_upload_xlsx" class="file-upload">
				<?php ActiveForm::end(); ?>
			</div>
			<div class="search-box">
				<input type="text" class="text-search" id="J_searchTxt" name="" value="" placeholder="请输入提单号">
				<a href="javascript:;" class="btn-search" id="J_searchBtn" title="查询">查询</a>
			</div>
		</div>
		<div class="shipment-list">
			<div class="lists-titl">物流信息列表</div>
			<div class="lists-cont">
				<div class="lists-table-cont">
					<table>
						<thead>
							<tr>
								<th width="60%" class="pl42">提单号</th>
								<th width="25%"><span class="l-line pl20">上传时间</span></th>
								<th width="15%"><span class="l-line pl20">操作</span></th>
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
<div class="upload-popup popup" id="uploadSuc">
	<h3>文件上传</h3>
	<div class="upload-state" id="uploadState"></div>
	<a href="javascript:;" class="btn-suc J_closeBtn" title="确定">确定</a>
</div>

<?php $this->beginBlock("bottomcode"); ?>
<script type="text/javascript" src="/js/jquery.form.js"></script>
<script type="text/javascript" src="/js/jquery.tmpl.min.js"></script>
<script type="text/javascript" src="/js/layer/layer.js"></script>
<script type="text/javascript" src="/js/common.js"></script>
<script type="text/javascript" src="/js/port.js"></script>
<script type="text/x-jquery-tmpl" id="shipmentListTmpl">
<tr>
	<td class="pl42"><a href="<?= $Path;?>index.php?r=benz/shipment-detail&id=${_id['$id']}" title="">${shipmentNo}</a></td>
	<td class="pl20"><span class="c7f7e7e">${uploadTime}</span></td>
	<td class="pl20">{{if canDelete}}<a href="javascript:;" class="btn-delete" data-delid="${_id['$id']}"></a>{{/if}}</td>
</tr>
</script>
<script type="text/javascript" src="/js/shipment.js"></script>
<?php $this->endBlock();  ?>