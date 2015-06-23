console.log("hello i am part of the extension");

chrome.webNavigation.onCompleted.addListener(function(info) {
  console.log(info);
  var currentTabId = info.tabId;
  var currentTabURL = info.url;

  chrome.storage.local.get(null, function(items) {
    if (items['active']) {
      if (((currentTabURL.search("facebook")>-1) && items["facebook"]) || ((currentTabURL.search("twitter")>-1) && items["twitter"])) {
        chrome.tabs.sendMessage(currentTabId, {"message": "visited monitored url"});
      }
    }
  })
}, {url: [{urlEquals : 'https://www.facebook.com/'}, {urlEquals : 'https://twitter.com/'}]});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.blockHTML == "Block This Page") {
      sendResponse({success: "Page was successfully blocked"});
      chrome.tabs.update(sender.tab.id, {url: chrome.extension.getURL("block.html")});
    }
});
