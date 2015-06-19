console.log("hello i am part of the extension");

chrome.webNavigation.onCompleted.addListener(function(info) {
  console.log("URL is: " + info.url);
  chrome.tabs.query({lastFocusedWindow: true}, function(tabs) {
    var currentTab = tabs[tabs.length - 1];
    var currentTabURL = currentTab.url;
    console.log("Current tab url is: " + currentTabURL);
    if (currentTabURL.search("reddit") || currentTabURL.search("facebook") || currentTabURL.search("twitter")> -1) {
      chrome.tabs.sendMessage(currentTab.id, {"message": "visited monitored url"});
    }
  });
}, {url: [{hostContains : 'www.reddit.com'}, {hostContains : 'www.facebook.com'}, {hostContains : 'twitter.com'}]});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.blockHTML == "Block This Page") {
      sendResponse({success: "Page was successfully blocked"});
      chrome.tabs.update(sender.tab.id, {url: chrome.extension.getURL("block.html")});
    }
});
