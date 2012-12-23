document.addEventListener('mouseup',function(event)
{
	var sel = window.getSelection().toString();
	if(sel.length)
		chrome.extension.sendRequest({'message':'setText','data': sel},function(response){})
})

$(document).ready(function(){
    var imgUrl = chrome.extension.getURL("images/fancybox.png");
	$("#fancybox-loading div").css('background-image',imgUrl);
	$("#fancybox-left-ico").css('background-image',imgUrl);
	$("#fancybox-right-ico").css('background-image',imgUrl);
	$("#fancybox-bg-ne").css('background-image',imgUrl);
	$("#fancybox-bg-se").css('background-image',imgUrl);
	$("#fancybox-bg-sw").css('background-image',imgUrl);
	$("#fancybox-bg-nw").css('background-image',imgUrl);
	$("#fancybox-title-float-left").css("background", imgUrl+" -40px -90px no-repeat");
	$("#fancybox-title-float-right").css("background", imgUrl+" -55px -90px no-repeat");
	$("#fancybox-close").css("background", "transparent "+imgUrl+" -40px 0px");	
	imgUrl = chrome.extension.getURL("images/blank.gif");
	$("#fancybox-left").css("background","transparent "+imgUrl)

		var html;
	  if (document.documentElement) {
		html = $(document.documentElement); //just drop $ wrapper if no jQuery
	  } else if (document.getElementsByTagName('html') && document.getElementsByTagName('html')[0]) {
		html = $(document.getElementsByTagName('html')[0]);
	  } else if ($('html').length > -1) {//drop this branch if no jQuery
		html = $('html');
	  } else {
		alert('no html tag retrieved...!');
		throw 'no html tag retrieved son.';
	  }
  var content = "<a id=\"scilab-on-cloud-inline\" href=\"#scilab-on-cloud-data\" style=\"display:none;\">This shows content of element who has id=\"data\"</a><div><div id=\"scilab-on-cloud-data\"></div></div>";
  html.append(content);
  $("a#scilab-on-cloud-inline").fancybox({
		'hideOnContentClick': true
	});

   	
	chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
		if (request.typeofrequest == "output")
		{ 
			
			content = "<h3>Scilab On Cloud : Result</h3><br/>"+request.data.replace(/\n/g, "<br />").replace(/\t/g,"&nbsp&nbsp").replace(/\r/g,"&nbsp&nbsp");
			$("#scilab-on-cloud-spinner").hide();
			$("#scilab-on-cloud-data").append(content);
			
			//$("a#inline").trigger("click");
			sendResponse({farewell: "goodbye"});
		}	
			else
		{
			var imgUrl = chrome.extension.getURL("images/spinner.gif");
			content = "<h3>Scilab On Cloud : Input</h3><img id=\"scilab-on-cloud-spinner\" src=\""+imgUrl+"\""+"><br/>"+request.data.replace(/\n/g, "<br />").replace(/\t/g,"&nbsp&nbsp").replace(/\r/g,"&nbsp&nbsp");
			$("#scilab-on-cloud-data").html(content);
			$("a#scilab-on-cloud-inline").trigger("click");
			sendResponse({farewell: "done"});
  
		}
	});
});
