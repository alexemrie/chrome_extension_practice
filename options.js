function save_options() {
  var studyTime = document.getElementById('studyInterval').value;
  var breakTime = document.getElementById('breakInterval').value;
  var facebook = document.getElementById('facebook').checked;
  var instagram = document.getElementById('instagram').checked;
  var pinterest = document.getElementById('pinterest').checked;
  var reddit = document.getElementById('reddit').checked;
  var twitter = document.getElementById('twitter').checked;
  var youtube = document.getElementById('youtube').checked;
  var status = document.getElementById('status').checked;
  chrome.storage.local.set({
    "study": studyTime,
    "break": breakTime,
    "facebook": facebook,
    "instagram": instagram,
    "pinterest": pinterest,
    "reddit": reddit,
    "twitter": twitter,
    "youtube": youtube
  }, function() {
    chrome.storage.local.remove('endTime');
    close_tab();
  });
}

function restore_options() {
  chrome.storage.local.get({
    "study": '30',
    "break": '10',
    "facebook": true,
    "instagram": true,
    "pinterest": true,
    "reddit": true,
    "twitter": true,
    "youtube": true
  }, function(items) {
    document.getElementById('studyInterval').value = items["study"];
    document.getElementById('breakInterval').value = items["break"];
    document.getElementById('facebook').checked = items["facebook"];
    document.getElementById('instagram').checked = items["instagram"];
    document.getElementById('pinterest').checked = items["pinterest"];
    document.getElementById('reddit').checked = items["reddit"];
    document.getElementById('twitter').checked = items["twitter"];
    document.getElementById('youtube').checked = items["youtube"];
  });
}

function close_tab() {
  chrome.tabs.getSelected(function(tab) {
      chrome.tabs.remove(tab.id);
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('saveBtn').addEventListener('click', save_options);
document.getElementById('cancelBtn').addEventListener('click', close_tab);
