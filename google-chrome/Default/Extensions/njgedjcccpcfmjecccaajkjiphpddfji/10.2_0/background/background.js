let default_translateWhere = "sougou";
let default_translateKeycode = "84";
let default_translateHideKeycode = "89";
let default_translateColor = "#55aaff";
let default_translatePosition = "after";

let default_isFontBold = "noBold";
let default_fontSize = "13";


$(function () {
    $('[data-toggle="tooltip"]').tooltip();  // 生成工具提示
})

// translation.html 回显
$(function () {

    let translateWhere;
    let translateKeycode;
    let translateHideKeycode;
    let translateColor;
    let translatePosition;
    let translateOpen;
    let translatexiaoniuapikey;

    chrome.storage.local.get({

        "translateWhere": default_translateWhere, "translateKeycode": default_translateKeycode,
        "translateColor": default_translateColor, "translatePosition": default_translatePosition,
        "translateHideKeycode": default_translateHideKeycode,
        "translatexiaoniuapikey": "",
    }, function (items) {
        translateWhere = items.translateWhere;
        translateKeycode = items.translateKeycode;
        translateColor = items.translateColor;
        translatePosition = items.translatePosition;
        translateHideKeycode = items.translateHideKeycode;
        translatexiaoniuapikey = items.translatexiaoniuapikey;

        // 回显

        if (translateKeycode == "CLOSE") {
            $("input[name=translateKeycode]").val("CLOSE");
        } else {
            $("input[name=translateKeycode]").val(String.fromCharCode(translateKeycode));
        }

        $("input[name=translateHideKeycode]").val(String.fromCharCode(translateHideKeycode));
        $("input[name=translateColor]").val(translateColor);
        $("input[name=translatexiaoniuapikey]").val(translatexiaoniuapikey);
        if (translateWhere === "google") {
            $("#googletranslate").prop("checked", true);
        } else if (translateWhere === "keyan") {
            $("#keyantranslate").prop("checked", true);
        } else if (translateWhere === "youdao") {
            $("#youdaotranslate").prop("checked", true);
        } else if (translateWhere === "sougou") {
            $("#sougoutranslate").prop("checked", true);
        } else if (translateWhere === "caiyunweb") {
            $("#caiyunwebtranslate").prop("checked", true);
        }else if (translateWhere === "googleMirro"){
            $("#googletranslateMirro").prop("checked", true);
        } else if (translateWhere === "xiaoniu"){
            $("#xiaoniutranslate").prop("checked", true);
        } else if (translateWhere === "reverso"){
            $("#reverso").prop("checked", true);
        } else if (translateWhere === "yandex"){
            $("#yandex").prop("checked", true);
        }

        if (translatePosition === "after") {
            $("#translateResultPositionAfter").prop("checked", true);
        } else {
            $("#translateResultPositionBefore").prop("checked", true);
        }
    });

});

