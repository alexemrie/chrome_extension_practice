$(document).ready(function(){
  chrome.storage.local.get(null, function(items) {
    document.getElementById('statusDetail').innerHTML = items["status"];
  });

  document.getElementById('header').addEventListener('click', function() {
    $('#header').toggleClass("Enabled");
    if ($('#header').hasClass("Enabled")) {
      chrome.storage.local.set({
        "status": "Study Mode Enabled",
        "active": true
      });
    } else {
      chrome.storage.local.set({
        "status": "Study Mode Disabled",
        "active": false
      })
    }
    chrome.storage.local.get(null, function(items) {
      document.getElementById('statusDetail').innerHTML = items["status"];
    });
  });

  $(".optsSettings").on("click", function() {
    chrome.runtime.openOptionsPage();
  });
})
