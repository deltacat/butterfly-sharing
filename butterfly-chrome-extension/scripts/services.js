﻿function buildShareUrl(service, data)
{
	var url = "";
	
	switch(service)
	{
		// Inside wall 
		case "douban":
			url = "http://www.douban.com/recommend/?url=" + encodeURIComponent(data.shortUrl) + "&title=" + encodeURIComponent(data.title);
			break;
		case "renren":
			url = "http://share.renren.com/share/buttonshare.do?link=" + encodeURIComponent(data.shortUrl) + "&title=" + encodeURIComponent(data.title);
			break;
		case "kaixin":
			url = "http://www.kaixin001.com/repaste/share.php?rurl=" + encodeURIComponent(data.shortUrl) + "&rcontent=" + encodeURIComponent(data.title) + "&rtitle=" + encodeURIComponent(data.title);
			break;
		case "sina":
			url = "http://v.t.sina.com.cn/share/share.php?url=" + encodeURIComponent(data.shortUrl) + "&title=" + encodeURIComponent(data.title); 
			break;
		case "baidu":
			url = "http://cang.baidu.com/do/add?it=" + encodeURIComponent(data.title) + "&iu=" + encodeURIComponent(data.shortUrl); 
			break;
		case "gmail":
			var content = "mailto:?";
			content += "subject=" + data.title + "&";
			content += "body=" + data.shortUrl;
			url = "https://mail.google.com/mail/?extsrc=mailto&url=" + encodeURIComponent(content);
			break;
		case "mail":
			var action_url = "mailto:?";
			action_url += "subject=" + encodeURIComponent(data.title) + "&";
			action_url += "body=" + encodeURIComponent(data.shortUrl);
		 
			chrome.tabs.update(data.id, { url: action_url });
			break; 
			
		// outside wall
		case "blogger":
			url = "http://www.blogger.com/blog_this.pyra?t=&u=" + encodeURIComponent(data.shortUrl) + "&n=" + encodeURIComponent(data.title); 
			break;		
		case "facebook":
			url = "http://www.facebook.com/share.php?u=" + encodeURIComponent(data.shortUrl); 
			break;		
		case "delicious":
			url = "http://delicious.com/save?url=" + encodeURIComponent(data.shortUrl);
			break; 
		case "digg":
			url = "http://digg.com/submit?phase=2&url=" + encodeURIComponent(data.shortUrl); 
			break;
		case "myspace":
			url = "http://www.myspace.com/Modules/PostTo/Pages/?u=" + encodeURIComponent(data.shortUrl) + "&t=" + encodeURIComponent(data.title);
			break; 
		case "twitter":
			url = "http://twitter.com/home?status=" + encodeURIComponent(data.title + ": " + data.shortUrl);
			break; 
	}
	
	return url;
}