// setting.html回显
$(function () {
    chrome.runtime.sendMessage({
        action: "getSciLink",
    }, function (response) {
        let data = "";
        for (let i = 0; i < response.data.length; i++) {
            data += "-------------" + response.data[i]["info"];
        }
        $("#SciLinktooltip").text("参考链接:" + data);
    });

    let default_easyScholarColour1 = "#ff9999";
    let default_easyScholarColour2 = "#86dad1";
    let default_easyScholarColour3 = "#ffe78f";
    let default_easyScholarColour4 = "#ffd4a9";
    let default_easyScholarColour5 = "#cce5ff";

    let default_fontColour = "#000000";

    let easyScholarColour1;
    let easyScholarColour2;
    let easyScholarColour3;
    let easyScholarColour4;
    let easyScholarColour5;

    let fontColour;
    let isFontBold;
    let fontSize;

    let SciLink;
    let isSciLink;

    let isRankTitle;

    chrome.storage.local.get({
        "easyScholarColour1": default_easyScholarColour1, "easyScholarColour2": default_easyScholarColour2,
        "easyScholarColour3": default_easyScholarColour3, "easyScholarColour4": default_easyScholarColour4,
        "easyScholarColour5": default_easyScholarColour5, "isFontBold": default_isFontBold,
        "fontColour": default_fontColour, "fontSize": default_fontSize,
        "SciLink": "https://sci-hub.se/",
        "isSciLink": "SciLinkOpen",

        "isRankTitle": "RankTitleOpen",
    }, function (items) {
        easyScholarColour1 = items.easyScholarColour1;
        easyScholarColour2 = items.easyScholarColour2;
        easyScholarColour3 = items.easyScholarColour3;
        easyScholarColour4 = items.easyScholarColour4;
        easyScholarColour5 = items.easyScholarColour5;

        fontColour = items.fontColour;
        isFontBold = items.isFontBold;
        fontSize = items.fontSize;

        SciLink = items.SciLink;
        isSciLink = items.isSciLink;

        isRankTitle = items.isRankTitle;

        $("#changeColor1").val(easyScholarColour1);
        $("#changeColor2").val(easyScholarColour2);
        $("#changeColor3").val(easyScholarColour3);
        $("#changeColor4").val(easyScholarColour4);
        $("#changeColor5").val(easyScholarColour5);

        $("#fontColour").val(fontColour);
        $("#fontSize").val(fontSize);

        $("#SciLink").val(SciLink);

        if (isFontBold == "bold") {
            $("#fontBold").prop("checked", true);
        } else {
            $("#fontNoBold").prop("checked", true);
        }

        if (isSciLink == "SciLinkOpen") {
            $("#SciLinkOpen").prop("checked", true);
        } else {
            $("#SciLinkClose").prop("checked", true);
        }


        if (isRankTitle == "RankTitleOpen") {
            $("#RankTitleOpen").prop("checked", true);
        } else {
            $("#RankTitleClose").prop("checked", true);
        }

        layui.use('colorpicker', function () {
            let colorpicker = layui.colorpicker;
            colorpicker.render({
                elem: '#selectChangeColor1'  //绑定元素
                , color: $("#changeColor1").val()
                , size: "xs"
                , predefine: true
                , colors: ["#ff55ff", "#ff9999"]
                , done: function (color) {
                    $("#changeColor1").val(color);
                }
            });
        });
        layui.use('colorpicker', function () {
            let colorpicker = layui.colorpicker;
            colorpicker.render({
                elem: '#selectChangeColor2'  //绑定元素
                , color: $("#changeColor2").val()
                , size: "xs"
                , predefine: true
                , colors: ["#b94a48", "#86DAD1"]
                , done: function (color) {
                    $("#changeColor2").val(color);
                }
            });
        });
        layui.use('colorpicker', function () {
            let colorpicker = layui.colorpicker;
            colorpicker.render({
                elem: '#selectChangeColor3'  //绑定元素
                , color: $("#changeColor3").val()
                , size: "xs"
                , predefine: true
                , colors: ["#f89406", "#ffe78f"]
                , done: function (color) {
                    $("#changeColor3").val(color);
                }
            });
        });
        layui.use('colorpicker', function () {
            let colorpicker = layui.colorpicker;
            colorpicker.render({
                elem: '#selectChangeColor4'  //绑定元素
                , color: $("#changeColor4").val()
                , size: "xs"
                , predefine: true
                , colors: ["#468847", "#ffd4a9"]
                , done: function (color) {
                    $("#changeColor4").val(color);
                }
            });
        });
        layui.use('colorpicker', function () {
            let colorpicker = layui.colorpicker;
            colorpicker.render({
                elem: '#selectChangeColor5'  //绑定元素
                , color: $("#changeColor5").val()
                , size: "xs"
                , predefine: true
                , colors: ["#55aaff", "#cce5ff"]
                , done: function (color) {
                    $("#changeColor5").val(color);
                }
            });
        });
        //设置字体颜色
        layui.use('colorpicker', function () {
            let colorpicker = layui.colorpicker;
            colorpicker.render({
                elem: '#selectfontColour'  //绑定元素
                , color: $("#fontColour").val()
                , size: "xs"
                , predefine: true
                , colors: ["#ffffff", "#000000"]
                , done: function (color) {
                    $("#fontColour").val(color);
                }
            });
        });
        // 翻译界面的颜色
        layui.use('colorpicker', function () {
            let colorpicker = layui.colorpicker;
            colorpicker.render({
                elem: '#selectTranslateColor'  //绑定元素
                , color: $("#translateColor").val()
                , size: "xs"
                , predefine: true
                , colors: ["#ff55ff", "#b94a48", "#f89406", "#468847", "#55aaff"]
                , done: function (color) {
                    $("#translateColor").val(color);
                }
            });
        });
    });


});

