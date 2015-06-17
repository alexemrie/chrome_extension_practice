// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// "default_popup": "popup.html"


/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
// function getCurrentTabUrl() {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  // var queryInfo = {
  //   active: true,
  //   currentWindow: true
  // };
  //
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   // chrome.tabs.query invokes the callback with a list of tabs that match the
  //   // query. When the popup is opened, there is certainly a window and at least
  //   // one tab, so we can safely assume that |tabs| is a non-empty array.
  //   // A window can only have one active tab at a time, so the array consists of
  //   // exactly one tab.
  //   var tab = tabs[0];
  //
  //   // A tab is a plain object that provides information about the tab.
  //   // See https://developer.chrome.com/extensions/tabs#type-Tab
  //   var url = tab.url;
  //   console.log(url);
  //   // tab.url is only available if the "activeTab" permission is declared.
  //   // If you want to see the URL of other tabs (e.g. after removing active:true
  //   // from |queryInfo|), then the "tabs" permission is required to see their
  //   // "url" properties.
  //   console.assert(typeof url == 'string', 'tab.url should be a string');
  //   callback(url);
  // });

  // function intervalTime(mins) {
  //   var msecPerMinute = 1000 * 60;
  //
  //   var startTime = new Date().getTime();
  //   var minutes = mins * msecPerMinute;
  //   var endTime = startTime + minutes;
  //
  //   var myInterval = setInterval(function() {
  //     if (new Date().getTime() > endTime) {
  //        console.log("now ready");
  //        clearInterval(myInterval);
  //     } else {
  //       console.log("not yet function");
  //     }
  //   }, 5000);
  // }

  // chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab) {
  //   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //     var currentTab = tabs[0];
  //     var currentUrl = currentTab.url;
  //     console.log("Current Tab url is: " + currentUrl);
  //   });
  //   intervalTime(.25);
  // });
// }

// getCurrentTabUrl();
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


// chrome.tabs.onUpdated.addListener(function(tabID, info) {
//   if (info.status == "complete") {
//     chrome.tabs.query({lastFocusedWindow: true}, function(tabs){
//       var currentTab = tabs[tabs.length - 1];
//       var currentTabURL = currentTab.url;
//       if (currentTabURL.search("facebook") > -1) {
//         console.log(currentTabURL);
//         console.log("Match for Facebook!");
//         intervalTime(.25, injectScript(tabID));
//       } else {
//         console.log(currentTabURL);
//       }
//     });
//   }
// });


// /**
//  * @param {string} searchTerm - Search term for Google Image search.
//  * @param {function(string,number,number)} callback - Called when an image has
//  *   been found. The callback gets the URL, width and height of the image.
//  * @param {function(string)} errorCallback - Called when the image is not found.
//  *   The callback gets a string that describes the failure reason.
//  */
// function getImageUrl(searchTerm, callback, errorCallback) {
//   // Google image search - 100 searches per day.
//   // https://developers.google.com/image-search/
//   var searchUrl = 'https://ajax.googleapis.com/ajax/services/search/images' +
//     '?v=1.0&q=' + encodeURIComponent(searchTerm);
//   var x = new XMLHttpRequest();
//   x.open('GET', searchUrl);
//   // The Google image search API responds with JSON, so let Chrome parse it.
//   x.responseType = 'json';
//   x.onload = function() {
//     // Parse and process the response from Google Image Search.
//     var response = x.response;
//     if (!response || !response.responseData || !response.responseData.results ||
//         response.responseData.results.length === 0) {
//       errorCallback('No response from Google Image search!');
//       return;
//     }
//     var firstResult = response.responseData.results[0];
//     // Take the thumbnail instead of the full image to get an approximately
//     // consistent image size.
//     var imageUrl = firstResult.tbUrl;
//     var width = parseInt(firstResult.tbWidth);
//     var height = parseInt(firstResult.tbHeight);
//     console.assert(
//         typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
//         'Unexpected response from the Google Image Search API!');
//     callback(imageUrl, width, height);
//   };
//   x.onerror = function() {
//     errorCallback('Network error.');
//   };
//   x.send();
// }
//
// function renderStatus(statusText) {
//   document.getElementById('status').textContent = statusText;
// }
//
// document.addEventListener('DOMContentLoaded', function() {
//   getCurrentTabUrl(function(url) {
//     // Put the image URL in Google search.
//     renderStatus('Performing Google Image search for ' + url);
//
//     getImageUrl(url, function(imageUrl, width, height) {
//
//       renderStatus('Search term: ' + url + '\n' +
//           'Google image search result: ' + imageUrl);
//       var imageResult = document.getElementById('image-result');
//       // Explicitly set the width/height to minimize the number of reflows. For
//       // a single image, this does not matter, but if you're going to embed
//       // multiple external images in your page, then the absence of width/height
//       // attributes causes the popup to resize multiple times.
//       imageResult.width = width;
//       imageResult.height = height;
//       imageResult.src = imageUrl;
//       imageResult.hidden = false;
//
//     }, function(errorMessage) {
//       renderStatus('Cannot display image. ' + errorMessage);
//     });
//   });
// });
