function save_options() {
  var studyTime = document.getElementById('studyInterval').value;
  var breakTime = document.getElementById('breakInterval').value;
  var facebook = document.getElementById('facebook').checked;
  var twitter = document.getElementById('twitter').checked;
  var status = document.getElementById('status').checked;
  chrome.storage.local.set({
    "study": studyTime,
    "break": breakTime,
    "facebook": facebook,
    "twitter": twitter    
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
    "twitter": true
  }, function(items) {
    document.getElementById('studyInterval').value = items["study"];
    document.getElementById('breakInterval').value = items["break"];
    document.getElementById('facebook').checked = items["facebook"];
    document.getElementById('twitter').checked = items["twitter"];
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
