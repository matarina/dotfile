let default_translateWhere = "sougou";
let default_translateKeycode = "84";
let default_translateHideKeycode = "89";
let default_translateColor = "#55aaff";
let default_translatePosition = "after";
let default_translateOpen = true;

let translateWhere;
let translateKeycode;
let translateColor;
let translatePosition;
let translateHideKeycode;
let translateOpen;

$(function () {
    chrome.storage.local.get({
        "translateWhere": default_translateWhere, "translateKeycode": default_translateKeycode,
        "translateColor": default_translateColor, "translatePosition": default_translatePosition,
        "translateHideKeycode": default_translateHideKeycode, "translateOpen": default_translateOpen
    }, function (items) {
        translateWhere = items.translateWhere;
        translateKeycode = items.translateKeycode;
        translateHideKeycode = items.translateHideKeycode;
        translateColor = items.translateColor;
        translatePosition = items.translatePosition;
        translateOpen = items.translateOpen;
    });
});

$(document).keydown(
    function (e) {
        if (translateOpen) {
            let keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
            if (keyCode == parseInt(translateKeycode)) {
                let userSelection = window.getSelection();
                let userSelectionNode = window.getSelection().anchorNode.parentElement;
                if (!userSelectionNode.closest('[contenteditable="true"], [contenteditable=""]')
                && $(userSelectionNode).find("textarea").length == 0
                && $(userSelectionNode).find("input").length == 0) {
                    let userSelection_string = userSelection.toString();
                    if (userSelection_string.length > 0 && userSelection_string.length < 30000) {
                        getTranslate(userSelection_string);
                    }
                }
            } else if (keyCode == parseInt(translateHideKeycode)) {
                if ($(".easyScholarTranslationResult").length > 0) {
                    hideTranslateResult();
                }
            }
        }
    });


function getTranslate(row_data) {
    chrome.storage.local.get({
        "translateWhere": default_translateWhere, "translateKeycode": default_translateKeycode,
        "translateColor": default_translateColor, "translatePosition": default_translatePosition,
        "translateHideKeycode": default_translateHideKeycode, "translateOpen": default_translateOpen
    }, function (items) {
        translateWhere = items.translateWhere;
        translateKeycode = items.translateKeycode;
        translateHideKeycode = items.translateHideKeycode;
        translateColor = items.translateColor;
        translatePosition = items.translatePosition;
        translateOpen = items.translateOpen;
        // 确定翻译源
        let actionNormal = "谷歌翻译";
        let action = "trans_google";
        if (translateWhere == "keyan") {
            action = "trans_keyan";
            actionNormal = "棵岩阅读";
        }else if (translateWhere == "sougou"){
            action = "trans_sougou";
            actionNormal = "搜狗翻译";
        }else if (translateWhere == "youdao"){
            action = "trans_youdao";
            actionNormal = "有道翻译";
        }else if (translateWhere == "caiyunweb"){
            action = "trans_caiyunweb";
            actionNormal = "彩云小译";
        }else if (translateWhere == "googleMirro"){
            action = "trans_google_mirro";
            actionNormal = "谷歌翻译镜像";
        }else if (translateWhere == "xiaoniu"){
            action = "trans_xiaoniu";
            actionNormal = "小牛翻译";
        }else if (translateWhere == "reverso"){
            action = "trans_reverso";
            actionNormal = "Reverso翻译";
        }else if (translateWhere == "yandex"){
            action = "trans_yandex";
            actionNormal = "Yandex翻译";
        }else if (translateWhere == "google"){
            action = "trans_google";
            actionNormal = "谷歌翻译";
        }

        // 确定翻译位置
        let userSelection = window.getSelection();
        let range = userSelection.getRangeAt(0);
        if (translatePosition == "after") {
            range.collapse(false);
        } else {
            range.collapse(true);
        }

        // 找出最大的value值
        let TranslationResultSpanVlue = 0;
        $(".easyScholarTranslationResult").each(
            function () {
                let temp = parseInt($(this).attr("value"));
                if (temp > TranslationResultSpanVlue) {
                    TranslationResultSpanVlue = temp;
                }
            }
        );
        TranslationResultSpanVlue += 1;
        //
        let el = document.createElement("span");
        el.textContent = actionNormal + "正在翻译... ";
        $(el).css("color", translateColor);
        $(el).css("font-weight", "bold");
        $(el).attr("class", "easyScholarTranslationResult");
        $(el).attr("value", TranslationResultSpanVlue);
        range.insertNode(el);

        chrome.runtime.sendMessage({
                action: action,
                data: row_data
            },
            function (data) {
                if (data == undefined) {
                    el.textContent = "  " + actionNormal + "服务暂时不可用，请稍后再试" + "  ";
                } else {
                    if(action == "trans_keyan"){
                        el.textContent = "  " + data + "  ";
                        $(el).append($("<a href='https://www.keyanyuedu.com/?channel=easyscholar' target='_blank'>棵岩阅读一键翻译全文</a>"));
                    }else if (action == "trans_sougou"){
                        el.textContent = "  " + $(data).find("#trans-result").text() + "  ";
                    }else {
                        el.textContent = "  " + data;
                    }
                }
            })
    });

};

function hideTranslateResult() {
    let TranslationResultSpanVlue = 0;
    $(".easyScholarTranslationResult:visible").each(
        function () {
            let temp = parseInt($(this).attr("value"));
            if (temp > TranslationResultSpanVlue) {
                TranslationResultSpanVlue = temp;
            }
        }
    );
    $(".easyScholarTranslationResult[value=" + TranslationResultSpanVlue + "]").hide();
};