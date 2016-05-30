$(function() {
	$('#benzMenu').find('.icon-zh').parent('li:eq(0)').addClass('active');
	/* 提单列表 */
	var _key_ = "",_role = "guo";
	function _GetData(n) {
		var d = {
			role : _role || "guo",
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

				if(_role == 'guo') {
					$('.btn-createUser').eq(0).data('role', 'guo').html('新增国检账号')
					$('.__role').html('部门')
				}
				else if(_role == 'benz') {
					$('.btn-createUser').eq(0).data('role', 'benz').html('新增企业账号')
					$('.__role').html('关联国检账号')
				}

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
					$('#J_lists').html('<tr><td colspan="7" style="text-align:center;color:#ff7d26;">'+c+'</td></tr>')
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
	$(document).on('focus', '.user-text', function() {
		$(this).next('.msg').html('')
	})
	$(document).on('click', '#J_CreateGuo', function() {
		var obj = $('.createUser-cont').find('.user-text'),
			options = ['username','name','department','phone','email','password']
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
							case 'department' :
								obj.eq(2).next('.msg').html(errors[n])
								break;
							case 'phone' :
								obj.eq(3).next('.msg').html(errors[n])
								break;
							case 'email' :
								obj.eq(4).next('.msg').html(errors[n])
								break;
							case 'password' :
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
	$(document).on('click', '#J_CreateQi', function() {
		var obj = $('.createUser-cont').find('.user-text'),
			options = ['username','name','phone','email','password'],
			_relation = $('#contact').val().split(';'),
			data = {
				user : {
					username : obj.eq(0).val(),
					name : obj.eq(1).val(),
					phone : obj.eq(3).val(),
					email : obj.eq(4).val(),
					password : obj.eq(5).val()
				},
				relation : _relation
			}

		$.ajax({
			type: "POST",
			url: urlPort.BureauCreateQiUser,
			data: data,
			cache: false,
			success: function(data) {
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
							case 'phone' :
								obj.eq(3).next('.msg').html(errors[n])
								break;
							case 'email' :
								obj.eq(4).next('.msg').html(errors[n])
								break;
							case 'password' :
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
		if(str == 'guo') {
			return '<div class="createUser-popup"><a href="javascript:;" class="btn-close" id="createUser-close" title="关闭">关闭</a><h3>新增国检账号</h3><div class="createUser-cont"><table><tbody><tr><td class="tit">用户名：</td><td class="con"><input type="text" class="user-text" name="username" value="" placeholder="请输入用户名"><p class="msg"></p></td></tr><tr><td class="tit">姓名：</td><td class="con"><input type="text" class="user-text" name="name" value="" placeholder="请输入姓名"><p class="msg"></p></td></tr><tr><td class="tit">部门：</td><td class="con"><input type="text" class="user-text" name="department" value="" placeholder="请输入部门"><p class="msg"></p></td></tr><tr><td class="tit">手机号：</td><td class="con"><input type="text" class="user-text" name="phone" value="" placeholder="请输入有效手机号"><p class="msg"></p></td></tr><tr><td class="tit">邮箱：</td><td class="con"><input type="text" class="user-text" name="email" value="" placeholder="请输入有效邮箱"><p class="msg"></p></td></tr><tr><td class="tit">密码：</td><td class="con"><input type="password" class="user-text" name="password" value="" placeholder="请输入至少6位数密码"><p class="msg"></p></td></tr><tr><td colspan="2"><button class="btn-confirm" id="J_CreateGuo" title="确定">确定</button></td></tr></tbody></table></div></div>';
		}
		else if(str == 'benz') {
			return '<div class="createUser-popup"><a href="javascript:;" class="btn-close" id="createUser-close" title="关闭">关闭</a><h3>新增企业账号</h3><div class="createUser-cont"><table><tbody><tr><td class="tit">用户名：</td><td class="con"><input type="text" class="user-text" name="username" value="" placeholder="请输入用户名"><p class="msg"></p></td></tr><tr><td class="tit">姓名：</td><td class="con"><input type="text" class="user-text" name="name" value="" placeholder="请输入姓名"><p class="msg"></p></td></tr><tr><td class="tit">关联国检账号：</td><td class="con"><input type="text" class="user-text" id="contact" disabled="disabled" name="department" value="" placeholder="请选择关联账号"><div class="options" id="J_option"></div><p class="msg"></p><div class="contact" id="optionsBox"><div class="contact-pop"><ul></ul><a href="javascript:;" class="btn-confirm2" id="contact_conf" title="确定">确定</a></div></div></td></tr><tr><td class="tit">手机号：</td><td class="con"><input type="text" class="user-text" name="phone" value="" placeholder="请输入有效手机号"><p class="msg"></p></td></tr><tr><td class="tit">邮箱：</td><td class="con"><input type="text" class="user-text" name="email" value="" placeholder="请输入有效邮箱"><p class="msg"></p></td></tr><tr><td class="tit">密码：</td><td class="con"><input type="password" class="user-text" name="password" value="" placeholder="请输入至少6位数密码"><p class="msg"></p></td></tr><tr><td colspan="2"><button class="btn-confirm" id="J_CreateQi" title="确定">确定</button></td></tr></tbody></table></div></div>'
		}
	}

	function createUserPop(str) {
		var html = createHtml(str);
		$('body').append(html);
		$.ajax({
			type : 'GET',
			url : urlPort.BureauGuoUserList,
			dataType : 'json',
			success : function(data) {
				$('#optionsBox').find('ul:eq(0)').empty()
				$.each(data.list, function(i, o) {
					$('#optionsBox').find('ul:eq(0)').append('<li><input type="hidden" name="H'+o[1]+'" value="'+o[1]+'"><input type="checkbox" name="'+o[1]+'" value=""><span>'+ o[1] +'</span></li>');
				})
			}
		})
	}

	/* 打开创建账号 */
	$(document).on('click', '#createUser', function() {
		$('#overlay__').show();
		createUserPop($.trim($(this).data('role')))
	})

	/* 关闭创建账号 */
	$(document).on('click', '#createUser-close', function() {
		$('#overlay__').hide();
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

	$('#J_guo').on('click', function() {
		$('#createUser-close').click()
		$(this).addClass('active').siblings().removeClass('active')
		$('#J_searchTxt').val('')
		_role = 'guo';
		_key_ = '';
		_GetData();
	})
	$('#J_qi').on('click', function() {
		$('#createUser-close').click()
		$(this).addClass('active').siblings().removeClass('active')
		$('#J_searchTxt').val('')
		_role = 'benz';
		_key_ = '';
		_GetData()
	})
	$(document).on('click', '#J_option', function() {
		var contactVal = $('#contact').val();
		var contactArr = contactVal.split(';')
		$.each(contactArr, function(i,o) {
			$('#optionsBox').find('input[name="'+o+'"]').attr('checked', true);
		})
		$('#optionsBox').show();
	})

	$(document).on('click', '#contact_conf', function() {
		var contactArr = [];
		var $contact = $('#optionsBox').find('input[type="checkbox"]');
		$contact.each(function(i,o) {
			if($(o).is(':checked')) {
				contactArr.push($(o).prev().val())
			}
		})
		$('#contact').val(contactArr.join(';'))
		$('#optionsBox').hide();
	})

	$(document).on('click', '.edit-guo', function() {
		$('#overlay__').show();
		var txt = $(this).parents('tr:eq(0)').find('td');
		var html = '<div class="createUser-popup"><a href="javascript:;" class="btn-close" id="createUser-close" title="关闭">关闭</a><h3>新增国检账号</h3><div class="createUser-cont"><table><tbody><tr><td class="tit">用户名：</td><td class="con"><input type="text" class="user-text" name="username" value="'+ txt.eq(0).text() +'" placeholder="请输入用户名"><p class="msg"></p></td></tr><tr><td class="tit">姓名：</td><td class="con"><input type="text" class="user-text" name="name" value="'+ txt.eq(1).text() +'" placeholder="请输入姓名"><p class="msg"></p></td></tr><tr><td class="tit">部门：</td><td class="con"><input type="text" class="user-text" name="department" value="'+ txt.eq(4).text() +'" placeholder="请输入部门"><p class="msg"></p></td></tr><tr><td class="tit">手机号：</td><td class="con"><input type="text" class="user-text" name="phone" value="'+ txt.eq(2).text() +'" placeholder="请输入有效手机号"><p class="msg"></p></td></tr><tr><td class="tit">邮箱：</td><td class="con"><input type="text" class="user-text" name="email" value="'+ txt.eq(3).text() +'" placeholder="请输入有效邮箱"><p class="msg"></p></td></tr><tr><td colspan="2"><button class="btn-confirm" id="J_UpdateGuo" data-userid="'+ $(this).data('userid') +'" title="确定">确定</button></td></tr></tbody></table></div></div>';
		$('body').append(html)
	})

	$(document).on('click', '.edit-benz', function() {
		$('#overlay__').show();
		var txt = $(this).parents('tr:eq(0)').find('td');
		var html = '<div class="createUser-popup"><a href="javascript:;" class="btn-close" id="createUser-close" title="关闭">关闭</a><h3>新增国检账号</h3><div class="createUser-cont"><table><tbody><tr><td class="tit">用户名：</td><td class="con"><input type="text" class="user-text" name="username" value="'+ txt.eq(0).text() +'" placeholder="请输入用户名"><p class="msg"></p></td></tr><tr><td class="tit">姓名：</td><td class="con"><input type="text" class="user-text" name="name" value="'+ txt.eq(1).text() +'" placeholder="请输入姓名"><p class="msg"></p></td></tr><tr><td class="tit">关联国检账号：</td><td class="con"><input type="text" class="user-text" id="contact" disabled="disabled" name="department" value="'+ txt.eq(4).text() +'" placeholder="请选择关联账号"><div class="options" id="J_option"></div><p class="msg"></p><div class="contact" id="optionsBox"><div class="contact-pop"><ul></ul><a href="javascript:;" class="btn-confirm2" id="contact_conf" title="确定">确定</a></div></div></td></tr><tr><td class="tit">手机号：</td><td class="con"><input type="text" class="user-text" name="phone" value="'+ txt.eq(2).text() +'" placeholder="请输入有效手机号"><p class="msg"></p></td></tr><tr><td class="tit">邮箱：</td><td class="con"><input type="text" class="user-text" name="email" value="'+ txt.eq(3).text() +'" placeholder="请输入有效邮箱"><p class="msg"></p></td></tr><tr><td colspan="2"><button class="btn-confirm" id="J_UpdateQi" data-userid="'+ $(this).data('userid') +'" title="确定">确定</button></td></tr></tbody></table></div></div>';
		$('body').append(html)
		$.ajax({
			type : 'GET',
			url : urlPort.BureauGuoUserList,
			dataType : 'json',
			success : function(data) {
				$('#optionsBox').find('ul:eq(0)').empty()
				$.each(data.list, function(i, o) {
					$('#optionsBox').find('ul:eq(0)').append('<li><input type="hidden" name="H'+o[1]+'" value="'+o[1]+'"><input type="checkbox" name="'+o[1]+'" value=""><span>'+ o[1] +'</span></li>');
				})
			}
		})
	})

	$(document).on('click', '#J_UpdateGuo', function() {
		var obj = $('.createUser-cont').find('.user-text'),
			options = ['username','name','department','phone','email']
			data = {
				userId : $(this).data('userid'),
				username : obj.eq(0).val(),
				name : obj.eq(1).val(),
				department : obj.eq(2).val(),
				phone : obj.eq(3).val(),
				email : obj.eq(4).val()
			}

		$.ajax({
			type: "POST",
			url: urlPort.BureauUpdateGuoUser,
			data: data,
			cache: false,
			success: function(data) {
				if(data.code == 0) {
					$('#createUser-close').click()
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
							case 'department' :
								obj.eq(2).next('.msg').html(errors[n])
								break;
							case 'phone' :
								obj.eq(3).next('.msg').html(errors[n])
								break;
							case 'email' :
								obj.eq(4).next('.msg').html(errors[n])
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
	$(document).on('click', '#J_UpdateQi', function() {
		var obj = $('.createUser-cont').find('.user-text'),
			options = ['username','name','phone','email'],
			_relation = $('#contact').val().split(';'),
			data = {
				userId : $(this).data('userid'),
				user : {
					username : obj.eq(0).val(),
					name : obj.eq(1).val(),
					phone : obj.eq(3).val(),
					email : obj.eq(4).val()
				},
				relation : _relation
			}

		$.ajax({
			type: "POST",
			url: urlPort.BureauUpdateQiUser,
			data: data,
			cache: false,
			success: function(data) {
				if(data.code == 0) {
					$('#createUser-close').click()
					layer.msg('账号修改成功！')
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
							case 'phone' :
								obj.eq(3).next('.msg').html(errors[n])
								break;
							case 'email' :
								obj.eq(4).next('.msg').html(errors[n])
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