// $(function(){
var html = document.documentElement;
var hWidth = html.getBoundingClientRect().width;
html.style.fontSize = hWidth / 15 + "px";
// });


const site = 'http://22s89e0367.imwork.net:42648/hscm-web-user-h5/hscm-web-h5/platform/'
var url = 'http://22s89e0367.imwork.net:30299/hscm-access-user';
const img = '1';



(function () {
	var common = {
		getCookie: function (cname) {
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1);
				if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
			}
			return "";
		},
		setCookie: function (cname, cvalue, exdays) {
			var d = new Date();
			d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
			var expires = "expires=" + d.toUTCString();
			console.info(cname + "=" + cvalue + "; " + expires);
			document.cookie = cname + "=" + cvalue + "; " + expires;
			console.info(document.cookie);
		},
		clearCookie: function () {
			this.setCookie("username", "", -1);
		},
		//公用地址
		getWebUrl: function (urlName) {
			return "http://192.168.10.202:8082/hscm-access-user" + urlName;
			// http://61.144.241.236:11091/hscm-access-user    http://192.168.10.202:8082/hscm-access-user  http://gyh5.abroot.com/sqapi/hscm-access-user
		},
		//设置ajax
		ajax: function (url, data, callback) {
			url = common.getWebUrl(url);
			$.ajax({
				url: url,
				type: 'post',
				async: true,
				data: data,
				dataType: 'json',
				//					jsonp:'jsonCallback',
				//	        	    jsonpCallback:"jsonCallback_success",
				success: function (res) {
					callback(res);
					if (res.ssoLoginUrl != null) {
						window.location.href = res.ssoLoginUrl;
					}
				},
				error: function () {
					alert('网络异常');
					return false
				}
			})
		},
	};
	window.common = common;
})();