chrome.browserAction.onClicked.addListener(function() {
    chrome.bookmarks.getChildren('2707', function(bookmarks) {
        var randomBookmark = bookmarks[Math.floor(Math.random() * bookmarks.length)]
        chrome.tabs.create({
            url: randomBookmark.url
        });
    })
});
