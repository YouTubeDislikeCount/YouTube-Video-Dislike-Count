chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url.includes('youtube.com')) {
        chrome.storage.sync.get(['key'], function(result) {
            if (result.key !== '' && result.key != undefined) {
                const videoId = tab.url.split('?v=')[1];
                const key = result.key;
                chrome.tabs.executeScript(tabId, {code: `
                    var dislikeButton = document.evaluate('/html/body/ytd-app/div/ytd-page-manager/ytd-watch-flexy/div[5]/div[1]/div/div[6]/div[2]/ytd-video-primary-info-renderer/div/div/div[3]/div/ytd-menu-renderer/div/ytd-toggle-button-renderer[2]/a/yt-formatted-string', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    var url = "https://www.googleapis.com/youtube/v3/videos?id=` + videoId + `&key=` + key + `&part=statistics";
                    fetch(url).then(response => response.json().then(data => ({
                        data: data,
                        status: response.status
                    })).then(res => {
                        dislikeButton.innerHTML = res.data['items'][0]['statistics']['dislikeCount'];
                    }));
                `});
            }
        });
    }
});

function setKey(value) {
    chrome.storage.sync.set({ key: value.toString() }, function() {
        console.log('Updated API Key');
    });
}
