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
		<?= $this->render('username') ?>
	</div>
	<div class="left-nav">
		<?= $this->render('menu') ?>
	</div>
	<div class="right-main">
		<div class="manager-main">
			<div class="nav clearfix">
				<a href="javascript:;" class="active" title="国检账号">国检账号</a>
				<a href="javascript:;" title="企业账号">企业账号</a>
			</div>
			<div class="manager-top clearfix">
				<div class="search-box" style="margin-left:0;">
					<input type="text" class="text-search" id="J_searchTxt" name="" value="" placeholder="请输入姓名">
					<a href="javascript:;" class="btn-search" id="J_searchBtn" title="查询">查询</a>
				</div>
				<a href="javascript:;" style="float:right;" class="btn-createUser" <?php if(\Yii::$app->user->identity->isAdmin){ ?>id="createUser-open"<?php };?> title="新增国检账号">新增国检账号</a>
			</div>
			<div class="manager-list">
				<div class="lists-titl">所有账号列表</div>
				<div class="lists-cont">
					<table>
						<thead>
							<tr>
								<th width="16%" class="pl20">用户名</th>
								<th width="10%"><span class="l-line pl10">姓名</span></th>
								<th width="17%"><span class="l-line pl10">手机号</span></th>
								<th width="25%"><span class="l-line pl10">邮箱</span></th>
								<th width="16%"><span class="l-line pl10">部门</span></th>
								<th width="8%"><span class="l-line pl10">密码</span></th>
								<th width="8%"><span class="l-line pl10">状态</span></th>
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
</div>

<div class="createUser-popup">
	<a href="javascript:;" class="btn-close" id="createUser-close" title="关闭">关闭</a>
	<h3>新增企业账号</h3>
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
					<td class="tit">关联国检账号：</td>
					<td class="con"><input type="text" class="user-text contact-guo" disabled="disabled" name="department" value="" placeholder="请输入部门"><p class="msg"></p><div class="contact"><div class="contact-pop"><ul><li><input type="checkbox" name="" value=""> xiaoma</li><li><input type="checkbox" name="" value=""> xiaoma</li><li><input type="checkbox" name="" value=""> xiaoma</li><li><input type="checkbox" name="" value=""> xiaoma</li><li><input type="checkbox" name="" value=""> xiaoma</li><li><input type="checkbox" name="" value=""> xiaoma</li><li><input type="checkbox" name="" value=""> xiaoma</li><li><input type="checkbox" name="" value=""> xiaoma</li><li><input type="checkbox" name="" value=""> xiaoma</li><li><input type="checkbox" name="" value=""> xiaoma</li><li><input type="checkbox" name="" value=""> xiaoma</li><li><input type="checkbox" name="" value=""> xiaoma</li></ul><a href="javascript:;" class="btn-confirm2" title="确定">确定</a></div></div></td>
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
					<td class="tit">密码：</td>
					<td class="con"><input type="password" class="user-text" name="password" value="" placeholder="请输入至少6位数密码"><p class="msg"></p></td>
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
	<td><span class="pl10">${phone}</span></td>
	<td><span class="pl10">${email}</span></td>
	<td><span class="pl10">${department}</span></td>
	<td><span class="pl10"><a href="javascript:;" class="btn-res {{if !blocked_at}} J_ResetPwd {{/if}}" data-resid="${_id['$id']}" title="重置">重置</a></span></td>
	<td><span class="pl10"><a href="javascript:;" class="btn-off J_OffPwd" data-offid="${_id['$id']}" title="{{if blocked_at}}启用{{else}}禁用{{/if}}">{{if blocked_at}}启用{{else}}禁用{{/if}}</a></span></td>
