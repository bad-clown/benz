$(function() {
	$('#benzMenu').find('li:eq(0)').addClass('active');
	/* 上传xls文件 */
	$('#J_upload_xlsx').on('change', function() {
		var imgPath = $("#J_upload_xlsx").val();
		if (imgPath == "") {
			alert("请选择上传图片！");
			return;
		}

		var data = new FormData()
		$.each($("#J_upload_xlsx")[0].files, function(i, f) {
			data.append('file', f)
		})

		//判断上传文件的后缀名
		var strExtension = imgPath.substr(imgPath.lastIndexOf('.') + 1);
		strExtension = strExtension.toLowerCase();
		if (strExtension != 'xlsx' && strExtension != 'xls') {
			alert("请选择.xlsx,.xls文件");
			return;
		}

		$.ajax({
			type: "POST",
			url: "http://120.26.50.11:8010/index.php?r=benz/shipment-upload",
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
				$('#uploadSuc').show()
				var _code = ['上传成功。','格式错误，请使用最新模板填写。','发货号不一致，请重新上传。','提单号不一致，请重新上传。','到厂日期不一致，请重新上传。']
				if(data.code == '0') {
					$('#uploadState').prepend('<div class="clearfix upload-suc"><p class="cont1">'+ data.name +'</p><span class="cont2">已上传</span></div>')
				}
				else {
					$('#uploadState').prepend('<div class="clearfix upload-err"><p class="cont">'+ _code[data.code] +'</p></div>')
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert("上传失败，请检查网络后重试");
			}
		});
	})

	/* 删除 */
	$(document).on('click', '.btn-delete', function() {
		var delHTML = '<div class="delete-popup popup"><h3>删除确认</h3><div class="msg">确定要删除吗？</div><div class="btn-control clearfix"><a href="javascript:;" class="btn1 J_del" title="确定">确定</a><a href="javascript:;" class="btn2 J_closeDel" title="取消">取消</a></div></div>';
		var delId = $(this).data('delid');

		$('body').append(delHTML);

		$(document).on('click', '.J_del', function() {
			$.ajax({
				type : "GET",
				url : urlPort.shipmentDel,
				data : {
					id : delId
				},
				success : function(data) {
					$('.delete-popup').remove();
					_GetData()
				}
			})
		})

		$(document).on('click', '.J_closeDel', function() {
			$('.delete-popup').remove();
		})
	})

	/* 提单列表 */
	var _key_ = "";
	function _GetData(n) {
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
					$('#J_lists').html('<tr><td colspan="3" style="text-align:center;color:#ff7d26;">找不到该提单号，请重新输入！</td></tr>')
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
		_GetData()
	})

	window._GetData = _GetData;
})