$("#saveTranslateSetting").click(function () {
    let translateWhere = $("input[name=translateWhere]:checked").val();
    let translatePosition = $("input[name=translatePosition]:checked").val();
    let translateKeycodeChar = $("input[name=translateKeycode]").val().toUpperCase();
    let translateHideKeycodeChar = $("input[name=translateHideKeycode]").val().toUpperCase();
    let keyCodeList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    let translateKeycode = "84";
    let translateOpen = true;
    let translateHideKeycode;

    if (translateKeycodeChar == "CLOSE") {
        translateOpen = false;
        translateKeycode = "CLOSE";
    }
    if (translateKeycodeChar.length != 1 && translateKeycodeChar != "CLOSE") {
        translateKeycodeChar = "T";
    }
    for (let i = 0; i < keyCodeList.length; i++) {
        if (translateKeycodeChar == keyCodeList[i]) {
            translateKeycode = 65 + i + "";
        }
    }

    if (translateHideKeycodeChar.length != 1) {
        translateHideKeycodeChar = "Y";
    }
    for (let i = 0; i < keyCodeList.length; i++) {
        if (translateHideKeycodeChar == keyCodeList[i]) {
            translateHideKeycode = 65 + i + "";
        }
    }


    let translateColor = $("input[name=translateColor]").val();
    if (translateColor.indexOf("#") == -1 || translateColor.length != 7) {
        translateColor = "#55aaff";
    }

    let translatexiaoniuapikey = $("input[name=translatexiaoniuapikey]").val();

    chrome.storage.local.set({
        "translateWhere": translateWhere,
        "translateKeycode": translateKeycode,
        "translateHideKeycode": translateHideKeycode,
        "translateColor": translateColor,
        "translatePosition": translatePosition,
        "translateOpen": translateOpen,
        "translatexiaoniuapikey" : translatexiaoniuapikey,
    }, function () {
        setTimeout(function () {
            document.getElementById("saveTranslateSetting").innerHTML = "保存该页面所有设置";
        }, 500);
        document.getElementById("saveTranslateSetting").innerHTML = "Success!";
    });
});

$("#saveSetting").click(function () {


    let easyScholarColour1 = ($("#changeColor1").val().trim().indexOf("#") == -1 || $("#changeColor1").val().trim().length != 7) ? "#ff55ff" : $("#changeColor1").val().trim();
    let easyScholarColour2 = ($("#changeColor2").val().trim().indexOf("#") == -1 || $("#changeColor2").val().trim().length != 7) ? "#b94a48" : $("#changeColor2").val().trim();
    let easyScholarColour3 = ($("#changeColor3").val().trim().indexOf("#") == -1 || $("#changeColor3").val().trim().length != 7) ? "#f89406" : $("#changeColor3").val().trim();
    let easyScholarColour4 = ($("#changeColor4").val().trim().indexOf("#") == -1 || $("#changeColor4").val().trim().length != 7) ? "#468847" : $("#changeColor4").val().trim();
    let easyScholarColour5 = ($("#changeColor5").val().trim().indexOf("#") == -1 || $("#changeColor5").val().trim().length != 7) ? "#55aaff" : $("#changeColor5").val().trim();

    let fontColour = ($("#fontColour").val().trim().indexOf("#") == -1 || $("#fontColour").val().trim().length != 7) ? "#ffffff" : $("#fontColour").val().trim();
    let isFontBold = $("input[name=isFontBold]:checked").val();
    let isSciLink = $("input[name=isSciLink]:checked").val();
    let fontSize = $("#fontSize").val();

    let SciLink = $("#SciLink").val()

    let isRankTitle = $("input[name=isRankTitle]:checked").val();

    chrome.storage.local.set({
        "easyScholarColour1": easyScholarColour1,
        "easyScholarColour2": easyScholarColour2,
        "easyScholarColour3": easyScholarColour3,
        "easyScholarColour4": easyScholarColour4,
        "easyScholarColour5": easyScholarColour5,
        "fontColour": fontColour,
        "isFontBold": isFontBold,
        "fontSize": fontSize,
        "SciLink": SciLink,
        "isSciLink": isSciLink,

        "isRankTitle": isRankTitle,
    }, function () {
        setTimeout(function () {
            document.getElementById("saveSetting").innerHTML = "保存该页面所有设置";
        }, 300);
        document.getElementById("saveSetting").innerHTML = "Success!";
    });


});


