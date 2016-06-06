$(function() {
	$('#benzMenu').find('li:eq(1)').addClass('active');
	/* 上传pdf文件 */
	$('#J_upload_pdf').on('change', function() {
		var pdfPath = $("#J_upload_pdf").val();
		var data = new FormData()
		$.each($("#J_upload_pdf")[0].files, function(i, f) {
			data.append('file', f)
		})

		//判断上传文件的后缀名
		var strExtension = pdfPath.substr(pdfPath.lastIndexOf('.') + 1);
		strExtension = strExtension.toLowerCase();
		if (strExtension != 'pdf') {
			layer.msg('请选择.pdf文件');
			// alert("请选择.pdf文件");
			return;
		}

		$.ajax({
			type: "POST",
			url: urlPort.uploadCert,
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
				layer.msg('上传成功！');
				// alert('上传成功！')

				$('#file-text').val(data.name).data('url', data.url)
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				layer.msg('上传失败，请检查网络后重试!');
				// alert("上传失败，请检查网络后重试");
			}
		});
	})

	/* 证书上传 */
	$('#J_Upload').on('click', function() {
		// 检测为空
		if(!$('.checkCertNo').eq(0).val()) {
			layer.msg('证书号不能为空！');
			return
		}
		else if(!$('.checkTime1').eq(0).val() || !$('.checkTime2').eq(0).val()) {
			layer.msg('没有选择时间！');
			return
		}
		else if(!$('.checkPDF').eq(0).val()) {
			layer.msg('没有上传PDF文件！');
			return
		}
		else {
			for(var i=0; i<$('.checkPartNo').length; i++) {
				if(!$('.checkPartNo').eq(i).val()){
					layer.msg('零件号不能为空！');
					return
				}
			}
			for(var n=0; n<$('.checkName').length; n++) {
				if(!$('.checkName').eq(n).val()){
					layer.msg('中文名不能为空！');
					return
				}
			}
		}

		for(var m=0; m<$('.checkPartNo').length; m++) {
			for(var n=m+1; n<$('.checkPartNo').length; n++) {
				if($('.checkPartNo').eq(m).val() == $('.checkPartNo').eq(n).val()){
					layer.msg('零件号重复，请重新填写！');
					return
				}
			}
		}

		// data
		var certNo = $('.part-text').eq(0).val(),
			startDate = $('.part-text').eq(1).val(),
			endDate = $('.part-text').eq(2).val(),
			file =  $('.part-text').eq(3).data('url'),
			pdfStatus = 0,
			dateStatus = 0,
			startStatus = 0,
			endStatus = 0,
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
		if(!duibiDate(startDate, endDate)) {
			layer.msg('开始时间晚于结束时间，请检查！');
			return;
		}

		// 证书更新
		if(certNoB) {
			if($('#oldCertPDF').val() && $('#oldCertPDF').val() != file) {
				pdfStatus = 1;
			}

			if(changeDate($('#oldStartDate').val(), startDate)) {
				startStatus = changeDate($('#oldStartDate').val(), startDate);
				dateStatus = 1;
				console.log(startStatus+' //// ' + dateStatus)
			}
			if(changeDate($('#oldEndDate').val(), endDate)) {
				endStatus = changeDate($('#oldEndDate').val(), endDate);
				dateStatus = 1;
				console.log(endStatus+' //// ' + dateStatus)
			}

			if(pdfStatus) {
				if(!dateStatus) {
					layer.msg('您已上传新PDF证书，请修改有效期！');
					return;
				}
			}
			if(startStatus == 1 || endStatus == 1) {
				if(!pdfStatus) {
					layer.msg('您已修改有效期，请重新上传PDF证书！');
					return;
				}
			}
			else if(startStatus == 2 || endStatus == 2) {
				layer.msg('有效期必须晚于之前的有效期！');
				return;
			}
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
					window.location.href = $_Path+'index.php?r=benz/cert';
				}
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

	var certNoB = false;
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
						certNoB = true;
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
						certNoB = false;
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
		$.ajax({
			type : 'GET',
			url : urlPort.hasPart,
			dataType : 'json',
			data : {
				partNo : $(this).val()
			},
			success : function(data) {

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
		$('#part-list').append('<tr><td class="tit">&lowast;零件号：</td><td class="con"><input type="text" class="partNo-text check_rep checkPartNo" name="" value="" placeholder="请输入零件号"></td><td class="tit">&lowast;中文名：</td><td class="con"><input type="text" class="name-text checkName" name="" value="" placeholder="请输入中文名"></td><td><a href="javascript:;" class="btn-del part-del" title="删除">删除</a></td></tr>');
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
					if(_key_ == "") {
						var c = '暂无零件信息';
					}
					else {
						var c = '找不到相关零件，请重新输入！';
					}
					$('#J_lists').html('<tr><td colspan="6" style="text-align:center;color:#ff7d26;">'+c+'</td></tr>')
				}
			}
		});
	}

	/* 全部 */
	$('#cert-all').on('click', function() {
		$(this).siblings().removeClass('active').end().addClass('active')
		_key_ = $('#J_searchTxt').val();
		_status = 0;
		_GetData()
	})
	/* 将过期 */
	$('#cert-soon').on('click', function() {
		$(this).siblings().removeClass('active').end().addClass('active')
		_key_ = '';
		_status = 1;
		_GetData()
	})
	/* 已过期 */
	$('#cert-over').on('click', function() {
		$(this).siblings().removeClass('active').end().addClass('active')
		_key_ = '';
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
		$('#overlay__').hide();
	})
	/* 打开更新弹窗 */
	$(document).on('click', '.J_edit', function() {
		var $parent = $(this).parents('tr');
		var part = $.trim($parent.find('td:eq(0)').text());
		var name = $.trim($parent.find('td:eq(1)').text());
		var cert = $.trim($parent.find('td:eq(2)').text());

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

		$('#overlay__').show();
	})

	var start = {
	    elem: '#StartDate',
	    istoday: false,
	    choose: function(datas){
	         end.min = datas; //开始日选好后，重置结束日的最小日期
	         end.start = datas //将结束日的初始值设定为开始日
	    }
	};
	var end = {
	    elem: '#EndDate',
	    istoday: false,
	    choose: function(datas){
	        start.max = datas; //结束日选好后，重置开始日的最大日期
	    }
	};
	laydate(start);
	laydate(end);

	window._GetData = _GetData;
})