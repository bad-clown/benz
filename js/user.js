$(function() {
	$('#benzMenu').find('li:eq(3)').addClass('active');
	/* 提单列表 */
	var _key_ = "";
	function _GetData(n) {
		var d = {
			key : _key_ || "",
			page : n || 1
		};

		$.ajax({
			type: 'GET',
			url: urlPort.userList,
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
					if(_key_ == '') {
						var c = '暂无用户信息';
					}
					else {
						var c = '找不到该用户，请重新输入！';
					}
					$('#J_lists').html('<tr><td colspan="8" style="text-align:center;color:#ff7d26;">'+c+'</td></tr>')
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
	$('#J_CreateUser').on('click', function() {
		var obj = $('.createUser-cont').find('.user-text'),
			options = ['username','name','id','department','phone','email']
			data = {
				username : obj.eq(0).val(),
				name : obj.eq(1).val(),
				id : obj.eq(2).val(),
				department : obj.eq(3).val(),
				phone : obj.eq(4).val(),
				email : obj.eq(5).val()
			}

		$.ajax({
			type: "POST",
			url: urlPort.createUser,
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
								obj.eq(0).next('.msg').html(errors[n])
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

	/* 重置密码 */
	$(document).on('click', '.J_ResetPwd', function() {
		var id = $(this).data('resid');
		$.ajax({
			type : 'GET',
			url: urlPort.resetPwd,
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
			url: urlPort.blockUser,
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

	/* 关闭添加账号 */
	$('#createUser-close').on('click', function() {
		$('.user-text').val('')
		$('.msg').html('')
		$('#overlay__').hide();
		$(this).parents('.popup').hide();
	})
	/* 打开添加账号 */
	$('#createUser-open').on('click', function() {
		$('#overlay__').show();
		$('.createUser-popup').eq(0).show();
	})

	$(document).on('click', '#JupdateUser-close', function() {
		$('#updateUserPop').remove();
		$('#overlay__').hide();
	})

	$(document).on('click', '.edit-user', function() {
		$('#overlay__').show();
		var txt = $(this).parents('tr:eq(0)').find('td');
		var html = '<div class="createUser-popup" id="updateUserPop"><a href="javascript:;" class="btn-close"  id="JupdateUser-close" title="关闭">关闭</a><h3>修改账号</h3><div class="createUser-cont" id="updateUser-cont"><table><tbody><tr><td class="tit">用户名：</td><td class="con"><input type="text" class="user-text" name="username" value="'+ txt.eq(0).text() +'" placeholder="请输入用户名"><p class="msg"></p></td></tr><tr><td class="tit">姓名：</td><td class="con"><input type="text" class="user-text" name="name" value="'+ txt.eq(1).text() +'" placeholder="请输入姓名"><p class="msg"></p></td></tr><tr><td class="tit">工号：</td><td class="con"><input type="text" class="user-text" name="id" value="'+ txt.eq(2).text() +'" placeholder="请输入工号"><p class="msg"></p></td></tr><tr><td class="tit">部门：</td><td class="con"><input type="text" class="user-text" name="department" value="'+ txt.eq(3).text() +'" placeholder="请输入部门"><p class="msg"></p></td></tr><tr><td class="tit">手机号：</td><td class="con"><input type="text" class="user-text" name="phone" value="'+ txt.eq(4).text() +'" placeholder="请输入有效手机号"><p class="msg"></p></td></tr><tr><td class="tit">邮箱：</td><td class="con"><input type="text" class="user-text" name="email" value="'+ txt.eq(5).text() +'" placeholder="请输入有效邮箱"><p class="msg"></p></td></tr><tr><td colspan="2"><button class="btn-confirm" id="J_UpdateUser" data-userid="'+ $(this).data('userid') +'" title="确定">确定</button></td></tr></tbody></table></div></div>';
		$('body').append(html)
	})

	$(document).on('click', '#J_UpdateUser', function() {
		var obj = $('#updateUser-cont').find('.user-text'),
			options = ['username','name','id','department','phone','email']
			data = {
				userId : $(this).data('userid'),
				username : obj.eq(0).val(),
				name : obj.eq(1).val(),
				id : obj.eq(2).val(),
				department : obj.eq(3).val(),
				phone : obj.eq(4).val(),
				email : obj.eq(5).val()
			}

		$.ajax({
			type: "POST",
			url: urlPort.updateUser,
			data: data,
			cache: false,
			success: function(data) {
				if(data.code == 0) {
					$('#updateUserPop').remove();
					$('#overlay__').hide();
					layer.msg('账号修改成功！')
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

	window._GetData = _GetData;
})