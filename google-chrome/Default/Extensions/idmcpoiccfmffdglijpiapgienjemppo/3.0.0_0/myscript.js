chrome.action.onClicked.addListener(function(tab) {
	// No tabs or host permissions needed!
	chrome.action.setBadgeBackgroundColor({ color: [255, 255, 0, 255] });
	chrome.action.setBadgeText({text: "...",tabId: tab.id});

	chrome.scripting.executeScript({ target: {tabId: tab.id, allFrames:true }, files: ["jquery-3.6.0.min.js"] }, function() {
		chrome.scripting.executeScript({ target: {tabId: tab.id, allFrames:true }, files: ["content-script.js"] }, function(){
			if (!chrome.runtime.lastError) {
				chrome.action.setBadgeBackgroundColor({ color: [0, 0, 0, 255] });
				chrome.action.setBadgeText({text: "_",tabId: tab.id});
			}else{
				chrome.action.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
				chrome.action.setBadgeText({text: "x",tabId: tab.id});
				console.log(chrome.runtime.lastError.message);
			}
		});
	});	
});