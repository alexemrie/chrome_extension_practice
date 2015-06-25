console.log("hello i am part of the extension");

chrome.webNavigation.onCompleted.addListener(function(info) {
  console.log(info);
  var currentTabId = info.tabId;
  var currentTabURL = info.url;

  chrome.storage.local.get(null, function(items) {
    if (items['active']) {
      if (
        ((currentTabURL.search("facebook")>-1) && items["facebook"]) ||
        ((currentTabURL.search("instagram")>-1) && items["instagram"]) ||
        ((currentTabURL.search("pinterest")>-1) && items["pinterest"]) ||
        ((currentTabURL.search("instagram")>-1) && items["instagram"]) ||
        ((currentTabURL.search("reddit")>-1) && items["reddit"]) ||
        ((currentTabURL.search("twitter")>-1) && items["twitter"]) ||
        ((currentTabURL.search("youtube")>-1) && items["youtube"])
      ) {
        chrome.tabs.sendMessage(currentTabId, {"message": "visited monitored url"});
      }
    }
  })
}, {url: [{urlEquals : 'https://www.facebook.com/'}, {urlEquals : 'https://instagram.com/'}, {urlEquals : 'https://www.pinterest.com/'}, {urlEquals : 'http://www.reddit.com/'}, {urlEquals : 'https://twitter.com/'}, {hostContains : 'www.youtube.com'}]});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.blockHTML == "Block This Page") {
      sendResponse({success: "Page was successfully blocked"});
      chrome.tabs.update(sender.tab.id, {url: chrome.extension.getURL("block.html")});
    }
});
