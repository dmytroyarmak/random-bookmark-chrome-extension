updateBookmarksCountInBadge();

chrome.browserAction.onClicked.addListener(function() {
    getBookmarks(function(bookmarks) {
        if (bookmarks.length) {
            var randomBookmark = bookmarks[Math.floor(Math.random() * bookmarks.length)]
            chrome.tabs.create({
                url: randomBookmark.url
            });
        } else {
            chrome.runtime.openOptionsPage();
        }
    });
});

chrome.bookmarks.onCreated.addListener(updateBookmarksCountInBadge);
chrome.bookmarks.onRemoved.addListener(updateBookmarksCountInBadge);
chrome.bookmarks.onMoved.addListener(updateBookmarksCountInBadge);

chrome.runtime.onMessage.addListener(function(message) {
    if (message.type === 'FOLDER_CHANGED') {
        updateBookmarksCountInBadge();
    }
})

function updateBookmarksCountInBadge() {
    getBookmarks(function(bookmarks) {
        chrome.browserAction.setBadgeText({
            text: bookmarks.length ? bookmarks.length.toString() : ''
        });
    });
}

function getBookmarks(callback) {
    chrome.storage.sync.get('bookmarkFolderId', function (result) {
        if (result.bookmarkFolderId) {
            chrome.bookmarks.getChildren(result.bookmarkFolderId, callback);
        } else {
            callback([]);
        }
    });
}
