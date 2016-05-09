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

	var _key_ = "", _status = 0;
	function _GetData(n) {
		var d = {
			key : _key_ || "",
			status : _status || 0,
			page : n || 1
		};

		$.ajax({
			type: 'GET',
			url: urlPort.certlist,
			dataType : 'json',
			data: d,
			success : function(data) {
				var _list = data.list, _len = _list.length, _result = [];

				if(_len > 0) {
					_result = Extend(data.list)
					PageTotal.init(data)

					if(_status != 0) {
						$('.cert-top').eq(0).hide();
					}else {
						$('.cert-top').eq(0).show();
					}

					$('#J_count').html(data.pageCount)
					$('#J_lists').empty()
					$('#certListTmpl').tmpl(_result).appendTo('#J_lists')
				} else {
					$('#J_count').html(data.pageCount)
					$("#J_pages").empty();
					$('#J_lists').html('<tr><td colspan="6" style="text-align:center;color:#ff7d26;">找不到相关零件，请重新输入！</td></tr>')
				}
			}
		});
	}
	_GetData()

	$('#cert-all').on('click', function() {
		$(this).siblings().removeClass('active').end().addClass('active')
		_status = 0;
		_GetData()
	})
	$('#cert-soon').on('click', function() {
		$(this).siblings().removeClass('active').end().addClass('active')
		_status = 1;
		_GetData()
	})
	$('#cert-over').on('click', function() {
		$(this).siblings().removeClass('active').end().addClass('active')
		_status = 2;
		_GetData()
	})
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

	$('.close-all').on('click', function() {
		$(this).parents('.popup').hide();
	})

	/* 更新零件信息弹窗 */
	$(document).on('click', '.J_edit', function() {
		$('.update-popup').eq(0).show();
	})

	window._GetData = _GetData;
})