</tr>
<?php }else{ ?>
<tr {{if blocked_at}} class="off" {{/if}}>
	<td class="pl20">${username}</td>
	<td><span class="pl10">${name}</span></td>
	<td><span class="pl10">${phone}</span></td>
	<td><span class="pl10">${email}</span></td>
	<td><span class="pl10">${department}</span></td>
	<td><span class="pl10"><a href="javascript:;" class="btn-res btn-disabled" title="重置">重置</a></span></td>
	<td><span class="pl10"><a href="javascript:;" class="btn-off btn-disabled" title="{{if blocked_at}}启用{{else}}禁用{{/if}}">{{if blocked_at}}启用{{else}}禁用{{/if}}</a></span></td>
</tr>
<?php };?>
</script>
<script type="text/javascript">
$(function() {
	$('#benzMenu').find('li:eq(1)').addClass('active');

	/* 提单列表 */
	var _key_ = "";
	function _GetData(n) {
		var d = {
			role : 'guo',
			key : _key_ || "",
			page : n || 1
		};

		$.ajax({
			type: 'GET',
			url: urlPort.BureauUserList,
			dataType : 'json',
			data: d,
			success : function(data) {
				var _list = data.list, _len = _list.length, _result = [];

				if(_len > 0) {
					_result = Extend(data.list)
					PageTotal.init(data)

					$('#J_count').html(data.pageCount)
					$('#J_lists').empty()
					$('#userListTmpl').tmpl(_result).appendTo('#J_lists')
				} else {
					$('#J_count').html(data.pageCount)
					$("#J_pages").empty();
					$('#J_lists').html('<tr><td colspan="8" style="text-align:center;color:#ff7d26;">找不到该用户，请重新输入！</td></tr>')
				}
			}
		});
	}
	_GetData()

	/* 搜索 */
	$('#J_searchBtn').on('click', function() {
		searchKey($('#J_searchTxt'))
	})
	$('#J_searchTxt').on('keypress', function(e) {
		if(e.keyCode == 13) {
			searchKey($('#J_searchTxt'))
		}
	});
	function searchKey(o) {
		_key_ = $(o).val();
		_GetData()
	}

	/* 添加账号 */
	$('.createUser-cont').find('.user-text').on('focus', function() {
		$(this).next('.msg').html('')
	})
	$(document).on('click', '#J_CreateUser', function() {
		var obj = $('.createUser-cont').find('.user-text'),
			options = ['username','name','id','department','phone','email']
			data = {
				username : obj.eq(0).val(),
				name : obj.eq(1).val(),
				department : obj.eq(2).val(),
				phone : obj.eq(3).val(),
				email : obj.eq(4).val(),
				password : obj.eq(5).val()
			}

		$.ajax({
			type: "POST",
			url: urlPort.BureauCreateGuoUser,
			data: data,
			cache: false,
			success: function(data) {
				// console.log(data)
				if(data.code == 0) {
					$('#createUser-close').click()
					layer.msg('账号添加成功！')
					_GetData()
				}
				else{
					var errors = data.errors;
					for(var n in errors) {
						switch (n) {
							case 'username' :
								obj.eq(	0).next('.msg').html(errors[n])
								break;
							case 'name' :
								obj.eq(1).next('.msg').html(errors[n])
								break;
							case 'id' :
								obj.eq(2).next('.msg').html(errors[n])
								break;
							case 'department' :
								obj.eq(3).next('.msg').html(errors[n])
								break;
							case 'phone' :
								obj.eq(4).next('.msg').html(errors[n])
								break;
							case 'email' :
								obj.eq(5).next('.msg').html(errors[n])
								break;
						}
					}
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				layer.msg('添加失败，请检查网络后重试！')
			}
		});
	})

	function createHtml(str) {
		if(str == '新增国检账号') {
			return '<div class="createUser-popup"><a href="javascript:;" class="btn-close" id="createUser-close" title="关闭">关闭</a><h3>新增国检账号</h3><div class="createUser-cont"><table><tbody><tr><td class="tit">用户名：</td><td class="con"><input type="text" class="user-text" name="username" value="" placeholder="请输入用户名"><p class="msg"></p></td></tr><tr><td class="tit">姓名：</td><td class="con"><input type="text" class="user-text" name="name" value="" placeholder="请输入姓名"><p class="msg"></p></td></tr><tr><td class="tit">部门：</td><td class="con"><input type="text" class="user-text" name="department" value="" placeholder="请输入部门"><p class="msg"></p></td></tr><tr><td class="tit">手机号：</td><td class="con"><input type="text" class="user-text" name="phone" value="" placeholder="请输入有效手机号"><p class="msg"></p></td></tr><tr><td class="tit">邮箱：</td><td class="con"><input type="text" class="user-text" name="email" value="" placeholder="请输入有效邮箱"><p class="msg"></p></td></tr><tr><td class="tit">密码：</td><td class="con"><input type="password" class="user-text" name="password" value="" placeholder="请输入至少6位数密码"><p class="msg"></p></td></tr><tr><td colspan="2"><button class="btn-confirm" id="J_CreateUser" title="确定">确定</button></td></tr></tbody></table></div></div>';
		}
	}

	function createUserPop(str) {
		var html = createHtml(str);
		$('body').append(html);
	}

	/* 打开添加账号 */
	$('#createUser-open').on('click', function() {
		createUserPop($.trim($(this).html()))
	})

	/* 关闭添加账号 */
	$(document).on('click', '#createUser-close', function() {
		$('.createUser-popup').remove()
	})

	/* 重置密码 */
	$(document).on('click', '.J_ResetPwd', function() {
		var id = $(this).data('resid');
		$.ajax({
			type : 'GET',
			url: urlPort.BureauResetPwd,
			dataType : 'json',
			data : {
				id : id
			},
			success : function(data) {
				if(data.code == 0) {
					layer.msg('密码重置成功！')
				}
			}
		})
	})

	/* 禁用密码 */
	$(document).on('click', '.J_OffPwd', function() {
		var $o = $(this);
		var id = $(this).data('offid');
		$.ajax({
			type : 'GET',
			url: urlPort.BureauBlockUser,
			dataType : 'json',
			data : {
				id : id
			},
			success : function(data) {
				if(data.code == 0) {
					layer.msg($o.html()+'成功！')
					_GetData()
				}
			}
		})
	})

	window._GetData = _GetData;
})
</script>
<?php $this->endBlock();  ?>