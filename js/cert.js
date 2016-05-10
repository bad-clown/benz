$(function() {
	$('#benzMenu').find('li:eq(1)').addClass('active');
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

				$('#file-text').val(data.name).data('url', data.url)
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert("上传失败，请检查网络后重试");
			}
		});
	})

	/* 证书上传 */
	$('#J_Upload').on('click', function() {
		// 检测为空
		for(var i=0; i<$('.cknull').length; i++) {
			if(!$('.cknull').eq(i).val()){
				alert('证书和零件不能为空！')
				return
			}
		}

		// data
		var certNo = $('.part-text').eq(0).val(),
			startDate = $('.part-text').eq(1).val(),
			endDate = $('.part-text').eq(2).val(),
			file =  $('.part-text').eq(3).data('url'),
			status = 0,
			pdfStatus = 0,
			dateStatus = 0,
			certImport = {
			cert: {
				certNo: certNo,
				startDate: startDate,
				endDate: endDate,
				file:  file
			},
			part: partList()
		};

		// 日期对比
		if(!duibiDate(startDate, endDate)) return;

		// 证书更新
		if($('#oldCertPDF').val() && $('#oldCertPDF').val() != file) {
			status = 1;
			pdfStatus = 1;
		}

		if(changeDate($('#oldEndDate').val(), endDate)) {
			status = changeDate($('#oldEndDate').val(), endDate);
			dateStatus = 1;
		}

		switch(status) {
			case 1 : 
				if(!dateStatus) {
					alert('PDF证书修改，请修改有效期！');
					return;
				}
				break;
			case 2 : 
				if(!pdfStatus) {
					alert('有效期修改，请重新上传PDF证书！');
					return;
				}
				break;
			case 3 : 
				alert('有效期必须晚于之前的有效期！');
				return;
		}

		$.ajax({
			type : "POST",
			url : urlPort.doCertImport,
			data : certImport,
			cache: false,
			//contentType: false,
			//processData: false,
			success : function(data) {

				if(data.code == "0") {
					// alert('成功！')
					window.location.href = 'http://120.26.50.11:8010/index.php?r=benz/cert'
				}
				console.log(data)
			}
		})

		// 获取零件信息
		function partList() {
			var $part = $('.partNo-text'),
				$name = $('.name-text'),
				aPart = [];

			if(!$part || !$name) {
				return []
			}
			else {
				$part.each(function(i, o) {
					if(i%2 == 0) {
						aPart.push({
							partNo: $part.eq(i).val(),
							partName: $name.eq(i).val()
						})
					}
				})

				return aPart
			}
		}
	})

	/* 证书检测存在 */
	$('#J_certNo').on('change', function() {
		$.ajax({
			type : 'GET',
			url : urlPort.certLatest,
			dataType : 'json',
			data : {
				certNo : $(this).val()
			},
			success : function(data) {
				var _d = data.data

				if(_d) {
					if(data.has) {
						$('#J_certNo').next('.msg').show().html('已有此证书，若需要更新请重新选择有效期和PDF文件');
						// $('.part-text').eq(0).val(_d.certNo),
						$('.part-text').eq(1).val(_d.startDate),
						$('.part-text').eq(2).val(_d.endDate),
						$('.part-text').eq(3).data('url', _d.file).val(_d.filename)
						$('#oldCertPDF').val(_d.file);
						$('#oldStartDate').val(_d.startDate);
						$('#oldEndDate').val(_d.endDate);
					}
					else{
						$('#J_certNo').next('.msg').hide().html('')
						$('.part-text').eq(1).val(''),
						$('.part-text').eq(2).val(''),
						$('.part-text').eq(3).data('url', '').val('')
						$('#oldCertPDF').val('');
						$('#oldStartDate').val('');
						$('#oldEndDate').val('');
					}
				}
			}
		})
	})

	/* 零件检测重复 */
	$(document).on('change', '.check_rep', function() {
		var _self = $(this)
		console.log(_self)
		$.ajax({
			type : 'GET',
			url : urlPort.hasPart,
			dataType : 'json',
			data : {
				partNo : $(this).val()
			},
			success : function(data) {
				console.log(data)

				if(data.has) {
					_self.next('p').remove();
					_self.after('<p class="tips">已有该零件号，请重新输入！</p>');
					$('#J_Upload').attr('disabled', 'disabled')
				}
				else {
					_self.next('p').remove();
					$('#J_Upload').removeAttr('disabled')
				}
			}
		})
	})

	/* 添加零件 */
	$('#J_part_add').on('click', function() {
		$('#part-list').append('<tr><td class="tit">&lowast;零件号：</td><td class="con"><input type="text" class="partNo-text check_rep cknull" name="" value="" placeholder="请输入零件号"></td><td class="tit">&lowast;中文名：</td><td class="con"><input type="text" class="name-text cknull" name="" value="" placeholder="请输入中文名"></td><td><a href="javascript:;" class="btn-del part-del" title="删除">删除</a></td></tr>');
	})
	/* 删除零件 */
	$(document).on('click', '.part-del', function() {
		$(this).parents('tr').remove();
	})

	/* 零件列表数据 */
	var _key_ = "", _status = 0;
	function _GetData(n) {
		var d = {
			key : _key_ || "",
			status : _status || 0,
			page : n || 1
		};

		$.ajax({
			type: 'GET',
			url: urlPort.certList,
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

	/* 全部 */
	$('#cert-all').on('click', function() {
		$(this).siblings().removeClass('active').end().addClass('active')
		_status = 0;
		_GetData()
	})
	/* 将过期 */
	$('#cert-soon').on('click', function() {
		$(this).siblings().removeClass('active').end().addClass('active')
		_status = 1;
		_GetData()
	})
	/* 已过期 */
	$('#cert-over').on('click', function() {
		$(this).siblings().removeClass('active').end().addClass('active')
		_status = 2;
		_GetData()
	})

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

	/* 关闭更新弹窗 */
	$('#update-close').on('click', function() {
		$('#__calendarPanel').css('visibility', 'hidden');
		$('#J_certNo').next('.msg').hide().html('');
		$('.partNo-text').val('')
		$('.name-text').val('')
		$('.part-text').val('')

		$(this).parents('.popup').hide();
	})
	/* 打开更新弹窗 */
	$(document).on('click', '.J_edit', function() {
		var $parent = $(this).parents('tr');
		var part = $.trim($parent.find('td:eq(0)').html());
		var name = $.trim($parent.find('td:eq(1)').html());
		var cert = $.trim($parent.find('td:eq(2)').html());

		$('#J_certNo').next('.msg').hide().html('');
		$('.partNo-text').val('')
		$('.name-text').val('')
		$('.part-text').val('')

		if(cert != '暂无证书') {
			$('.part-text').eq(0).val(cert).change();
		}
		$('.partNo-text').eq(0).val(part)
		$('.name-text').eq(0).val(name)
		$('.update-popup').eq(0).show();
	})

	window._GetData = _GetData;
})