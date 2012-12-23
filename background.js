
var seltext = null;

chrome.extension.onRequest.addListener(function(request, sender, sendResponse)
{
	switch(request.message)
	{
		case 'setText':
			window.seltext = request.data
		break;
		
		default:
			sendResponse({data: 'Invalid arguments'});
		break;
	}
});


function savetext(info,tab)

{
	//$.fancybox.close();
	//$("a#scilab-on-cloud-inline").trigger("click");
	chrome.tabs.getSelected(null, function(tab) {
		
	chrome.tabs.sendMessage(tab.id, {typeofrequest: "input",data:seltext}, function(response) {
		//alert("response"+response.farewell);
		});
	});
	$.ajax({
      type: "POST",
      url: "http://scilab-test.garudaindia.in/cloud/scilab_evaluate",
      data: { scilab_code: seltext,graphicsmode:'',external_user:'guest' },
      
    }).done(function( msg ) {		
		//alert(msg["output"]);  
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.sendMessage(tab.id, {typeofrequest: "output",data:msg["output"]}, function(response) {
    //alert("response"+response.farewell);
			});
		});
      });
	
}

var context = "selection";
var title = "Run on Scilab on Cloud "
var id = chrome.contextMenus.create({"title": title, "contexts":[context],"onclick": savetext});

