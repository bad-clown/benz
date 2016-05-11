$(function() {
	$('#benzMenu').find('li:eq(1)').addClass('active');

	/* 证书列表 */
	function _GetData(n) {
		var d = {
			partId : $partId || '',
			page : n || 1
		};

		$.ajax({
			type: 'GET',
			url: urlPort.partCertList,
			dataType : 'json',
			data: d,
			success : function(data) {
				var _list = data.list, _len = _list.length, _result = [];

				if(_len > 0) {
					_result = Extend(data.list)
					PageTotal.init(data)

					$('#J_count').html(data.pageCount)
					$('#J_lists').empty()
					$('#certListTmpl').tmpl(_result).appendTo('#J_lists')
				} else {
					$('#J_count').html(data.pageCount)
					$("#J_pages").empty();
					$('#J_lists').html('<tr><td style="text-align:center;color:#ff7d26;">找不到相关证书！</td></tr>')
				}
			}
		});
	}

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

	window._GetData = _GetData;
})