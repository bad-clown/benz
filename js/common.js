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