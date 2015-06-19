function save_options() {
  var studyTime = document.getElementById('studyInterval').value;
  var breakTime = document.getElementById('breakInterval').value;
  // var likesColor = document.getElementById('like').checked;
  chrome.storage.sync.set({
    study: studyTime,
    break: breakTime
  }, function() {
    close_tab();
  });
}

function restore_options() {
  chrome.storage.sync.get({
    study: '30',
    break: '10'
  }, function(items) {
    document.getElementById('studyInterval').value = items.study;
    document.getElementById('breakInterval').value = items.break;
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
