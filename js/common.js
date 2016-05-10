function Digit(n) {
	return n < 10 ? "0"+n : n;
}

function FormatTime(n) {
	var nS= new Date(parseInt(n) * 1000),
		year=Digit(nS.getFullYear()),
		month=Digit(nS.getMonth()+1),
		date=Digit(nS.getDate()),
		hour=Digit(nS.getHours()),
		minute=Digit(nS.getMinutes());
	return year+"-"+month+"-"+date+" "+hour+":"+minute;
}

function Extend(a) {
	var b = [];
	b = $.extend(true, b, a);
	$.each(b, function(i, o) {
		for(var n in o) {
			switch (n) {
				case 'uploadTime' :
					o['uploadTime'] = FormatTime(o['uploadTime']);
					break;
			}
		}
	})
	return b
}

function duibiDate(a, b) {
	var arr = a.split("-");
	var starttime = new Date(arr[0], arr[1], arr[2]);
	var starttimes = starttime.getTime();

	var arrs = b.split("-");
	var lktime = new Date(arrs[0], arrs[1], arrs[2]);
	var lktimes = lktime.getTime();

	if (starttimes >= lktimes) {
		alert('开始时间晚于结束时间，请检查！');
		return false;
	} else {
		return true;
	}
}

function changeDate(a, b) {
	var arr = a.split("-");
	var starttime = new Date(arr[0], arr[1], arr[2]);
	var starttimes = starttime.getTime();

	var arrs = b.split("-");
	var lktime = new Date(arrs[0], arrs[1], arrs[2]);
	var lktimes = lktime.getTime();

	if (starttimes > lktimes) {
		//alert('有效期必须晚于之前的有效期！');
		return 3;
	} else if (starttimes < lktimes) {
		//alert('有效期修改，请重新上传PDF证书！');
		return 2;
	} else {
		return 0;
	}
}

var PageTotal = {
	/* 初始化 */
	init : function(d) {
		this.current = d.page, 		//当前页
		this.pageCount = 10, 		//每页显示的数据量
		this.total = d.pageCount, 	//总共的页码
		this.first = 1, 			//首页
		this.last = 0, 				//尾页
		this.pre = 0, 				//上一页
		this.next = 0, 				//下一页
		this.getData(this.current, this.total)
	},
	/* 获取数据 */
	getData: function(n, t) {
		//清除content所有数据和元素
		$("#J_pages").empty();
		if (n == null) {
			n = 1;
		}
		//设置当前页
		this.current = n;

		this.page();
	},
	/* 设置页数 */
	getPages: function() {
		this.last = this.total;
		this.pre = this.current - 1 <= 0 ? 1 : (this.current - 1);
		this.next = this.current + 1 >= this.total ? this.total : (this.current + 1);
	},
	page: function() {
		$("#J_pages").empty();

		var x = 4;

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
			$("#J_pages").append("<li><a href='javascript:_GetData(" + (this.current - 1) + ");' class='prev'>&lt;</a></li>");
		}

		for (var i = index; i <= end; i++) {
			if (i == this.current) {
				$("#J_pages").append("<li><a href='javascript:_GetData(" + this.current + ");' class='on'>" + i + "</a></li>");
			} else {
				$("#J_pages").append("<li><a href='javascript:_GetData(" + i + ");'>" + i + "</a></li>");
			}
		}

		if (end != this.total) {
			$("#J_pages").append("<li class='pt'><a href='javascript:;'>...</a></li>");
			$("#J_pages").append("<li><a href='javascript:_GetData(" + this.total + ");'>" + this.total + "</a></li>");
		}

		if (this.current < end) {
			$("#J_pages").append("<li><a href='javascript:_GetData(" + (this.current + 1) + ");' class='next'>&gt;</a></li>");
		}
	}
};