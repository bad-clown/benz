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
		<div class="manager-main">
			<div class="nav clearfix">
				<a href="javascript:;" class="active" id="J_guo">国检账号</a>
				<a href="javascript:;" id="J_qi">企业账号</a>
			</div>
			<div class="manager-top clearfix">
				<div class="search-box">
					<input type="text" class="text-search" id="J_searchTxt" name="" value="" placeholder="请输入姓名">
					<a href="javascript:;" class="btn-search" id="J_searchBtn" title="查询">查询</a>
				</div>
				<?php if(\Yii::$app->user->identity->isAdmin){ ?><a href="javascript:;" style="float:right;margin-right:0;" class="btn-createUser" id="createUser">新增国检账号</a><?php };?>
			</div>
			<div class="manager-list">
				<div class="lists-titl">所有账号列表</div>
				<div class="lists-cont">
					<div class="lists-table-cont">
						<table>
							<thead>
								<tr>
									<th width="16%" class="pl20">用户名</th>
									<th width="10%"><span class="l-line pl10 __name">姓名</span></th>
									<th width="17%"><span class="l-line pl10">手机号</span></th>
									<th width="21%"><span class="l-line pl10">邮箱</span></th>
									<th width="20%"><span class="l-line pl10 __role">部门</span></th>
									<th width="8%"><span class="l-line pl10">密码</span></th>
									<th width="8%"><span class="l-line pl10">状态</span></th>
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
</div>
<?php $this->beginBlock("bottomcode"); ?>
<script type="text/javascript" src="/js/jquery.tmpl.min.js"></script>
<script type="text/javascript" src="/js/layer/layer.js"></script>
<script type="text/javascript" src="/js/port.js"></script>
<script type="text/javascript" src="/js/common.js"></script>
<script type="text/x-jquery-tmpl" id="userListTmpl">
<?php if(\Yii::$app->user->identity->isAdmin){ ?>
<tr {{if blocked_at}} class="off" {{/if}}>
	<td class="pl20"><a href="javascript:;" data-userid="${_id['$id']}" {{if role=='guo'}}class="edit-${role}"{{else}}class="edit-${role}"{{/if}}>${username}</a></td>
	<td><span class="pl10">${name}</span></td>
	<td><span class="pl10">${phone}</span></td>
	<td><span class="pl10">${email}</span></td>
	<td><span class="pl10 contact-span" title="{{if role=='guo'}}${department}{{else}}${relations}{{/if}}">{{if role=='guo'}}${department}{{else}}${relations}{{/if}}</span></td>
	<td><span class="pl10"><a href="javascript:;" class="btn-res {{if !blocked_at}} J_ResetPwd {{/if}}" data-resid="${_id['$id']}" title="重置">重置</a></span></td>
	<td><span class="pl10"><a href="javascript:;" class="btn-off J_OffPwd" data-offid="${_id['$id']}" title="{{if blocked_at}}启用{{else}}禁用{{/if}}">{{if blocked_at}}启用{{else}}禁用{{/if}}</a></span></td>
</tr>
<?php }else{ ?>
<tr {{if blocked_at}} class="off" {{/if}}>
	<td class="pl20">${username}</td>
	<td><span class="pl10">${name}</span></td>
	<td><span class="pl10">${phone}</span></td>
	<td><span class="pl10">${email}</span></td>
	<td><span class="pl10 contact-span" title="{{if role=='guo'}}${department}{{else}}${relations}{{/if}}">{{if role=='guo'}}${department}{{else}}${relations}{{/if}}</span></td>
	<td><span class="pl10"><a href="javascript:;" class="btn-res btn-disabled" title="重置">重置</a></span></td>
	<td><span class="pl10"><a href="javascript:;" class="btn-off btn-disabled" title="{{if blocked_at}}启用{{else}}禁用{{/if}}">{{if blocked_at}}启用{{else}}禁用{{/if}}</a></span></td>
</tr>
<?php };?>
</script>
<script type="text/javascript" src="/js/bureauUser.js"></script>
<?php $this->endBlock();  ?>
