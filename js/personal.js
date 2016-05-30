$(function() {
	$(document).on('click', '#J_AlterUser', function() {
		$(this).after('<a href="javascript:;" class="btns btn-submit" id="J_SubmitUser" title="提交">提交</a><a href="javascript:;" class="btns btn-cancel" id="J_CancelUser" title="取消">取消</a>');
		$(this).remove();
		$('#userInfo').addClass('user-text-change');

		$('.user-text').each(function(i, o) {
			$(o).data('val', $(o).val());
			$(o).removeAttr('disabled');

			if($(o).data('mold') == 'read') {
				$(o).val("")
				$(o).data('mold', 'unread')
			}
		})
	})

	$(document).on('click', '#J_CancelUser', function() {
		$('.msg').html('')
		$(this).after('<a href="javascript:;" id="J_AlterUser" class="btns btn-alter" title="修改">修改</a>');
		$('#J_SubmitUser,#J_CancelUser').remove();
		$('#userInfo').removeClass('user-text-change');

		$('.user-text').each(function(i, o) {
			$(o).attr('disabled','disabled');

			if($(o).val() == '') {
				// $(o).val($(o).data('val'));
				$(o).val('暂无！');
				if($(o).data('mold') == 'unread') {
					$(o).val($(o).data('val'));
					$(o).data('mold', 'read')
				}
			}
		})
	})

	$(document).on('click', '#J_AlterPwd', function() {
		$('.new-pwd').show()
		$(this).after('<a href="javascript:;" class="btns btn-submit" id="J_SubmitPwd" title="提交">提交</a><a href="javascript:;" class="btns btn-cancel" id="J_CancelPwd" title="取消">取消</a>');
		$(this).remove();
		$('#pwdInfo').addClass('user-text-change');
		$('.pwd-text').each(function(i, o) {
			$(o).removeAttr('disabled');
			$(o).val('')
		})
	})

	$(document).on('click', '#J_CancelPwd', function() {
		$('.new-pwd').hide()
		$(this).after('<a href="javascript:;" id="J_AlterPwd" class="btns btn-alter" title="修改">修改</a>');
		$('#J_SubmitPwd,#J_CancelPwd').remove();
		$('#pwdInfo').removeClass('user-text-change');
		$('.pwd-text').each(function(i, o) {
			$(o).attr('disabled','disabled');
			$(o).val('******')
		})
	})

	$(document).on('click', '#J_SubmitUser', function() {
		var obj = $('#userInfo').find('.user-text'),
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
			url: urlPort.modifyPersonal,
			data: data,
			cache: false,
			success: function(data) {
				if(data.code == 0) {
					layer.msg('个人信息修改成功！')
					$('#J_CancelUser').click()
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
	$(document).on('click', '#J_SubmitPwd', function() {
		var obj = $('#pwdInfo').find('.pwd-text'),
			options = ['current_password','password']
			data = {
				current_password : obj.eq(0).val(),
				password : obj.eq(1).val()
			}
		if(obj.eq(1).val().length < 6) {
			layer.msg('新密码不能少于6位数');
			obj.eq(1).focus();
			return;
		}

		if(obj.eq(1).val() != obj.eq(2).val()) {
			layer.msg('新密码不一致，请重新输入');
			obj.eq(2).focus();
			return;
		}

		$.ajax({
			type: "POST",
			url: urlPort.changePwd,
			data: data,
			cache: false,
			success: function(data) {
				if(data.code == 0) {
					layer.msg('密码修改成功！')
					$('#J_CancelPwd').click()
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
						}
					}
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				layer.msg('添加失败，请检查网络后重试！')
			}
		});
	})

})