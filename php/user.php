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
		<div class="manager-top clearfix">
			<?php if(\Yii::$app->user->identity->isAdmin){ ?><a href="javascript:;" class="btn-createUser" id="createUser-open" title="新增账号">新增账号</a><?php };?>
			<div class="search-box">
				<input type="text" class="text-search" id="J_searchTxt" name="" value="" placeholder="请输入姓名">
				<a href="javascript:;" class="btn-search" id="J_searchBtn" title="查询">查询</a>
			</div>
		</div>
		<div class="manager-list">
			<div class="lists-titl">所有账号列表</div>
			<div class="lists-cont">
				<div class="lists-table-cont">
					<table>
						<thead>
							<tr>
								<th width="16%" class="pl20">用户名</th>
								<th width="10%"><span class="l-line pl10">姓名</span></th>
								<th width="14%"><span class="l-line pl10">工号</span></th>
								<th width="10%"><span class="l-line pl10">部门</span></th>
								<th width="13%"><span class="l-line pl10">手机号</span></th>
								<th width="25%"><span class="l-line pl10">邮箱</span></th>
								<th width="6%"><span class="l-line pl10">密码</span></th>
								<th width="6%"><span class="l-line pl10">状态</span></th>
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

<div class="createUser-popup popup">
	<a href="javascript:;" class="btn-close" id="createUser-close" title="关闭">关闭</a>
	<h3>新增账号</h3>
	<div class="createUser-cont">
		<table>
			<tbody>
				<tr>
					<td class="tit">用户名：</td>
					<td class="con"><input type="text" class="user-text" name="username" value="" placeholder="请输入用户名"><p class="msg"></p></td>
				</tr>
				<tr>
					<td class="tit">姓名：</td>
					<td class="con"><input type="text" class="user-text" name="name" value="" placeholder="请输入姓名"><p class="msg"></p></td>
				</tr>
				<tr>
					<td class="tit">工号：</td>
					<td class="con"><input type="text" class="user-text" name="id" value="" placeholder="请输入工号"><p class="msg"></p></td>
				</tr>
				<tr>
					<td class="tit">部门：</td>
					<td class="con"><input type="text" class="user-text" name="department" value="" placeholder="请输入部门"><p class="msg"></p></td>
				</tr>
				<tr>
					<td class="tit">手机号：</td>
					<td class="con"><input type="text" class="user-text" name="phone" value="" placeholder="请输入有效手机号"><p class="msg"></p></td>
				</tr>
				<tr>
					<td class="tit">邮箱：</td>
					<td class="con"><input type="text" class="user-text" name="email" value="" placeholder="请输入有效邮箱"><p class="msg"></p></td>
				</tr>
				<tr>
					<td colspan="2">
						<button class="btn-confirm" id="J_CreateUser" title="确定">确定</button>
					</td>
				</tr>
			</tbody>
		</table>
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
	<td class="pl20">${username}</td>
	<td><span class="pl10">${name}</span></td>
	<td><span class="pl10">${id}</span></td>
	<td><span class="pl10">${department}</span></td>
	<td><span class="pl10">${phone}</span></td>
	<td><span class="pl10">${email}</span></td>
	<td><span class="pl10"><a href="javascript:;" class="btn-res {{if !blocked_at}} J_ResetPwd {{/if}}" data-resid="${_id['$id']}" title="重置">重置</a></span></td>
	<td><span class="pl10"><a href="javascript:;" class="btn-off J_OffPwd" data-offid="${_id['$id']}" title="{{if blocked_at}}启用{{else}}禁用{{/if}}">{{if blocked_at}}启用{{else}}禁用{{/if}}</a></span></td>
</tr>
<?php }else{ ?>
<tr {{if blocked_at}} class="off" {{/if}}>
	<td class="pl20">${username}</td>
	<td><span class="pl10">${name}</span></td>
	<td><span class="pl10">${id}</span></td>
	<td><span class="pl10">${department}</span></td>
	<td><span class="pl10">${phone}</span></td>
	<td><span class="pl10">${email}</span></td>
	<td><span class="pl10"><a href="javascript:;" class="btn-res btn-disabled" title="重置">重置</a></span></td>
	<td><span class="pl10"><a href="javascript:;" class="btn-off btn-disabled" title="{{if blocked_at}}启用{{else}}禁用{{/if}}">{{if blocked_at}}启用{{else}}禁用{{/if}}</a></span></td>
</tr>
<?php };?>
</script>
<script type="text/javascript" src="/js/user.js"></script>
<?php $this->endBlock();  ?>