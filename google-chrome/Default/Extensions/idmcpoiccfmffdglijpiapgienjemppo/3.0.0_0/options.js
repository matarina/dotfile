var init = (hmOptions) => {
    var hideImages = hmOptions.images;
    var hideVidees = hmOptions.videos;

    document.getElementById('checkbox-1').checked = hideImages;
    document.getElementById('checkbox-2').checked = hideVidees;

    var switchControl1 = mdc.switchControl.MDCSwitch.attachTo(document.querySelector('.hide-images-s'));
    var switchControl2 = mdc.switchControl.MDCSwitch.attachTo(document.querySelector('.hide-videos-s'));

    document.querySelector('.sv-button').addEventListener('click', () => {
        hmOptions = {
            images: document.getElementById('checkbox-1').checked,
            videos: document.getElementById('checkbox-2').checked
        };
        chrome.storage.sync.set({
            hmOptions: JSON.stringify(hmOptions)
        }, () => {});

        var notesDiv = document.querySelector('.notes');
        notesDiv.style.display = 'block';

        setTimeout(() => { notesDiv.style.display = 'none'; }, 5000);
    });
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

mdc.ripple.MDCRipple.attachTo(document.querySelector('.sv-button'));
