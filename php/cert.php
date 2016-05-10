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
		<div class="cert-main">
			<div class="cert-nav clearfix">
				<a href="javascript:;" class="active" title="全部" id="cert-all">全部</a>
				<a href="javascript:;" title="将过期" id="cert-soon">将过期</a>
				<a href="javascript:;" title="已过期" id="cert-over">已过期</a>
			</div>
			<div class="cert-top clearfix">
				<div class="search-box">
					<input type="text" class="text-search" id="J_searchTxt" name="" value="" placeholder="请输入提单号或零件号">
					<a href="javascript:;" class="btn-search" id="J_searchBtn" title="查询">查询</a>
				</div>
				<a href="#" class="btn-download" title="导出全部3C证书">导出全部3C证书</a>
				<a href="http://120.26.50.11:8010/index.php?r=benz/cert-import" class="btn-upload" title="导入3C证书">导入3C证书</a>
			</div>
			<div class="cert-list">
				<div class="lists-titl">所有零件列表</div>
				<div class="lists-cont">
					<table>
						<thead>
							<tr>
								<th width="22%" class="pl42">零件号</th>
								<th width="18%"><span class="l-line pl20">中文名</span></th>
								<th width="20%"><span class="l-line pl20">证书号</span></th>
								<th width="15%"><span class="l-line pl20">截止日期</span></th>
								<th width="15%"><span class="l-line pl20">3C证书文件</span></th>
								<th width="10%"><span class="l-line pl20">操作</span></th>
							</tr>
						</thead>
						<tbody id="J_lists">
							<!-- <tr>
								<td class="pl42">A 205 270 62 01</td>
								<td><span class="l-line pl20">后视镜</span></td>
								<td><span class="l-line pl20">201212154561234562215</span></td>
								<td><span class="l-line pl20">2015-5-05-05</span></td>
								<td><span class="l-line pl20 s-i">暂无证书</span></td>
								<td><span class="l-line pl20">操作</span></td>
							</tr>
							<tr class="status0">
								<td class="pl42">A 205 270 62 01</td>
								<td><span class="l-line pl20">后视镜</span></td>
								<td><span class="l-line pl20">201212154561234562215</span></td>
								<td><span class="l-line pl20">2015-5-05-05</span></td>
								<td><span class="l-line pl20 s-i">未过期</span></td>
								<td><span class="l-line pl20">操作</span></td>
							</tr>
							<tr class="status1">
								<td class="pl42">A 205 270 62 01</td>
								<td><span class="l-line pl20">后视镜</span></td>
								<td><span class="l-line pl20">201212154561234562215</span></td>
								<td><span class="l-line pl20">2015-5-05-05</span></td>
								<td><span class="l-line pl20 s-i">将过期</span></td>
								<td><span class="l-line pl20">操作</span></td>
							</tr>
							<tr class="status2">
								<td class="pl42">A 205 270 62 01</td>
								<td><span class="l-line pl20">后视镜</span></td>
								<td><span class="l-line pl20">201212154561234562215</span></td>
								<td><span class="l-line pl20">2015-5-05-05</span></td>
								<td><span class="l-line pl20 s-i">已过期</span></td>
								<td><span class="l-line pl20">操作</span></td>
							</tr> -->
						</tbody>
					</table>
					<div class="lists-pages">
						<div class="count">共<span id="J_count"></span>页</div>
						<ul class="pages clearfix" id="J_pages"></ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="update-popup popup">
	<a href="javascript:;" class="btn-close" id="update-close" title="关闭">关闭</a>
	<h3>更新零件信息</h3>
	<div class="update-cont">
		<table>
			<tbody>
				<tr>
					<td class="tit">&lowast;零件号：</td>
					<td class="con"><input type="text" class="partNo-text" name="" value="" placeholder="请输入零件号"></td>
				</tr>
				<tr>
					<td class="tit">&lowast;中文名：</td>
					<td class="con"><input type="text" class="name-text" name="" value="" placeholder="请输入中文名"></td>
				</tr>
				<tr>
					<td class="tit">&lowast;证书号：</td>
					<td class="con">
						<input type="text" class="part-text" id="J_certNo" name="" value="" placeholder="请输入有效证书号">
						<p class="msg"></p>
					</td>
				</tr>
				<tr>
					<td class="tit">&lowast;有效期：</td>
					<td class="con"><input type="hidden" id="oldStartDate" /><input type="hidden" id="oldEndDate" /><input type="text" class="part-text w160" name="" value="" placeholder="请选择开始时间" onClick="new Calendar().show(this);" readonly="readonly"> 至 <input type="text" class="part-text w160" name="" value="" id="EndDate" placeholder="请选择结束时间" onClick="new Calendar().show(this);" readonly="readonly"></td>
				</tr>
				<tr>
					<td class="tit">&lowast;PDF文件：</td>
					<td class="con">
						<input type="hidden" id="oldCertPDF" />
						<input type="text" class="part-text w235 f-l" id="file-text" disabled="disabled" name="" value="" placeholder="请上传PDF文件">
						<div class="btn-file-box f-l">
							<a href="javascript:;" class="btn-upload" title="选择文件">选择文件</a>
							<input name="file" type="file" id="J_upload_pdf" class="file-upload">
						</div>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<button class="btn-confirm" id="J_Upload" title="确定">确定</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>


<?php $this->beginBlock("bottomcode"); ?>
<script type="text/javascript" src="/js/jquery.tmpl.min.js"></script>
<script type="text/javascript" src="/js/port.js"></script>
<script type="text/javascript" src="/js/common.js"></script>
<script type="text/javascript" src="/js/Calendar.js"></script>
<script type="text/x-jquery-tmpl" id="certListTmpl">
<tr {{if cert}} class="status${cert['status']}" {{/if}}>
	<td class="pl42">${partNo}</td>
	<td class="pl20" title="${name}">${name}</td>
	<td class="pl20">{{if cert}} ${cert['certNo']} {{else}} 暂无证书 {{/if}}</td>
	<td class="pl20">{{if certExpireDate}} ${certExpireDate} {{else}} 暂无证书 {{/if}} </td>
	<td class="pl20 s-i">{{if cert}} {{if cert['status'] == 0}} 未过期 {{else cert['status'] == 1}} 将过期 {{else cert['status'] == 2}} 已过期 {{/if}} {{else}} 暂无证书 {{/if}}</td>
	<td><a href="javascript:;" class="btn-edit J_edit" title="更新零件信息"></a></td>
</tr>
</script>
<script type="text/javascript" src="/js/cert.js"></script>
<script type="text/javascript">
$(function() {
	_GetData()
})
</script>
<?php $this->endBlock();  ?>