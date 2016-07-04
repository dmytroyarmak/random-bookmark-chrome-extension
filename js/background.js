chrome.browserAction.onClicked.addListener(function() {
    chrome.bookmarks.getChildren('2707', function(bookmarks) {
        console.log(bookmarks);
    })
});
