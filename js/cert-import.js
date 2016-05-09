$(function() {
	/* 上传pdf文件 */
	$('#J_upload_pdf').on('change', function() {
		var imgPath = $("#J_upload_pdf").val();
		var data = new FormData()
		$.each($("#J_upload_pdf")[0].files, function(i, f) {
			data.append('file', f)
		})

		//判断上传文件的后缀名
		var strExtension = imgPath.substr(imgPath.lastIndexOf('.') + 1);
		strExtension = strExtension.toLowerCase();
		if (strExtension != 'pdf') {
			alert("请选择.pdf文件");
			return;
		}

		$.ajax({
			type: "POST",
			url: "http://120.26.50.11:8010/index.php?r=benz/upload-cert",
			data: data,
			cache: false,
			contentType: false,
			processData: false,
			beforeSend: function() {
				//$('#uploadSuc').show()
				$('#file-text').empty()
			},
			complete: function(XMLHttpRequest, textStatus) {
				//$('#uploadSuc').show()
				//$('#uploadState').append("上传成功！")
			},
			success: function(data) {
				alert('上传成功！')

				$('#file-text').val(data.name)
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert("上传失败，请检查网络后重试");
			}
		});
	})


	$('#J_certNo').on('change', function() {
		$.ajax({
			type : 'GET',
			url : urlPort.certlatest,
			dataType : 'json',
			data : {
				certNo : $(this).val()
			},
			success : function(data) {
				console.log(data)

				if(data.data) {

					if(data.has) {
						$('#J_certNo').next('.msg').show().html('已有此证书，若需要更新请重新选择有效期和PDF文件');
					}
					else{
						$('#J_certNo').next('.msg').hide().html('')
					}

					// console.log(data.data)
				}

			}
		})
	})

	$(document).on('change', '.check_rep', function() {
		$.ajax({
			type : 'GET',
			url : urlPort.haspart,
			dataType : 'json',
			data : {
				partNo : $(this).val()
			},
			success : function(data) {
				console.log(data)

				if(data.data) {

					if(data.has) {
						$('#J_certNo').after('<p class="msg">已有该零件号，请重新输入！</p>');

					}

					// console.log(data.data)
				}

			}
		})
	})

	$('#J_part_add').on('click', function() {
		$('#part-list').append('<tr><td class="tit">&lowast;零件号：</td><td class="con"><input type="text" class="part-text check_rep" name="" value="" placeholder="请输入零件号"></td><td class="tit">&lowast;中文名：</td><td class="con"><input type="text" class="part-text" name="" value="" placeholder="请输入中文名"></td><td><a href="javascript:;" class="btn-del part-del" title="删除">删除</a></td></tr>');
	})


	$(document).on('click', '.part-del', function() {
		$(this).parents('tr').remove();
	})

})