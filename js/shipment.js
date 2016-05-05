$(function() {
	/* 上传xls文件 */
	$('#J_update_xlsx').on('change', function() {
		var imgPath = $("#J_update_xlsx").val();
		if (imgPath == "") {
			alert("请选择上传图片！");
			return;
		}

		var data = new FormData()
		$.each($("#J_update_xlsx")[0].files, function(i, f) {
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
				//$('#updateSuc').show()
				$('#updateState').empty()
			},
			complete: function(XMLHttpRequest, textStatus) {
				//$('#updateSuc').show()
				//$('#updateState').append("上传成功！")
			},
			success: function(data) {
				$('#updateSuc').show()
				var _code = ['上传成功。','格式错误，请使用最新模板填写。','发货号不一致，请重新上传。','提单号不一致，请重新上传。','到厂日期不一致，请重新上传。']
				if(data.code == '0') {
					$('#updateState').prepend('<div class="clearfix update-suc"><p class="cont1">'+ data.name +'</p><span class="cont2">已上传</span></div>')
				}
				else {
					$('#updateState').prepend('<div class="clearfix update-err"><p class="cont">'+ _code[data.code] +'</p></div>')
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert("上传失败，请检查网络后重试");
			}
		});
	})

	/* 获取列表 */
	/*$.ajax({
		type: 'GET',
		url: 'http://120.26.50.11:8010/index.php?r=benz/shipment-list',
		data: {
			key : '',
			page : ''
		},
		success: function(data) {

			_result = Extend(data.list)
			$('#shipmentListTmpl').tmpl(_result).appendTo('#J_lists')
		}
	})*/

	var _bool = !0, _data = {};
	function getDataList(d) {
		var d = d || {};

		$.ajax({
			type: 'GET',
			url: 'http://120.26.50.11:8010/index.php?r=benz/shipment-list',
			dataType : 'json',
			data: d,
			success : function(data) {
				var _list = data.list, _len = _list.length, _result = [];

				if(_len > 0) {
					_result = Extend(data.list)
					if(_bool) {_bool=0;_pageTotal.init(data);}

					$('#J_count').html(data.pageCount)
					$('#J_lists').empty()
					$('#shipmentListTmpl').tmpl(_result).appendTo('#J_lists')
				} else {
					$('#J_count').html(data.pageCount)
					$("#J_pages").empty();
					$('#J_lists').html('<div style="text-align:center;">未查找到提单号</div>')
				}
			}
		});
	}
	getDataList()

	_pageTotal = {
		/* 初始化 */
		init : function(data) {
			this.current = data.page, 	//当前页
			this.pageCount = 10, 			//每页显示的数据量
			this.total = data.pageCount, 	//总共的页码
			this.first = 1, 				//首页
			this.last = 0, 				//尾页
			this.pre = 0, 					//上一页
			this.next = 0, 				//下一页
			this.getDate(1,0)
		},
		/* 设置页数 */
		getPages: function() {
			this.last = this.total;
			this.pre = this.current - 1 <= 0 ? 1 : (this.current - 1);
			this.next = this.current + 1 >= this.total ? this.total : (this.current + 1);
		},
		/* 获取数据 */
		getDate: function(n, t) {
			//清除content所有数据和元素
			$("#J_pages").empty();
			if (n == null) {
				n = 1;
			}
			//设置当前页
			this.current = n;
			_data.page = this.current;

			if(t) {
				getDataList(_data)
				// $('body,html').animate({scrollTop:0},200);
			}

			this.page(t);
		},
		page: function(t) {
			var t = 1, x = 4;

			$("#J_pages").empty();
			this.getPages();

			//设置上下页
			if(this.total > x) {
				var index = this.current <= Math.ceil(x / 2) ? 1 : (this.current) >= this.total - Math.ceil(x / 2) ? this.total - x : (this.current - Math.ceil(x / 2));

				var end = this.current <= Math.ceil(x / 2) ? (x + 1) : (this.current + Math.ceil(x / 2)) >= this.total ? this.total : (this.current + Math.ceil(x / 2));
			}
			else {
				var index = 1;

				var end = this.total;
			}
			if (this.current > 1) {
				$("#J_pages").append("<li><a href='javascript:pageTotal.getDate(" + (this.current - 1) + "," + t + ");' class='prev'>&lt;</a></li>");
			}

			for (var i = index; i <= end; i++) {
				if (i == this.current) {
					$("#J_pages").append("<li><a href='javascript:pageTotal.getDate(" + this.current + "," + t + ");' class='on'>" + i + "</a></li>");
				} else {
					$("#J_pages").append("<li><a href='javascript:pageTotal.getDate(" + i + "," + t + ");'>" + i + "</a></li>");
				}
			}

			if (end != this.total) {
				$("#J_pages").append("<li class='pt'><a href='javascript:;'>...</a></li>");
				$("#J_pages").append("<li><a href='javascript:pageTotal.getDate(" + this.total + "," + t + ");'>" + this.total + "</a></li>");
			}

			if (this.current < end) {
				$("#J_pages").append("<li><a href='javascript:pageTotal.getDate(" + (this.current + 1) + "," + t + ");' class='next'>&gt;</a></li>");
			}
		}
	};

	$('#J_searchBtn').on('click', function() {
		_data.key = $('#J_searchTxt').val();
		_data.page = 1;
		_bool = !0;

		getDataList(_data)
	})

	$('#J_searchTxt').on('keypress', function(e) {
		if(e.keyCode == 13) {
			_data.key = $('#J_searchTxt').val();
			_data.page = 1;
			_bool = !0;
			getDataList(_data)
		}
	});


	/* 确认隐藏 */
	$('.J_closeBtn').on('click', function() {
		$(this).parents('.popup').hide()
		window.location.reload();
	})


	window.pageTotal = _pageTotal;
})