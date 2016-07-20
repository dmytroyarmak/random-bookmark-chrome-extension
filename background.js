var BOOKMARKS_FOLDER_ID = '2707';

updateBookmarksCountInBadge();

chrome.browserAction.onClicked.addListener(function() {
    chrome.bookmarks.getChildren(BOOKMARKS_FOLDER_ID, function(bookmarks) {
        if (bookmarks.length) {
            var randomBookmark = bookmarks[Math.floor(Math.random() * bookmarks.length)]
            chrome.tabs.create({
                url: randomBookmark.url
            });
        }
    })
});

chrome.bookmarks.onCreated.addListener(updateBookmarksCountInBadge);
chrome.bookmarks.onRemoved.addListener(updateBookmarksCountInBadge);
chrome.bookmarks.onMoved.addListener(updateBookmarksCountInBadge);

function updateBookmarksCountInBadge() {
    chrome.bookmarks.getChildren(BOOKMARKS_FOLDER_ID, function(bookmarks) {
        var bookmarksCount = bookmarks.length;
        if (bookmarksCount) {
            chrome.browserAction.setBadgeText({
                text: bookmarksCount.toString()
            });
        }
    });
}
