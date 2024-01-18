
var init = (hmOptions) => {
    console.log('hmOptions is ' + JSON.stringify(hmOptions));
    var hideImages = hmOptions.images;
    var hideVidees = hmOptions.videos;

    var hideMedia = function () {
        if (hideImages) {
            $('*')
            .filter(function () {
                if (this.currentStyle) { 
                    return this.currentStyle['backgroundImage'] !== 'none';
                }
                else if (window.getComputedStyle) {
                    return document.defaultView.getComputedStyle(this, null).getPropertyValue('background-image') !== 'none';
                }
            })
            .each(function () {
                this.style.setProperty('background-image', 'none', 'important');
            });

            $('picture,img,canvas,svg')
            .each(function () {
                $(this).parents('figure').remove();
                $(this).remove();
            });
            $('[type="application/x-shockwave-flash"]').remove();
        }

        if (hideVidees) {
            $('video,.html5-video-player')
            .each(function () {
                $(this).parents('figure').remove();
                $(this).remove();
            });
            $('[type="application/x-shockwave-flash"]').remove();
        }
    };
    hideMedia();
    var interval = setInterval(function () {
        hideMedia();
    }, 2000);
}

chrome.storage.sync.get(['hmOptions'], (result) => {
    var hmOptions;
    
    if (result.hmOptions) {
        hmOptions = JSON.parse(result.hmOptions);
    } else {
        hmOptions = {
            images: true,
            videos: true
        };
        chrome.storage.sync.set({
            hmOptions: JSON.stringify(hmOptions)
        }, () => {});
    }
    init(hmOptions);
});