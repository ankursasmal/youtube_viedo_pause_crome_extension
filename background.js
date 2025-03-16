function pauseVideo() {
    const video = document.querySelector("video");
    if (video) {
        video.pause();
    }
}

 function playVideo() {
    const video = document.querySelector("video");
    if (video) {
        video.play();
    }
}


chrome.tabs.onActivated.addListener(async (activeInfo) => {
         const tab = await chrome.tabs.get(activeInfo.tabId);
    if (tab.url && tab.url.includes("youtube.com/watch")) {
           chrome.scripting.executeScript({
            target: { tabId: tab.id },
               func: playVideo
        });
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url && tab.url.includes("youtube.com/watch")) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: playVideo
        });
    }
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: pauseVideo
    });
});

 
