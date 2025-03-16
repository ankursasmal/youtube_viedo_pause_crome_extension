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

// Function to pause video
function pauseVideo() {
    const video = document.querySelector("video");
    if (video) {
        video.pause();
    }
}

// Function to play video
function playVideo() {
    const video = document.querySelector("video");
    if (video) {
        video.play();
    }
}
