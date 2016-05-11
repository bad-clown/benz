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
					$('#J_lists').html('<tr><td style="text-align:center;color:#ff7d26;padding:20px 0;">找不到相关证书！</td></tr>')
				}
			}
		});
	}
	_GetData()

	/* 确定删除 */
	$(document).on('click', '#J_confirmDel', function() {
		var delId = $(this).data('delid');
		$.ajax({
			type : "GET",
			url : urlPort.partCertDel,
			data : {
				id : delId
			},
			success : function(data) {
				$('.delete-popup').remove();
				_GetData()
			}
		})
	})

	window._GetData = _GetData;
})