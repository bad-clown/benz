$(function() {
	$('#benzMenu').find('li:eq(0)').addClass('active');
	/* 上传xls文件 */
	$('#J_upload_xlsx').on('change', function() {
		var xlsPath = $("#J_upload_xlsx").val();

		var data = new FormData()
		$.each($("#J_upload_xlsx")[0].files, function(i, f) {
			data.append('file', f)
		})

		//判断上传文件的后缀名
		var strExtension = xlsPath.substr(xlsPath.lastIndexOf('.') + 1);
		strExtension = strExtension.toLowerCase();
		if (strExtension != 'xlsx' && strExtension != 'xls') {
			layer.msg('请选择.xlsx,.xls文件');
			return;
		}

		$.ajax({
			type: "POST",
			url: urlPort.shipmentUpload,
			data: data,
			cache: false,
			contentType: false,
			processData: false,
			beforeSend: function() {
				//$('#uploadSuc').show()
				$('#uploadState').empty()
			},
			complete: function(XMLHttpRequest, textStatus) {
				//$('#uploadSuc').show()
				//$('#uploadState').append("上传成功！")
			},
			success: function(data) {
				$('#overlay__').show();
				$('#uploadSuc').show()
				var _code = ['上传成功。','格式错误，请使用最新模板填写。','发货号不一致，请重新上传。','提单号不一致，请重新上传。','到厂日期不一致，请重新上传。', '已有该提单号。']
				if(data.code == '0') {
					$('#uploadState').prepend('<div class="clearfix upload-suc"><p class="cont1">'+ data.name +'</p><span class="cont2">已上传</span></div>')
				}
				else {
					$('#uploadState').prepend('<div class="clearfix upload-err"><p class="cont">'+ _code[data.code] +'</p></div>')
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				layer.msg('上传失败，请检查网络后重试！');
			}
		});
	})

	$('#J_upload_xlsx').hover(function() {
		$('.btn-upload').eq(0).css({
			'background': 'url("/images/btn-upload-hover.png") no-repeat',
			'_background': 'url("/images/_btn-upload-hover.png") no-repeat'
		})
	}, function() {
		$('.btn-upload').eq(0).css({
			'background': 'url("/images/btn-upload.png") no-repeat',
			'_background': 'url("/images/_btn-upload.png") no-repeat'
		})
	})


	/* 确定删除 */
	$(document).on('click', '#J_confirmDel', function() {
		var delId = $(this).data('delid');
		$.ajax({
			type : "GET",
			url : urlPort.shipmentDel,
			data : {
				id : delId
			},
			success : function(data) {
				$('.delete-popup').remove();
				$('#overlay__').hide();
				_GetData()
			}
		})
	})

	/* 提单列表 */
	var _key_ = "";
	function _GetData(n, str) {
		var d = {
			key : _key_ || "",
			page : n || 1
		};

		$.ajax({
			type: 'GET',
			url: urlPort.shipment,
			dataType : 'json',
			data: d,
			success : function(data) {
				var _list = data.list, _len = _list.length, _result = [];

				if(_len > 0) {
					_result = Extend(data.list)
					PageTotal.init(data)

					$('#J_count').html(data.pageCount)
					$('#J_lists').empty()
					$('#shipmentListTmpl').tmpl(_result).appendTo('#J_lists')
				} else {
					$('#J_count').html(data.pageCount)
					$("#J_pages").empty();
					if(_key_ == '') {
						var c = '暂无物流信息';
					}
					else {
						var c = '找不到该提单号，请重新输入！';
					}
					$('#J_lists').html('<tr><td colspan="3" style="text-align:center;color:#ff7d26;">'+c+'</td></tr>')
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

	/* 确认隐藏 */
	$('.J_closeBtn').on('click', function() {
		$(this).parents('.popup').hide()
		$('#overlay__').hide();
		_GetData()
	})

	window._GetData = _GetData;
})