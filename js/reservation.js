$(function() {
	/* 预约列表 */
	var _key_ = "";
	function _GetData(n) {
		var d = {
			key : _key_ || "",
			page : n || 1
		};

		$.ajax({
			type: 'GET',
			url: reservationUrl,
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
						var c = '暂无预约信息';
					}
					else {
						var c = '查询不到相关提单号，请重新输入！';
					}
					$('#J_lists').html('<tr><td colspan="4" style="text-align:center;color:#ff7d26;">'+c+'</td></tr>')
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

	window._GetData = _GetData;
})