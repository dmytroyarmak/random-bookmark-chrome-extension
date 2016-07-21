var folderSelect = document.querySelector('select')

folderSelect.addEventListener('change', function () {
  chrome.storage.sync.set({
    bookmarkFolderId: folderSelect.value
  }, function () {
    chrome.runtime.sendMessage({type: 'FOLDER_CHANGED'});
  });
})

chrome.bookmarks.search({}, function(allBookmarks){
  var folders = allBookmarks.filter(isFolder);

  folders.forEach(function(folder){
    var option = document.createElement('option');
    option.textContent = folder.title;
    option.value = folder.id;
    folderSelect.appendChild(option);
  });

  chrome.storage.sync.get('bookmarkFolderId', function (result) {
    folderSelect.value = result.bookmarkFolderId;
  })

});

function isFolder(bookmark) {
  return !bookmark.url;
}
