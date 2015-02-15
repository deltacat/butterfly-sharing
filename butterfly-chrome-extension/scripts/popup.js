var g_preferences = new Preferences;
var g_data;

function addServices()
{		
	var hasButton = false;
	
	if(g_preferences.services != undefined)
	{
		var hasButton = false;
		var $divShare = $('#divShare');
		if(null == $divShare)
			return false;
		
		// create services button
		for (var service in g_preferences.services)
		{		
			if(g_preferences.services[service])
			{
				$divShare.append(createServiceIcon(service));
				hasButton = true;
				console.log("adding " + service);
				
				// binding event for each service icon
				var btnid = "#btn" + service;
				console.log("binding " + btnid);
				$(btnid).click({service: service}, function(e){
					console.log(e.data);
					openShareWindow(e.data.service);
				});
			}
		}
		
		/*　disable copy functions for a while
 		// create copy button
		if(!g_preferences.parameters.auto_copy)
		{
			var temp = '<a href="#" class="ui-button button-share button-share-plain"';
			
			if(g_preferences.parameters.show_icon)
				temp += ' title="拷贝到剪贴板"><img class="icon-share" src="icons/copy.png">';
			else
				temp += '>拷贝到剪贴板';
			
			temp += '</a>';
			
			$divShare.append(temp);
			hasButton = true;
		}
		*/
		
		if(hasButton)
		{
			$divShare.show();
		}
		else
		{
			$divShare.hide();
		}
		
	}
	
	return hasButton;
}

function addServicesAdv()
{
	var $divShareAdv = $('#divShareAdv');
	if(null == $divShareAdv)
		return false;
		
	if(g_preferences.twitter.enabled)
	{
		var temp = '<a class="ui-button ui-state-default button-share-advance"';
		temp += ' id="btnTwitter" href="javascript:pushTwt();">';
		temp += '<img src="icons/twitter.png"> 一键发送</a>';
		$divShareAdv.append(temp);
		$divShareAdv.show();
		return true;
	}
	else
	{
		$divShareAdv.hide();
		return false;
	}
}

function openShareWindow(service)
{
	if(service == undefined)
		return;
	
	console.log("open share window for " + service);
	
	var url = buildShareUrl(service, g_data);
	window.open(url,'butterfly_'+service,'toolbar=0,resizable=1,scrollbars=yes,status=1,width=600,height=400');
}

function makeBasicAuth(user, password) 
{
  var tok = user + ':' + password;
  var hash = Base64.encode(tok);
  return "Basic " + hash;
} 

function pushTwt()
{
	var twitter = g_preferences.twitter;
	if(twitter == undefined || twitter == null)
		return;
		
	$("#divShareAdv").hide();
	var $divStatus = $('#divStatus');
	$divStatus.html("发送中……");
	var response;

	// workaround: strange problem, if url include "http://" , API will return 403.
	var content = g_data.txtContent;
	content = content.replace("http://", "");

	var	xmlhttp = new XMLHttpRequest();
	var updateUri = twitter.API + "/statuses/update.json?status=" + encodeURIComponent(content);
	xmlhttp.open("POST", updateUri, true);
	var auth = makeBasicAuth(twitter.username, twitter.password);
	xmlhttp.setRequestHeader('Authorization', auth);
	xmlhttp.onload = function()
	{
		if(xmlhttp.status == 200)
		{
			var object = JSON.parse(xmlhttp.responseText);
			
			if(object["id"] == undefined)
			{
				response = {status: "error", message: object["error"]};
				$divStatus.html(response.message);
			}
			else	
			{
				response = {status: "success", message: "success"};
				$divStatus.html("发送成功！");
			}
		}
		else
		{
			response = {status: "error", message: "server error!"};
			$divStatus.html("发送失败！ 服务器错误。");
		}
	}
	xmlhttp.send(null);
 
	return response;	
}

function createServiceIcon(service)
{
	var iconHtml = "";
		
	iconHtml += '<a class="ui-button button-share button-share-plain" ';
	iconHtml += 'id="btn'+ service + '" ';		
		
	if(g_preferences.parameters.show_icon)
		iconHtml += ' title="'+g_preferences.serviceNames[service]+'"><img class="icon-share" src="icons/' + service + '.png">';
	else
		iconHtml += ">" + g_preferences.serviceNames[service];
	
	iconHtml += '</a>';		
	
	return iconHtml;
}
 
function initData(tab)
{
	g_data = 
	{
		id : tab.id,
		url : tab.url,
		title : tab.title,
		shortUrl : "",
		txtContent : ""
	}
}

function sendShortenRequestToBackground(){
	
	chrome.tabs.getSelected(null, function(tab) {
		initData(tab);
		chrome.extension.sendMessage({type: REQUEST_SHORTEN, url: g_data.url}, function(response)
		{				
			if(response.status == "error")
			{
				$('#divLoading').text(response.message);
			}
			else
			{
				g_data.shortUrl = response.message;
				if(g_preferences.parameters.include_title)
					g_data.txtContent = g_data.title + ": " + g_data.shortUrl;
				else
					g_data.txtContent = g_data.shortUrl;
				
				$('#txtContent').append(g_data.txtContent);
				
				// show qrcode
				if(g_preferences.parameters.show_qrcode)
					$('#qrcode').qrcode({width: 128, height: 128, text: g_data.shortUrl});
				else
					$('#qrcode').hide();
				
				// Adding share buttons
				var hasButton = addServices();
				if(hasButton)
				{
					$(".button-share").hover(
						function() { $(this).removeClass("button-share-plain").addClass("ui-state-hover"); },
						function() { $(this).removeClass("ui-state-hover").addClass("button-share-plain"); }
						);
				}
				var hasAdvButton = addServicesAdv();
				if(hasButton)
				{
					$(".button-share-advance").hover(
						function() { $(this).addClass("ui-state-hover"); },
						function() { $(this).removeClass("ui-state-hover");	}
						);
				}
				
				$('#divResponse').show();
				$('#divLoading').hide();
			}
		});
	});
	
}
 
$(function () {
	$('#divResponse').hide();
	$('#divLoading').show();
	
	setTimeout(function(){
		sendShortenRequestToBackground();
	}, 0);
	
});