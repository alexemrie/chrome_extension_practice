// alert("Hello from your Chrome extension!");

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "visited monitored url") {
      $("body").css("background-color", "green");
      console.log("Page is now green!");
    }
  }
);
