let optionCheckd;
let default_displayUnit = ['all', 'sci', 'swufe', 'ccf', 'cufe', 'sciif', 'fdu', 'sjtu', 'cssci', 'xmu', 'ruc', 'cscd',
    'uibe', 'swjtu', 'xdu', 'sci-base', 'sci-up', 'pku', 'sdufe', 'eii', 'nju', 'ahci', 'zhongguokejihexin', 'cqu',
    'hhu', 'ajg', 'xju', 'cug', 'ssci', 'scu', 'sciif5', 'sciwarn', 'jci', 'ft50', 'utd24', 'enintro', 'zhintro', 'fms',
    'zju', 'cju'];

let isEval = false;
let logo = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="22px" height="22px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">  <image id="image0" width="32" height="32" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAHdklEQVRYw+1WW2xcVxVd59zn3JnxPDwzHo89fsexYzvO02nSPBQgRMGqVEgFtEiABCriK0L8RHwgJFQJfpCgX6SFQgskqAlRcKAlhJa2zosSJ07i2LXj58Rjz4zHd9535r4OH3YSkiYQARI/WdLRlY7u2Xvdu89aewNP8AT/Z5DHeakmXMs3d25usKRApGBwzrJuc5ZtW7D0Cge9RCtqMp+YXEzGZ8v/UwKR+gaxofdTT6VQ/4mK4NsQqvaFo0GXFPTIkEUOFd20UpmSFkuk04uLySlWTAw5iuPnZ6+9P2Waxn9HYNOuAy2qa+PzXFV0394trU3PbG/x9TT7eb9bgihQEAIwBhimDTVfNkdm0tpbF6dTf7o4OppPTJ11ZYdOT1wdjP9HBNbv/lxvQtn4ze2be/YeOrgx3NdZI4s8BRjAAICxleedIISAEMAwLPP61FL55RNX4mfOD58LGRPHbg8NvJ/JqPajCHAPbnQ//Wx3yr31Wy/079j30te213Y2Vou5oo5c0UDZsHBpLImiZoIQAqfMgxDAshksm4HjKI0EXeKeDfWetMY3XIrRtWs61rmaq7nY3OxM8d8SaO3aUq36dx36woGnP/Pdr/QF/W4HDwDzSyUIPEWVIuDCaBK1fgVhv4KF5RKyRQNT8Rxup4sIemRwlECRBdoR9Urnx3OhyTTX1tvT3bB3Q21mbOyj+YpuPJqAs/PZg90bt77wgxd3NgQ8Dt5mDIQQpLJlKBIPr0uGIvHIlXQ011YhldVwYTQFReZBQOB3S5BFDowBHqdEP4oVxOuxoi9dFqLPP7O789Nbwk41OTc3u5Ap3cnJ3/369Tsjmrtx/9f7u2sjASdv2ytVZmCwbQaeoyiVDUwv5hDyOhBL5mFZDC6Zh5qvwCFx4DmKO5eDEgKRpyCE8gWDBGMFx1NfPfiNSMRV7Gg9dvTnr52J37iPgOnr3LZuTUPnng1RN2P3rphtAy4HD5eDR7FsQhQ4ZIo6qhQB7fUetEaq7v1OSsAAUEqQUDUMTS+DEsBmhLcYdQUCgfbN+1/0Sbd/5w14ml4fuMaP8wDQtrbbkxfD27Z1RcPVbpm3VwlQQgAKREMuMAZ4XRz29tZiVQgAAIEjYFgp1R0kMxp+fHIUN2czIIRAESk2rfGDUso73b5gS9S3u784JIQa+sd4n9frbO/pW3e57O9oi/rdIABhwFKujLFYFoQSVLsleJ0iFImHwFNwlNz1AdNmqOgWskUdC6qG69Mq3rocx7UpFZbNIPAUX9zdhF1dNSvVSQ/zkjblCzqxZi1JKHwo4AnvaDFad9c7wl31Th4gYITA65IQ8Mh4d3gRl8eXkcqvuKzMc5BEHhwlsC0bmm4hV9ahFnRkCwZKFROEAG6HgLa6Kjy3swGf3dEIhyzATA5Bu/Qd09IyhmYiu2RIizwjIoMcMvfXXEPr4t9RMXvBhbaDVjWjM+pFR4MPamFFajfnMpiM5zG/VIRa1KHpFizbBqUE9QEnuqMiwn4HWiJudDX6sDbqhc9JYOdmUBk7gcrIK6aZmSmn8hgbTvr/eGqaDROPx6N8sv/z6yvBvsOH9sl7tyuDspm8DMJJoP51oNXrwXnawbnrQCQ/GOeAyQToFoFhMdgMIATgKSByNgQYoFYOdiEOM30D5sIgrIVBWLlZs1yx1UQeIxfjwWOvXao6OXRjKkMAoKOzy11pee7whk19X/rZt3cFFSPGm/PvwLp9Flb6OlBZBqgIIvlAZD+I5AcRqwDeAUJ4MGYBpgam58DKS7C1FFBOgVXygM3AALNgcAu38sF3/zxd98aRgYlBNZOz7+sFG/d9eafq2fa9Vw/3b93TWyfbAGDqsEtx2Ooo7PQV2Ms3YWcnwbQEoGfBTA2wjRXts9VoBADlQTgHiOSF5YiYKdasjmQip0/8ZeInR48P3Pxn87vrA7NX3r4o9gT/cOT3wzW9rdUtHqfIM8qDuptAq5qAhgOAbYKZRbBKBqioYBUVTM8BZgnMNgFCQDgJENygsh+m4McrZxbLA+cmh0OlK7868UDy+6xYKxXtgGJPj2ccIU5y1fd1hJ08RykYWxU9W00gg0heECUM6mkG9XWAVveAC/SCC6wH9XeB87aBuurw5oV04YdHhyaU4q03Lpx+dUDX9X/djDKp+WK1S5z5cA5BTlRqetuCTlHgKGMPHlslxD6+CADTtMzj701kX/rFBzfF3MTruZFTv0kmFh86oXysHecSU8tehU6cu1VxxjOWp7XO6/C5ZcpxlILhkaCEgIGZiXRBf/nk1cSPfv3eIEtd/eny8PE347dj+qPOcQ/bzCWmln1C8eq1mFY4O5zi1bxB3Q6ROh08EXgOhMAG7i2tbOhTcTV//K/jqe//8oMbb79z8ZSy/OGRyfO/PaeVio8cRu5TwcMgiBJq1u5sLbvatlcF6je1N0Ua2xuD1SGfwimyIFQqppHKlqxbsXRmfHZxPp2I35BL0+cLc38bUZcSJh4DjzUVA4AvVC+J3mjQEjx+RiWFEULAGCN2pcQZOdXMxZeWF2e0x433BE9wB/8Aa3ZiVq1gDAMAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMTItMDFUMTQ6NDQ6MDIrMDE6MDBW0C0AAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTEyLTAxVDE0OjQ0OjAyKzAxOjAwJ42VvAAAAABJRU5ErkJggg==" /></svg>'
let SciLink;
let isSciLink;
let isRankTitle;

let default_easyScholarColour1 = "#ff9999";
let default_easyScholarColour2 = "#86dad1";
let default_easyScholarColour3 = "#ffe78f";
let default_easyScholarColour4 = "#ffd4a9";
let default_easyScholarColour5 = "#cce5ff";

let default_fontColour = "#000000";
let default_isFontBold = "noBold";
let default_skin = "soft_skin";
let default_fontSize = "13";

let easyScholarColour1;
let easyScholarColour2;
let easyScholarColour3;
let easyScholarColour4;
let easyScholarColour5;

let fontColour;
let skin;
let isFontBold;
let fontSize;


let titlesciif;
let titlescibase;
let titlexmu;
let titlescu;
let titleswjtu;
let titlepku;
let titlesci;
let titleajg;
let titleutd24;
let titlecscd;
let titlesciup;
let titlefdu;
let titlecssci;
let titlehhu;
let titlecug;
let titlecju;
let titleahci;
let titleswufe;
let titlessci;
let titlexju;
let titleruc;
let titlezhongguokejihexin;
let titleccf;
let titlecqu;
let titleeii;
let titlezju;
let titlenju;
let titleuibe;
let titlesciif5;
let titlecufe;
let titlesjtu;
let titlejci;
let titlesdufe;
let titleft50;
let titlexdu;
let titlefms;
let titleesi;
let titlecpu;
let titlesciwarn;
let titlesciUpTop;

let paperManagerWebsiteList = ["BaiduDetail", "CnkiDetail", "CnkiOverSeaDetail", "SpringerDetail", "IeeeDetail", "WOSDetail"
    , "AminerDetail", "PubmedDetail", "ReadPaperDetail", "ScienceDirectDetail", "YuntsgPubmedDetail"
    , "YuntsgDetail", "Google", "EmbaseDetail", "ScopusDetail", "XMOLDetail", 'WangfangDetail', 'CnkiSpace'
    , 'WeipuDetail', "SemanticDetail", "Jstor", "EiDetail", "NssdDetail", "ProquestDetail", "CambridgeDetail"
    , "OxfordDetail", "CnkiScholarDetail", "APAPsycnetDetail", "medWangFangDetail", "onlinelibraryWileyDetail", "pubscholarDetail", "mdpiDetail",
"acsDetail",'yiigleDetail',"spisDetail","philpapersDetail"];

let showRankingWebsiteList = ["Baidu", "BaiduDetail", "Aminer", "AminerDetail", "Dblp", "Ieee", "IeeeDetail",
    "Google", "GoogleCitations", "WOSDetail", "WOS", "Pubmed", "PubmedDetail", "ReadPaper", "ReadPaperDetail",
    "ScienceDirect", "ScienceDirectDetail", "Springer", "SpringerDetail", "YuntsgDetail", "YuntsgPubmedDetail"
    , "YuntsgXueshu", "Yuntsgen", "Yuntsgcn", "YuntsgPubmed", "CnkiClassic", "CnkiSentence", "CnkiDetail",
    "Embase", "EmbaseDetail", "Scopus", "ScopusDetail", "Huayi", "XMOL", "XMOLDetail", "XMOLSquare", "ScopusAuthor",
    "Wangfang", "WangfangDetail", "WOSSelect", "SpringerSelect", "SpringerSelectDetail", "JournalFinder", "CnkiSpace",
    "Weipu", "WeipuDetail", "Semantic", "SemanticDetail", "OldCnki", "ResearchGate", "CnkiAuthor", "Jstor", "Ei",
    "EiDetail", "Duke", "Wiley", "NudtChaoxing", "NudtChaoxingDetail", "Nssd", "NssdDetail", "Proquest", "ProquestDetail"
    , "Cambridge", "CambridgeDetail", "Oxford", "OxfordDetail", "Edinburge", "Duxiu", "CnkiScholar", "CnkiScholarDetail"
    , "ConnectedPapers", "ConnectedPapersDetail", "NewScopus", "NewScopusDetail", "CnkiOverSeaAuthor", "CnkiOverSeaDetail",
    "onlinelibraryWiley", "ResearchGateDetail", "onlinelibraryWileyDetail", "apsDetail", "APAPsycnet", "APAPsycnetDetail"
    , "medWangFang", "medWangFangDetail", "APAPsycnetmostcited", "APAPsycnetmostdl", "pubscholar", "pubscholarDetail", "mdpi", "mdpiDetail",
"acs", "acsDetail", "yiigle","yiigle2","yiigleDetail", "rsc","rscDetail","spis","spisDetail","spisJournal","heinonline","oldPubmed","oldPubmedDetail",
    "nature", "natureDetail", "letpub","philpapers", "philpapersDetail", "SpringerNew","pubmedProSearch" ];

// 工具 开始
function isPublicationEmpty(publications) {
    for (let publication in publications) {
        if (publications[publication] !== undefined && publications[publication].length >= 2) {
            return false;
        }
    }
    return true;
};

function changeColor() {


    $("span.easyscholar-1").css({"background-color": easyScholarColour1});
    $("span.easyscholar-2").css({"background-color": easyScholarColour2});
    $("span.easyscholar-3").css({"background-color": easyScholarColour3});
    $("span.easyscholar-4").css({"background-color": easyScholarColour4});
    $("span.easyscholar-5").css({"background-color": easyScholarColour5});

};

function changeFontColor() {
    $("span.easyscholar-ranking").css({"color": fontColour});
};

function changeFontBold() {
    if (isFontBold == "bold") {
        $("span.easyscholar-ranking").css({"font-weight": "bold"});
    }
};

function changeSkin() {
    if (skin == "square_skin") {
        $("span.easyscholar-ranking").css({
            "border-radius": "0px",
            "margin-right": "0px",
            "margin-left": "0px",
            "border-right": "1px solid black",
            "border-left": "1px solid black",
            "border-top": "1px solid black",
            "border-bottom": "1px solid black",
        });
    }
};

function changeFontSize() {
    $("span.easyscholar-ranking").css({"font-size": fontSize + "px"});
};

function hideSpan() {
    if ($("span.easyscholar-1").css("background-color") == "rgb(255, 255, 255)") {
        $("span.easyscholar-1").hide();
    } else {
        $("span.easyscholar-1").show();
    }
    if ($("span.easyscholar-2").css("background-color") == "rgb(255, 255, 255)") {
        $("span.easyscholar-2").hide();
    } else {
        $("span.easyscholar-2").show();
    }
    if ($("span.easyscholar-3").css("background-color") == "rgb(255, 255, 255)") {
        $("span.easyscholar-3").hide();
    } else {
        $("span.easyscholar-3").show();
    }
    if ($("span.easyscholar-4").css("background-color") == "rgb(255, 255, 255)") {
        $("span.easyscholar-4").hide();
    } else {
        $("span.easyscholar-4").show();
    }
    if ($("span.easyscholar-5").css("background-color") == "rgb(255, 255, 255)") {
        $("span.easyscholar-5").hide();
    } else {
        $("span.easyscholar-5").show();
    }

};

function infoNotice(text, type, timer = 6000, showConfirmButton = false, showDenyButton = false) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: showConfirmButton,
        confirmButtonText: "好的",

        showDenyButton: showDenyButton,
        denyButtonText: '已阅，一日内不再弹出',

        timer: timer,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    chrome.storage.local.get({
        "dialog_check_time": "2022-1-02",
    }, function (items) {
        let lastTime = new Date(items["dialog_check_time"]);
        let date = new Date();
        let curTimeSimple = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        let curTime = new Date(curTimeSimple);
        let days = parseInt(Math.abs(curTime - lastTime) / 1000 / 60 / 60 / 24); //把差的毫秒数转换为天数
        // 点击一日内不弹出，会重置为当前的时间。当差值>=1时，会弹出
        if (days >= 1) {
            Toast.fire({
                icon: type,
                title: "easyScholar提示您：" + text
            }).then((result) => {
                if (result.isDenied) {
                    console.log(curTimeSimple)
                    chrome.storage.local.set({
                        "dialog_check_time": curTimeSimple,
                    });
                }
            });
        }
    });
};

function cleanPapersName(oldPapersName) {
    let newPapersName = {};
    for (let key in oldPapersName) {
        if (oldPapersName[key] === undefined) {
            continue;
        }
        if (oldPapersName[key].length <= 1) {
            continue;
        }
        newPapersName[key] = oldPapersName[key].replaceAll("\n", "").replaceAll("\t", "").replaceAll("\r", "").trim();
    }
    return newPapersName;
};

function checkEdit(single) {
    if (single.closest('[contenteditable="true"], [contenteditable=""]').length > 0
        || single.attr("contenteditable") === 'true'
        || single.attr("contenteditable") === ''
        || $(single).find("textarea").length !== 0
        || $(single).find("input").length !== 0) {
        return true;
    }
    return false;
};

//js统计字符串中包含的特定字符个数
function getCharCount(strSource, char) {
    //统计字符串中包含{}或{xxXX}的个数
    let thisCount = 0;
    for (let i = 0; i < strSource.length; i++) {
        if (strSource.charAt(i) == char) {
            thisCount++;
        }
    }
    return thisCount;
}

function getCurrentWebSite(url) {
    if (url.indexOf("xueshu.baidu.com/usercenter/paper/show") != -1) {
        return "BaiduDetail";
    } else if (($("body > div.wrapper > div.main > div.container div.brief > div > h1").length !== 0) && $("#frame1").length === 0) {
        return "CnkiDetail";
    } else if (($("body > div.wrapper > div.main > div.container div.brief > div > h1").length !== 0) && $("#frame1").length !== 0) {
        return "CnkiOverSeaDetail";
    } else if (($("#gridTable table.result-table-list > thead > tr > th ").length <= 10
        && $("#gridTable table.result-table-list > thead > tr > th ").length >= 6) ) {
        return "CnkiClassic";
    } else if ($("#gridTable dl.result-detail-list dd div.middle").length !== 0) {
        return "CnkiSentence";
    } else if (((url.indexOf("link.springer.com") !== -1) && url.indexOf("/article/") !== -1)
        || ($("#main div.c-article-header > header >  ul > li.c-article-author-list__item > a" ).length !== 0)) {
        return "SpringerDetail";
    } else if (((url.indexOf("link.springer.com") !== -1) && (url.indexOf("/search?") !== -1) && url.indexOf('new-search=true') === -1 )
        || ($("ol.content-item-list > li.no-access").length !== 0)) {
        return "Springer";
    }else if (((url.indexOf("link.springer.com") !== -1) && (url.indexOf("/search?") !== -1) && url.indexOf('new-search=true') !== -1 )) {
        return "SpringerNew";
    } else if (((url.indexOf("ieeexplore.ieee.org") != -1) &&
            url.indexOf("/document/") != -1)
        || ($("#LayoutWrapper div.document-header-inner-container.row  div.row.document-title-fix  div.left-container > h1").length != 0)) {
        return "IeeeDetail";
    } else if (((url.indexOf("webofknowledge.com") != -1 || url.indexOf("clarivate.com") != -1)
            && url.indexOf("alldb/full-record") != -1)
        || ($("app-wos app-header mat-icon > svg").length != 0 && url.indexOf("/full-record/") != -1)) {
        return "WOSDetail";
    } else if (((url.indexOf("webofknowledge.com") != -1 || url.indexOf("clarivate.com") != -1)
            && (url.indexOf("wos/alldb/summary") != -1))
        || ($("app-records-list  div.data-section  div > app-jcr-sidenav").length != 0)) {
        return "WOS";
    } else if (url.indexOf("www.aminer.cn/pub/") != -1) {
        return "AminerDetail";
    } else if (($("#search-form > div.inner-wrap > a.pubmed-logo > img").length != 0
            && $("#search-results > section.search-results-list > div.search-results-chunks > div > article").length != 0)
        || ((url.indexOf("pubmed.ncbi") != -1) && (url.indexOf("term=") != -1))) {
        return "Pubmed";
    } else if (($("#search-form > div.inner-wrap > a.pubmed-logo > img").length != 0
            && $("#article-page > aside > div > div.actions-buttons.sidebar > div > button.citation-button.citation-dialog-trigger").length != 0)
        || ((url.indexOf("pubmed.ncbi") != -1) && (url.search(/\d{6}/g) != -1))) {
        return "PubmedDetail";
    } else if (url.indexOf("readpaper.com/paper/") != -1) {
        return "ReadPaperDetail";
    } else if (url.indexOf("readpaper.com/search/") != -1) {
        return "ReadPaper";
    } else if (url.indexOf("sciencedirect.com/science/article/") != -1
        || ($("form.QuickSearch .search-input").length != 0) && $("a.publication-title-link").length !== 0) {
        return "ScienceDirectDetail";
    } else if (url.indexOf("sciencedirect.com/search") != -1
        || ($("a[data-aa-name*='srp-srctitle-']").length != 0 && $("div.QuickSearchInput div.qs-field").length !== 0)) {
        return "ScienceDirect";
    } else if ($("#search_results div.clearfix #recordsFound li div.resultPreviewItem").length !== 0) {
        return "Embase";
    } else if ($("div[class*='RecordDetailsContent_content'] span.es-font-gulliver").length !== 0) {
        return "EmbaseDetail";
    } else if ($("#resultsBody #srchResultsList tr.searchArea").length !== 0) {
        return "Scopus"
    } else if ($("#container > micro-ui > document-search-results-page > div.micro-ui-namespace.document-search-results-page > section div.col-19").length !== 0) {
        return "NewScopus";
    } else if ($("#doc-details-page-container div.row > div.col > els-typography.hydrated").length != 0) {
        return "ScopusDetail";
    } else if ($("#doc-details-page-container div.row > div.col").length !== 0) {
        return "NewScopusDetail";
    } else if ($("#scopus-author-profile-page-control-microui__general-information-content").length != 0) {
        return "ScopusAuthor";
    } else if (url.indexOf("pm.yuntsg.com/details.html") != -1 || $(".main .detailsMain .detailsLeft a.detTitle").length != 0) {
        return "YuntsgPubmedDetail";
    } else if (url.indexOf("pm.yuntsg.com/searchList") != -1 || $("body div.bigScroll div.searchListDiv > div.searchMainDiv > div.searchListMain.wordMs  div.listMian ul.searchList").length != 0) {
        return "YuntsgPubmed";
    } else if (url.indexOf("xueshu.yuntsg.com/details.html") != -1 || $("#con_bottom #titleBtn").length != 0) {
        return "YuntsgDetail";
    } else if (url.indexOf("xueshu.yuntsg.com/result.html?active=xueshu") != -1 || $("div.con3_list #xueshuText #xueshulist_ul").length != 0) {
        return "YuntsgXueshu";
    } else if (url.indexOf("xueshu.yuntsg.com/result.html?active=en") != -1 || $(".con3_list #textView #list_ul p[style='width: 85%;']").length != 0) {
        return "Yuntsgen";
    } else if (url.indexOf("xueshu.yuntsg.com/result.html?active=cn") != -1 || $(".con3_list #textView #list_ul p[style='color:#615f63']").length != 0) {
        return "Yuntsgcn";
    } else if (((url.indexOf("scholar.google") != -1) || (url.indexOf("dailyheadlines.cc") != -1)
            || (url.indexOf("panda321.com") != -1) || (url.indexOf("scholar.ustc.cf") != -1)
            || (url.indexOf(".lanfanshu.cn") != -1))
        && (url.indexOf("/scholar?") != -1)
        || $("#gs_ab_btns > a.gs_btnL.gs_in_ib.gs_nph.gs_nta > span.gs_lbl").length !== 0
    || $("#gs_bdy_ccl > #gs_res_ccl > #gs_res_ccl_mid > ").length !== 0 ) {
        return "Google";
    } else if (((url.indexOf("scholar.google") !== -1) || (url.indexOf("dailyheadlines.cc") !== -1)
            || (url.indexOf("sc.panda321.com") !== -1) || (url.indexOf("scholar.ustc.cf") !== -1)
            || (url.indexOf("xueshu.lanfanshu.cn") !== -1)
            || (url.indexOf("scholar.lanfanshu.cn") !== -1)
        )
        && (url.indexOf("citations?") != -1)
        || ($("#gsc_prf_w #gsc_prf").length != 0)) {
        return "GoogleCitations";
    } else if (url.indexOf("xueshu.baidu.com/s?") != -1) {
        return "Baidu";
    } else if (url.indexOf("www.aminer.cn/search") !== -1 || url.indexOf("www.aminer.cn/profile") !== -1) {
        return "Aminer";
    } else if (url.indexOf("dblp.uni-trier.de/") !== -1
        || url.indexOf("dblp.org/") !== -1
        || url.indexOf("dblp.dagstuhl.de/") !== -1
        || $("#completesearch-publs div.body").length !== 0) {
        return "Dblp";
    } else if ((url.indexOf("ieeexplore.ieee.org/search/searchresult.jsp") != -1)
        || ($("xpl-results-list div.List-results-items").length != 0)) {
        return "Ieee";
    } else if ($("#maincontent div.right_mianNEWSe table.jian_mu_list").length != 0) {
        return "Huayi";
    } else if ($("#mianBody div.magazine-senior-search-content div.magazine-senior-search-results-list").length != 0) {
        return "XMOL";
    } else if ($("#mianBody  div.magazine-model-content-new").length != 0) {
        return "XMOLSquare";
    } else if ($("#content > div.magazine-gridecontent > div.maga-content").length != 0) {
        return "XMOLDetail";
    } else if ($("div.top-control-bar div.sort-item").length != 0) {
        return "Wangfang";
    } else if ($("div.detailIntro div.pd20 div.detailTitle").length != 0) {
        return "WangfangDetail";
    } else if ($("app-journal-search-results div.ng-star-inserted").length != 0) {
        return "WOSSelect";
    } else if ($("div.container-type-manuscript-details div.container").length != 0) {
        return "SpringerSelect";
    } else if (url.indexOf("journalsuggester.springer.com/select-journal?journalId") != -1) {
        return "SpringerSelectDetail";
    } else if (url.indexOf("journalfinder.elsevier.com") != -1) {
        return "JournalFinder";
    } else if ($(".resault-cont .filtrate-wrap .filtrate .ti").length != 0) {
        return "CnkiSpace";
    } else if ($("#searchlist > div.layui-form.search-main > div.search-result-list").length != 0) {
        return "Weipu";
    } else if ($("#body div.article-main > div.article-detail > div.abstract > span.abstract").length != 0) {
        return "WeipuDetail";
    } else if ($("#main-content div.flex-item.flex-item--width-66.flex-item__left-column div.result-page ").length !== 0) {
        return "Semantic";
    } else if ($('#main-content  div.flex-item.flex-item--width-66.flex-item__left-column > div > ul.flex-row-vcenter.paper-meta').length !== 0) {
        return "SemanticDetail";
    } else if ($("#iframeResult").contents().find(".GridTableContent .GTContentTitle").length != 0) {
        return "OldCnki";
    } else if ($(".nova-legacy-v-publication-item__stack > .nova-legacy-v-publication-item__stack-item > .nova-legacy-v-publication-item__meta").length !== 0
        || $(".content-grid__columns--wide .content-page-header__meta").length !== 0 || $(".nova-legacy-c-card__body.nova-legacy-c-card__body--spacing-inherit").length !== 0) {
        return "ResearchGate";
    } else if ($(".nova-legacy-o-stack__item > .nova-legacy-c-card > .nova-legacy-c-card__body > .nova-legacy-o-stack > .nova-legacy-o-stack__item").length !== 0) {
        return "ResearchGateDetail";
    } else if ($("#kcms-author-info").length !== 0 && $("#kcms-author-duplicate-author").length !== 0) {
        return "CnkiAuthor";
    } else if ($("#zzwx").length != 0 && $("#frame2").length !== 0) {
        return "CnkiOverSeaAuthor";
    } else if ($("#search-results-vue-mount div.search-results-area div.search-results-layout__content ol.search-results-layout__content__list ").length != 0) {
        return "Jstor";
    } else if ($("div.no-padding-left #results-region .result-row").length != 0) {
        return "Ei";
    } else if ($("#main-article > h2.MuiTypography-root").length != 0) {
        return "EiDetail";
    } else if (url.indexOf("https://www.dukeupress.edu/journals") != -1 && $(".bottom10 div.book-tile").length != 0) {
        return "Duke";
    } else if (url.indexOf("https://www.wiley.com/") != -1 && $("section.product-item").length != 0) {
        return "Wiley";
    } else if ($(".mainBx .middleBox .newSearchArticleBox .searchLIst #mainlist").length !== 0) {
        return "NudtChaoxing";
    } else if ($(".cardLeft > .savelist > .savelist_con .card_name").length != 0) {
        return "NudtChaoxingDetail";
    } else if ($("#app .center-content .content .journal-right .jour-pic ul.clr .el-checkbox-group").length != 0) {
        return "Nssd";
    } else if ($(".hot-doc .book-pic .b-content #h2_title_c").length != 0) {
        return "NssdDetail";
    } else if ($(".resultsPageSpecific .row .lor-wrapper .resultListContainer ul.resultItems").length != 0) {
        return "Proquest";
    } else if ($(".header_docview_page .row #authordiv > span.titleAuthorETC.jnlArticle").length != 0) {
        return "ProquestDetail";
    } else if ($(".split-panel .search #maincontent .reading-width .results").length != 0) {
        return "Cambridge";
    } else if ($("#article-tab > div.scrollspy-content > dl > div:nth-child(2) > dd > div.content__journal").length != 0) {
        return "CambridgeDetail";
    } else if ($(".page-column-wrap #ContentColumn .sr-alert-linl").length !== 0 && url.indexOf("academic.oup.com") !== -1) {
        return "Oxford";
    } else if ($("#ContentColumn > div.content-inner-wrap > div.widget.widget-ArticleTopInfo.widget-instance-OUP_ArticleTop_Info_Widget > div > div.widget-items").length !== 0
        && url.indexOf("academic.oup.com") !== -1
    ) {
        return "OxfordDetail";
    } else if ($("#allTabsContainer > div.clear.search-results-body form ol.search-results ").length != 0) {
        return "Edinburge";
    } else if ($("#wrap .centerMain #searchinfo span.leftF").length != 0) {
        return "Duxiu";
    } else if ($("#__next > div > div.search_img_bg_d > div.mainC > div.content-box > div.rightC > div.mainContent > div.searchResultContainer").length != 0) {
        return "CnkiScholar";
    } else if ($("#__next > div > div.detail_detail-main__11Hij > div.detail_content__3IojM > div.detail_content-left__2vUAX > div > div.undefined.clearfix").length != 0) {
        return "CnkiScholarDetail";
    } else if ($("#desktop-app > div.basic-page.main-router > div.search-container").length != 0) {
        return "ConnectedPapers";
    } else if ($("#desktop-app div.main-router  .abtract-scrollbox.shadowed-box.bg-white div.metadata.publication").length !== 0) {
        return "ConnectedPapersDetail";
    } else if (url.indexOf("onlinelibrary.wiley.com") !== -1 && $(".search-result > #search-result").length !== 0) {
        return "onlinelibraryWiley";
    } else if (url.indexOf("onlinelibrary.wiley.com") !== -1 && $("#journal-banner-image").length !== 0) {
        return "onlinelibraryWileyDetail";
    } else if (url.indexOf("journals.aps.org") !== -1 && $("#header > div > div.columns > h2.title > a").length !== 0) {
        return "apsDetail";
    } else if (url.indexOf("psycnet.apa.org/search/results?id") !== -1){
        return "APAPsycnet";
    } else if (url.indexOf("psycnet.apa.org/PsycARTICLES/mostcited") !== -1 || url.indexOf("psycnet.apa.org/PsycARTICLES/mostdl") !== -1 ){
        return "APAPsycnetmostcited";
    } else if (url.indexOf("psycnet.apa.org/search/display?id=") !== -1 || url.indexOf("psycnet.apa.org/record/") !== -1){
        return "APAPsycnetDetail";
    } else if (url.indexOf("med.wanfangdata.com.cn/Paper/Search") !== -1){
        return "medWangFang";
    } else if (url.indexOf("med.wanfangdata.com.cn/Paper/Detail") !== -1){
        return "medWangFangDetail";
    } else if (url.indexOf("pubscholar.cn/explore") !== -1 || $(".ContentLayout .ContentLayout__mainColumn > .AppSearchMain > .AppSearchTabContent > .List").length !== 0){
        return "pubscholar";
    }else if (url.indexOf("pubscholar.cn/articles/") !== -1 || $(".ArticleContentLayout__mainColumn > .Article > .ArticleContent > .ArticleInfo > h1.ArticleInfo__title").length !== 0){
        return "pubscholarDetail";
    }else if (url.indexOf("www.mdpi.com") !== -1 && ($("#middle-column > #js-small-main-top-container").length !== 0 || $(".article-listing > .jscroll").length !== 0) ){
        return "mdpi";
    }else if (url.indexOf("www.mdpi.com") !== -1 && ($("article > .html-article-content > h1.title").length !== 0)){
        return "mdpiDetail";
    }else if (url.indexOf("pubs.rsc.org/en/results?searchtext=") !== -1){
        return "rsc";
    }else if (url.indexOf("pubs.rsc.org/en/content/articlelanding/") !== -1){
        return "rscDetail";
    }else if (url.indexOf("pubs.acs.org/action/doSearch?") !== -1){
        return "acs";
    }else if (url.indexOf("pubs.acs.org/doi/") !== -1 && $(".article_header-left > h1.article_header-title").length !== 0){
        return "acsDetail";
    }else if (url.indexOf("www.yiigle.com/Paper/Search") !== -1 || $(".s_searchResult > .s_searchResult_l > .el-row > div[role='group']").length !== 0){
        return "yiigle";
    }else if ($(".search-result-main-left > .result__main > .list-item > .list-item-main ").length !== 0){
        return "yiigle2";
    }else if (url.indexOf("rs.yiigle.com/cmaid/") !== -1){
        return "yiigleDetail";
    }else if (url.indexOf("spis.hnlat.com/scholar/list") !== -1){
        return "spis";
    }else if (url.indexOf("spis.hnlat.com/scholar/detail/") !== -1){
        return "spisDetail";
    }else if (url.indexOf("spis.hnlat.com/journal/doSearch?") !== -1){
        return "spisJournal";
    }else if ($(".control-group > .controls > .row > .section_type_article_b > .lucene_search_result_b").length !== 0){
        return "heinonline";
    }else if (url.indexOf("www.ncbi.nlm.nih.gov/pmc") !== -1 && $("#maincontent").length !== 0){
        return "oldPubmed";
    }else if (url.indexOf("www.ncbi.nlm.nih.gov/pmc/articles") !== -1){
        return "oldPubmedDetail";
    }else if (url.indexOf("www.nature.com/search") !== -1){
        return "nature";
    }else if (url.indexOf("www.nature.com/articles/") !== -1){
        return "natureDetail";
    }else if (url.indexOf("www.letpub.com.cn/index.php?journalid=") !== -1){
        return "letpub";
    }else if (url.indexOf("philpapers.org/s/") !== -1){
        return "philpapers";
    }else if (url.indexOf("philpapers.org/rec/") !== -1){
        return "philpapersDetail";
    }else if (url.indexOf("www.pubmed.pro/search/") !== -1){
        return "pubmedProSearch";
    }

};

function addPapersRank(papersName, data) {
    data["url"] = window.location.href;
    data["version"] = chrome.runtime.getManifest().version;
    data["publicationName"] = cleanPapersName(data["publicationName"]);
    if (Object.keys(data["publicationName"]).length > 0 && !isPublicationEmpty(data["publicationName"])) {
        chrome.runtime.sendMessage({
            action: "getPapersRank",
            data: data
        }, function (response) {
            if (response.code === 10007) {
                infoNotice(response.msg, "info");
                setTimeout(() => {
                    window.open("https://www.easyscholar.cc");
                }, 6000);
                return;
            }
            if (response.code !== 200) {
                infoNotice(response.msg, "info", 6000, true, true);
                return;
            }
            let titleAddInfo = response.data.titleAddInfo;
            if (titlesciif && titleAddInfo !== undefined && titleAddInfo !== null && titlesciif.indexOf(titleAddInfo) === -1) {
                titlesciif += titleAddInfo;
                titlescibase += titleAddInfo;
                titlexmu += titleAddInfo;
                titlescu += titleAddInfo;
                titleswjtu += titleAddInfo;
                titlepku += titleAddInfo;
                titlesci += titleAddInfo;
                titleajg += titleAddInfo;
                titleutd24 += titleAddInfo;
                titlecscd += titleAddInfo;
                titlesciup += titleAddInfo;
                titlefdu += titleAddInfo;
                titlecssci += titleAddInfo;
                titlehhu += titleAddInfo;
                titlecug += titleAddInfo;
                titlecju += titleAddInfo;
                titleahci += titleAddInfo;
                titleswufe += titleAddInfo;
                titlessci += titleAddInfo;
                titlexju += titleAddInfo;
                titleruc += titleAddInfo;
                titlezhongguokejihexin += titleAddInfo;
                titleccf += titleAddInfo;
                titlecqu += titleAddInfo;
                titleeii += titleAddInfo;
                titlezju += titleAddInfo;
                titlenju += titleAddInfo;
                titleuibe += titleAddInfo;
                titlesciif5 += titleAddInfo;
                titlecufe += titleAddInfo;
                titlesjtu += titleAddInfo;
                titlejci += titleAddInfo;
                titlesdufe += titleAddInfo;
                titleft50 += titleAddInfo;
                titlexdu += titleAddInfo;
                titlefms += titleAddInfo;
                titleesi += titleesi;
            }
            let papersRank = response.data.publicationRankList;
            let url = window.location.href;
            for (let i = 0; i < papersRank.length; i++) {
                for (let key in papersRank[i]) {
                    if (key === "tempID" || key === "sciUpSmall") {
                        continue;
                    }
                    if (key === "sciUp" && ("sciUpSmall" in papersRank[i])) {
                        dosciUpPaperRank(papersRank[i][key], papersRank[i], papersRank[i]["sciUpSmall"]);
                    } else {
                        if (isEval) {
                            eval('do' + key + 'PaperRank(papersRank[i][key], papersRank[i])');
                        } else {
                            window['do' + key + 'PaperRank'](papersRank[i][key], papersRank[i]);
                        }
                    }
                }
                hideSpan();
                changeColor();
                changeFontColor();
                changeFontBold();
                changeSkin();
                changeFontSize();
                docnkiOverSeaPaperRankCss()
            }
            let currentWebSite = getCurrentWebSite(url);
            if (currentWebSite === "Pubmed"
                || currentWebSite === "PubmedDetail"
                || currentWebSite === "Dblp"
                || currentWebSite === "YuntsgPubmed"
                || currentWebSite === "YuntsgPubmedDetail"
            ) {
                chrome.storage.local.get({
                    "pubmed_show_title": true
                }, function (items) {
                    if (items.pubmed_show_title) {
                        let papersTitle = response.data.pubmedAbbFullArrayList;
                        for (let key in papersTitle) {
                            doTitlePaperRank(papersTitle[key], key);
                            changeColor();
                        }
                    }
                });
            }

            let publicationCustomRankList = response.data.publicationCustomRankList;
            let publicationCustomRankInfoList = response.data.publicationCustomRankInfoList;
            for (let i in publicationCustomRankList) {
                let tempID = publicationCustomRankList[i].split("&&&")[0];
                let rankInfoId = publicationCustomRankList[i].split("&&&")[1];
                let level = publicationCustomRankList[i].split("&&&")[2];
                let publicationCustomRankInfo;

                for (let j in publicationCustomRankInfoList) {
                    if (publicationCustomRankInfoList[j].uuid === rankInfoId) {
                        publicationCustomRankInfo = publicationCustomRankInfoList[j];
                        break;
                    }
                }
                let levelText;
                if (publicationCustomRankInfo === undefined) {
                    continue;
                }

                if (level === "1") {
                    levelText = publicationCustomRankInfo.oneRankText;
                } else if (level === "2") {
                    levelText = publicationCustomRankInfo.twoRankText;
                } else if (level === "3") {
                    levelText = publicationCustomRankInfo.threeRankText;
                } else if (level === "4") {
                    levelText = publicationCustomRankInfo.fourRankText;
                } else if (level === "5") {
                    levelText = publicationCustomRankInfo.fiveRankText;
                }
                if (levelText === undefined) {
                    continue
                }

                let paper = {};
                paper["tempID"] = tempID;
                doCustomPaperRank(level, levelText, publicationCustomRankInfo.abbName, publicationCustomRankInfo.uuid, paper);

                hideSpan();
                changeColor();
                changeFontColor();
                changeFontBold();
                changeSkin();
                changeFontSize();
                docnkiOverSeaPaperRankCss()
            }

        });
    }
};

function speedTitleHref() {
    // $('.easyscholar-ranking').tooltip(
    //     {
    //         show: {effect: "none", delay: 300}
    //     });
};

// 工具结束

// 排名开始


function mainShowRanking(optionCheckd) {


    if ($.inArray("all", optionCheckd) != -1) {
        optionCheckd.splice($.inArray("all", optionCheckd), 1);
    }

    if ($.inArray("sci-base", optionCheckd) != -1) {
        optionCheckd.splice($.inArray("sci-base", optionCheckd), 1, "sciBase");
    }

    if ($.inArray("sci-up", optionCheckd) != -1) {
        optionCheckd.splice($.inArray("sci-up", optionCheckd), 1, "sciUp");
    }

    let url = window.location.href;
    let website = getCurrentWebSite(url);
    if (website != null && $.inArray(website, showRankingWebsiteList) != -1) {
        if (isEval) {
            eval("get" + website + "PaperNames()");
        } else {
            window["get" + website + "PaperNames"]();
        }
        hideSpan();
        changeColor();
        changeFontColor();
        changeFontBold();
        changeSkin();
        changeFontSize();

        speedTitleHref();
    }

};

// ------------------这里开始获取网站的文章名字 start
function getBaiduPaperNames() {

    let data = {};

    let papersName = {};
    let allPaperDiv = $("div.result");

    allPaperDiv.each(function () {
        let hrefName;
        let paperID = Math.floor(Math.random() * 100000);
        let hrefNameParent;

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");

        if (flag1.length == 0) {
            hrefNameParent = singlePaperDiv.find("div.sc_info span:eq(1) a");
            if (hrefNameParent.attr("title") != undefined) {
                hrefName = hrefNameParent.attr("title").replace("《", "").replace("》", "").toUpperCase();
            }
            let title = singlePaperDiv.find("h3.t a");
            if (title.length == 0) {
                return true;
            }
            title.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
            papersName[paperID] = hrefName;
        }

    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "百度学术";
    addPapersRank(papersName, data)
};

function getBaiduDetailPaperNames() {

    let papersName = {};

    let paperName = $("div.main-info > h3");
    if (paperName.parent().find("span.easyScholarPaperFlag").length == 0) {
        let paperID = Math.floor(Math.random() * 100000);
        let hrefName = $("div.container_right a.journal_title").text().toUpperCase();

        paperName.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
        papersName[paperID] = hrefName;
    }

    let allPaperDiv = $("p.sc_message");

    allPaperDiv.each(function () {
        let hrefName;
        let paperID = Math.floor(Math.random() * 100000);


        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.parent().find("span.easyScholarPaperFlag");

        if (flag1.length == 0) {
            hrefName = singlePaperDiv.find("a.sc_info_a:last").text();
            if (hrefName != undefined) {
                hrefName = hrefName.replace("《", "").replace("》", "").toUpperCase();
            }
            let title = singlePaperDiv.parent().find("p.rel_title a");
            if (title.length == 0) {
                return true;
            }
            title.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
            papersName[paperID] = hrefName;
        }
    });

    let data = {};

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "百度学术详情页";

    addPapersRank(papersName, data)
};

function getAminerPaperNames() {

    let data = {};

    let papersName = {};
    let allPaperDiv = $("div.paper-item");

    allPaperDiv.each(function () {

        let hrefName;
        let paperID = Math.floor(Math.random() * 100000);


        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");

        if (flag1.length == 0) {
            hrefName = singlePaperDiv.find(".conf-info-zone > .venue-link > .venue-link:first").text().toUpperCase();
            if (hrefName.indexOf("（") > 0) {
                hrefName = hrefName.split("（")[0]
            }
            if (hrefName.indexOf("(") > 0) {
                hrefName = hrefName.split("(")[0]
            }
            let title = singlePaperDiv.find("div.title-line");
            if (title.length == 0) {
                return true;
            }
            title.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
            papersName[paperID] = hrefName;
        }

    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "Aminer";
    addPapersRank(papersName, data)
};

function getAminerDetailPaperNames() {

    let data = {};

    let papersName = {};

    let hrefName;
    if ($("span.easyScholarPaperFlag").length === 0) {
        let paperID = Math.floor(Math.random() * 100000);

        hrefName = $(".a-aminer-components-pops-venue-venue-link-name").text();
        if(!hrefName){
            hrefName = $(".a-aminer-core-pub-index-confInfo > span:first").text();
        }
        hrefName = hrefName.toUpperCase();
        let node = $(".titleline");
        if (node.length == 0) {
            return null;
        }
        if (hrefName.indexOf("（") > 0) {
            hrefName = hrefName.split("（")[0]
        }
        if (hrefName.indexOf("(") > 0) {
            hrefName = hrefName.split("(")[0]
        }
        node.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
        papersName[paperID] = hrefName;
    }

    let allPaperDiv = $(".a-aminer-core-pub-c-reference-tree-content");

    allPaperDiv.each(function () {

        let hrefName;
        let paperID = Math.floor(Math.random() * 100000);


        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");

        if (flag1.length === 0) {
            hrefName = singlePaperDiv.find(".a-aminer-core-pub-c-reference-tree-sciInfo").text().toUpperCase();
            if(hrefName){
                singlePaperDiv.find("p.a-aminer-core-pub-c-reference-tree-titles").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
                hrefName = hrefName.substring(0, hrefName.length - 5)
                papersName[paperID] = hrefName;
            }
        }

    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "Aminer详情页";
    addPapersRank(papersName, data)
};

function getDblpPaperNames() {

    let data = {};

    let papersName = {};
    let allPaperDiv = $(".publ-list li.entry").filter(".article, .inproceedings");

    allPaperDiv.each(function () {


        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");

        let paperID = Math.floor(Math.random() * 100000);

        if (flag1.length === 0) {
            let node = singlePaperDiv.children("cite.data");
            if (node.length === 0) {
                return true;
            }
            let abbName = singlePaperDiv.find("a span[itemprop='isPartOf'] span[itemprop='name']").text().replace(/\./g, "").toUpperCase();
            papersName[paperID] = abbName;
            node.append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "Dblp";
    addPapersRank(papersName, data)
};

function getIeeePaperNames() {

    let data = {};

    let papersName = {};
    let allPaperDiv = $("xpl-results-list div.List-results-items");

    allPaperDiv.each(function () {

        let hrefName;
        let paperID = Math.floor(Math.random() * 100000);


        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");

        if (flag1.length == 0) {
            hrefName = singlePaperDiv.find("div.hide-mobile div.result-item-align div.description a:first").text().toUpperCase();
            let title = singlePaperDiv.find("h3.text-md-md-lh");
            if (title.length == 0) {
                return true;
            }

            title.append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
            papersName[paperID] = hrefName;
        }

    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "Ieee";
    addPapersRank(papersName, data)
};

function getIeeeDetailPaperNames() {

    let data = {};

    let papersName = {};

    let hrefName;
    let paperID = Math.floor(Math.random() * 100000);


    let flag1 = $("span.easyScholarPaperFlag");

    if (flag1.length == 0) {
        hrefName = $("div.stats-document-abstract-publishedIn > a:first").text().toUpperCase();
        let title = $("h1.document-title span:first");
        if (title.length == 0) {
            return true;
        }
        title.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
        papersName[paperID] = hrefName;
    }


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "IEEE详情页";
    addPapersRank(papersName, data)
};

function getGooglePaperNames() {
    let data = {};

    let papersName = {};
    let allPaperDiv = $("#gs_res_ccl_mid > div > div.gs_ri");
    allPaperDiv.each(function () {
        let hrefName;
        let paperID = Math.floor(Math.random() * 100000);
        let hrefNameParent;

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");

        if (flag1.length == 0) {
            let pattern = /- .*?(?=, [0-9]{4})/;
            let journal = $(this).find("div.gs_a").text().match(pattern);
            if (journal != undefined) {
                // hrefName = journal[0].toUpperCase();
                hrefName = journal[0].substring(2).toUpperCase();
            } else {
                return true; // 跳过本次循环
            }
            // let node = singlePaperDiv.find("h3.gs_rt > a:first");
            let node = singlePaperDiv.find("h3.gs_rt");
            if (node.length == 0) {
                return true;
            }
            if (hrefName.indexOf("…") != -1) {
                let el = document.createElement("span");
                el.textContent = " 查询文献来源中... ";
                $(el).css("color", "#ff0000");
                $(el).css("font-weight", "bold");
                $(el).attr("class", "easyScholarTemp");
                $(this).addClass("easyScholarPrepareFind");
                node.after($(el));
                return true;
            }
            node.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
            papersName[paperID] = hrefName;
        }

    });

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "谷歌学术";
    addPapersRank(papersName, data)


    let prepareFindElement = $("div.easyScholarPrepareFind");
    prepareFindElement.each(function (k, v) {
        let paperID2 = Math.floor(Math.random() * 10000);
        let delay = Math.floor(Math.random() * (2000 - 1000 + 1) + 1500);
        let singlePrepareFindElement = $(this);
        if (singlePrepareFindElement.find("span.easyScholarPaperFlag").length === 0) {
            // let node = singlePrepareFindElement.find("h3.gs_rt > a:first");
            let node = singlePrepareFindElement.find("h3.gs_rt");
            node.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID2 + '" > </span>'));
            setTimeout(function () {
                let code = singlePrepareFindElement.parent().attr("data-cid");
                let url;
                if (window.location.href.indexOf("https://scholar.google.com/scholar?scilib=") !== -1) {
                    url = "https://" + document.location.hostname + "/scholar?scila=" + code +
                        "&output=cite&scirp=1&hl=zh-CN";
                } else {
                    url = "https://" + document.location.hostname + "/scholar?q=info:" + code +
                        ":scholar.google.com/&output=cite&scirp=0&hl=zh-CN";
                }
                $.ajax({
                    url: url,
                    method: "get"
                }).then(function (resp) {
                    singlePrepareFindElement.find("span.easyScholarTemp").hide();
                    let div = document.createElement("div");
                    let $divAppendContents = $(div).append(resp);
                    let temp = $divAppendContents.find("tr");
                    let title;
                    $.each(temp, function () {
                        if ($(this).find("th.gs_cith").text() == "MLA" || $(this).find(
                            "th.gs_cith").text() == "APA") {
                            title = $(this).find("div.gs_citr i:first").text().toUpperCase();
                            return false;	// break
                        }
                    });

                    let data2 = {};
                    let papersName2 = {};
                    papersName2[paperID2] = title;
                    data2["paperTotal"] = Object.keys(papersName2).length;
                    data2["requirePublicationRank"] = optionCheckd;
                    data2["publicationName"] = papersName2;
                    if (Object.keys(papersName2).length > 0) {
                        chrome.runtime.sendMessage({
                            action: "getPapersRank",
                            data: data2
                        }, function (response) {
                            let papersRank = response.data.publicationRankList;
                            for (let i = 0; i < papersRank.length; i++) {
                                for (let key in papersRank[i]) {
                                    if (key === "tempID" || key === "sciUpSmall") {
                                        continue;
                                    }
                                    if (key === "sciUp" && ("sciUpSmall" in papersRank[i])) {
                                        dosciUpPaperRank(papersRank[i][key], papersRank[i], papersRank[i]["sciUpSmall"]);
                                    } else {
                                        if (isEval) {
                                            eval('do' + key + 'PaperRank(papersRank[i][key], papersRank[i])');
                                        } else {
                                            window['do' + key + 'PaperRank'](papersRank[i][key], papersRank[i]);
                                        }
                                    }
                                }
                            }


                            let publicationCustomRankList = response.data.publicationCustomRankList;
                            let publicationCustomRankInfoList = response.data.publicationCustomRankInfoList;
                            for (let i in publicationCustomRankList) {
                                let tempID = publicationCustomRankList[i].split("&&&")[0];
                                let rankInfoId = publicationCustomRankList[i].split("&&&")[1];
                                let level = publicationCustomRankList[i].split("&&&")[2];
                                let publicationCustomRankInfo;

                                for (let j in publicationCustomRankInfoList) {
                                    if (publicationCustomRankInfoList[j].uuid === rankInfoId) {
                                        publicationCustomRankInfo = publicationCustomRankInfoList[j];
                                        break;
                                    }
                                }
                                let levelText;
                                if (publicationCustomRankInfo === undefined) {
                                    continue;
                                }

                                if (level === "1") {
                                    levelText = publicationCustomRankInfo.oneRankText;
                                } else if (level === "2") {
                                    levelText = publicationCustomRankInfo.twoRankText;
                                } else if (level === "3") {
                                    levelText = publicationCustomRankInfo.threeRankText;
                                } else if (level === "4") {
                                    levelText = publicationCustomRankInfo.fourRankText;
                                } else if (level === "5") {
                                    levelText = publicationCustomRankInfo.fiveRankText;
                                }
                                if (levelText === undefined) {
                                    continue
                                }

                                let paper = {};
                                paper["tempID"] = tempID;
                                doCustomPaperRank(level, levelText, publicationCustomRankInfo.abbName, publicationCustomRankInfo.uuid, paper);
                                hideSpan();
                                changeColor();
                                changeFontColor();
                                changeFontBold();
                                changeSkin();
                                changeFontSize();
                            }
                        });
                    }

                });
            }, delay * k);
        }
    });
};

function getGoogleCitationsPaperNames() {

    let data = {};

    let papersName = {};
    let allPaperDiv = $("tr.gsc_a_tr");

    allPaperDiv.each(function () {
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");

        if (flag1.length == 0) {

            let node = singlePaperDiv.find("td.gsc_a_t > div:first"); // 加first，防止和其他插件发送冲突
            if (node.length == 0) {
                return true;
            }
            node.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
            let title = $(this).find("div.gs_gray")[1].textContent;
            // 不为空字符串
            if (title && /.*(?=,\s\d{4})/.test(title)) {
                title = title.match(/.*(?=,\s\d{4})/)[0];
                if (/\(\w+\), \d+-\d+|, \d+-\d+/g.test(title)) {
                    title = title.replaceAll(/\(\w+\), \d+-\d+|, \d+-\d+/g, "").trim();
                }
                // 去除年份+空格
                if ((/^\d{4}/g.test(title))) {
                    title = title.replace(/^\d{4}/g, "").trim();
                }
                // 去除末尾的数字
                if (/\d+$/g.test(title)) {
                    title = title.replace(/\d+$/g, "").trim();
                }
                papersName[paperID] = title.toUpperCase();
            }
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "谷歌学术人物界面";
    addPapersRank(papersName, data);
};

function getWOSDetailPaperNames() {
    getWOSPaperNames();
};

function getWOSPaperNames() {

    let data = {};

    let papersName = {};
    let allPaperDiv = $("app-jcr-sidenav");

    allPaperDiv.each(function () {
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");

        if (flag1.length == 0) {
            let title = singlePaperDiv.find("span[lang='en']");

            singlePaperDiv.append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
            let name = title.text().trim();
            if (name.length != 0) {
                papersName[paperID] = name.toUpperCase();
            } else {
                let source2 = singlePaperDiv.find("a[lang='en']");
                let name2 = source2.text().trim();
                if (name2.length != 0) {
                    papersName[paperID] = name2.toUpperCase();
                }
            }

            let source_cn = singlePaperDiv.find("span[lang='zh-cn']");
            let name_cn = source_cn.text().trim();
            if (name_cn.length != 0) {
                papersName[paperID] = name_cn;
            } else {
                let source_cn2 = singlePaperDiv.find("a[lang='zh-cn']");
                let name_cn2 = source_cn2.text().trim();
                if (name_cn2.length != 0) {
                    papersName[paperID] = name_cn2;
                }
            }
        }

    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "web of science";
    addPapersRank(papersName, data)
};

function getWOSSelectPaperNames() {

    let data = {};

    let papersName = {};
    let allPaperDiv = $("app-journal-search-results > div.ng-star-inserted mat-card.mat-focus-indicator");

    allPaperDiv.each(function () {
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");

        if (flag1.length == 0) {
            let publication = singlePaperDiv.find("mat-card-title.mat-card-title").text().replaceAll("\n", "").trim();

            let node = singlePaperDiv.find("mat-card-title.mat-card-title").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'))
            papersName[paperID] = publication;
        }

    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "web of science select";
    addPapersRank(papersName, data)
};

function getPubmedPaperNames() {
    initPubmed();
    let data = {};

    let papersName = {};
    let allPaperDiv = $("article.full-docsum");
    let allPaperDivAbstract = $("article.article-overview");

    allPaperDiv.each(function () {

        let abbName;
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);

        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");

        if (flag1.length == 0) {

            let title = singlePaperDiv.find("a.docsum-title");
            if (title.length == 0) {
                return true;
            }
            title.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));

            if (singlePaperDiv.find("div.Scholarscope_Journal").length != 0) {
                abbName = singlePaperDiv.find("div.Scholarscope_Journal").text().toUpperCase();
            } else if (singlePaperDiv.find("span.full-journal-citation span.abbr-title").length != 0) {
                abbName = singlePaperDiv.find("span.full-journal-citation span.abbr-title span:first").text().toUpperCase();
            } else {
                abbName = singlePaperDiv.find("span.full-journal-citation").text().split(".")[0].toUpperCase();
            }

            papersName[paperID] = abbName;
        }

    });

    allPaperDivAbstract.each(function () {
        let abbName;
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);

        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");

        if (flag1.length == 0) {

            let title = singlePaperDiv.find("div.full-view h1.heading-title a:first");
            if (title.length == 0) {
                return true;
            }
            title.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));


            abbName = singlePaperDiv.find("div.full-view button.journal-actions-trigger").text().replaceAll("\n", "").toUpperCase().trim();
            papersName[paperID] = abbName;
        }
    });

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "PubmedAbb";
    addPapersRank(papersName, data);
    listenPubmedHide();
};

function getPubmedDetailPaperNames() {

    let data = {};

    let papersName = {};
    // 标题的
    let flag1 = $("div.article-source span.easyScholarPaperFlag");
    if (flag1.length == 0) {
        let paperID = Math.floor(Math.random() * 100000);

        let node = $("#full-view-journal-trigger");
        if (node.length == 0) {
            return null;
        }
        node.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
        let abbName = $("#full-view-journal-trigger")[0].innerText.toUpperCase();


        papersName[paperID] = abbName;
    }

    //引用
    let allRefenceDiv = $("ol.references-and-notes-list");
    allRefenceDiv.each(function () {
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.parent().find("span.easyScholarPaperFlag");
        let title;

        if (flag1.length === 0) {
            title = singlePaperDiv.find("li").text().match(/(?=\.\s).{1,40}?(?=\s\d)/);
            if (title == null || title.length === 0) {
                return true;
            }
            title = title[0].replace(". ", "").replaceAll(".", "").replaceAll(",", "").trim();
            papersName[paperID] = title.toUpperCase();
            singlePaperDiv.find("li").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
        }
    });

    //被谁引用和相似的文章
    let allCitedBy = $("li.full-docsum");
    allCitedBy.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let singlePaperDiv = $(this);
        if (singlePaperDiv.find("span.easyScholarPaperFlag").length == 0) {
            let publication = singlePaperDiv.find(".docsum-journal-citation.short-journal-citation").text();
            publication = publication.substr(0, publication.indexOf("."));
            papersName[paperID] = publication.toUpperCase();
            singlePaperDiv.find(".docsum-content a.docsum-title").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "Pubmed详情页abb";
    addPapersRank(papersName, data)
};

function getReadPaperPaperNames() {

    let data = {};

    let papersName = {};
    let allPaperDiv = $(".paper-item");
    allPaperDiv.each(function () {

        let hrefName;
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");
        if (flag1.length === 0) {
            hrefName = singlePaperDiv.find("span.block:first").text().replace('"', '').trim();
            let title = singlePaperDiv.find(".title");
            if (title.length === 0) {
                return true;
            }
            title.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
            papersName[paperID] = hrefName.toUpperCase();
        }

    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "ReadPaper";
    addPapersRank(papersName, data)
};

function getReadPaperDetailPaperNames() {

    let data = {};

    let papersName = {};

    let paperID = Math.floor(Math.random() * 100000);

    let flag1 = $("span.easyScholarPaperFlag");

    if (flag1.length === 0) {
        let title = $(".paper-header .title");
        if (title.length === 0) {
            return null;
        }
        title.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));

        let paperHref = $("div.paper-header > div.desc > div > div.block:first").text().trim().replace("\n", "");

        papersName[paperID] = paperHref.toUpperCase();
    }


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "ReadPaper详情页";
    addPapersRank(papersName, data)
};

function getScienceDirectPaperNames() {

    let data = {};

    let papersName = {};
    let allPaperDiv = $("li.ResultItem");

    allPaperDiv.each(function () {

        let hrefNames;
        let hrefName;
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");

        if (flag1.length == 0) {
            let title = singlePaperDiv.find("h2 > span");
            if (title.length == 0) {
                return true;
            }
            title.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));

            hrefNames = singlePaperDiv.find("a[data-aa-name*='srp-srctitle-']");
            if (hrefNames.length != 0) {
                hrefName = hrefNames[0].innerText;
                papersName[paperID] = hrefName.toUpperCase();
            }
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "ScienceDirect";
    addPapersRank(papersName, data)
};

function getScopusPaperNames() {

    let data = {};

    let papersName = {};
    let allPaperDiv = $("#srchResultsList tbody tr.searchArea");

    allPaperDiv.each(function () {

        let hrefName;
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");

        if (flag1.length == 0) {
            let title = singlePaperDiv.find("td[data-type='docTitle'] a");
            if (title.length == 0) {
                return true;
            }
            title.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));

            hrefName = singlePaperDiv.find("td[data-type='source'] a.ddmDocSource").text().trim();
            papersName[paperID] = hrefName.toUpperCase();
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "Scopus";
    addPapersRank(papersName, data)
};

function getNewScopusPaperNames() {

    let data = {};

    let papersName = {};
    let allPaperDiv = $("div[data-component='document-source']");

    allPaperDiv.each(function () {

        let hrefName;
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this).parents("tr[class^='TableItems-module']");
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");

        if (flag1.length === 0) {
            let title = singlePaperDiv.find(".table-title > h4:first");
            title.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));

            hrefName = singlePaperDiv.find("div[data-component='document-source'] span:first").text().trim();
            papersName[paperID] = hrefName.toUpperCase();
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "新版Scopus";
    addPapersRank(papersName, data)
};

function getScopusDetailPaperNames() {

    let data = {};

    let papersName = {};

    let hrefName;
    let paperID = Math.floor(Math.random() * 100000);

    let flag1 = $("span.easyScholarPaperFlag");

    if (flag1.length === 0) {
        let title = $("div.col > els-typography.hydrated");
        if (title.length === 0) {
            return null;
        }
        title.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));

        let href = $("div.PublicationInformationBar-module__2SO0m els-button.hydrated els-typography").text().trim().toUpperCase();
        papersName[paperID] = href.toUpperCase();
    }


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "ScopusDetail";
    addPapersRank(papersName, data)
};

function getNewScopusDetailPaperNames() {

    let data = {};

    let papersName = {};

    let flag1 = $("article span.easyScholarPaperFlag");

    if (flag1.length === 0) {
        let paperID = Math.floor(Math.random() * 100000);
        let title = $("#doc-details-page-container > article > div:nth-child(2) > section > div.row.margin-size-8-t > div > h2");
        title.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));

        let href = $("div[class^='PublicationInformationBar-module'] a:first").text().trim().toUpperCase();
        papersName[paperID] = href.toUpperCase();
    }

    let allReference = $("tbody.referencesUL > tr.referencesUL");

    allReference.each(function () {
        let hrefName;
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");

        if (flag1.length === 0 && singlePaperDiv.find("td.refCont .refDocTitle").length !== 0) {
            let title = singlePaperDiv.find("td.refCont .refDocTitle");
            title.append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));

            hrefName = singlePaperDiv.find("td.refCont > em:first").text().trim();
            papersName[paperID] = hrefName.toUpperCase();
        }
    });

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "新版ScopusDetail";
    addPapersRank(papersName, data)
};

function getScopusAuthorPaperNames() {
    let data = {};

    let papersName = {};
    let allPaperDiv = $("li[data-testid='results-list-item']");
    allPaperDiv.each(function () {
        let hrefName;
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");

        if (flag1.length === 0) {
            let title = singlePaperDiv.find("h4:first");
            if (title.length === 0) {
                return true;
            }
            title.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));

            hrefName = singlePaperDiv.find("span > strong > em:first").text().trim();
            papersName[paperID] = hrefName.toUpperCase();
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "Scopus";
    addPapersRank(papersName, data)
};

function getScienceDirectDetailPaperNames() {

    let data = {};

    let papersName = {};

    let paperID = Math.floor(Math.random() * 100000);

    if ($("span.easyScholarPaperFlag").length === 0) {

        $("#screen-reader-main-title").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));

        let hrefName = $("article .publication-title-link").text().toUpperCase();
        if (hrefName !== undefined) {
            papersName[paperID] = hrefName;
        }
    }


    let allPaperDiv = $("#preview-section-references ul > li");

    allPaperDiv.each(function () {

        let hrefName;
        let fullName;
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");

        if (flag1.length === 0) {
            let title = singlePaperDiv.find("h3.title:first");
            title.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));

            hrefName = singlePaperDiv.find(".series h3.title").text().trim().replaceAll("\n", "").replaceAll(".", "").toUpperCase();

            if (hrefName !== undefined) {
                papersName[paperID] = hrefName.toUpperCase();
            }
        }
    });


    let allPaperDiv2 = $("#preview-section-cited-by ul > li.ListArticleItem");

    allPaperDiv2.each(function () {

        let hrefName;
        let fullName;
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");

        if (flag1.length === 0) {
            let title = singlePaperDiv.find("h3:first");
            title.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));

            hrefName = singlePaperDiv.find(".sub-heading > .text-s:first").text().split(",")[1].replaceAll("\n", "").replaceAll(".", "").toUpperCase().trim();
            if (hrefName !== undefined) {
                papersName[paperID] = hrefName.toUpperCase();
            }
        }
    });

    let allPaperDiv3 = $("#recommended-articles ul > li.ListArticleItem");

    allPaperDiv3.each(function () {

        let hrefName;
        let fullName;
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");

        if (flag1.length === 0) {
            let title = singlePaperDiv.find("h3:first");
            title.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));

            hrefName = singlePaperDiv.find(".sub-heading > .text-s:first").text().split(",")[0].replaceAll("\n", "").replaceAll(".", "").toUpperCase().trim();
            if (hrefName !== undefined) {
                papersName[paperID] = hrefName.toUpperCase();
            }
        }
    });



    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "ScienceDirect详情页";
    addPapersRank(papersName, data)
};

function getEmbasePaperNames() {

    let data = {};

    let papersName = {};
    let allPaperDiv = $("#search_results > div > div.clearfix > ul > li");

    allPaperDiv.each(function () {


        let hrefName;
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");

        if (flag1.length == 0) {
            let title = singlePaperDiv.find("div.resultInfo > a");
            if (title.length == 0) {
                return true;
            }
            title.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));

            hrefName = singlePaperDiv.find("span.journal-title").text().trim();
            papersName[paperID] = hrefName.toUpperCase();
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "Embase";
    addPapersRank(papersName, data)
};

function getEmbaseDetailPaperNames() {

    let data = {};

    let papersName = {};

    let paperID = Math.floor(Math.random() * 100000);


    if ($("span.easyScholarPaperFlag").length === 0) {
        let node = $("div[class*='RecordDetailsContent_content'] h2:first");
        if (node.length === 0) {
            return null;
        }
        node.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));

        let hrefName = $("div[data-testid='source'] > strong > span:first").text().trim().toUpperCase();
        if (hrefName) {
            papersName[paperID] = hrefName;
        }
    }


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "Embase详情页";
    addPapersRank(papersName, data)
};

function getSpringerPaperNames() {

    let data = {};

    let papersName = {};
    let allPaperDiv = $("#results-list > li > p.meta > span.enumeration");

    allPaperDiv.each(function () {

        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");

        if (flag1.length == 0) {
            let hrefName = singlePaperDiv.find("a:first").attr("title").trim();
            let node = singlePaperDiv.find("a:first");
            if (node.length == 0) {
                return true;
            }
            node.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));

            if (hrefName.length != 0) {
                papersName[paperID] = hrefName.toUpperCase();
            }
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "Springer";
    addPapersRank(papersName, data)
};

function getSpringerDetailPaperNames() {

    let data = {};

    let papersName = {};

    let firstHrefName = $("#breadcrumb1 > a >span:first").text().trim().toUpperCase();
    let firstPaperID = Math.floor(Math.random() * 10000);
    let node = $("h1.c-article-title");
    if (node.length === 0) {
        return null;
    }
    if ($("span.easyScholarPaperFlag").length === 0) {
        node.append($('<span class ="easyScholarPaperFlag" paperID="' + firstPaperID + '" > </span>'));
        papersName[firstPaperID] = firstHrefName;
    }


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "Springer详情页";
    addPapersRank(papersName, data)
};

function getYuntsgPubmedPaperNames() {

    let data = {};

    let papersName = {};
    let allPaperDiv = $("ul.searchList > li");

    allPaperDiv.each(function () {

        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");

        if (flag1.length == 0) {
            let node = singlePaperDiv.find("div.twoRow");
            if (node.length == 0) {
                return true;
            }
            node.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));

            let title = singlePaperDiv.find("p.addInfo:eq(1)");
            if (title != undefined) {
                let abbName = title.find("span:eq(1)").text().split(".")[0].replaceAll("\n", "").toUpperCase();
                papersName[paperID] = abbName;
            }
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "云图书馆PubmedAbb";
    addPapersRank(papersName, data)
};

function getYuntsgPubmedDetailPaperNames() {

    let data = {};

    let papersName = {};

    let paperID = Math.floor(Math.random() * 100000);

    let flag1 = $("span.easyScholarPaperFlag");

    if (flag1.length == 0) {
        let node = $("a.detTitle");
        if (node.length == 0) {
            return null;
        }
        node.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
        let title = $("div.jour button");
        let abbName = title.text().replaceAll("\n", "").toUpperCase();
        papersName[paperID] = abbName;
    }


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "云图书馆Pubmed详情页abb";
    addPapersRank(papersName, data)
};

function getYuntsgDetailPaperNames() {

    let data = {};

    let papersName = {};
    let hrefName;
    let paperID = Math.floor(Math.random() * 100000);

    let flag1 = $("span.easyScholarPaperFlag");

    if (flag1.length == 0) {
        let node = $("#con_bottom > h1:first");
        if (node.length == 0) {
            return null;
        }
        node.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
        let title = $("div.bot2 > p:first");
        if (title != undefined) {
            hrefName = title.text().replaceAll("\n", "").toUpperCase();
            papersName[paperID] = hrefName;
        }

    }


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "云图书馆详情页";
    addPapersRank(papersName, data)
};

function getYuntsgXueshuPaperNames() {

    let data = {};

    let papersName = {};
    let allPaperDiv = $("li.item");

    allPaperDiv.each(function () {

        let hrefName;
        let paperID = Math.floor(Math.random() * 100000);


        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");

        if (flag1.length == 0) {
            let node = singlePaperDiv.find("div > h3 > a");
            if (node.length == 0) {
                return true;
            }
            node.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));

            let title = singlePaperDiv.find("span.periodical");
            hrefName = title.text().replaceAll("\n", "").toUpperCase();
            papersName[paperID] = hrefName;
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "云图书馆";
    addPapersRank(papersName, data)
};

function getYuntsgenPaperNames() {

    let data = {};

    let papersName = {};
    let allPaperDiv = $("#list_ul > li");

    allPaperDiv.each(function () {

        let hrefName;
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");

        if (flag1.length == 0) {
            let node = singlePaperDiv.find("p:first > a");
            if (node.length == 0) {
                return true;
            }
            node.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));

            let title = singlePaperDiv.find("p[style='width: 85%;']:eq(1)");
            if (title != undefined) {
                hrefName = title.text().split("来源：")[1].replaceAll("\n", "").toUpperCase().trim();
                papersName[paperID] = hrefName;
            }
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "云图书馆英文";
    addPapersRank(papersName, data)
};

function getYuntsgcnPaperNames() {

    let data = {};

    let papersName = {};
    let allPaperDiv = $("#list_ul > li");

    allPaperDiv.each(function () {

        let hrefName;
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");

        if (flag1.length == 0) {
            let node = singlePaperDiv.find("p:first > a");
            if (node.length == 0) {
                return true;
            }
            node.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));

            let title = singlePaperDiv.find("p[style='color:#615f63']");
            if (title != undefined) {
                hrefName = title.html().split("<span")[0].match(/([\u4e00-\u9fa5]*)$/g)[0];
                papersName[paperID] = hrefName.replaceAll("\n", "").trim();
            }
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "云图书馆中文";
    addPapersRank(papersName, data)
};

function getCnkiClassicPaperNames() {

    let data = {};

    let papersName = {};
    let allPaperDiv = $("td.source");

    allPaperDiv.each(function () {
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.parent().find("span.easyScholarPaperFlag");
        let title;
        let node;
        if (flag1.length == 0) {
            if (singlePaperDiv.find("a").length != 0) {
                title = singlePaperDiv.find("a:first").text();
                // node = singlePaperDiv.find("a").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
                if (title.length == 0) {
                    return true;
                }
                papersName[paperID] = title.toUpperCase();
            } else {
                title = singlePaperDiv.text().toUpperCase();
                if (title.length == 0) {
                    return true;
                }
                // node = singlePaperDiv.append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
                papersName[paperID] = title.toUpperCase();
            }
            singlePaperDiv.parent().find("td.name a:first").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
        }
    });

    let allPaperDiv2 = $("td.unit");
    allPaperDiv2.each(function () {
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.parent().find("span.easyScholarPaperFlag");
        let title;
        let node;
        if (flag1.length == 0) {
            if (singlePaperDiv.find("a").length != 0) {
                title = singlePaperDiv.find("a:first").text();
                // node = singlePaperDiv.find("a").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
                if (title.length == 0) {
                    return true;
                }
                papersName[paperID] = title.toUpperCase();
            } else {
                title = singlePaperDiv.text().toUpperCase();
                if (title.length == 0) {
                    return true;
                }
                // node = singlePaperDiv.append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
                papersName[paperID] = title.toUpperCase();
            }
            singlePaperDiv.parent().find("td.name a:first").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "知网";
    addPapersRank(papersName, data);
};

function getWangfangPaperNames() {

    let data = {};

    let papersName = {};
    let allPaperDiv = $("div.normal-list");

    allPaperDiv.each(function () {
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");
        let publication;
        let node;
        if (flag1.length == 0) {
            node = singlePaperDiv.find("div.title-area span.title").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
            let essayType = singlePaperDiv.find("div.author-area span.essay-type").text();
            if (essayType === "期刊论文") {
                publication = singlePaperDiv.find("div.author-area span.periodical-title").text();
            } else if (essayType === "硕士论文") {
                publication = singlePaperDiv.find("div.author-area span.org > span:first").text();
            }
            if(publication){
                papersName[paperID] = publication.toUpperCase().replaceAll("《", "").replaceAll("》", "");
            }
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "万方";
    addPapersRank(papersName, data);
};

function getWangfangDetailPaperNames() {

    let data = {};

    let papersName = {};

    let node = $("div.detailTitle div.detailTitleCN span");


    if (node != null && node.parent().find("span.easyScholarPaperFlag").length == 0) {
        let paperID = Math.floor(Math.random() * 100000);

        let publication = $("div.periodicalInformation div.periodicalName a").text().replace("\n", "").trim();
        node.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
        papersName[paperID] = publication.toUpperCase();
    }

    let allPaperDiv = $("tbody.paperInfoItem");

    allPaperDiv.each(function () {
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.parent().find("span.easyScholarPaperFlag");
        let publication;

        if (flag1.length == 0) {
            singlePaperDiv.find("span:first").append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));

            publication = singlePaperDiv.find("a[href^='https://sns.wanfangdata.com.cn/perio/']").text();
            papersName[paperID] = publication.toUpperCase();
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "万方详情页";
    addPapersRank(papersName, data);
};

function getCnkiSentencePaperNames() {

    let data = {};

    let papersName = {};
    let allPaperDiv = $("div.middle");

    allPaperDiv.each(function () {
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");
        let title;
        let titleDiv;
        let node;
        if (flag1.length === 0) {
            singlePaperDiv.find("h6 a:first").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
            if (singlePaperDiv.find(".baseinfo > span > label:eq(1)").length !== 0) { // 期刊详情中文
                title = singlePaperDiv.find(".baseinfo > span > label:eq(1)").next("a").text().trim();

            } else if(singlePaperDiv.find("p.baseinfo > span:first").text().indexOf("期刊") !== -1){
                if(singlePaperDiv.find("p.baseinfo > span:first").text() === "【期刊】"){
                    title = singlePaperDiv.find("p.baseinfo > span > a:first").text().trim(); // 总库详情   中文
                }else if (singlePaperDiv.find("p.baseinfo > span:first").text() === "【外文期刊】"){
                    title = singlePaperDiv.find("p.baseinfo > span:eq(1) > span").text().trim(); // 总库详情   英文
                }
            }
            if (title === undefined || title.length === 0) {
                return true;
            }
            papersName[paperID] = title.toUpperCase();
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "知网句子搜索界面";
    addPapersRank(papersName, data)

};

function getCnkiDetailPaperNames() {
    let data = {};

    let papersName = {};
    let hrefName;


    let flag1 = $(".brief span.easyScholarPaperFlag");

    if (flag1.length === 0) {
        let paperID = Math.floor(Math.random() * 100000);
        let node = $(".doc-top .wx-tit > h1");
        if (node.length === 0) {
            return null;
        }
        node.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
        let title = $(".doc-top .top-tip span a:first").text().trim().replace("\n", "").toUpperCase();
        papersName[paperID] = title.toUpperCase();
    }

    let all = $("ul.ebBd > li");
    all.each(function () {
        let single = $(this);
        if (single.find("span.easyScholarPaperFlag").length === 0) {
            let paperID = Math.floor(Math.random() * 100000);
            single.append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
            let singleText = single.text().trim();
            if (/(?=\S\.)\S*$/.test(singleText)) {
                let publication = singleText.match(/(?=\S\.)\S*$/)[0].slice(2).trim();
                publication.replaceAll(/,\d{4}/g,"");
                if (publication !== "") {
                    papersName[paperID] = publication.toUpperCase();
                }
            }
        }
    });

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "知网详情页";
    addPapersRank(papersName, data)
};


function getCnkiOverSeaDetailPaperNames() {
    let data = {};

    let papersName = {};

    let flag1 = $("span.easyScholarPaperFlag");

    if (flag1.length === 0) {
        let paperID = Math.floor(Math.random() * 100000);
        let node = $(".doc-top .wx-tit > h1");
        if (node.length === 0) {
            return null;
        }
        node.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
        let title = $(".doc-top .top-tip span a:first").text().trim().replace("\n", "").toUpperCase();
        papersName[paperID] = title.toUpperCase();
    }

    let all = $("a[onclick*='getKns8NaviLink(']:gt(0)");
    all.each(function () {
        let parent = $(this).parent();
        if (parent.find("span.easyScholarPaperFlag").length === 0) {
            let paperID = Math.floor(Math.random() * 100000);
            let publication = $(this).text();
            parent.append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });

    let all2 = $("#frame1").contents().find("a[onclick*='getKns8NaviLink(']");
    all2.each(function () {
        let parent = $(this).parent();
        if (parent.find("span.easyScholarPaperFlag").length === 0) {
            let paperID = Math.floor(Math.random() * 100000);
            let publication = $(this).text();
            parent.append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "知网海外版详情页";
    addPapersRank(papersName, data)
};

function getCnkiAuthorPaperNames() {
    let data = {};

    let papersName = {};

    let all = $("ul.ebBd > li");
    all.each(function () {
        let sinigle = $(this);
        if (sinigle.find("span.easyScholarPaperFlag").length === 0) {
            let paperID = Math.floor(Math.random() * 100000);
            sinigle.append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
            let singleText = sinigle.text().trim();
            if (/(?=\S\.)\S*$/.test(singleText)) {
                let publication = singleText.match(/(?=\S\.)\S*$/)[0].slice(2).trim();
                publication.replaceAll(/,\d{4}/g,"");
                if (publication !== "") {
                    papersName[paperID] = publication.toUpperCase();
                }
            }
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "知网作者界面";
    addPapersRank(papersName, data)
};


function getCnkiOverSeaAuthorPaperNames() {
    let data = {};

    let papersName = {};

    let all2 = $("#frame2").contents().find(".ebBd ul > li");
    all2.each(function () {
        let sinigle = $(this);
        if (sinigle.find("span.easyScholarPaperFlag").length === 0) {
            let paperID = Math.floor(Math.random() * 100000);
            sinigle.append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
            // let publication = sinigle.text().match(/(?=\.)\S.*(?=\.)/)[0].replace(".","").trim();
            let publication = sinigle.text().match(/(?=\.)\S\S.*(?=\.)/)[0].trim();
            if (publication !== "") {
                papersName[paperID] = publication.toUpperCase();
            }
        }
    });

    let all3 = $("#frame3").contents().find("a[onclick*='getKns8NaviLink(']");
    all3.each(function () {
        let parent = $(this).parent();
        if (parent.find("span.easyScholarPaperFlag").length == 0) {
            let paperID = Math.floor(Math.random() * 100000);
            let publication = $(this).text();
            parent.append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
            if (publication != "") {
                papersName[paperID] = publication.toUpperCase();
            }
        }
    });

    let all4 = $("#frame4").contents().find("ul.bignum > li");
    all4.each(function () {
        let sinigle = $(this);
        if (sinigle.find("span.easyScholarPaperFlag").length == 0) {
            let paperID = Math.floor(Math.random() * 100000);
            sinigle.append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
            let publication = sinigle.text().match(/(?=\.)\S.*(?=\.)/)[0].replace(".", "").trim();
            if (publication != "") {
                papersName[paperID] = publication.toUpperCase();
            }
        }
    });

    let all8 = $("#frame8").contents().find("a[onclick*='getKns8NaviLink(']");
    all8.each(function () {
        let parent = $(this).parent();
        if (parent.find("span.easyScholarPaperFlag").length == 0) {
            let paperID = Math.floor(Math.random() * 100000);
            let publication = $(this).text();
            parent.append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
            if (publication != "") {
                papersName[paperID] = publication.toUpperCase();
            }
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "知网海外版作者界面";
    addPapersRank(papersName, data)
};


function getHuayiPaperNames() {

    let data = {};

    let papersName = {};
    let allPaperDiv = $("#maincontent div.right_mianNEWSe table.jian_mu_list tbody tr td div.stageall");

    allPaperDiv.each(function () {
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");
        let title;
        let node;
        if (flag1.length == 0) {

            title = singlePaperDiv.find("div.stage3 a:first span").text().trim();
            node = singlePaperDiv.find("div.stage1 a");
            if (node.length == 0) {
                return true;
            }
            node.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
            papersName[paperID] = title.toUpperCase();

        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "华艺";
    addPapersRank(papersName, data)

};

function getXMOLPaperNames() {

    let data = {};

    let papersName = {};
    let allPaperDiv = $("div.magazine-senior-search-content div.magazine-senior-search-results-list ul li div.magazine-senior-search-results-list-right");

    allPaperDiv.each(function () {
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");
        let title;
        let node;
        if (flag1.length == 0) {

            title = singlePaperDiv.find("a:eq(3) div.div-text-line-one em.it-blue").text().trim();

            node = singlePaperDiv.find("a:eq(2) div.it-bold");
            if (node.length == 0) {
                return true;
            }
            node.append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));

            papersName[paperID] = title.toUpperCase();

        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "X-MOL";
    addPapersRank(papersName, data)

};

function getXMOLSquarePaperNames() {

    let data = {};

    let papersName = {};
    let allPaperDiv = $("#mianBody div.magazine-model-content-new > ul > li");

    allPaperDiv.each(function () {
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");
        let title;
        let node;
        if (flag1.length == 0) {

            title = singlePaperDiv.find("div.maga-titleright span.magazine-text-atten > a > em").text().trim();
            node = singlePaperDiv.find("span.magazine-text-title");

            if (node.length == 0) {
                return true;
            }
            node.append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));

            papersName[paperID] = title.toUpperCase();

        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "X-MOL正方形";
    addPapersRank(papersName, data);

};


function getXMOLDetailPaperNames() {
    let data = {};

    let papersName = {};

    let flag1 = $("div.maga-content span.easyScholarPaperFlag");
    if (flag1.length === 0) {
        let paperID = Math.floor(Math.random() * 100000);
        let node = $("#content div.maga-content > span.itgaryfirst");
        node.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
        let title = $("#content > div.magazine-gridecontent > div.maga-content a.itsmblue:first > em").text().trim().replace("\n", "").toUpperCase();
        papersName[paperID] = title.toUpperCase();
    }

    let allPaperDiv = $("div.magazine-journal-about-item ul li");

    allPaperDiv.each(function () {
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");
        let title;
        let node;
        if (flag1.length === 0) {

            title = singlePaperDiv.find("div.div-text-line-one em").text().trim();

            node = singlePaperDiv.find("a.it-bold:first");
            if (node.length === 0) {
                return true;
            }
            node.append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));

            papersName[paperID] = title.toUpperCase();

        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "X-MOL详情页";
    addPapersRank(papersName, data);
};

function getSpringerSelectPaperNames() {
    let allPaperDiv = $("#journal-search-results div.journal div.journal__content");
    let papersName = {};
    let data = {};
    allPaperDiv.each(function () {
        let paperID = Math.floor(Math.random() * 100000);

        let singlePaperDiv = $(this);
        let flag1 = singlePaperDiv.find("span.easyScholarPaperFlag");

        if (flag1.length == 0) {
            let publication = singlePaperDiv.find("span[data-test-class='journal-title']").text().replaceAll("\n", "").trim();
            singlePaperDiv.find("span[data-test-class='journal-title']").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "Springer 选刊界面";
    addPapersRank(papersName, data);
};

function getSpringerSelectDetailPaperNames() {

    let papersName = {};
    let data = {};
    if ($("span.easyScholarPaperFlag").length != 0) {
        return;
    }
    let paperID = Math.floor(Math.random() * 100000);

    let publication = $("#content  div.col-md-12.col-md-9  h2.journal-title").text().replaceAll("\n", "").trim();
    $("#content  div.col-md-12.col-md-9  h2.journal-title").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
    papersName[paperID] = publication.toUpperCase();


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "Springer 选刊界面详情页";
    addPapersRank(papersName, data);
};

function getJournalFinderPaperNames() {
    let papersName = {};
    let data = {};
    let all = $("div > div > ul > li");

    all.each(function () {
        let singleDiv = $(this);
        let paperID = Math.floor(Math.random() * 100000);
        if (singleDiv.find("span.easyScholarPaperFlag").length == 0) {

            let publication = singleDiv.find("h2").text().replaceAll("\n", "").trim();
            singleDiv.find("h2").append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));

            papersName[paperID] = publication.toUpperCase();
        }
    });

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "journalfinder 选刊界面详情页";
    addPapersRank(papersName, data);
};

function getCnkiSpacePaperNames() {
    let papersName = {};
    let data = {};
    let all = $(".lplist > .list-item");

    all.each(function () {
        let singleDiv = $(this);
        let paperID = Math.floor(Math.random() * 100000);
        if (singleDiv.find("span.easyScholarPaperFlag").length == 0) {

            let publication = singleDiv.find("p.source span:eq(1)").attr("title").replaceAll("\n", "").trim();
            singleDiv.find("p.tit:first").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));

            papersName[paperID] = publication.toUpperCase();
        }
    });

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "知网空间";
    addPapersRank(papersName, data);
};

function getWeipuPaperNames() {
    let papersName = {};
    let data = {};
    let all = $(".search-result-list > div[style!='display: none;']");
    if (all.attr("class") == "simple-list") {
        let allDiv = all.find("dl");
        allDiv.each(function () {
            let single = $(this);
            let paperID = Math.floor(Math.random() * 100000);
            if (single.find("span.easyScholarPaperFlag").length == 0) {
                let publication = single.find("span.from a:first").attr("title");
                single.find("dt > a:first").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
                papersName[paperID] = publication.toUpperCase();
            }

        });
    } else if (all.attr("class") == "full-list") {
        let allDiv = all.find("dl");
        allDiv.each(function () {
            let single = $(this);
            let paperID = Math.floor(Math.random() * 100000);
            if (single.find("span.easyScholarPaperFlag").length == 0) {
                let publication = single.find("span.from a:first").attr("title");
                single.find("dt > a:first").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
                papersName[paperID] = publication.toUpperCase();
            }

        });
    } else if (all.attr("class") == "table-list") {
        let allDiv = all.find("tbody tr");
        allDiv.each(function () {
            let single = $(this);
            let paperID = Math.floor(Math.random() * 100000);
            if (single.find("span.easyScholarPaperFlag").length == 0) {
                let publication = single.find("td:eq(3) a").attr("title");
                single.find("td:eq(3) a").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
                papersName[paperID] = publication.toUpperCase();
            }

        });
    }

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "维普搜索页";
    addPapersRank(papersName, data);
};


function getWeipuDetailPaperNames() {
    let papersName = {};
    let data = {};


    let paperID = Math.floor(Math.random() * 100000);
    if ($("span.easyScholarPaperFlag").length == 0) {
        let publication = $("div.article-detail > div.journal > span.from > a").attr("title");
        $("div.article-main > div.article-title > h1").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
        papersName[paperID] = publication.toUpperCase();
    }

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "维普详情页";
    addPapersRank(papersName, data);
};

function getSemanticPaperNames() {

    let papersName = {};
    let data = {};
    let all = $("#main-content div.result-page > div.cl-paper-row");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);

        let publication;
        if(single.find("span.easyScholarPaperFlag").length !== 0){
            return true;
        }
        single.find(".link-button--show-visited").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
        if(single.find(".cl-paper__bulleted-row__item > a >span").length !== 0){
            publication = single.find(".cl-paper__bulleted-row__item > a >span").text();
        }else{
            single.find("div.cl-paper-controls div.cl-paper-actions > .cl-paper-action__button-container:last button").click();
            publication = $(".formatted-citation--style-bibtex").text().match(/(?=journal={).*(?=},)/);
            $("#app > div.cl-overlay.cl-overlay__content-position--center > div > div > div.cl-modal__close-section > button").click();
            if (publication == null) {
                return true
            } else {
                publication = publication[0].replace("journal={", "");
            }
        }
        papersName[paperID] = publication.toUpperCase();

    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "Semantic学术";
    addPapersRank(papersName, data);
};

function getSemanticDetailPaperNames() {

    let papersName = {};
    let data = {};

    let paperID = Math.floor(Math.random() * 100000);

    if ($("span.easyScholarPaperFlag").length == 0) {
        $("#main-content > div.fresh-paper-detail-page__above-the-fold  div.flex-item.flex-paper-actions__item--hidden-when-narrow > button > span").click();
        let publication = $(".formatted-citation--style-bibtex").text().match(/(?=journal={).*(?=},)/);
        $("#app > div.cl-overlay.cl-overlay__content-position--center > div > div > div.cl-modal__close-section > button").click();
        $("#main-content > div.fresh-paper-detail-page__above-the-fold div.flex-item.flex-item--width-66.flex-item__left-column > div > h1").append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" > </span>'));
        if (publication == null) {
            return;
        } else {
            publication = publication[0].replace("journal={", "");
        }
        papersName[paperID] = publication.toUpperCase();
    }

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "Semantic学术";
    addPapersRank(papersName, data);
};

function getOldCnkiPaperNames() {

    let papersName = {};
    let data = {};

    let all = $("#iframeResult").contents().find(".GTContentTitle");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);

        if (single.find("span.easyScholarPaperFlag").length == 0) {
            single.find("td:eq(1)").append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            single.find("td:eq(1)").append($('<span class="easyscholar-1 easyscholar-ranking"  style="background-color: rgb(255, 153, 153); color: rgb(0, 0, 0); font-size: 15px;">easyScholar不支持旧版知网，请您前往新版知网https://cnki.net</span>'));
        }
        return false;
    });
};

function getResearchGatePaperNames() {

    let papersName = {};
    let data = {};

    let all = $("div.nova-legacy-v-publication-item__meta-right li.nova-legacy-e-list__item:nth-child(2) span");
    $('.nova-legacy-e-text[class*=nova-legacy-e-text--clamp-]').css('display', 'block');
    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);
        let parent = single.closest(".nova-legacy-o-stack__item");
        if (parent.find("span.easyScholarPaperFlag").length === 0 && parent.find(".nova-legacy-v-publication-item__stack-item a.nova-legacy-e-link:first").length !== 0) {
            let publication = single.text();
            parent.find(".nova-legacy-v-publication-item__stack-item a.nova-legacy-e-link:first").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            // single.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });

    // 期刊名称改版后的research gate
    let all2 = $(".nova-legacy-v-entity-item__stack-item > .nova-legacy-v-entity-item__origin");
    all2.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);
        let parent = single.closest(".nova-legacy-o-stack__item");
        if (parent.find("span.easyScholarPaperFlag").length === 0) {
            let publication = single.text();
            parent.find("div > a.nova-legacy-e-link:first").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            // single.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });

    // 期刊名称改版后的research gate（有出版社图片）
    let all3 = $(".publication-item-journal-tooltip__item > span > a >div");
    all3.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);
        let parent = single.closest(".nova-legacy-o-stack__item");
        if (parent.find("span.easyScholarPaperFlag").length === 0) {
            let publication = single.text();
            parent.find("div > a.nova-legacy-e-link:first").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            // single.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });

    // 期刊名称改版后的research gate（出版社图片在前，期刊在后）
    let all4 = $(".nova-legacy-o-media-object__item--width-full > span > span > a >div");
    all4.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);
        let parent = single.closest(".nova-legacy-o-stack__item");
        if (parent.find("span.easyScholarPaperFlag").length === 0) {
            let publication = single.text();
            parent.find("div > a.nova-legacy-e-link:first").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            // single.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });

    if ($(".content-grid__columns--wide .content-page-header__meta").length !== 0 && $(".content-grid__columns--wide .content-page-header__meta span.easyScholarPaperFlag").length === 0) {

        let paperID = Math.floor(Math.random() * 100000);
        let publication = $(".content-grid__columns--wide .content-page-header__meta ul li:nth-child(2) a:first");
        let name = publication.text();
        publication.after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
        papersName[paperID] = name.toUpperCase();
    }


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "Research Gate";
    addPapersRank(papersName, data);
};

function getResearchGateDetailPaperNames() {
    let papersName = {};
    let data = {};
    let all = $(".nova-legacy-o-stack__item > .nova-legacy-c-card > .nova-legacy-c-card__body > .nova-legacy-o-stack > .nova-legacy-o-stack__item > .nova-legacy-o-stack > .nova-legacy-o-stack__item");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);

        if (single.find("span.easyScholarPaperFlag").length === 0) {
            let publication = single.find(".nova-legacy-v-entity-item__origin").text();
            if (!publication || publication === "") {
                publication = single.find(".nova-legacy-v-entity-item__meta-right li:last > span").text();
            }
            single.find(".nova-legacy-v-entity-item__stack-item:first a:first").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));

            papersName[paperID] = publication.toUpperCase();
        }
    });

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "Research Gate Detail";
    addPapersRank(papersName, data);
};

function getJstorPaperNames() {

    let papersName = {};
    let data = {};

    let all = $("ol.result-list > li.result-list__item");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);

        if (single.find("span.easyScholarPaperFlag").length == 0) {
            let publication = single.find(".result__main div.result__main__metadata .metadata-row span.metadata cite").text();
            single.find(".result__main div.result__main__metadata .metadata-row span.metadata cite").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "Jstor";
    addPapersRank(papersName, data);
};

function getEiPaperNames() {

    let papersName = {};
    let data = {};

    let all = $("#results-region > div > div.result-row");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);

        if (single.find("span.easyScholarPaperFlag").length == 0) {
            let publication = single.find("span.source-info i").text();
            single.find("h3.result-title").append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "Ei数据库";
    addPapersRank(papersName, data);
};

function getEiDetailPaperNames() {

    let papersName = {};
    let data = {};

    if ($("#main-article span.easyScholarPaperFlag").length == 0) {
        let paperID = Math.floor(Math.random() * 100000);
        let publication = $("#main-article > span.MuiTypography-root > span.ev__sourcetitle:first").text();
        $("#main-article > h2").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
        papersName[paperID] = publication.toUpperCase();
    }


    let all = $("div.--result");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);

        if (single.find("span.easyScholarPaperFlag").length == 0) {
            let publication = single.find("span.--source i").text();
            single.find(".__title").append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });

    let all2 = $("#references-panel-content > div > ol > li");

    all2.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);

        if (single.find("span.easyScholarPaperFlag").length == 0) {
            let publication = single.find("span.--source em").text();
            single.find("p.MuiTypography-root").append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "Ei数据库";
    addPapersRank(papersName, data);
};

function getDukePaperNames() {
    let papersName = {};
    let data = {};

    let all = $("div.book-tile");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);

        if (single.find("span.easyScholarPaperFlag").length == 0) {
            let publication = single.find(".book-info h3").text();
            single.find(".book-info").append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "DUKE";
    addPapersRank(papersName, data);
};

function getWileyPaperNames() {
    let papersName = {};
    let data = {};

    let all = $("section.product-item");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);

        if (single.find("span.easyScholarPaperFlag").length == 0) {
            let publication = single.find("div.product-content h3.product-title a").text().replaceAll("\n", "").trim();
            single.find("div.product-content h3.product-title").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "WILEY";
    addPapersRank(papersName, data);
};

function getNudtChaoxingPaperNames() {
    let papersName = {};
    let data = {};

    let all = $("#mainlist .zyList");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);

        if (single.find("span.easyScholarPaperFlag").length === 0) {
            let publication_temp = single.find("ul li:contains('出处：')").text();
            let publication = "";
            if (/(?=出处：).*(?=\s\d{4}\s)/.test(publication_temp)) {
                publication = publication_temp.match(/(?=出处：).*(?=\s\d{4}\s)/)[0].replace("出处：", "");
            }
            single.find(".card_name h3.fl").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "国防科技大学超星";
    addPapersRank(papersName, data);
};

function getNudtChaoxingDetailPaperNames() {
    let papersName = {};
    let data = {};

    let paperID = Math.floor(Math.random() * 100000);

    if ($("span.easyScholarPaperFlag").length === 0) {
        let publication = $(".savelist_con dl:contains('期刊名')").text().replaceAll("期刊名：", "");
        $(".card_name > h3.fl").append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
        papersName[paperID] = publication.toUpperCase();
    }


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "国防科技大学超星详情页";
    addPapersRank(papersName, data);
};

function getNssdPaperNames() {
    let papersName = {};
    let data = {};

    let all = $("ul.clr div li");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);

        if (single.find("span.easyScholarPaperFlag").length == 0) {
            let publication = single.find("p:first a").text();
            single.find(".julei-list label.el-checkbox").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "国家哲学社会科学";
    addPapersRank(papersName, data);
};

function getNssdDetailPaperNames() {
    let papersName = {};
    let data = {};

    let paperID = Math.floor(Math.random() * 100000);

    if ($("span.easyScholarPaperFlag").length == 0) {
        let publication = $("#p_media a span").text().trim().replaceAll("《", "").replaceAll("》", "");
        $("#p_media").append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
        papersName[paperID] = publication.toUpperCase();
    }


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "国家哲学社会科学详情页";
    addPapersRank(papersName, data);
};

function getProquestPaperNames() {
    let papersName = {};
    let data = {};

    let all = $("ul.resultItems li.resultItem");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);

        if (single.find("span.easyScholarPaperFlag").length == 0) {
            let publication = single.find(".resultHeader span.jnlArticle span strong:first").text().trim();
            single.find(".truncatedResultsTitle").parent("a").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "proquest";
    addPapersRank(papersName, data);
};

function getProquestDetailPaperNames() {
    let papersName = {};
    let data = {};

    let paperID = Math.floor(Math.random() * 100000);

    if ($("span.easyScholarPaperFlag").length == 0) {
        let publication = $("#authordiv > span.titleAuthorETC.jnlArticle a:first strong").text().trim();
        $("#authordiv").append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
        papersName[paperID] = publication.toUpperCase();
    }


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "ProquestDetail";
    addPapersRank(papersName, data);
};

function getCambridgePaperNames() {
    let papersName = {};
    let data = {};

    let all = $("div.representation.overview.search");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);

        if (single.find("span.easyScholarPaperFlag").length == 0) {
            let publication = single.find("ul.details li.source a.productParent:first").text().trim();
            single.find("ul.details li.title").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "Cambridge";
    addPapersRank(papersName, data);
};

function getCambridgeDetailPaperNames() {
    let papersName = {};
    let data = {};

    let paperID = Math.floor(Math.random() * 100000);

    if ($("span.easyScholarPaperFlag").length == 0) {
        let publication = $("#article-tab > div.scrollspy-content > dl > div:nth-child(2) > dd > div.content__journal > a > span").text().replaceAll("PS: ", "").trim();
        $("#maincontent h1").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
        papersName[paperID] = publication.toUpperCase();
    }


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "CambridgeDetail";
    addPapersRank(papersName, data);
};

function getOxfordPaperNames() {
    let papersName = {};
    let data = {};

    let all = $("#ContentColumn .al-article-box");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);

        if (single.find("span.easyScholarPaperFlag").length == 0) {
            let publication = single.find(".al-citation-list span em").text().trim();
            single.find("h4.sri-title").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "Oxford";
    addPapersRank(papersName, data);
};

function getOxfordDetailPaperNames() {
    let papersName = {};
    let data = {};

    let paperID = Math.floor(Math.random() * 100000);

    if ($("span.easyScholarPaperFlag").length == 0) {
        let publication = $("#ContentColumn  div.pub-history-wrap.clearfix.js-history-dropdown-wrap .ww-citation-primary em").text().trim();
        $("h1.wi-article-title").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
        papersName[paperID] = publication.toUpperCase();
    }


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "OxfordDetail";
    addPapersRank(papersName, data);
};

function getEdinburgePaperNames() {
    let papersName = {};
    let data = {};

    let all = $("ol.search-results li");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);

        if (single.find("span.easyScholarPaperFlag").length == 0) {
            let publication = single.find("span a.searchResultJournal").text().trim();
            single.find("span a.searchResultJournal").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "Edinburge";
    addPapersRank(papersName, data);
};

function getDuxiuPaperNames() {
    let papersName = {};
    let data = {};

    let all = $(".Resultcon");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);

        if (single.find("span.easyScholarPaperFlag").length === 0) {
            let publication_temp = single.find("p.Bookinfo").text().trim();
            let publication = "";
            if (/(?=刊名：).*(?=ISSN)/.test(publication_temp)) {
                publication = publication_temp.match(/(?=刊名：).*(?=ISSN)/)[0].replace("刊名：", "");
            }
            single.find("p.Bookinfo").closest("div").find("a:first").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "独秀";
    addPapersRank(papersName, data);
};

function getCnkiScholarPaperNames() {
    let papersName = {};
    let data = {};

    let all = $(".searchResultContainer > .searchItem");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);

        if (single.find("span.easyScholarPaperFlag").length == 0) {
            let publication = single.find(".jounal-info span.jounal-name").text().trim();
            single.find(".argicle-title").append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "知网外文检索";
    addPapersRank(papersName, data);
};

function getCnkiScholarDetailPaperNames() {
    let papersName = {};
    let data = {};

    let paperID = Math.floor(Math.random() * 100000);

    if ($("span.easyScholarPaperFlag").length === 0) {
        let publication = $("span.detail_journal_name__b1mas").text().trim();
        $("#journal-summarize").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
        papersName[paperID] = publication.toUpperCase();
    }

    let all = $("div.detail_listShow__3Lp8U");
    all.each(function () {
        let single = $(this);
        let paperID = Math.floor(Math.random() * 100000);
        if (single.find("span.easyScholarPaperFlag").length === 0) {
            let publication_temp = single.text();
            let publication = "";
            if (/(?=\]).*?(?=,)/.test(publication_temp)) {
                publication = publication_temp.match(/(?=\]).*?(?=,)/)[0].replace("]", "").trim();
            }
            single.find("a:first").append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "知网外文检索详情页";
    addPapersRank(papersName, data);
};

function getConnectedPapersPaperNames() {
    let papersName = {};
    let data = {};

    let all = $("article.search-result-component");
    all.each(function () {
        let single = $(this);
        let paperID = Math.floor(Math.random() * 100000);
        if (single.find("span.easyScholarPaperFlag").length == 0) {
            let publication_temp = single.find(".meta-data div.search-result-meta.overflow-hidden").text();
            let publication = "";
            if (/.*(?=\s\d)/.test(publication_temp)) {
                publication = publication_temp.match(/.*(?=\s\d)/)[0];
            }
            single.find(".flexrow.items-start.justify-between").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "ConnectedPapers检索页";
    addPapersRank(papersName, data);
};

function getConnectedPapersDetailPaperNames() {
    let papersName = {};
    let data = {};

    let paperID = Math.floor(Math.random() * 100000);

    if ($("span.easyScholarPaperFlag").length == 0) {
        let publication_temp = $("#desktop-app > div.main-router div.abtract-scrollbox.shadowed-box.bg-white div.metadata.publication").text().trim();
        let publication = "";
        if (/(?=\d,\s).*/.test(publication_temp)) {
            publication = publication_temp.match(/(?=\d,\s).*/)[0].replace(/\d,/, "");
        } else if (/.*?(?=,\s\w)/.test(publication_temp)) {
            publication = publication_temp.match(/.*?(?=,\s\w)/)[0];
        }
        $("div.searchable-text.abstract-text").prepend($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
        papersName[paperID] = publication.toUpperCase();
    }


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "ConnectedPapers检索详情页";
    addPapersRank(papersName, data);
};

function getonlinelibraryWileyPaperNames() {
    let papersName = {};
    let data = {};

    let all = $("ul > li.search__item");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);

        if (single.find("span.easyScholarPaperFlag").length === 0) {
            let publication = single.find("a.publication_meta_serial").text().trim();
            single.find(".item__body > h2").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "onlinelibraryWiley";
    addPapersRank(papersName, data);
};

function getonlinelibraryWileyDetailPaperNames() {
    let papersName = {};
    let data = {};


    let paperID = Math.floor(Math.random() * 100000);


    if ($("span.easyScholarPaperFlag").length === 0) {
        let publication = $("#journal-banner-image").attr("alt");
        $("h1:first").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
        papersName[paperID] = publication.toUpperCase();
    }


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "onlinelibraryWileyDetail";
    addPapersRank(papersName, data);
};

function getapsDetailPaperNames() {
    let papersName = {};
    let data = {};


    let paperID = Math.floor(Math.random() * 100000);
    if ($("#title div.panel.header-panel div.medium-9.columns > h3").length === 0){
        return ;
    }

    if ($("span.easyScholarPaperFlag").length === 0) {
        let publication = $("#header > div > div > h2 > a").text();
        $("#title div.panel.header-panel div.medium-9.columns > h3").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
        papersName[paperID] = publication.toUpperCase();
    }


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "apsDetail";
    addPapersRank(papersName, data);
};

function getAPAPsycnetPaperNames() {
    let papersName = {};
    let data = {};


    let all = $(".row > article.result-item");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);
        if (single.find("span.easyScholarPaperFlag").length === 0) {
            let text = single.find(".resultData > div:eq(1)").text().trim();
            let publication = "";
            if(text.indexOf(", Vol ") !== -1){
                publication = text.split(", Vol ")[0];
            }else{
                publication = text.split(",")[0];
            }
            single.find(".resultData").before($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "APAPsycnet";
    addPapersRank(papersName, data);
};

function getAPAPsycnetmostcitedPaperNames() {
    let papersName = {};
    let data = {};

    let all = $(".results > .list article > span");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);
        if (single.find("span.easyScholarPaperFlag").length === 0) {
            let text = single.find("span.resultData > div > em").text().trim();
            let publication = text.split(",")[0];

            single.find(".article-title").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "APAPsycnet";
    addPapersRank(papersName, data);
};

function getAPAPsycnetDetailPaperNames() {
    let papersName = {};
    let data = {};


    let paperID = Math.floor(Math.random() * 100000);


    if ($("span.easyScholarPaperFlag").length === 0) {
        let publication = $(".pt-inner > .pti-body h3:first > span").text();
        $(".m-t-0").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
        papersName[paperID] = publication.toUpperCase();
    }


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "APAPsycnetDetail";
    addPapersRank(papersName, data);
};

function getmedWangFangPaperNames() {
    let papersName = {};
    let data = {};


    let paperID = Math.floor(Math.random() * 100000);


    let all = $("#resultsList > .item");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);
        if (single.find("span.easyScholarPaperFlag").length === 0) {
            let text = single.find(".item-content > .item-intro > p:first").text().trim();
            let publication = "";
            if(text.indexOf("《") !== -1 && text.indexOf("》") !== -1){
                publication = text.split("《")[1].split("》")[0];
            }

            single.find(".item-content > .item-title").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "万方医学网";
    addPapersRank(papersName, data);
};

function getmedWangFangDetailPaperNames() {
    let papersName = {};
    let data = {};


    let paperID = Math.floor(Math.random() * 100000);


    if ($("span.easyScholarPaperFlag").length === 0) {
        $(".content > .headline").before($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
        let publication = $(".details > .table span.inline:first > a:first").text();
        if(publication.indexOf("》") !== -1){
            publication = publication.replaceAll("《", "").replaceAll("》", "");
        }else{
            return ;
        }

        papersName[paperID] = publication.toUpperCase();
    }


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "万方医学网详情";
    addPapersRank(papersName, data);
};

function getpubscholarPaperNames() {
    let papersName = {};
    let data = {};


    let all = $(".List > .List__item");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);
        if (single.find("span.easyScholarPaperFlag").length === 0) {
            let publication = single.find("span.ContentItem__metaSource > span:first").text().trim();

            single.find("h2.ContentItem__title:first").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "PubScholar";
    addPapersRank(papersName, data);
};

function getpubscholarDetailPaperNames() {
    let papersName = {};
    let data = {};


    let paperID = Math.floor(Math.random() * 100000);


    if ($(".ArticleContent span.easyScholarPaperFlag").length === 0) {
        $("h1.ArticleInfo__title").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
        let publication = $("span.ArticleInfo__sourceTitle > span.ArticleInfo__metaSource:first").text();
        if(publication.indexOf("》") !== -1){
            publication = publication.replaceAll("《", "").replaceAll("》", "");
        }else{
            return ;
        }

        papersName[paperID] = publication.toUpperCase();
    }

    let all = $(".Recommendation > .List .RecommendationItem");
    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);
        if (single.find("span.easyScholarPaperFlag").length === 0) {
            let publication = single.find(".RecommendationItem__meta > span > span:first").text().trim();

            single.find("a:first").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "pubscholar详情页";
    addPapersRank(papersName, data);
};

function getmdpiPaperNames() {
    let papersName = {};
    let data = {};


    let all = $(".generic-item > .article-content");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);
        if (single.find("span.easyScholarPaperFlag").length === 0) {
            let publication = single.find(".color-grey-dark > em:first").text().trim();

            single.find("a.title-link").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "mdpi";
    addPapersRank(papersName, data);
};

function getmdpiDetailPaperNames() {
    let papersName = {};
    let data = {};


    let paperID = Math.floor(Math.random() * 100000);


    if ($("span.easyScholarPaperFlag").length === 0) {
        $("h1.title").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
        let publication = $(".content__container > a > img:first").attr("title");

        papersName[paperID] = publication.toUpperCase();
    }

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "mdpi详情页";
    addPapersRank(papersName, data);
};

function getrscPaperNames() {
    let papersName = {};
    let data = {};


    let all = $(".tab-content > .capsule--article");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);
        if (single.find("span.easyScholarPaperFlag").length === 0) {
            let publication = single.find(".text--small > span > i > strong:first").text().trim();

            single.find("h3.capsule__title").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "rsc";
    addPapersRank(papersName, data);
};

function getacsPaperNames() {
    let papersName = {};
    let data = {};


    let all = $("ul.items-results > li > .issue-item");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);
        if (single.find("span.easyScholarPaperFlag").length === 0) {
            let publication = single.find("span.issue-item_jour-name > i:first").text().trim();

            single.find("h2.issue-item_title").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "acs";
    addPapersRank(papersName, data);
};

function getacsDetailPaperNames() {
    let papersName = {};
    let data = {};


    let paperID = Math.floor(Math.random() * 100000);


    if ($("h1.article_header-title span.easyScholarPaperFlag").length === 0) {
        $("h1.article_header-title").append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
        let publication = $("span.cit-title:first").text();

        papersName[paperID] = publication.toUpperCase();
    }

    let all = $("ol.cited-content_cbyCitation > li.citedByEntry");
    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);
        if (single.find("span.easyScholarPaperFlag").length === 0) {
            let publication = single.find(".cited-content_cbyCitation_journal-name:first").text().trim();

            single.find("div:first").before($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "acs详情页";
    addPapersRank(papersName, data);
};

function getrscDetailPaperNames() {
    let papersName = {};
    let data = {};


    let paperID = Math.floor(Math.random() * 100000);


    if ($("span.easyScholarPaperFlag").length === 0) {
        $(".article__title:first").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
        let publication = $(".list__text-col > .list__item-label > h3:first").text();

        papersName[paperID] = publication.toUpperCase();
    }

    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "rsc详情页";
    addPapersRank(papersName, data);
};


function getyiiglePaperNames() {
    let papersName = {};
    let data = {};


    let all = $(".s_searchResult_li");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);
        if (single.find("span.easyScholarPaperFlag").length === 0) {
            let publication = single.find("a.zazhi_class > span.el-link--inner").text().trim();
            if(publication){
                publication = publication.replaceAll("《","").replaceAll("》","");
                single.find(".s_searchResult_li_top:first").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
                papersName[paperID] = publication.toUpperCase();
            }
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "yiigle";
    addPapersRank(papersName, data);
};

function getyiigle2PaperNames() {
    let papersName = {};
    let data = {};


    let all = $(".result__main > .list-item");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);
        if (single.find("span.easyScholarPaperFlag").length === 0) {
            let publication = single.find(".author span:eq(1)").text().trim();
            if(publication){
                publication = publication.replaceAll("《","").replaceAll("》","");
                single.find(".title > h5:first").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
                papersName[paperID] = publication.toUpperCase();
            }
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "yiigle2";
    addPapersRank(papersName, data);
};

function getyiigleDetailPaperNames() {
    let papersName = {};
    let data = {};


    let paperID = Math.floor(Math.random() * 100000);


    if ($("span.easyScholarPaperFlag").length === 0) {
        $(".art_title:first").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
        let publication = $(".jour_title:first").text();

        papersName[paperID] = publication.toUpperCase();
    }


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "yiigle详情页";
    addPapersRank(papersName, data);
};

function getspisPaperNames() {
    let papersName = {};
    let data = {};


    let all = $(".widget-article-list > .row");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);
        if (single.find("span.easyScholarPaperFlag").length === 0) {
            let publication = single.find(".scholarbox").text().trim();

            if(/(?=-).*(,\s)/.test(publication)){
                publication = publication.match(/(?=-).*(,\s)/)[0].replaceAll("- ","").replaceAll(",","").trim();
                single.find(".titlebox:first").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
                papersName[paperID] = publication.toUpperCase();
            }
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "spis";
    addPapersRank(papersName, data);
};

function getspisDetailPaperNames() {
    let papersName = {};
    let data = {};


    let paperID = Math.floor(Math.random() * 100000);


    if ($("span.easyScholarPaperFlag").length === 0) {
        $("#baseInfo_box .container .title:first").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
        let publication = $(".cont-source > .col_content > a:first").text();

        papersName[paperID] = publication.toUpperCase();
    }


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "spis详情页";
    addPapersRank(papersName, data);
};

function getspisJournalPaperNames() {
    let papersName = {};
    let data = {};


    let all = $(".results-lists > .row");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);
        if (single.find("span.easyScholarPaperFlag").length === 0) {
            let publication = single.find(".descbox-title > a:first").text().trim();

            single.find(".descbox-title").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "spisJournal";
    addPapersRank(papersName, data);
};

function getheinonlinePaperNames() {
    let papersName = {};
    let data = {};


    let all = $(".section_type_article_b");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);
        if (single.find("span.easyScholarPaperFlag").length === 0) {
            let publication = single.find("dt.search_result_line > i:first").text().trim();

            single.find(".search_result_line:first").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "heinonline";
    addPapersRank(papersName, data);
};

function getoldPubmedPaperNames() {
    let papersName = {};
    let data = {};


    let all = $(".content > div > .rprt");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);
        if (single.find("span.easyScholarPaperFlag").length === 0) {
            single.find(".title:first").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));

            let publication = single.find(".supp > .details:first").text().trim();
            if(/\D*(\d{4})/.test(publication)){
                let temp = publication.match(/\D*(\d{4})/)[0];
                publication = temp.substring(0, temp.length - 4).trim();
                papersName[paperID] = publication.toUpperCase();
            }
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "PubmedAbb";
    addPapersRank(papersName, data);
};

function getoldPubmedDetailPaperNames() {
    let papersName = {};
    let data = {};


    let paperID = Math.floor(Math.random() * 100000);


    if ($("span.easyScholarPaperFlag").length === 0) {
        $("section.usa-breadcrumb > ul.usa-breadcrumb__list > li.usa-breadcrumb__list-item:eq(1)").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
        let publication = $("section.usa-breadcrumb > ul.usa-breadcrumb__list > li.usa-breadcrumb__list-item:eq(1)").text();
        papersName[paperID] = publication.toUpperCase();
    }


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "Pubmed详情页abb";
    addPapersRank(papersName, data);
};

function getnaturePaperNames() {
    let papersName = {};
    let data = {};


    let all = $("li.app-article-list-row__item");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);
        if (single.find("span.easyScholarPaperFlag").length === 0) {
            let publication = single.find(".c-card__section > .u-text-bold:first").text().trim();
            // if(single.find(".c-card__section > span:first").text() === "Research"){
            single.find(".c-card__body h3:first").append($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
            // }
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "nature";
    addPapersRank(papersName, data);
};

function getnatureDetailPaperNames() {
    let papersName = {};
    let data = {};


    let paperID = Math.floor(Math.random() * 100000);

    if ($("span.easyScholarPaperFlag").length === 0) {
        $("h1:first").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
        let publication = $("#breadcrumb1 a:first").text();
        papersName[paperID] = publication.toUpperCase();
    }


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "nature详情页";
    addPapersRank(papersName, data);
};

function getletpubPaperNames() {
    let papersName = {};
    let data = {};


    let paperID = Math.floor(Math.random() * 100000);

    if ($("span.easyScholarPaperFlag").length === 0) {
        $("span[style='width:500px; height:160px; border:0px solid #DDDDDD; padding:0px; float:right; color:#999999; text-align:left; vertical-align:middle;']").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
        let publication = $("span[style='width:300px;  float:left; color:red; text-align:left; vertical-align:middle;'] > a:first").text();
        papersName[paperID] = publication.toUpperCase();
    }


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "letpub";
    addPapersRank(papersName, data);
};

function getphilpapersDetailPaperNames() {
    let papersName = {};
    let data = {};

    if($(".panel-body span.easyScholarPaperFlag").length === 0){
        let paperID = Math.floor(Math.random() * 100000);
        $("h1:first").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
        let publication = $(".panel-body .pubName .discreet").text();
        papersName[paperID] = publication.toUpperCase();
    }

    let all = $(".simList > .citation");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);
        if (single.find("span.easyScholarPaperFlag").length === 0) {
            let publication = single.find("i.pubName").text().trim();
            single.find("span.pubInfo").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "philpapersDetail";
    addPapersRank(papersName, data);
};

function getphilpapersPaperNames() {
    let papersName = {};
    let data = {};


    let all = $("ol.entryList > li");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);
        if (single.find("span.easyScholarPaperFlag").length === 0) {
            let publication = single.find("i.pubName").text().trim();
            single.find("span.citation").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            papersName[paperID] = publication.toUpperCase();
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "philpapers";
    addPapersRank(papersName, data);
};

function getSpringerNewPaperNames() {
    let papersName = {};
    let data = {};


    let all = $("li.c-card-open");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);
        if (single.find("span.easyScholarPaperFlag").length === 0) {
            single.find("h3:first").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            let publication = single.find(".c-author-list > a.u-color-inherit").text().trim();
            papersName[paperID] = publication.toUpperCase();
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "springernew";
    addPapersRank(papersName, data);
};

function getpubmedProSearchPaperNames() {
    let papersName = {};
    let data = {};


    let all = $(".article");

    all.each(function () {
        let paperID = Math.floor(Math.random() * 100000);
        let single = $(this);
        if (single.find("span.easyScholarPaperFlag").length === 0 && single.find(".articleTitle").length !== 0) {
            single.find(".articleTitle").after($('<span class ="easyScholarPaperFlag" paperID="' + paperID + '" ></span>'));
            let publication = single.find(".journal").text().trim().split("：")[1];
            papersName[paperID] = publication.toUpperCase();
        }
    });


    data["paperTotal"] = Object.keys(papersName).length;
    data["requirePublicationRank"] = optionCheckd;
    data["publicationName"] = papersName;

    data["website"] = "pubmedprosearch";
    addPapersRank(papersName, data);
};

// ------------------这里开始获取网站的文章名字 end

// ------------------从这里开始写每一个schoolr的判断逻辑 start
function doswufePaperRank(swufeRank, paper) {

    let rank = swufeRank == null ? "" : "SWUFE " + swufeRank;
    let rankColour = "";

    if (rank == "SWUFE A+") {
        rankColour = 'easyscholar-1';
    } else if (rank == "SWUFE A") {
        rankColour = 'easyscholar-2';
    } else if (rank == "SWUFE B") {
        rankColour = 'easyscholar-3';
    } else if (rank == "SWUFE C") {
        rankColour = 'easyscholar-4';
    }

    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.attr("title", titleswufe);
    span.text(rank);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function doTitlePaperRank(title, paperId) {

    if (title == null || title == "") {
        return;
    }

    let rankColour = "easyscholar-5";


    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(title);
    span.attr("title", title);
    $("span[paperid=" + paperId + "]").after(span);
};

function doahciPaperRank(ahciRank, paper) {

    let rank = ahciRank == null ? "" : "A&HCI 检索";
    let rankColour = "";

    if (rank == "A&HCI 检索") {
        rankColour = 'easyscholar-2';
    }

    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titleahci);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function doajgPaperRank(ajgRank, paper) {

    let rank = (ajgRank == null) ? "" : ("AJG " + ajgRank);
    let rankColour = "";

    if (rank == "AJG 4*") {
        rankColour = 'easyscholar-1';
    } else if (rank == "AJG 4") {
        rankColour = 'easyscholar-2';
    } else if (rank == "AJG 3") {
        rankColour = 'easyscholar-3';
    } else if (rank == "AJG 2") {
        rankColour = 'easyscholar-4';
    } else if (rank == "AJG 1") {
        rankColour = 'easyscholar-5';
    }

    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titleajg);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function doccfPaperRank(ccfRank, paper) {

    let rank = (ccfRank == null) ? "" : ("CCF " + ccfRank).trim();
    let rankColour = "";

    if (rank == "CCF A") {
        rankColour = 'easyscholar-1';
    } else if (rank == "CCF B") {
        rankColour = 'easyscholar-2';
    } else if (rank == "CCF C") {
        rankColour = 'easyscholar-3';
    } else if (rank == "CCF T1") {
        rankColour = 'easyscholar-1';
    } else if (rank == "CCF T2") {
        rankColour = 'easyscholar-2';
    } else if (rank == "CCF T3") {
        rankColour = 'easyscholar-3';
    }

    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titleccf);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function docquPaperRank(cquRank, paper) {

    let rank = (cquRank == null) ? "" : ("CQU " + cquRank);
    let rankColour = "";

    if (rank == "CQU A" || rank == "CQU 权威期刊") {
        rankColour = 'easyscholar-2';
    } else if (rank == "CQU B" || rank == "CQU 重要期刊") {
        rankColour = 'easyscholar-3';
    } else if (rank == "CQU C") {
        rankColour = 'easyscholar-4';
    }

    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titlecqu);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function docscdPaperRank(cscdRank, paper) {

    let rank = (cscdRank == null) ? "" : ("CSCD " + cscdRank);
    let rankColour = "";

    if (rank == "CSCD 扩展库") {
        rankColour = 'easyscholar-3';
    } else if (rank == "CSCD 核心库") {
        rankColour = 'easyscholar-2';
    }

    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titlecscd);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function docssciPaperRank(cssciRank, paper) {

    let rank = (cssciRank == null) ? "" : (cssciRank);
    let rankColour = "";

    if (rank == "CSSCI") {
        rankColour = 'easyscholar-1';
    } else if (rank == "CSSCI扩展版") {
        rankColour = 'easyscholar-2';
    }

    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titlecssci);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function docufePaperRank(cufeRank, paper) {

    let rank = (cufeRank == null) ? "" : ("CUFE " + cufeRank);
    let rankColour = "";

    if (rank == "CUFE AAA") {
        rankColour = 'easyscholar-2';
    } else if (rank == "CUFE AA") {
        rankColour = 'easyscholar-3';
    } else if (rank == "CUFE A") {
        rankColour = 'easyscholar-4';
    }


    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titlecufe);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function docugPaperRank(cugRank, paper) {

    let rank = (cugRank == null) ? "" : ("CUG " + cugRank);
    let rankColour = "";

    let rankTemp = rank.substring(rank.length - 2);
    if (rankTemp == "T1") {
        rankColour = 'easyscholar-1';
    } else if (rankTemp == "T2") {
        rankColour = 'easyscholar-2';
    } else if (rankTemp == "T3") {
        rankColour = 'easyscholar-3';
    } else if (rankTemp == "T4") {
        rankColour = 'easyscholar-4';
    } else if (rankTemp == "T5") {
        rankColour = 'easyscholar-5';
    }


    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titlecug);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function doeiiPaperRank(eiiRank, paper) {

    let rank = (eiiRank == null) ? "" : ("EI检索");
    let rankColour = "";

    if (rank == "EI检索") {
        rankColour = 'easyscholar-2';
    }


    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titleeii);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function dofduPaperRank(fduRank, paper) {

    let rank = (fduRank == null) ? "" : ("FDU " + fduRank);
    let rankColour = "";

    if (rank == "FDU A") {
        rankColour = 'easyscholar-2';
    } else if (rank == "FDU B") {
        rankColour = 'easyscholar-3';
    }


    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titlefdu);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function dohhuPaperRank(hhuRank, paper) {

    let rank = (hhuRank == null) ? "" : ("HHU " + hhuRank);
    let rankColour = "";

    if (rank == "HHU A类") {
        rankColour = 'easyscholar-1';
    } else if (rank == "HHU B类") {
        rankColour = 'easyscholar-2';
    } else if (rank == "HHU c类") {
        rankColour = 'easyscholar-3';
    }


    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titlehhu);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function donjuPaperRank(njuRank, paper) {

    let rank = (njuRank == null) ? "" : ("NJU " + njuRank);
    let rankColour = "";

    if (rank == "NJU 超一流期刊" || rank == "NJU 学科群一流期刊") {
        rankColour = 'easyscholar-1';
    } else if (rank == "NJU A") {
        rankColour = 'easyscholar-2';
    } else if (rank == "NJU B") {
        rankColour = 'easyscholar-3';
    }


    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titlenju);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function dopkuPaperRank(pkuRank, paper) {

    let rank = (pkuRank == null) ? "" : ("北大中文核心");
    let rankColour = "";

    if (rank == "北大中文核心") {
        rankColour = 'easyscholar-1';
    }


    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titlepku);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function dorucPaperRank(rucRank, paper) {

    let rank = (rucRank == null) ? "" : ("RUC " + rucRank);
    let rankColour = "";

    if (rank == "RUC A+") {
        rankColour = 'easyscholar-1';
    } else if (rank == "RUC A") {
        rankColour = 'easyscholar-2';
    } else if (rank == "RUC A-") {
        rankColour = 'easyscholar-3';
    } else if (rank == "RUC B") {
        rankColour = 'easyscholar-4';
    }


    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titleruc);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function dosciPaperRank(sciRank, paper) {

    let rank = (sciRank == null) ? "" : ("SCI " + sciRank);
    let rankColour = "";

    if (rank == "SCI Q1") {
        rankColour = 'easyscholar-1';
    } else if (rank == "SCI Q2") {
        rankColour = 'easyscholar-2';
    } else if (rank == "SCI Q3") {
        rankColour = 'easyscholar-3';
    } else if (rank == "SCI Q4") {
        rankColour = 'easyscholar-4';
    }


    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titlesci);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function dosciifPaperRank(sciifRank, paper) {

    let rank = (sciifRank == null) ? "" : ("IF " + sciifRank);
    let rankColour = "";

    let number = parseFloat(rank.split(" ")[1]);

    if (number >= 10) {
        rankColour = 'easyscholar-1';
    } else if (number >= 4 && number < 10) {
        rankColour = 'easyscholar-2';
    } else if (number >= 2 && number < 4) {
        rankColour = 'easyscholar-3';
    } else if (number >= 1 && number < 2) {
        rankColour = 'easyscholar-4';
    } else if (number >= 0 && number < 1) {
        rankColour = 'easyscholar-5';
    }


    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titlesciif);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function dojciPaperRank(jciRank, paper) {

    let rank = (jciRank == null) ? "" : ("JCI " + jciRank);
    let rankColour = "";

    let number = parseFloat(rank.split(" ")[1]);

    if (number >= 3) {
        rankColour = 'easyscholar-1';
    } else if (number >= 1 && number < 3) {
        rankColour = 'easyscholar-2';
    } else if (number >= 0.5 && number < 1) {
        rankColour = 'easyscholar-3';
    } else if (number >= 0 && number < 0.5) {
        rankColour = 'easyscholar-4';
    }


    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titlejci);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function dosciif5PaperRank(sciif5Rank, paper) {

    let rank = (sciif5Rank == null || sciif5Rank == "NOT AVAILABLE") ? "" : ("IF(5) " + sciif5Rank);
    let rankColour = "";
    if (rank != "") {
        let number = parseFloat(rank.split(" ")[1]);

        if (number >= 10) {
            rankColour = 'easyscholar-1';
        } else if (number >= 4 && number < 10) {
            rankColour = 'easyscholar-2';
        } else if (number >= 2 && number < 4) {
            rankColour = 'easyscholar-3';
        } else if (number >= 1 && number < 2) {
            rankColour = 'easyscholar-4';
        } else if (number >= 0 && number < 1) {
            rankColour = 'easyscholar-5';
        }

        let span = $('<span></span>');

        span.addClass(rankColour);
        span.addClass("easyscholar-ranking");
        span.text(rank);
        span.attr("title", titlesciif5);
        $("span[paperid=" + paper.tempID + "]:first").after(span);
        docnkiOverSeaPaperRank(span, paper);
        docnkiOverSeaPaperRank(span, paper);

    }

};

function dosciBasePaperRank(scibaseRank, paper) {

    let rank = (scibaseRank == null) ? "" : ("SCI基础版 " + scibaseRank);
    let rankColour = "";

    let rankTemp = rank.substring(rank.length - 2);
    if (rankTemp == "1区") {
        rankColour = 'easyscholar-1';
    } else if (rankTemp == "2区") {
        rankColour = 'easyscholar-2';
    } else if (rankTemp == "3区") {
        rankColour = 'easyscholar-3';
    } else if (rankTemp == "4区") {
        rankColour = 'easyscholar-4';
    }

    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titlescibase);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function dosciUpPaperRank(sciupRank, paper, sciUpSmall) {

    let rank = (sciupRank == null) ? "" : ("SCI升级版 " + sciupRank);
    let rankColour = "";

    let rankTemp = rank.substring(rank.length - 2);
    if (rankTemp == "1区") {
        rankColour = 'easyscholar-1';
    } else if (rankTemp == "2区") {
        rankColour = 'easyscholar-2';
    } else if (rankTemp == "3区") {
        rankColour = 'easyscholar-3';
    } else if (rankTemp == "4区") {
        rankColour = 'easyscholar-4';
    }

    let span = $('<span></span>');
    if (sciUpSmall !== undefined) {
        span.attr("title", "中科院小类分区：“" + sciUpSmall + '”。' + titlesciup);
    } else {
        span.attr("title", titlesciup);
    }
    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);

    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function dosdufePaperRank(sdufeRank, paper) {

    let rank = (sdufeRank == null) ? "" : ("SDUFE " + sdufeRank);
    let rankColour = "";

    if (rank == "SDUFE 特类期刊") {
        rankColour = 'easyscholar-1';
    } else if (rank == "SDUFE A1") {
        rankColour = 'easyscholar-2';
    } else if (rank == "SDUFE A2") {
        rankColour = 'easyscholar-3';
    } else if (rank == "SDUFE B") {
        rankColour = 'easyscholar-4';
    } else if (rank == "SDUFE C") {
        rankColour = 'easyscholar-5';
    }

    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titlesdufe);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function dosjtuPaperRank(sjtuRank, paper) {

    let rank = (sjtuRank == null) ? "" : ("SJTU " + sjtuRank);
    let rankColour = "";

    if (rank == "SJTU A") {
        rankColour = 'easyscholar-2';
    } else if (rank == "SJTU B") {
        rankColour = 'easyscholar-3';
    }

    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titlesjtu);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function dossciPaperRank(ssciRank, paper) {

    let rank = (ssciRank == null) ? "" : ("SSCI " + ssciRank);
    let rankColour = "";

    if (rank == "SSCI Q1") {
        rankColour = 'easyscholar-1';
    } else if (rank == "SSCI Q2") {
        rankColour = 'easyscholar-2';
    } else if (rank == "SSCI Q3") {
        rankColour = 'easyscholar-3';
    } else if (rank == "SSCI Q4") {
        rankColour = 'easyscholar-4';
    } else if (rank == "SSCI SSCI") {
        rankColour = 'easyscholar-3';
        rank = rank.substring(0, 4);
    }

    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titlessci);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function doswjtuPaperRank(swjtuRank, paper) {

    let rank = (swjtuRank == null) ? "" : ("SWJTU " + swjtuRank);
    let rankColour = "";

    if (rank == "SWJTU A++") {
        rankColour = 'easyscholar-1';
    } else if (rank == "SWJTU A+") {
        rankColour = 'easyscholar-2';
    } else if (rank == "SWJTU A") {
        rankColour = 'easyscholar-3';
    } else if (rank == "SWJTU B+") {
        rankColour = 'easyscholar-4';
    } else if (rank == "SWJTU B") {
        rankColour = 'easyscholar-5';
    } else if (rank == "SWJTU C") {
        rankColour = 'easyscholar-5';
    }

    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titleswjtu);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function douibePaperRank(uibeRank, paper) {

    let rank = (uibeRank == null) ? "" : ("UIBE " + uibeRank);
    let rankColour = "";

    if (rank == "UIBE A") {
        rankColour = 'easyscholar-1';
    } else if (rank == "UIBE A-") {
        rankColour = 'easyscholar-2';
    } else if (rank == "UIBE B") {
        rankColour = 'easyscholar-3';
    }

    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titleuibe);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function doxjuPaperRank(xjuRank, paper) {

    let rank = (xjuRank == null) ? "" : ("XJU " + xjuRank);
    let rankColour = "";

    if (rank == "XJU 一区") {
        rankColour = 'easyscholar-1';
    } else if (rank == "XJU 二区") {
        rankColour = 'easyscholar-2';
    } else if (rank == "XJU 三区") {
        rankColour = 'easyscholar-3';
    } else if (rank == "XJU 四区") {
        rankColour = 'easyscholar-4';
    } else if (rank == "XJU 五区") {
        rankColour = 'easyscholar-5';
    }

    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titlexju);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function doxmuPaperRank(xmuRank, paper) {

    let rank = (xmuRank == null) ? "" : (xmuRank);
    let rankColour = "";

    if (rank == "XMU一类") {
        rankColour = 'easyscholar-2';
    }

    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titlexmu);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function doxduPaperRank(xduRank, paper) {

    let rank = (xduRank == null) ? "" : ("XDU " + xduRank);
    let rankColour = "";

    if (rank == "XDU 1类贡献度") {
        rankColour = 'easyscholar-1';
    } else if (rank == "XDU 2类贡献度") {
        rankColour = 'easyscholar-2';
    }

    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titlexdu);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function dozhongguokejihexinPaperRank(zhongguokejihexinRank, paper) {

    let rank = (zhongguokejihexinRank == null) ? "" : ("中国科技核心期刊");
    let rankColour = "";

    if (rank == "中国科技核心期刊") {
        rankColour = 'easyscholar-2';
    }

    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titlezhongguokejihexin);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function dofmsPaperRank(fmsRank, paper) {

    let rank = (fmsRank == null) ? "" : ("FMS " + fmsRank);
    let rankColour = "";

    if (rank == "FMS A" || rank == "FMS T1") {
        rankColour = 'easyscholar-1';
    } else if (rank == "FMS B" || rank == "FMS T2") {
        rankColour = 'easyscholar-2';
    } else if (rank == "FMS C") {
        rankColour = 'easyscholar-3';
    } else if (rank == "FMS D") {
        rankColour = 'easyscholar-4';
    }

    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titlefms);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function doscuPaperRank(scuRank, paper) {

    let rank = (scuRank == null) ? "" : ("SCU " + scuRank);
    let rankColour = "";
    let tempRank = rank.slice(-1);
    if (tempRank == "A") {
        rankColour = 'easyscholar-1';
    } else if (tempRank == "-") {
        rankColour = 'easyscholar-2';
    } else if (tempRank == "B") {
        rankColour = 'easyscholar-3';
    } else if (tempRank == "C") {
        rankColour = 'easyscholar-4';
    } else if (tempRank == "D") {
        rankColour = 'easyscholar-5';
    } else if (tempRank == "E") {
        rankColour = 'easyscholar-5';
    }

    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titlescu);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function dosciwarnPaperRank(sciwarn, paper) {

    let rank = sciwarn;

    let rankColour = 'easyscholar-5';
    let span = $('<span></span>');

    let svg = '<svg t="1654515882832" class="icon" viewBox="0 0 1295 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8185" width="17" height="11"><path d="M1276.114671 845.562676L753.465992 51.804384a115.120854 115.120854 0 0 0-191.100618 0L20.14615 843.835863A115.120854 115.120854 0 0 0 115.120854 1024h1064.867904a115.120854 115.120854 0 0 0 96.125913-178.437324z m-617.047779 70.223721a86.340641 86.340641 0 1 1 86.34064-86.340641 86.340641 86.340641 0 0 1-86.34064 86.340641zM762.100056 322.338392l-38.565486 306.221473a65.043283 65.043283 0 0 1-129.510961 0L556.033727 322.338392A86.340641 86.340641 0 0 1 633.164699 225.636875h45.472738a86.340641 86.340641 0 0 1 83.462619 96.701517z" fill="#F03535" p-id="8186"></path><path d="M676.33502 225.06127H633.164699A86.340641 86.340641 0 0 0 556.033727 322.338392l38.565486 306.221473a65.043283 65.043283 0 0 0 129.510961 0l38.565486-306.221473a86.340641 86.340641 0 0 0-85.765036-97.277122z" fill="#FFFFFF" p-id="8187"></path><path d="M659.066892 829.445756m-86.340641 0a86.340641 86.340641 0 1 0 172.681281 0 86.340641 86.340641 0 1 0-172.681281 0Z" fill="#FFFFFF" p-id="8188"></path></svg>'

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text("中科院预警 " + rank);
    span.attr("title", titlesciwarn);
    span.prepend(svg)

    $("span[paperid=" + paper.tempID + "]").after(span);
};

function dozjuPaperRank(zjuRank, paper) {
    if (zjuRank == "国内一级学术期刊") {
        zjuRank = "国内一级";
    } else if (zjuRank == "国内核心期刊") {
        zjuRank = "国内核心";
    }
    let rank = (zjuRank == null) ? "" : ("ZJU " + zjuRank);
    let rankColour = "";

    if (zjuRank == "国内一级") {
        rankColour = 'easyscholar-1';
    } else if (zjuRank == "国内核心") {
        rankColour = 'easyscholar-2';
    }

    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titlezju);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function docjuPaperRank(cjuRank, paper) {

    let rank = (cjuRank == null) ? "" : ("YangtzeU " + cjuRank);
    let rankColour = "";
    let temp = cjuRank.slice(0, 2);
    if (temp == "T1") {
        rankColour = 'easyscholar-1';
    } else if (temp == "T2") {
        rankColour = 'easyscholar-2';
    } else if (temp == "T3") {
        rankColour = 'easyscholar-3';
    }

    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titlecju);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function doft50PaperRank(ftRank, paper) {

    let rank = (ftRank == null) ? "" : ("FT50");

    if (ftRank == "FT50") {
        rankColour = 'easyscholar-1';
    }

    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titleft50);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function doutd24PaperRank(Rank, paper) {

    let rank = (Rank == null) ? "" : ("UTD24");

    if (Rank == "UTD24") {
        rankColour = 'easyscholar-1';
    }

    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(rank);
    span.attr("title", titleutd24);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function dozhintroPaperRank(intro, paper) {


    if (intro != null) {
        rankColour = 'easyscholar-5';
    }

    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text("简介");
    span.attr("title", intro);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function doenintroPaperRank(intro, paper) {


    if (intro != null) {
        rankColour = 'easyscholar-5';
    }

    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text("简介");
    span.attr("title", intro);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function doesiPaperRank(esi, paper) {


    if (esi != null) {
        rankColour = 'easyscholar-5';
    }

    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text("ESI学科分类：" + esi);
    span.attr("title", titleesi);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function docpuPaperRank(cpu, paper) {


    if (cpu === "顶尖期刊" || cpu === "一流期刊") {
        rankColour = 'easyscholar-1';
    } else if (cpu === "权威期刊") {
        rankColour = 'easyscholar-2';
    } else if (cpu.indexOf("学科顶尖") >= 0) {
        rankColour = 'easyscholar-3';
    } else if (cpu.indexOf("学科一流") >= 0) {
        rankColour = 'easyscholar-4';
    } else if (cpu.indexOf("学科重要") >= 0) {
        rankColour = 'easyscholar-5';
    }

    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text("CPU " + cpu);
    span.attr("title", titlecpu);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function dosciUpTopPaperRank(sciUpTop, paper) {


    let rankColour = 'easyscholar-1';


    let span = $('<span></span>');

    span.addClass(rankColour);
    span.addClass("easyscholar-ranking");
    span.text(sciUpTop);
    span.attr("title", titlesciUpTop);
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);
};

function doCustomPaperRank(level, levelText, abb, uuid, paper) {
    let span;
    if (abb.includes("预警")) {
        let rankColour = 'easyscholar-5';
        span = $('<span></span>');

        let svg = '<svg t="1654515882832" class="icon" viewBox="0 0 1295 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8185" width="17" height="11"><path d="M1276.114671 845.562676L753.465992 51.804384a115.120854 115.120854 0 0 0-191.100618 0L20.14615 843.835863A115.120854 115.120854 0 0 0 115.120854 1024h1064.867904a115.120854 115.120854 0 0 0 96.125913-178.437324z m-617.047779 70.223721a86.340641 86.340641 0 1 1 86.34064-86.340641 86.340641 86.340641 0 0 1-86.34064 86.340641zM762.100056 322.338392l-38.565486 306.221473a65.043283 65.043283 0 0 1-129.510961 0L556.033727 322.338392A86.340641 86.340641 0 0 1 633.164699 225.636875h45.472738a86.340641 86.340641 0 0 1 83.462619 96.701517z" fill="#F03535" p-id="8186"></path><path d="M676.33502 225.06127H633.164699A86.340641 86.340641 0 0 0 556.033727 322.338392l38.565486 306.221473a65.043283 65.043283 0 0 0 129.510961 0l38.565486-306.221473a86.340641 86.340641 0 0 0-85.765036-97.277122z" fill="#FFFFFF" p-id="8187"></path><path d="M659.066892 829.445756m-86.340641 0a86.340641 86.340641 0 1 0 172.681281 0 86.340641 86.340641 0 1 0-172.681281 0Z" fill="#FFFFFF" p-id="8188"></path></svg>'

        span.addClass(rankColour);
        span.addClass("easyscholar-ranking");
        span.text(abb + " " + levelText);
        span.prepend(svg)
    } else {
        let rankColour;
        if (level === "1") {
            rankColour = 'easyscholar-1';
        } else if (level === "2") {
            rankColour = 'easyscholar-2';
        } else if (level === "3") {
            rankColour = 'easyscholar-3';
        } else if (level === "4") {
            rankColour = 'easyscholar-4';
        } else if (level === "5") {
            rankColour = 'easyscholar-5';
        }

        span = $('<span></span>');

        span.addClass(rankColour);
        span.addClass("easyscholar-ranking");
        span.text(abb + " " + levelText);

    }

    chrome.storage.local.get({
        "customPublicationRankIntro": ""
    }, function (items) {
        if (items.customPublicationRankIntro[uuid] !== undefined) {
            span.attr("title", items.customPublicationRankIntro[uuid]);
        } else {
            span.attr("title", "数据集介绍缺失。请您点开浏览器中的扩展logo，加载完毕后重新刷新页面");
        }

    });
    $("span[paperid=" + paper.tempID + "]:first").after(span);
    docnkiOverSeaPaperRank(span, paper);

};


function docnkiOverSeaPaperRankCss() {
    if (getCurrentWebSite(window.location.href) === "CnkiOverSeaDetail") {
        docnkiOverSeaPaperRankCssHelp($("#frame1").contents());
    } else if (getCurrentWebSite(window.location.href) === "CnkiOverSeaAuthor") {
        $("#frame2").css({
            "height": $("#frame2").contents().find(".ebBd ul li").length * 65
        });
        let frame3Height = $("#frame3").contents().find("a[onclick*='getKns8NaviLink(']").length * 90;
        $("#frame3").css({
            "height": frame3Height > 880 ? 880 : frame3Height
        });
        $("#frame8").css({
            "height": "700px"
        });
        docnkiOverSeaPaperRankCssHelp($("#frame2").contents());
        docnkiOverSeaPaperRankCssHelp($("#frame3").contents());
        docnkiOverSeaPaperRankCssHelp($("#frame4").contents());
        docnkiOverSeaPaperRankCssHelp($("#frame8").contents());
    }
}

function docnkiOverSeaPaperRankCssHelp(contents) {
    if (contents.find("span.easyscholar-1").css("background-color") == "rgb(255, 255, 255)") {
        $("span.easyscholar-1").hide();
    } else {
        $("span.easyscholar-1").show();
    }
    if (contents.find("span.easyscholar-2").css("background-color") == "rgb(255, 255, 255)") {
        $("span.easyscholar-2").hide();
    } else {
        $("span.easyscholar-2").show();
    }
    if (contents.find("span.easyscholar-3").css("background-color") == "rgb(255, 255, 255)") {
        $("span.easyscholar-3").hide();
    } else {
        $("span.easyscholar-3").show();
    }
    if (contents.find("span.easyscholar-4").css("background-color") == "rgb(255, 255, 255)") {
        $("span.easyscholar-4").hide();
    } else {
        $("span.easyscholar-4").show();
    }
    if (contents.find("span.easyscholar-5").css("background-color") == "rgb(255, 255, 255)") {
        $("span.easyscholar-5").hide();
    } else {
        $("span.easyscholar-5").show();
    }

    contents.find("span.easyscholar-1").css({"background-color": easyScholarColour1});
    contents.find("span.easyscholar-2").css({"background-color": easyScholarColour2});
    contents.find("span.easyscholar-3").css({"background-color": easyScholarColour3});
    contents.find("span.easyscholar-4").css({"background-color": easyScholarColour4});
    contents.find("span.easyscholar-5").css({"background-color": easyScholarColour5});

    contents.find("span.easyscholar-ranking").css({"color": fontColour});

    contents.find("span.easyscholar-ranking").css({
        "padding-left": "9px",
        "padding-top": "3px",
        "padding-bottom": "2px",
        "padding-right": "9px",
        "margin-left": "5px",
        "margin-right": "5px",
        "border-radius": "9px",
        "font-size": "12px;",
        "white-space": "nowrap;",
        "font-family": "Times New Roman",
    });
    if (skin === "square_skin") {
        contents.find("span.easyscholar-ranking").css({
            "border-radius": "0px",
            "margin-right": "0px",
            "margin-left": "0px",
            "border-right": "1px solid black",
            "border-left": "1px solid black",
            "border-top": "1px solid black",
            "border-bottom": "1px solid black",
        });
    }
    if (isFontBold === "bold") {
        contents.find("span.easyscholar-ranking").css({"font-weight": "bold"});
    }

    contents.find("span.easyscholar-ranking").css({"font-size": fontSize + "px"});
};

function docnkiOverSeaPaperRank(span, paper) {
    let contents;
    if (getCurrentWebSite(window.location.href) === "CnkiOverSeaDetail") {
        contents = $("#frame1").contents();
        contents.find("span[paperid=" + paper.tempID + "]").after(span);
    } else if (getCurrentWebSite(window.location.href) === "CnkiOverSeaAuthor") {
        let contents2 = $("#frame2").contents();
        let contents3 = $("#frame3").contents();
        let contents4 = $("#frame4").contents();
        let contents8 = $("#frame8").contents();
        contents2.find("span[paperid=" + paper.tempID + "]").after(span);
        contents3.find("span[paperid=" + paper.tempID + "]").after(span);
        contents4.find("span[paperid=" + paper.tempID + "]").after(span);
        contents8.find("span[paperid=" + paper.tempID + "]").after(span);
    }
};


// ------------------从这里开始写每一个schoolr的判断逻辑 end

// 排名结束


// 文献管理开始
let selectWindow;


function paperManagerStart() {


    let url = window.location.href;

    let webSiteName = getCurrentWebSite(url);
    if (webSiteName != null
        && $.inArray(webSiteName, paperManagerWebsiteList) !== -1
        && $(".easyScholar_paper_collect").length === 0) {
        if (isEval) {
            eval("add" + webSiteName + "PaperManager()");
        } else {
            window["add" + webSiteName + "PaperManager"]();
        }
    }
    initSelectPaperType();
};

// ----------------在每个网站上添加easyScholar收藏标志

function addBaiduDetailPaperManager() {
    let test = $("div.subinfo_tool");
    let baiduPaper = $(
        "<a  class='paper_share easyScholar_paper_collect' href='javascript:;'>easyScholar文献收藏</a>"
    );
    test.append(baiduPaper);
};

function addCnkiDetailPaperManager() {
    let box = $("#DownLoadParts ul.operate-btn");
    let cnkiPaper = $('<li class="btn-phone"><a  class="easyScholar_paper_collect" style=" width: 180px;" ><i></i>easyScholar文献收藏</a></li>');
    box.append(cnkiPaper);
};

function addCnkiOverSeaDetailPaperManager() {
    let box = $("#DownLoadParts ul.operate-btn");
    let cnkiPaper = $('<li class="btn-phone"><a  class="easyScholar_paper_collect" style=" width: 180px;" ><i></i>easyScholar文献收藏</a></li>');
    box.append(cnkiPaper);
};

function addWangfangDetailPaperManager() {
    let box = $("div.buttons div.export");
    let cnkiPaper = $('<div class="export buttonItem easyScholar_paper_collect" style="width:200px"><svg t="1655777852126" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="923" width="17" height="17" class="icon"><path d="M849.6 231v109.5c-46.4 14.9-84.6 41.5-114.4 81.3-29.9 36.5-44.8 76.3-43.1 116.1 8.3-5 21.6-6.6 41.5-6.6 34.8 0 64.7 11.6 91.2 36.5 23.2 24.9 36.5 56.4 36.5 94.5S848 732 821.5 756.8C795 780 761.8 793.3 722 793.3c-46.4 0-82.9-19.9-112.8-56.4s-43.1-84.6-43.1-141c0-89.6 24.9-165.8 76.3-230.5C692 299 761.7 254.2 849.6 231z m-403 0v109.5c-46.4 14.9-82.9 41.5-112.8 81.3-31.5 36.5-46.4 76.3-44.8 116.1 8.3-5 21.6-6.6 41.5-6.6 34.8 0 64.7 11.6 89.6 36.5 24.9 24.9 38.1 56.4 38.1 94.5s-13.3 69.7-38.1 94.5c-26.5 23.2-61.4 36.5-101.2 36.5-46.4 0-82.9-19.9-111.1-56.4-29.9-36.5-44.8-84.6-44.8-141 0-89.6 24.9-165.8 76.3-230.5C289 299 358.7 254.2 446.6 231z" p-id="924"></path></svg><span>easyScholar文献收藏</span></div>');
    box.after(cnkiPaper);
};

function addSpringerDetailPaperManager() {
    let box = $("a.c-article-info-details__cite-as");
    let springerPaper = $('<a href="javascript:;"  style="color:blue" class="easyScholar_paper_collect c-article-info-details__cite-as u-hide-print" >easyScholar文献收藏</a>');
    box.after(springerPaper);
};

function addIeeeDetailPaperManager() {
    let box = $(".cite-this-related-btn-wrapper");
    let ieeePaper = $('<div ><xpl-cite-this-modal _ngcontent-mlc-c143="" ><!----><div _ngcontent-mlc-c143=""><button _ngcontent-mlc-c143="" placement="bottom" class="layout-btn-white cite-this-btn easyScholar_paper_collect">easyScholar文献收藏</button></div></xpl-cite-this-modal><!----></div>');
    box.after(ieeePaper);
};

function addWOSDetailPaperManager() {
    let clock = setInterval(function () {
        if ($("#FullRecSnRecListtop").length != 0 && $(".easyScholar_paper_collect").length == 0) {
            let checkBox = $("#FullRecSnRecListtop");
            let WOSpaper = $('<div><button aria-haspopup="true" mat-button="" mat-stroked-button="" color="primary" class="easyScholar_paper_collect mat-focus-indicator mat-menu-trigger cdx-but-md cdx-but-white-background margin-right-10--reversible mat-button mat-stroked-button mat-button-base mat-primary"><span class="mat-button-wrapper"> easyScholar文献收藏 </span></button><!----></div>');
            checkBox.append(WOSpaper);
            clearInterval(clock);
            initSelectPaperType();
        }
    }, 700);

};

function addAminerDetailPaperManager() {
    let checkBox = $("div.a-aminer-core-pub-c-pub-action-btn-pubActionBtn > div.mark");
    let aminerPaper = $('<div class="unifiedStyle2 mark"><div class="a-aminer-components-widgets-mark-pub-markPub a-aminer-components-widgets-mark-pub-small mark-pub"><div class="btns_box"><div class="btn_box mark_btn_box"><div><button type="button" class="easyScholar_paper_collect ant-btn mark_btn btn"><div><svg class="icon" aria-hidden="true"><use xlink:href="#icon-add"></use></svg><span>easyScholar文献收藏</span></div></button></div></div></div></div></div>');

    checkBox.after(aminerPaper);
};

function addPubmedDetailPaperManager() {
    let checkBox = $("div.sidebar div.inner-wrap button.citation-dialog-trigger");
    let pubmedPaper = $('<button class="citation-button easyScholar_paper_collect"><span class="button-label">easyScholar文献收藏</span></button>');

    checkBox.after(pubmedPaper);
};

function addReadPaperDetailPaperManager() {
    let checkBox = $("button.collect").parent("div");
    let readPaperBox = $('<div style="display:inline-block;" data-v-9915cbce="" aria-expanded="false"><button type="button" class="easyScholar_paper_collect collect ant-btn" data-v-9915cbce=""><span>easyScholar文献收藏</span></button></div>');

    checkBox.after(readPaperBox);
};

function addScienceDirectDetailPaperManager() {
    let clock = setInterval(function () {
        if ($("#popover-trigger-export-citation-popover").length !== 0 && $(".easyScholar_paper_collect").length === 0) {
            let checkBox = $("#export-citation");
            let scienceDirectPaper = $('<div class="ExportCitation u-display-inline-block" ><div><div><button class="easyScholar_paper_collect button button-anchor" type="button"><svg focusable="false" viewBox="0 0 106 128" height="16" width="16" class="icon icon-cited-by-66"><path d="m2 58.78v47.22h44v-42h-34v-5.22c0-18.5 17.08-26.78 34-26.78v-1e1c-25.9 0-44 15.12-44 36.78zm1e2 -26.78v-1e1c-25.9 0-44 15.12-44 36.78v47.22h44v-42h-34v-5.22c0-18.5 17.08-26.78 34-26.78z"></path></svg><span class="button-text">easyScholar文献收藏</span></button></div></div></div>');

            checkBox.after(scienceDirectPaper);
            clearInterval(clock);
            initSelectPaperType();
        }
    }, 300);

};

function addScopusDetailPaperManager() {
    let clock = setInterval(function () {
        if ($("div[data-testid='document-title']").length != 0 && $(".easyScholar_paper_collect").length == 0) {
            let checkBox = $("section.DocumentToolbar-module_documentToolbar__4L8BE > div.row > div > els-stack ");
            let scopusPaper = $('<button data-name="" variant="link-alt" tabindex="0" class="hydrated easyScholar_paper_collect" style="\n' +
                '    height: 34px;\n' +
                '    padding-bottom: 4px;\n' +
                '    padding-top: 4px;\n' +
                '    padding-left: 5px;\n' +
                '    padding-right: 5px;\n' +
                '">easyScholar文献收藏</button>');

            checkBox.append(scopusPaper);
            clearInterval(clock);
            initSelectPaperType();
        }
    }, 500);

};

function addEmbaseDetailPaperManager() {
    let clock = setInterval(function () {
        if ($("div[class*='RightPane_root'] div[class*='Flexbox-module_root']").length !== 0 && $(".easyScholar_paper_collect").length === 0) {
            let checkBox = $("div[class*='RightPane_root'] div[class*='Flexbox-module_root']");
            let embasePaper = $('<div class="d-none d-sm-block Flexbox-module_item__Br2Dj"><button class="easyScholar_paper_collect "><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 128" height="24" width="19" class="" focusable="false"><path d="M28.92 120c-6.9 0-13.49-2.8-18.63-7.93-11.43-11.39-10.6-28.12 2.01-40.69 0 0 15.51-15.49 24.18-24.14 3.71-3.69 8.51-5.58 13.5-5.36 4.6.22 8.98 2.19 12.35 5.54 3.36 3.35 5.33 7.72 5.54 12.3.22 4.96-1.7 9.73-5.41 13.42L39.65 95.88l-7.13-7.11 22.81-22.74c1.71-1.7 2.55-3.72 2.46-5.87-.09-2.03-1.04-4.08-2.59-5.63-1.57-1.56-3.64-2.51-5.69-2.61-2.16-.12-4.2.74-5.9 2.43-8.66 8.64-24.17 24.13-24.17 24.13-8.69 8.66-9.48 19.05-2.02 26.48 3.39 3.39 7.54 5.13 11.95 4.98 4.92-.14 9.92-2.61 14.46-7.14l34.45-34.32c5.8-5.79 9.01-12.42 9.29-19.18.27-6.82-2.54-13.36-8.13-18.93-5.66-5.65-12.19-8.55-18.84-8.31-6.69.21-13.4 3.48-19.4 9.47L8.13 64.47 1 57.37l33.07-32.95c7.84-7.82 16.91-12.11 26.22-12.4 9.49-.31 18.6 3.59 26.28 11.24 7.64 7.6 11.46 16.75 11.07 26.44-.37 9.33-4.6 18.28-12.24 25.89l-34.44 34.32c-6.39 6.37-13.75 9.86-21.3 10.08-.25 0-.5.02-.74.02"></path></svg><span>easyScholar文献收藏</span></button></div>');

            checkBox.append(embasePaper);
            clearInterval(clock);
            initSelectPaperType();
        }
    }, 500);

};

function addYuntsgPubmedDetailPaperManager() {
    let clock = setInterval(function () {
        if ($("div.actions").length != 0 && $(".easyScholar_paper_collect").length == 0) {
            let checkBox = $("div.actions");
            let yuntsgPubmed = $('<button class="easyScholar_paper_collect"">easyScholar文献收藏</button>');

            checkBox.append(yuntsgPubmed);
            clearInterval(clock);
            initSelectPaperType();
        }
    }, 300);


};

function addYuntsgDetailPaperManager() {
    let checkBox = $("#titleBtn");
    let paperBox = $('<span style="background-color: #168bc1;border: 1px solid #168bc1;border-radius: 2px;"><a class="easyScholar_paper_collect" href="javascript:;" style="color:#fff" > easyScholar文献收藏</a></span>');

    let clock = setInterval(function () {
        if ((($("#titleBtn").text() == "获取地址失败") || ($("#titleBtn").find("span").length >= 1)) && $(".easyScholar_paper_collect").length == 0) {
            checkBox.append(paperBox);
            clearInterval(clock);
            initSelectPaperType();
        }
    }, 300);


};

function addXMOLDetailPaperManager() {
    let checkBox = $("div.actionbox div.magazine-oa-pdf");
    let XMOLPaper = $('<div class="magazine-oa-btn space-right-m20">\n' +
        '                                    <a class="easyScholar_paper_collect itsmblue" href="javascript:void (0);">\n' +
        '                                        <i class="fa fa-star-o it-blue fa-lg" aria-hidden="true"></i>\n' +
        '                                        <span>easyScholar文献收藏</span></a>\n' +
        '                                    \n' +
        '                                </div>');

    checkBox.prepend(XMOLPaper);

};

function addGooglePaperManager() {
    $("div.gs_ri > div.gs_fl").each(function () {
        let box = $(this);
        let googlePaper = $('<a href="javascript:;" class="easyScholar_paper_collect">easyScholar文献收藏</a>');
        box.append(googlePaper);
    });
    initSelectPaperType();
};

function addCnkiSpacePaperManager() {
    $("div.lplist > div.list-item > p.clearfix").each(function () {
        let box = $(this);
        let Paper = $('<a class="download left easyScholar_paper_collect" href="javascript:void(0)" style="cursor:pointer;" title="easyScholar文献管理" pcked="1"></a>');
        box.append(Paper);
    });

};


function addWeipuDetailPaperManager() {

    let box = $(".article-main > .article-source");
    let Paper = $('<a href="javascript:void(0);" class="easyScholar_paper_collect behavior-onlineRead" pcked="1"><i class="icon-read"></i>easyScholar文献管理</a>');
    box.append(Paper);

};

function addSemanticDetailPaperManager() {

    let box = $("#main-content > div.fresh-paper-detail-page__above-the-fold > div > div > div.flex-item.flex-item--width-66.flex-item__left-column > div > div.flex-container.flex-wrap.flex-paper-actions__group > div:nth-child(2) > div");
    let Paper = $('<div class="flex-item"><button class="icon-button flex-paper-actions__button easyScholar_paper_collect"><span class="flex-row-centered"><svg aria-hidden="true" width="11" height="11" alt="" class="icon-svg icon-fa-bookmark" data-selenium-selector="icon-fa-bookmark"><use xlink:href="#fa-bookmark"></use></svg><span class="icon-button-text">easyScholar文献管理</span></span></button></div>');
    box.append(Paper);

};

function addJstorPaperManager() {

    $("ol.result-list > li.result-list__item").each(function () {
        let box = $(this).find(".result__action-buttons ul.action-buttons");
        let Paper = $('<li><div class="easyScholar_paper_collect"><mfe-save-to-workspace-pharos-button variant="secondary" >easyScholar收藏</mfe-save-to-workspace-pharos-button></div></li>');
        box.append(Paper);
    });

};

function addEiDetailPaperManager() {

    let box = $("#record-page > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.es-grid.doc_article-toolbar__ipbGH.ev--nonprintable.css-15j76c0 > div.MuiGrid-root.MuiGrid-container.es-grid.article-toolbar.ArticleToolbar_article-toolbar__Btozs.css-1d3bbye > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-lg-7.es-grid.css-c40sdo > div:nth-child(2)");
    let Paper = $('<span class="es-tooltip "><button class="easyScholar_paper_collect es-button __opener css-c5b9i5"><span class="MuiButton-startIcon MuiButton-iconSizeMedium css-6xugel"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4" focusable="false" aria-hidden="true" viewBox="0 0 104 128"><path d="M58 22v42h34v5.22C92 87.72 74.92 96 58 96v10c25.9 0 44-15.12 44-36.78V22H58zM2 64h34v5.22C36 87.72 18.92 96 2 96v10c25.9 0 44-15.12 44-36.78V22H2v42z"></path></svg></span>easyScholar文献管理</button></span>');
    box.append(Paper);

};

function addNssdDetailPaperManager() {

    let box = $("#app > div.center-content.c-bg.clr > div > div.hot-doc.mb20.clr > div.book-pic > div > div.read");
    let Paper = $('<a class=" pointer el-background-color easyScholar_paper_collect" style="padding: 10px 18px;">easyScholar文献管理</a>');
    box.append(Paper);

};

function addProquestDetailPaperManager() {

    let box = $("#emailAb");
    let Paper = $('<a class="tool-option-link easyScholar_paper_collect" style="\n' +
        '    margin-right: 30px;\n' +
        '" href="javascript:void(0);"><span class="tool-option"><span aria-hidden="true" class="uxf-icon uxf-quote"></span></span><span class="optionLabel">easyScholar文献收藏</span></a>');
    box.before(Paper);

};

function addCambridgeDetailPaperManager() {

    let box = $("#article-tab > div.action-bar > div");
    let Paper = $('<a data-v-534b82bd="" data-v-0cc384f2="" data-v-92ee52a2="" class="easyScholar_paper_collect app-link rights-link d-print-none app-link__text-icon app-link--accent"><img data-v-53cd6f43="" data-v-534b82bd="" src="/core/page-component/img/rights-icon.65a913b.svg" alt="" class="app-icon icon rights"><span data-v-534b82bd="" class="text">easyScholar文献管理</span><span data-v-534b82bd="" class="sr-only">[Opens in a new window]</span></a>');
    box.prepend(Paper);

};

function addOxfordDetailPaperManager() {

    let box = $("#Toolbar > li.toolbar-item.item-cite.js-item-cite");
    let Paper = $('<li class="easyScholar_paper_collect toolbar-item item-cite ">\n' +
        '    <div class=" ">\n' +
        '        <a href="#">\n' +
        '    <i class="icon-read-more"></i>\n' +
        '    <span>easyScholar文献收藏</span>\n' +
        '</a>\n' +
        '\n' +
        '\n' +
        ' \n' +
        '    </div>\n' +
        '\n' +
        '                        </li>');
    box.before(Paper);

};

function addCnkiScholarDetailPaperManager() {

    let box = $("#__next > div > div.detail_detail-main__11Hij > div.detail_content__3IojM > div.detail_content-left__2vUAX > div > div.detail_doc__20q8z > div:nth-child(1) > div.detail_doc-doi__VX6o2.detail_doc-item__2l-2B");
    let Paper = $('<div class="easyScholar_paper_collect" style="background-color:#506698; color:white; width:170px; height:25px; text-align:center; cursor: pointer">easyScholar文献管理</div>');
    box.after(Paper);

};

function addAPAPsycnetDetailPaperManager() {

    let box = $("#exportBtn");
    let Paper = $('<add-to-my-list _ngcontent-ng-c1969232788="" class="btn easyScholar_paper_collect" _nghost-ng-c69139242=""><!---->\n' +
        '<button _ngcontent-ng-c69139242="" class="white">\n' +
        '  <a _ngcontent-ng-c69139242="" data-container="body" placement="bottom">\n' +
        '    <span _ngcontent-ng-c69139242="">\n' +
        '        <svg _ngcontent-ng-c69139242="" viewBox="0 0 24 24" style="width: 18px; height: 18px;">\n' +
        '            <!---->\n' +
        '            <path _ngcontent-ng-c69139242="" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path><!---->\n' +
        '            <!---->\n' +
        '\n' +
        '        </svg>\n' +
        '        <span _ngcontent-ng-c69139242="" translate="" class="caption">easyScholar文献收藏</span>\n' +
        '    </span><!---->\n' +
        '  </a><!----><!---->\n' +
        '  <!---->\n' +
        '  <span _ngcontent-ng-c69139242="" aria-live="polite" aria-atomic="false" aria-relevant="additions" class="sr-only"></span>\n' +
        '</button><!---->\n' +
        '<add-to-list-warning-modal _ngcontent-ng-c69139242="" _nghost-ng-c1035442276=""><div _ngcontent-ng-c1035442276="" bsmodal="" tabindex="-1" role="dialog" aria-hidden="true" class="modal face">\n' +
        '  <div _ngcontent-ng-c1035442276="" class="addToListWarningModal modal-dialog modal-md">\n' +
        '    <div _ngcontent-ng-c1035442276="" class="modal-content">\n' +
        '      <div _ngcontent-ng-c1035442276="" class="modal-body">\n' +
        '        <p _ngcontent-ng-c1035442276=""><b _ngcontent-ng-c1035442276="" translate="">My List can contain a maximum of</b><b _ngcontent-ng-c1035442276=""> 500 </b><b _ngcontent-ng-c1035442276="" translate="">items.</b></p>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div><!---->\n' +
        '</add-to-list-warning-modal>\n' +
        '</add-to-my-list>');
    box.after(Paper);

};

function addmedWangFangDetailPaperManager() {

    let box = $(".btnpanel > .btnpanel-a");
    let Paper = $('<a style="width: 140px" class="easyScholar_paper_collect" href="javascript:void(0)">easySchoalr文献收藏</a>');
    box.append(Paper);

};

function addonlinelibraryWileyDetailPaperManager() {

    let box = $(".coolBar__second");
    let Paper = $('<div class="relative"><a href="#" class="easyScholar_paper_collect"><span>easyScholar文献收藏</span></a></div>');
    box.append(Paper);

};

function addpubscholarDetailPaperManager() {

    let box = $(".ArticleMetaItem >  .ArticleActions");
    let Paper = $('<div data-v-49a18d54=""><span class="easyScholar_paper_collect"> <span><div><button class="Button Button--plain SimpleActionButton"><svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20" class="Icon Icon--Collect"><path d="M5.515 19.64l.918-5.355-3.89-3.792c-.926-.902-.639-1.784.64-1.97L8.56 7.74l2.404-4.871c.572-1.16 1.5-1.16 2.072 0L15.44 7.74l5.377.782c1.28.186 1.566 1.068.64 1.97l-3.89 3.793.918 5.354c.219 1.274-.532 1.82-1.676 1.218L12 18.33l-4.808 2.528c-1.145.602-1.896.056-1.677-1.218z" fill-rule="evenodd"></path></svg>easyScholar文献收藏</button></div></span></span></div>');
    box.append(Paper);

};

function addmdpiDetailPaperManager() {

    let box = $(".middle-column__help__fixed:first");
    let Paper = $('<a class="easyScholar_paper_collect" href="javascript:void(0);">\n' +
        '<i class="material-icons">format_quote</i>\n' +
        '<span>easyScholar 文献收藏</span>\n' +
        '</a>');
    box.append(Paper);

};

function addacsDetailPaperManager() {

    let box = $(".article_header-meta .share:first");
    let Paper = $('<div class="easyScholar_paper_collect cit-download-dropdown"><span class="cit-download-dropdown_label">easyScholar</span><a href="javascript:void(0);" class="cit-download-dropdown_button"><span>文献收藏</span><i aria-hidden="true" aria-label="close" class="icon-close"></i></a></div>');
    box.append(Paper);

};

function addyiigleDetailPaperManager() {

    let box = $(".interaction_panel");
    let Paper = $('<div class="easyScholar_paper_collect el-tooltip interaction_item el-row" aria-describedby="" tabindex="0"><div class=""><i class="iconfont  font18px" style="padding-left:3px;"></i> <span style="padding-right:2px;">easyScholar文献管理</span></div></div>');
    box.prepend(Paper);

};

function addspisDetailPaperManager() {

    let box = $(".buttonbox");
    let Paper = $('<a href="javascript:void(0);" class="easyScholar_paper_collect btn-a btn-export-title"><span>easyScholar文献收藏</span></a>');
    box.prepend(Paper);

};

function addphilpapersDetailPaperManager() {

    let box = $(".entry-buttons-container");
    let Paper = $('<div class="easyScholar_paper_collect"><div class=""><div role="button" aria-haspopup="true" class="dropdown-trigger"><button type="button" class="button is-small"><!----> <span><i class="fa fa-download fa-fw"></i> <span class="ml-3 hidden-mobile">easyScholar文献收藏</span></span> <!----></button></div>  </div></div>');
    box.prepend(Paper);

};

// ----------------在每个网站上添加easyScholar收藏标志 end

function initSelectPaperType() {

    $(".easyScholar_paper_collect").unbind('click').on("click", function () {
        let clickBox = this;
        chrome.runtime.sendMessage({
            action: "getPaperAllType"
        }, function (response) {
            if (response.code != 200) {
                infoNotice(response.msg, "info");
                setTimeout(function () {
                    window.open("https://www.easyscholar.cc");
                }, 5000);
            } else {
                let window = $('body').dailog({
                    type: 'success',
                    title: "请选择要收藏的文献类别",
                    discription: "",
                    width: 500
                });
                selectWindow = xmSelect.render({
                    el: '#easyScholar-paper',
                    language: 'zn',
                    filterable: true,
                    autoRow: true,
                    toolbar: {
                        show: true,
                    },
                    create: function (val, arr) {
                        if (arr.length == 0) {
                            //返回一个创建成功的对象, val是搜索的数据, arr是搜索后的当前页面数据
                            return {
                                name: '创建-' + val,
                                value: val
                            }
                        }

                    },
                    data: [
                        {name: '连接服务器失败，请稍后再试', value: 1},
                    ]
                });
                selectWindow.update({
                    data: response.data,
                    autoRow: true
                });
                window.dailog_divOperation.children().on('click', function (e) {
                    let name = $(this).attr('data-name');
                    if (name == "确定" && selectWindow.getValue("name").length != 0) {
                        insertPaper(clickBox);
                    }
                    window.dailog_mask.remove();

                });

                $(".xm-search i.xm-icon-sousuo").hide();
                $(".xm-search input.xm-search-input").attr("placeholder", "若需创建文献类别，请在此搜索后创建");
            }
        });
    });


};

function insertPaper(clickBox) {
    let url = window.location.href;
    let webSiteName = getCurrentWebSite(url);
    let paperInfo;
    if (webSiteName != null) {
        if (isEval) {
            paperInfo = eval("get" + webSiteName + "PaperInformation(clickBox)");
        } else {
            paperInfo = window["get" + webSiteName + "PaperInformation"](clickBox);
        }
    }
    paperInfo["paperTypeOrOperates"] = selectWindow.getValue("name");

    chrome.runtime.sendMessage({
        action: "insertPaper",
        data: paperInfo,
    }, function (response) {
        if (response.code != 200) {
            infoNotice(response.msg, "error");
        } else {
            infoNotice("保存成功", "success");
        }
    });

};

// ----------------------------------------- 在每个网站获取信息 start

function getBaiduDetailPaperInformation() {
    let paperInfo = {};
    let paperName = $(".main-info h3 a:first").text().trim().replace("\n", "");
    if (paperName == "") {
        paperName = $(".main-info h3 span:first").text().trim().replace("\n", "");
    }
    paperInfo["paperName"] = paperName;
    paperInfo["paperHref"] = $(".dtl_journal_container .container_right a").text().trim().replace("\n", "");
    paperInfo["paperFrom"] = "百度学术";
    paperInfo["paperLink"] = window.location.href;

    return paperInfo;
};

function getCnkiDetailPaperInformation() {
    let paperInfo = {};
    let paperName = $(".doc-top .brief .wx-tit h1").text().trim().replace("\n", "");

    paperInfo["paperName"] = paperName;
    paperInfo["paperHref"] = $(".doc-top .top-tip span a:first").text().trim().replace("\n", "");
    paperInfo["paperFrom"] = "知网";
    paperInfo["paperLink"] = window.location.href;

    return paperInfo;
};

function getCnkiOverSeaDetailPaperInformation() {
    let paperInfo = {};
    let paperName = $(".doc-top .brief .wx-tit h1").text().trim().replace("\n", "");

    paperInfo["paperName"] = paperName;
    paperInfo["paperHref"] = $(".doc-top .top-tip span a:first").text().trim().replace("\n", "");
    paperInfo["paperFrom"] = "知网";
    paperInfo["paperLink"] = window.location.href;

    return paperInfo;
};

function getWangfangDetailPaperInformation() {
    let paperInfo = {};
    let paperName = $("div.detailTitleCN span:first").text().trim().replace("\n", "");

    paperInfo["paperName"] = paperName;
    paperInfo["paperHref"] = $("div.periodicalName a:first").text().trim().replace("\n", "");
    paperInfo["paperFrom"] = "万方";
    paperInfo["paperLink"] = window.location.href;

    return paperInfo;
};

function getSpringerDetailPaperInformation() {
    let paperInfo = {};
    let paperName = $("h1.c-article-title").text().trim().replace("\n", "");

    paperInfo["paperName"] = paperName;
    paperInfo["paperHref"] = $("i[data-test='journal-title']").text().trim().replace("\n", "");
    paperInfo["paperFrom"] = "Springer";
    paperInfo["paperLink"] = window.location.href;

    return paperInfo;
};

function getIeeeDetailPaperInformation() {
    let paperInfo = {};

    paperInfo["paperName"] = $("h1.document-title > span:first").text().trim().replace("\n", "");
    paperInfo["paperHref"] = $("div.stats-document-abstract-publishedIn > a").text().trim().replace("\n", "");
    paperInfo["paperFrom"] = "IEEE Xplore";
    paperInfo["paperLink"] = window.location.href;
    return paperInfo;
};

function getWOSDetailPaperInformation() {
    let paperInfo = {};
    let paperHref = "";

    if ($("#snMainArticle > app-jcr-sidenav").find("[lang='en']").length != 0) {
        let enName = $("#snMainArticle > app-jcr-sidenav").find("[lang='en']").text().trim().replace("\n", "")
        let strArr = enName.split(' ');
        for (let i = 0; i < strArr.length; i++) {
            strArr[i] = strArr[i].substring(0, 1).toUpperCase() + strArr[i].toLowerCase().substring(1)
        }
        paperHref += strArr.join(' ');

    }
    if ($("#snMainArticle > app-jcr-sidenav").find("[lang='zh-cn']").length != 0) {
        paperHref += "-" + $("#snMainArticle > app-jcr-sidenav").find("[lang='zh-cn']").text().trim().replace("\n", "");
    }

    paperInfo["paperName"] = $("#FullRTa-fullRecordtitle-0").text().trim().replace("\n", "");
    paperInfo["paperHref"] = paperHref;
    paperInfo["paperFrom"] = "Web of Science";
    paperInfo["paperLink"] = window.location.href;
    return paperInfo;
};

function getAminerDetailPaperInformation() {
    let paperInfo = {};
    let paperHref = $("a.a-aminer-components-pops-venue-venue-link-name").text();
    if (paperHref.indexOf("（") > 0) {
        paperHref = paperHref.split("（")[0]
    }
    if (paperHref.indexOf("(") > 0) {
        paperHref = paperHref.split("(")[0]
    }

    paperInfo["paperName"] = $("h1.titleInner span.text").text().trim().replace("\n", "");
    paperInfo["paperHref"] = paperHref;
    paperInfo["paperFrom"] = "Aminer";
    paperInfo["paperLink"] = window.location.href;
    return paperInfo;
};

function getPubmedDetailPaperInformation() {
    let paperInfo = {};

    let paperHref = $("#full-view-journal-trigger").text().trim().replace("\n", "");

    paperInfo["paperName"] = $("#full-view-heading h1.heading-title").text().trim().replace("\n", "");
    paperInfo["paperHref"] = paperHref;
    paperInfo["paperFrom"] = "Pubmed";
    paperInfo["paperLink"] = window.location.href;
    return paperInfo;
};

function getReadPaperDetailPaperInformation() {
    let paperInfo = {};
    let paperHrefArray = $(".paper-header > .desc > div > .block");
    let paperHref = "";
    if (paperHrefArray.length == 2) {
        paperHref = $(".paper-header > .desc > div > .block:first").text().trim().replace("\n", "");
    } else {
        paperHref = "-";
    }


    paperInfo["paperName"] = $(".paper-header > .title").text().trim().replace("\n", "");
    paperInfo["paperHref"] = paperHref;
    paperInfo["paperFrom"] = "ReadPaper";
    paperInfo["paperLink"] = window.location.href;
    return paperInfo;
};

function getScienceDirectDetailPaperInformation() {
    let paperInfo = {};

    paperInfo["paperName"] = $("#screen-reader-main-title span.title-text").text().trim().replace("\n", "");
    paperInfo["paperHref"] = $("a.publication-title-link").text().trim().replace("\n", "");
    paperInfo["paperFrom"] = "ScienceDirect";
    paperInfo["paperLink"] = window.location.href;
    return paperInfo;
};

function getScopusDetailPaperInformation() {
    let paperInfo = {};

    paperInfo["paperName"] = $("div.col > els-typography.hydrated").text().trim().replace("\n", "");
    paperInfo["paperHref"] = $("div.PublicationInformationBar-module__2SO0m els-button.hydrated els-typography").text().trim().replace("\n", "");
    paperInfo["paperFrom"] = "Scopus";
    paperInfo["paperLink"] = window.location.href;
    return paperInfo;
};

function getEmbaseDetailPaperInformation() {
    let paperInfo = {};

    paperInfo["paperName"] = $("h2[class*='Heading-module_root']").text().trim().replace("\n", "");
    paperInfo["paperHref"] = $("div[data-testid='source'] > strong > span:first").text().trim().replace("\n", "");
    paperInfo["paperFrom"] = "Embase";
    paperInfo["paperLink"] = window.location.href;
    return paperInfo;
};

function getYuntsgPubmedDetailPaperInformation() {
    let paperInfo = {};
    let paperHref = $("#heading div.jour button").text().trim().replace("\n", "");

    paperInfo["paperHref"] = paperHref;
    paperInfo["paperName"] = $("a.detTitle").text().trim().replace("\n", "");

    paperInfo["paperFrom"] = "智慧云图书馆";
    paperInfo["paperLink"] = window.location.href;

    return paperInfo;
};

function getYuntsgDetailPaperInformation() {
    let paperInfo = {};
    let paperHref = "";

    let enName = $("div.bot2 p:first").text().trim().replace("\n", "");
    let strArr = enName.split(' ');
    for (let i = 0; i < strArr.length; i++) {
        strArr[i] = strArr[i].substring(0, 1).toUpperCase() + strArr[i].toLowerCase().substring(1)
    }

    paperHref += strArr.join(' ');

    paperInfo["paperName"] = $("#con_bottom > h1").text().trim().replace("\n", "");
    paperInfo["paperHref"] = paperHref;
    paperInfo["paperFrom"] = "智慧云图书馆";
    paperInfo["paperLink"] = window.location.href;
    return paperInfo;
};

function getXMOLDetailPaperInformation() {
    let paperInfo = {};

    paperInfo["paperName"] = $("#content div.maga-content > span.itgaryfirst > strong a").text().trim().replace("\n", "");
    paperInfo["paperHref"] = $("#content > div.magazine-gridecontent > div.maga-content  a.itsmblue:first > em").text().trim().replace("\n", "");
    paperInfo["paperFrom"] = "X-MOL";
    paperInfo["paperLink"] = window.location.href;
    return paperInfo;
};

function getGooglePaperInformation(clickBox) {
    let paperInfo = {};
    let singlePaperBox = $(clickBox).parents("div.gs_ri");
    let paperHref = "";
    let paperFrom = "";
    let url = window.location.href;
    let pattern = /- .*?(?=, [0-9]{4})/;
    let journal = singlePaperBox.find("div.gs_a").text().match(pattern);
    if (journal != undefined) {
        // paperHref = journal[0];
        paperHref = journal[0].substring(2);
    } else {
        paperHref = "-";
    }

    if (url.indexOf("https://scholar.google.com") != -1) {
        paperFrom = "Google学术";
    } else {
        paperFrom = "Google学术镜像";
    }

    let paperName = singlePaperBox.find("h3.gs_rt a").text().trim().replace("\n", "");

    if (paperName == "" || paperName == undefined) {
        paperName = singlePaperBox.find("h3.gs_rt span:last").text().trim().replace("\n", "");
    }

    let paperLink = singlePaperBox.find("h3.gs_rt a").attr("href");
    if (paperLink == "" || paperLink == undefined) {
        paperLink = window.location.href;
    }

    paperInfo["paperName"] = paperName;
    paperInfo["paperHref"] = paperHref;
    paperInfo["paperFrom"] = paperFrom;
    paperInfo["paperLink"] = paperLink;

    return paperInfo;
};

function getCnkiSpacePaperInformation(clickBox) {
    let paperInfo = {};
    let singlePaperBox = $(clickBox).parents("div.list-item");
    let paperName = singlePaperBox.find("p.clearfix > a:first").attr("title");
    let paperFrom = "知网空间";
    let paperHref = singlePaperBox.find("p.source span:eq(1)").attr("title").replaceAll("\n", "").trim();
    let paperLink = singlePaperBox.find("p.clearfix > a:first").attr("href").substr(2);

    paperInfo["paperName"] = paperName;
    paperInfo["paperHref"] = paperHref;
    paperInfo["paperFrom"] = paperFrom;
    paperInfo["paperLink"] = paperLink;

    return paperInfo;
};

function getWeipuDetailPaperInformation() {
    let paperInfo = {};

    let paperName = $("#body div.article-main div.article-title > h1").text().replaceAll("\n", "").trim();
    let paperFrom = "维普";
    let paperHref = $("div.article-detail > div.journal > span.from > a").attr("title");
    let paperLink = window.location.href;

    paperInfo["paperName"] = paperName;
    paperInfo["paperHref"] = paperHref;
    paperInfo["paperFrom"] = paperFrom;
    paperInfo["paperLink"] = paperLink;

    return paperInfo;
};

function getSemanticDetailPaperInformation() {
    let paperInfo = {};

    let paperName = $("#main-content > div.fresh-paper-detail-page__above-the-fold > div > div > div.flex-item.flex-item--width-66.flex-item__left-column > div > h1").prop('firstChild').nodeValue.replaceAll("\n", "").trim();
    let paperFrom = "Semantic Scholar";
    let paperHref = "";

    $("#main-content > div.fresh-paper-detail-page__above-the-fold  div.flex-item.flex-paper-actions__item--hidden-when-narrow > button > span").click();
    let publication = $(".formatted-citation--style-bibtex").text().match(/(?=journal={).*(?=},)/);
    $("#app > div.cl-overlay.cl-overlay__content-position--center > div > div > div.cl-modal__close-section > button").click();

    if (publication == null) {
        paperHref = "";
    } else {
        paperHref = publication[0].replace("journal={", "");
    }

    let paperLink = window.location.href;

    paperInfo["paperName"] = paperName;
    paperInfo["paperHref"] = paperHref;
    paperInfo["paperFrom"] = paperFrom;
    paperInfo["paperLink"] = paperLink;

    return paperInfo;
};

function getJstorPaperInformation(clickBox) {
    let paperInfo = {};
    let singlePaperBox = $(clickBox).parents("li.result-list__item");

    let paperName = singlePaperBox.find("search-results-vue-pharos-heading[data-qa='search-result-title-heading']").text();
    let paperFrom = "Jstor";
    let paperHref = singlePaperBox.find(".result__main div.result__main__metadata .metadata-row span.metadata cite").text();
    let paperLink = "https://www.jstor.org" + singlePaperBox.find("search-results-vue-pharos-link.link-no-underline").attr("href");

    paperInfo["paperName"] = paperName;
    paperInfo["paperHref"] = paperHref;
    paperInfo["paperFrom"] = paperFrom;
    paperInfo["paperLink"] = paperLink;

    return paperInfo;
};

function getEiDetailPaperInformation() {
    let paperInfo = {};

    let paperName = $("#main-article > h2").text().replaceAll("\n", "").trim();
    let paperFrom = "Engineering Village";
    let paperHref = $("#main-article > span.MuiTypography-root.MuiTypography-body1.es-para.ev__sourceinfo.css-1ww9fgr > span:nth-child(1)").text();

    let paperLink = window.location.href;

    paperInfo["paperName"] = paperName;
    paperInfo["paperHref"] = paperHref;
    paperInfo["paperFrom"] = paperFrom;
    paperInfo["paperLink"] = paperLink;

    return paperInfo;
};

function getNssdDetailPaperInformation() {
    let paperInfo = {};

    let paperName = $("#h2_title_c").text().replaceAll("\n", "").trim();
    let paperFrom = "国家哲学社会科学学术期刊数据库";
    let paperHref = $("#p_media a:first span").text();

    let paperLink = window.location.href;

    paperInfo["paperName"] = paperName;
    paperInfo["paperHref"] = paperHref;
    paperInfo["paperFrom"] = paperFrom;
    paperInfo["paperLink"] = paperLink;

    return paperInfo;
};

function getProquestDetailPaperInformation() {
    let paperInfo = {};

    let paperName = $("#documentTitle").text().replaceAll("\n", "").trim();
    let paperFrom = "Proquest";
    let paperHref = $("#authordiv > span.titleAuthorETC.jnlArticle > span > a.null.lateralSearch > strong").text();

    let paperLink = window.location.href;

    paperInfo["paperName"] = paperName;
    paperInfo["paperHref"] = paperHref;
    paperInfo["paperFrom"] = paperFrom;
    paperInfo["paperLink"] = paperLink;

    return paperInfo;
};

function getCambridgeDetailPaperInformation() {
    let paperInfo = {};

    let paperName = $("#maincontent > h1").text().replaceAll("\n", "").trim();
    let paperFrom = "Cambridge";
    let paperHref = $("#article-tab > div.scrollspy-content > dl > div:nth-child(2) > dd > div.content__journal > a > span").text();

    let paperLink = window.location.href;

    paperInfo["paperName"] = paperName;
    paperInfo["paperHref"] = paperHref;
    paperInfo["paperFrom"] = paperFrom;
    paperInfo["paperLink"] = paperLink;

    return paperInfo;
};

function getOxfordDetailPaperInformation() {
    let paperInfo = {};

    let paperName = $("#ContentColumn > div.content-inner-wrap > div.widget.widget-ArticleTopInfo.widget-instance-OUP_ArticleTop_Info_Widget > div > div.widget-items > div.title-wrap > h1").text().replaceAll("\n", "").trim();
    let paperFrom = "Oxford";
    let paperHref = $("#ContentColumn > div.content-inner-wrap > div.widget.widget-ArticleTopInfo.widget-instance-OUP_ArticleTop_Info_Widget > div > div.widget-items > div.pub-history-wrap.clearfix.js-history-dropdown-wrap > div:nth-child(1) > div em").text();

    let paperLink = window.location.href;

    paperInfo["paperName"] = paperName;
    paperInfo["paperHref"] = paperHref;
    paperInfo["paperFrom"] = paperFrom;
    paperInfo["paperLink"] = paperLink;

    return paperInfo;
};

function getCnkiScholarDetailPaperInformation() {
    let paperInfo = {};

    let paperName = $('#doc-title').text().replaceAll("\n", "").replaceAll("MT翻译", "").trim();
    let paperFrom = "知网外文检索";
    let paperHref = $("#journal-summarize > span.detail_journal_name__b1mas").text();

    let paperLink = window.location.href;

    paperInfo["paperName"] = paperName;
    paperInfo["paperHref"] = paperHref;
    paperInfo["paperFrom"] = paperFrom;
    paperInfo["paperLink"] = paperLink;

    return paperInfo;
};

function getAPAPsycnetDetailPaperInformation() {
    let paperInfo = {};

    let paperName = $('.record-details > h1:first').text().replaceAll("\n", "").trim();
    let paperFrom = "APA PsycNet";
    let paperHref = $(".pt-inner > .pti-body h3:first > span").text();

    let paperLink = window.location.href;

    paperInfo["paperName"] = paperName;
    paperInfo["paperHref"] = paperHref;
    paperInfo["paperFrom"] = paperFrom;
    paperInfo["paperLink"] = paperLink;

    return paperInfo;
};

function getmedWangFangDetailPaperInformation() {
    let paperInfo = {};

    let paperName = $('.headline > h2:first').text().replaceAll("\n", "").trim();
    let paperFrom = "万方医学网";
    let paperHref = $(".details > .table span.inline:first > a:first").text();
    if(paperHref.indexOf("》") !== -1){
        paperHref = paperHref.replaceAll("《", "").replaceAll("》", "");
    }else{
        paperHref = "学位论文";
    }
    let paperLink = window.location.href;

    paperInfo["paperName"] = paperName;
    paperInfo["paperHref"] = paperHref;
    paperInfo["paperFrom"] = paperFrom;
    paperInfo["paperLink"] = paperLink;

    return paperInfo;
};

function getonlinelibraryWileyDetailPaperInformation() {
    let paperInfo = {};

    let paperName = $('h1.citation__title').text().replaceAll('"', "").trim();
    let paperFrom = "WILEY Online Library";
    let paperHref = $("#journal-banner-image").attr("alt");

    let paperLink = window.location.href;

    paperInfo["paperName"] = paperName;
    paperInfo["paperHref"] = paperHref;
    paperInfo["paperFrom"] = paperFrom;
    paperInfo["paperLink"] = paperLink;

    return paperInfo;
};

function getpubscholarDetailPaperInformation() {
    let paperInfo = {};

    let paperName = $('span.ArticleInfo__titleText').text().trim();
    let paperFrom = "PubScholar";
    let paperHref = $("span.ArticleInfo__sourceTitle > span.ArticleInfo__metaSource:first").text().replaceAll("《", "").replaceAll("》", "");

    let paperLink = window.location.href;

    paperInfo["paperName"] = paperName;
    paperInfo["paperHref"] = paperHref;
    paperInfo["paperFrom"] = paperFrom;
    paperInfo["paperLink"] = paperLink;

    return paperInfo;
};

function getmdpiDetailPaperInformation() {
    let paperInfo = {};

    let paperName = $('h1.title:first').text().trim();
    let paperFrom = "MDPI";
    let paperHref = $(".content__container > a > img:first").attr("title");

    let paperLink = window.location.href;

    paperInfo["paperName"] = paperName;
    paperInfo["paperHref"] = paperHref;
    paperInfo["paperFrom"] = paperFrom;
    paperInfo["paperLink"] = paperLink;

    return paperInfo;
}

function getacsDetailPaperInformation() {
    let paperInfo = {};

    let paperName = $('h1.article_header-title:first').text().trim();
    let paperFrom = "ACS";
    let paperHref = $("span.cit-title:first").text().trim();

    let paperLink = window.location.href;

    paperInfo["paperName"] = paperName;
    paperInfo["paperHref"] = paperHref;
    paperInfo["paperFrom"] = paperFrom;
    paperInfo["paperLink"] = paperLink;

    return paperInfo;
};

function getyiigleDetailPaperInformation() {
    let paperInfo = {};

    let paperName = $('.trans_article_title').text().trim();
    let paperFrom = "中华医学数据库";
    let paperHref = $(".jour_title").text().trim();

    let paperLink = window.location.href;

    paperInfo["paperName"] = paperName;
    paperInfo["paperHref"] = paperHref;
    paperInfo["paperFrom"] = paperFrom;
    paperInfo["paperLink"] = paperLink;

    return paperInfo;
};

function getspisDetailPaperInformation() {
    let paperInfo = {};

    let paperName = $('#baseInfo_box .container .title:first').text().trim();
    let paperFrom = "纬度学术";
    let paperHref = $(".cont-source > .col_content > a:first").text().trim();

    let paperLink = window.location.href;

    paperInfo["paperName"] = paperName;
    paperInfo["paperHref"] = paperHref;
    paperInfo["paperFrom"] = paperFrom;
    paperInfo["paperLink"] = paperLink;

    return paperInfo;
};

function getphilpapersDetailPaperInformation() {
    let paperInfo = {};

    let paperName = $('h1.recTitle > a:first').text().trim();
    let paperFrom = "PhilPapers";
    let paperHref = $(".recPubInfo .pubName > a.discreet").text().trim();

    let paperLink = window.location.href;

    paperInfo["paperName"] = paperName;
    paperInfo["paperHref"] = paperHref;
    paperInfo["paperFrom"] = paperFrom;
    paperInfo["paperLink"] = paperLink;

    return paperInfo;
};

// ------------------------------------- 在每个网站获取信息 end


// 文献管理结束
// 插入SCI-HUB链接START

function addDoi() {
    if ($('[contenteditable="true"]').length > 0
        || $('[contenteditable=""]').length > 0) {
        return;
    }
    //先查找网页中所有符合条件的DOI
    let allMatchText = $("html").text().match(/(10\.\d{4,9}\/[-._;()<>/:0-9a-zA-Z]+)\b/g);
    // 遍历这些DOI，用contains找到他们的父元素a, p, i, div ,li, ui等
    if (allMatchText != null) {
        if(allMatchText.length > 50){
            let a = allMatchText.slice(0, 20);
            let b = allMatchText.slice(allMatchText.length - 20, allMatchText.length );
            allMatchText = [...a, ...b];
        }

        for (let i = 0; i < allMatchText.length; i++) {

            let aList = $("a:contains(" + allMatchText[i] + ")");
            let pList = $("p:contains(" + allMatchText[i] + ")");
            let liList = $("li:contains(" + allMatchText[i] + ")");
            let spanList = $("span:contains(" + allMatchText[i] + ")");
            // 遍历这些父元素，判断他们的text()是否 == DOI
            // 等于的话对他们后面加上easyScholar链接
            aList.each(function () {
                let single = $(this);
                let singleText = single.text().replaceAll("\n", "").trim();

                if (singleText.indexOf(allMatchText[i]) != -1 && (singleText.length / allMatchText[i].length) < 7 && single.parent().find("a.easyScholarDOI").length == 0) {
                    console.log("添加了DOI")
                    let singleDoi = $('<a  class="easyScholarDOI" target="_blank">' + logo + '</a>');
                    let href = SciLink + allMatchText[i];
                    singleDoi.attr("href", href);
                    single.append(singleDoi);
                }
            });

            pList.each(function () {
                let single = $(this);
                let singleText = single.text().replaceAll("\n", "").trim();
                if (singleText.indexOf(allMatchText[i]) != -1 && (singleText.length / allMatchText[i].length) < 7 && single.parent().find("a.easyScholarDOI").length == 0) {
                    let singleDoi = $('<a  class="easyScholarDOI" target="_blank">' + logo + '</a>');
                    console.log("添加了DOI")
                    let href = SciLink + allMatchText[i];
                    singleDoi.attr("href", href);
                    single.append(singleDoi);
                }
            });
            liList.each(function () {
                let single = $(this);
                let singleText = single.text().replaceAll("\n", "").trim();
                if (singleText.indexOf(allMatchText[i]) != -1 && (singleText.length / allMatchText[i].length) < 7 && single.parent().find("a.easyScholarDOI").length == 0) {
                    console.log("添加了DOI")
                    let singleDoi = $('<a  class="easyScholarDOI" target="_blank">' + logo + '</a>');
                    let href = SciLink + allMatchText[i];
                    singleDoi.attr("href", href);
                    single.append(singleDoi);
                }
            });

            spanList.each(function () {

                let single = $(this);
                let singleText = single.text().replaceAll("\n", "").trim();
                if (singleText.indexOf(allMatchText[i]) != -1 && (singleText.length / allMatchText[i].length) < 7 && single.parent().find("a.easyScholarDOI").length == 0) {
                    console.log("添加了DOI")
                    let singleDoi = $('<a  class="easyScholarDOI" target="_blank">' + logo + '</a>');
                    let href = SciLink + allMatchText[i];
                    singleDoi.attr("href", href);
                    single.append(singleDoi);
                }
            });
        }
    }


    //遍历这个网页所有的a
    let allA = $("a");
    if (allA.length < 400) {
        allA.each(function () {
            let single = $(this);
            let singleHref = single.attr("href");
            if (singleHref == null) {
                return true;
            }
            if (checkEdit(single)) {
                return true;
            }
            singleHref = decodeURIComponent(singleHref);
            // 对a中的href判断，如果/(10\.\d{4,9}\/[-._;()<>/:0-9a-zA-Z]+)\b/g.test()  满足
            if (single.parent().find("a.easyScholarDOI").length === 0 && /(10\.\d{4,9}\/[-._;()<>/:0-9a-zA-Z]+)\b/g.test(singleHref)) {
                // 则获取doi号，添加上链接
                let DOI = singleHref.match(/(10\.\d{4,9}\/[-._;()<>/:0-9a-zA-Z]+)\b/g)[0];
                console.log("添加了DOI")
                let singleDoi = $('<a  class="easyScholarDOI" target="_blank">' + logo + '</a>');
                let href = SciLink + DOI;
                singleDoi.attr("href", href);
                single.parent().append(singleDoi);
            }
        });
    }

}

//  插入SCI-HUB链接END

// --------------------------------------在多个网站上自定义选项 start
function initPubmed() {
    if ($("div.easyScholar-choice-grouop").length != 0) {
        return;
    }
    let parent = $("#static-filters-form div.choice-group-wrapper");
    parent.prepend($('<div class="choice-group articleattr easyScholar-choice-grouop"><strong class="title" style="font-variant:normal; text-transform:none;">easyScholar显示设置' +
        '<svg t="1670330865637" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1253" width="16" height="16"> <path d="M512 992C246.912 992 32 777.088 32 512 32 246.912 246.912 32 512 32c265.088 0 480 214.912 480 480 0 265.088-214.912 480-480 480z m0-64c229.76 0 416-186.24 416-416S741.76 96 512 96 96 282.24 96 512s186.24 416 416 416z" p-id="1254"></path><path d="M552 601.696v22.432h-80v-22.432c0-51.296 24.192-99.808 58.816-136.704 26.464-28.224 25.728-27.424 33.28-36.384 19.968-23.776 27.904-40.768 27.904-60.608a80 80 0 1 0-160 0H352a160 160 0 0 1 320 0c0 41.664-15.68 75.2-46.656 112.064-5.216 6.208-10.88 12.576-17.856 20.096-2.688 2.88-5.44 5.888-9.152 9.792l-9.152 9.76c-21.952 23.36-37.184 53.92-37.184 81.984zM545.856 717.984c9.44 9.312 14.144 20.672 14.144 34.016 0 13.6-4.704 24.992-14.144 34.208A46.784 46.784 0 0 1 512 800c-13.12 0-24.448-4.608-33.856-13.792A45.856 45.856 0 0 1 464 752c0-13.344 4.704-24.704 14.144-34.016A46.464 46.464 0 0 1 512 704c13.12 0 24.448 4.672 33.856 13.984z" p-id="1255"></path></svg>' +
        '</strong>' +
        '<label style="padding-left:0px;">分区：</label><ul class="items" id="easyScholar_JCR" style="display: flex; font-size:1.0rem">\n' +
        '\t\t<li> <input class="quartileBox" type="checkbox" id="easyScholar_JCR_q1" value="Q1" checked=""> <label for="easyScholar_JCR_q1" style="padding-left: 2rem; padding-right: 1rem"> Q1 </label> </li>\n' +
        '\t\t<li> <input class="quartileBox" type="checkbox" id="easyScholar_JCR_q2" value="Q2" checked=""> <label for="easyScholar_JCR_q2" style="padding-left: 2rem; padding-right: 1rem"> Q2 &nbsp</label> </li>\n' +
        '\t\t<li> <input class="quartileBox" type="checkbox" id="easyScholar_JCR_q3" value="Q3" checked=""> <label for="easyScholar_JCR_q3" style="padding-left: 2rem; padding-right: 1rem"> Q3 &nbsp</label> </li>\n' +
        '\t\t<li> <input class="quartileBox" type="checkbox" id="easyScholar_JCR_q4" value="Q4" checked=""> <label for="easyScholar_JCR_q4" style="padding-left: 2rem; padding-right: 1rem"> Q4 &nbsp</label> </li>\n' +
        '\t\t</ul><ul class="items" id="easyScholar_zhongUp" style="display: flex; font-size:1.0rem">\n' +
        '\t\t<li> <input class="quartileBox" type="checkbox" id="easyScholar_zhongUp_1" value="1区" checked=""> <label for="easyScholar_zhongUp_1" style="padding-left: 2rem; padding-right: 1rem">1区</label> </li>\n' +
        '\t\t<li> <input class="quartileBox" type="checkbox" id="easyScholar_zhongUp_2" value="2区" checked=""> <label for="easyScholar_zhongUp_2" style="padding-left: 2rem; padding-right: 1rem">2区</label> </li>\n' +
        '\t\t<li> <input class="quartileBox" type="checkbox" id="easyScholar_zhongUp_3" value="3区" checked=""> <label for="easyScholar_zhongUp_3" style="padding-left: 2rem; padding-right: 1rem">3区</label> </li>\n' +
        '\t\t<li> <input class="quartileBox" type="checkbox" id="easyScholar_zhongUp_4" value="4区" checked=""> <label for="easyScholar_zhongUp_4" style="padding-left: 2rem; padding-right: 1rem">4区</label> </li>\n' +
        '\t\t</ul>' +
        '<div>\n' +
        '            <label style="padding-left:0px;">影响因子范围：\n' +
        '              <input id="easyScholar_IF_MIN_MAX" placeholder="需按此格式填写：min-max" >\n' +
        '            </label>\n' +
        '            \n' +
        '          </div>' +

        '<div>' +
        '<label style="padding-left:0px;">分区与影响因子的显示关系：</label>' +
        '<input type="checkbox" id="easyScholar-rank-if-relation">' +
        '<label for="easyScholar-rank-if-relation" style="margin-top:10px">\n' +
        '        选中为or，不选为and \n' +
        '      </label>' +
        '</div>' +


        '<input type="checkbox" id="easyScholar-hide-title"><label for="easyScholar-hide-title" style="margin-top:30px">\n' +
        '        显示期刊全称 \n' +
        '      </label>' +
        '</div>'))
    $('.easyScholar-choice-grouop > .title').attr("title",
        "1：Q1, Q2, Q3, Q4使用的是Clarivate分区中SCI, SSCI分区。" +
        "2: 1、2、3、4区使用的是中科院升级版, 基础版数据。" +
        "3：8个单选框全部选中，或全部取消，代表不作任何改变（不存在于这8个等级中的期刊也会显示）。" +
        "4：如果小于8个单选框，则代表只显示选中的等级，之间是或的关系，例如等级的为Q1或Q2或Q3或2区，则显示。" +
        "5：影响因子使用的是SCIIF，SCIIF(5)。" +
        "6: 影响因子与分区之间默认是or的关系，例如Q1或Q2或Q3或(IF 1-3)，则显示。" +
        "7：可以调整第7点中or或者and的关系。" +
        "---------------分隔符---------------" +
        "逻辑1：若8个分区全部选中或全未选中，且，影响因子为空，则全部显示。" +
        "逻辑2：若8个分区全部选中或全未选中，且，影响因子不为空，则只按照影响因子筛选。" +
        "逻辑3：若8个分区部分选中，且，影响因子为空，则只按分区筛选。" +
        "逻辑4：若8个分区部分选中，且，影响因子不为空，则按分区与影响因子筛选。");
    // $('.easyScholar-choice-grouop > .title').tooltip(
    //     {
    //         show: {effect: "none", delay: 100}
    //     });

    chrome.storage.local.get({
        "pubmed_show_rank": ['Q1', 'Q2', 'Q3', 'Q4', '1区', '2区', '3区', '4区'],
        "pubmed_show_title": true,
        "pubmed_show_IF": "",
        "easyScholar_rank_if_relation": true
    }, function (items) {
        let pubmed_show_IF = items.pubmed_show_IF;
        $("#easyScholar_IF_MIN_MAX").val(pubmed_show_IF);

        let all_input = $(".easyScholar-choice-grouop > ul > li > input:checked");
        let store_input = items.pubmed_show_rank;
        let pubmed_show_title = items.pubmed_show_title;
        let easyScholar_rank_if_relation = items.easyScholar_rank_if_relation;
        all_input.each(function () {
            let single = $(this);
            if ($.inArray(single.val(), store_input) == -1) {
                single.attr('checked', false);
            }
        });
        $("#easyScholar-hide-title").attr('checked', pubmed_show_title);
        $("#easyScholar-rank-if-relation").attr('checked', easyScholar_rank_if_relation);
    });

    listenPubmed();
};
// --------------------------------------在多个网站上自定义选项 end

// --------------------------------------在多个网站上自定义选项的监听事件 start
function listenPubmed() {
    $("div.easyScholar-choice-grouop ul > li > input").unbind('click').bind('click', function () {
        let all_checked_input = $(".easyScholar-choice-grouop > ul > li > input:checked");
        let restore_input = new Array();
        all_checked_input.each(function () {
            let single = $(this);
            restore_input.push(single.val());
        });
        chrome.storage.local.set({
            "pubmed_show_rank": restore_input
        });
        infoNotice("您已经成功设置pubmed筛选条件。筛选功能不会补全文章，可能会隐藏全部文章；若不需要此功能，恢复原始状态（8个分区选中，影响因子清空）即可", "info");
        listenPubmedHide();
    });

    $("#easyScholar-rank-if-relation").unbind('click').bind('click', function () {
        let easyScholar_rank_if_relation = $(this).is(":checked");
        chrome.storage.local.set({
            "easyScholar_rank_if_relation": easyScholar_rank_if_relation
        });
        infoNotice("您已经成功设置pubmed筛选条件。筛选功能不会补全文章，可能会隐藏全部文章；若不需要此功能，恢复原始状态（8个分区选中，影响因子清空）即可", "info");
        listenPubmedHide();
    });

    $("#easyScholar-hide-title").unbind('click').bind('click', function () {
        let pubmed_show_title = $(this).is(":checked");
        chrome.storage.local.set({
            "pubmed_show_title": pubmed_show_title
        });
    });

    $('#easyScholar_IF_MIN_MAX').unbind('blur').bind('blur', function () {
        let easyScholar_IF_MIN_MAX = $('#easyScholar_IF_MIN_MAX').val();
        if (easyScholar_IF_MIN_MAX.length == 0) {
            $('#easyScholar_IF_MIN_MAX').val("");
            chrome.storage.local.set({
                "pubmed_show_IF": ""
            });
            return;
        }
        if (easyScholar_IF_MIN_MAX.length > 10) {
            $('#easyScholar_IF_MIN_MAX').val("");
            infoNotice("您输入的影响因子太长，请重新输入", "info");
            return;
        }
        if (easyScholar_IF_MIN_MAX.indexOf('-') == -1) {
            $('#easyScholar_IF_MIN_MAX').val("");
            infoNotice("影响因子范围的格式为：MIN-MAX，请重新输入", "info");
            return;
        }
        let min = parseFloat(easyScholar_IF_MIN_MAX.split("-")[0]);
        let max = parseFloat(easyScholar_IF_MIN_MAX.split("-")[1]);
        min = isNaN(min) ? 0 : min;
        max = isNaN(max) ? 500 : max;
        if (min > max) {
            $('#easyScholar_IF_MIN_MAX').val("");
            infoNotice("影响因子范围最小值大于最大值，请重新输入", "info");
            return;
        }

        let result = min + "-" + max;
        $('#easyScholar_IF_MIN_MAX').val(result);
        infoNotice("您已经成功设置pubmed筛选条件。筛选功能不会补全文章，可能会隐藏全部文章；若不需要此功能，恢复原始状态（8个分区选中，影响因子清空）即可", "info");
        chrome.storage.local.set({
            "pubmed_show_IF": result
        });
        listenPubmedHide();
    });

};

function listenPubmedHide() {
    chrome.storage.local.get({
        "pubmed_show_rank": ['Q1', 'Q2', 'Q3', 'Q4', '1区', '2区', '3区', '4区'],
        "pubmed_show_IF": "",
        "easyScholar_rank_if_relation": true
    }, function (items) {
        let allPaperDiv = $("article.full-docsum");
        if (allPaperDiv.length == 0) {
            allPaperDiv = $("article.article-overview");
        }
        let store_input = items.pubmed_show_rank;
        let pubmed_show_IF = items.pubmed_show_IF;
        let easyScholar_rank_if_relation = items.easyScholar_rank_if_relation;


        if ((store_input.length === 8 || store_input.length === 0) && pubmed_show_IF == "") {  //全部显示
            allPaperDiv.each(function () {
                $(this).show();
            });
        } else if ((store_input.length === 0 || store_input.length === 8) && pubmed_show_IF != "") {  //只根据影响因子显示
            let min = parseFloat(pubmed_show_IF.split("-")[0]);
            let max = parseFloat(pubmed_show_IF.split("-")[1]);
            allPaperDiv.each(function () {
                let single = $(this);
                let easyScholarRankList = single.find("span.easyscholar-ranking");
                let show_flag = false;

                easyScholarRankList.each(function () {
                    let single_span = $(this);

                    let rank_type = single_span.text().split(" ")[0];
                    let IF = single_span.text().split(" ")[1];
                    if (rank_type === "IF(5)" || rank_type === "IF") {
                        IF = parseFloat(IF);
                        if (IF > min && IF < max) {
                            show_flag = true;
                        }
                    }
                });

                if (show_flag) {
                    single.show();
                } else {
                    single.hide();
                }
            });

        } else if ((store_input.length !== 0 || store_input.length !== 8) && pubmed_show_IF === "") { //只根据分区显示
            allPaperDiv.each(function () {
                let single = $(this);
                let easyScholarRankList = single.find("span.easyscholar-ranking");
                let show_flag = false;
                easyScholarRankList.each(function () {
                    let single_span = $(this);

                    let rank_type = single_span.text().split(" ")[0];

                    let rank;


                    if (rank_type === "SCI升级版" || rank_type === "SCI基础版") {
                        rank = single_span.text().split(" ")[1];
                        rank = rank.substring(rank.length - 2, rank.length);
                    } else if (rank_type === "SCI" || rank_type === "SSCI") {
                        rank = single_span.text().split(" ")[1];
                    }

                    if ($.inArray(rank, store_input) !== -1) {
                        show_flag = true;
                    }
                });
                if (show_flag) {
                    single.show();
                } else {
                    single.hide();
                }
            });
        } else {
            let min = parseFloat(pubmed_show_IF.split("-")[0]);
            let max = parseFloat(pubmed_show_IF.split("-")[1]);
            allPaperDiv.each(function () {
                let single = $(this);
                let easyScholarRankList = single.find("span.easyscholar-ranking");
                let show_flag = false;

                let rank_array = [];
                let IF_array = [];

                easyScholarRankList.each(function () {
                    let single_span = $(this);
                    let rank;
                    let IF;
                    let rank_type = single_span.text().split(" ")[0];

                    if (rank_type === "SCI升级版" || rank_type === "SCI基础版") {
                        rank = single_span.text().split(" ")[1];
                        rank = rank.substring(rank.length - 2, rank.length);
                        rank_array.push(rank);
                    } else if (rank_type === "SCI" || rank_type === "SSCI") {
                        rank = single_span.text().split(" ")[1];
                        rank_array.push(rank);
                    } else if (rank_type === "IF(5)" || rank_type === "IF") {
                        IF = parseFloat(single_span.text().split(" ")[1]);
                        IF_array.push(IF);
                    }

                });
                let rank_result = false;
                for (let rank of rank_array) {
                    if (store_input.includes(rank)) {
                        rank_result = true;
                        break;
                    }
                }
                let IF_result = false;
                for (let IF of IF_array) {
                    if ((IF > min && IF < max)) {
                        IF_result = true;
                        break;
                    }
                }

                if (easyScholar_rank_if_relation) { //选中为or
                    if (IF_result || rank_result) { //或的关系
                        show_flag = true;
                    }
                } else {
                    if (IF_result && rank_result) { //and的关系
                        show_flag = true;
                    }
                }

                if (show_flag) {
                    single.show();
                } else {
                    single.hide();
                }
            });
        }
    });
};

// function listenPubmedHideIF() {
//     chrome.storage.local.get({
//         "pubmed_show_IF": ""
//     }, function (items) {
//         let allPaperDiv = $("article.full-docsum");
//
//         let pubmed_show_IF = items.pubmed_show_IF;
//         if(pubmed_show_IF == ""){
//             allPaperDiv.each(function () {
//                 $(this).show();
//             });
//             return ;
//         }
//         let min = parseFloat(pubmed_show_IF.split("-")[0]);
//         let max = parseFloat(pubmed_show_IF.split("-")[1]);
//
//
//         allPaperDiv.each(function () {
//             let single = $(this);
//             let easyScholarRankList = single.find("span.easyscholar-ranking");
//             let show_flag = false;
//
//             easyScholarRankList.each(function () {
//                 let single_span = $(this);
//
//                 let rank_type = single_span.text().split(" ")[0];
//                 let IF = single_span.text().split(" ")[1];
//                 if (rank_type == "SCIIF(5)" || rank_type == "SCIIF") {
//                     IF = parseFloat(IF);
//                     console.log(IF)
//                     if(IF > min && IF < max){
//                         show_flag = true;
//                     }
//                 }
//             });
//
//             if (show_flag) {
//                 single.show();
//             } else {
//                 single.hide();
//             }
//         });
//
//     });
// };
//
// function listenPubmedHideRank() {
//     chrome.storage.local.get({
//         "pubmed_show_rank": ['Q1', 'Q2', 'Q3', 'Q4', '1区', '2区', '3区', '4区']
//     }, function (items) {
//         let allPaperDiv = $("article.full-docsum");
//         let store_input = items.pubmed_show_rank;
//         if (store_input.length == 8) {
//             allPaperDiv.each(function () {
//                 $(this).show();
//             });
//         } else if (store_input.length == 0) {
//             allPaperDiv.each(function () {
//                 $(this).hide();
//             });
//         } else {
//             allPaperDiv.each(function () {
//                 let single = $(this);
//                 let easyScholarRankList = single.find("span.easyscholar-ranking");
//                 let show_flag = false;
//                 easyScholarRankList.each(function () {
//                     let single_span = $(this);
//
//                     let rank_type = single_span.text().split(" ")[0];
//                     let rank = single_span.text().split(" ")[1];
//                     if (rank_type == "SCI升级版" || rank_type == "SCI基础版") {
//                         rank = rank.substring(rank.length - 2, rank.length);
//                     }
//
//                     if ((rank_type == "SCI" || rank_type == "SSCI" || rank_type == "SCI升级版" || rank_type == "SCI基础版") && $.inArray(rank, store_input) != -1) {
//                         show_flag = true;
//                     }
//                 });
//                 if (show_flag) {
//                     single.show();
//                 } else {
//                     single.hide();
//                 }
//             });
//         }
//     });
// };

// function listenPubmedHideTitle() {
//     chrome.storage.local.get({
//         "pubmed_show_title": true
//     }, function (items) {
//         let pubmed_show_title = items.pubmed_show_title;
//         let allPaperDiv = $("span.easyscholar-title");
//         if (pubmed_show_title) {
//             allPaperDiv.each(function () {
//                 $(this).show();
//             });
//         }else{
//             allPaperDiv.each(function () {
//                 $(this).hide();
//             });
//         }
//     });
// };
// --------------------------------------在多个网站上自定义选项的监听事件 end

$(function () {
    chrome.storage.local.get({
        "firstInstall": "false",
        "displayUnit": default_displayUnit,
        "freeRankList": null,
        "SciLink": "https://sci-hub.se/",
        "isSciLink": "SciLinkOpen",

        "easyScholarColour1": default_easyScholarColour1, "easyScholarColour2": default_easyScholarColour2,
        "easyScholarColour3": default_easyScholarColour3, "easyScholarColour4": default_easyScholarColour4,
        "easyScholarColour5": default_easyScholarColour5,

        "fontColour": default_fontColour,
        "isFontBold": default_isFontBold,
        "skin": default_skin,
        "fontSize": default_fontSize,

        "publicationRankIntro": "",

        "isRankTitle": "RankTitleOpen",
    }, function (items) {

        optionCheckd = items["freeRankList"];

        SciLink = items.SciLink;
        isSciLink = items.isSciLink;

        easyScholarColour1 = items.easyScholarColour1;
        easyScholarColour2 = items.easyScholarColour2;
        easyScholarColour3 = items.easyScholarColour3;
        easyScholarColour4 = items.easyScholarColour4;
        easyScholarColour5 = items.easyScholarColour5;

        fontColour = items.fontColour;
        isFontBold = items.isFontBold;
        skin = items.skin;
        fontSize = items.fontSize;
        isRankTitle = items.isRankTitle

        let publicationRankIntro = items.publicationRankIntro;
        if (publicationRankIntro !== "" && isRankTitle === "RankTitleOpen") {

            titlesciif = publicationRankIntro.titlesciif;
            titlescibase = publicationRankIntro.titlescibase;
            titlexmu = publicationRankIntro.titlexmu;
            titlescu = publicationRankIntro.titlescu;
            titleswjtu = publicationRankIntro.titleswjtu;
            titlepku = publicationRankIntro.titlepku;
            titlesci = publicationRankIntro.titlesci;
            titleajg = publicationRankIntro.titleajg;
            titleutd24 = publicationRankIntro.titleutd24;
            titlecscd = publicationRankIntro.titlecscd;
            titlesciup = publicationRankIntro.titlesciup;
            titlefdu = publicationRankIntro.titlefdu;
            titlecssci = publicationRankIntro.titlecssci;
            titlehhu = publicationRankIntro.titlehhu;
            titlecug = publicationRankIntro.titlecug;
            titlecju = publicationRankIntro.titlecju;
            titleahci = publicationRankIntro.titleahci;
            titleswufe = publicationRankIntro.titleswufe;
            titlessci = publicationRankIntro.titlessci;
            titlexju = publicationRankIntro.titlexju;
            titleruc = publicationRankIntro.titleruc;
            titlezhongguokejihexin = publicationRankIntro.titlezhongguokejihexin;
            titleccf = publicationRankIntro.titleccf;
            titlecqu = publicationRankIntro.titlecqu;
            titleeii = publicationRankIntro.titleeii;
            titlezju = publicationRankIntro.titlezju;
            titlenju = publicationRankIntro.titlenju;
            titleuibe = publicationRankIntro.titleuibe;
            titlesciif5 = publicationRankIntro.titlesciif5;
            titlecufe = publicationRankIntro.titlecufe;
            titlesjtu = publicationRankIntro.titlesjtu;
            titlejci = publicationRankIntro.titlejci;
            titlesdufe = publicationRankIntro.titlesdufe;
            titleft50 = publicationRankIntro.titleft50;
            titlexdu = publicationRankIntro.titlexdu;
            titlefms = publicationRankIntro.titlefms;
            titleesi = publicationRankIntro.titleesi;
            titlecpu = publicationRankIntro.titlecpu;
            titlesciwarn = publicationRankIntro.titlesciwarn;
            titlesciUpTop = publicationRankIntro.titlesciUpTop;
        }

        let firstInstall = items.firstInstall;
        if (firstInstall === "true") {
            let info = "1.点击标签栏中easyScholar图标（通常为右上角），可以设置显示的分区。2.将鼠标置于颜色块上，可以查看分区的简介。3.页面中easyScholar图标为sci-hub链接（可以在设置中关闭）。4.有使用上的问题，可以联系客服";
            infoNotice(info, "success", 30000, true);
            chrome.storage.local.set({
                "firstInstall": "false"
            });
        }

        let version = chrome.runtime.getManifest().version;
        if (isSciLink === "SciLinkOpen") {
            setTimeout(function () {
                try {
                    addDoi();
                } catch (e) {
                    console.log(e);
                }
            }, 500);
            setInterval(function () {
                try {
                    addDoi();
                } catch (e) {
                    console.log(e);
                }
            }, 4000);
        }

        let websiteInterval = setInterval(function () {

            let url = window.location.href;
            let website = getCurrentWebSite(url);
            if (website != null) {
                console.log(website);
                clearInterval(websiteInterval);
                let check;
                let textInfo;
                chrome.runtime.sendMessage({
                    action: "check_version",
                    version: version
                }, function (result) {
                    check = result["code"];
                    textInfo = result["msg"];
                    if (check === 200) {
                        if (textInfo !== "SUCCESS") {
                            infoNotice(textInfo, "success");
                        }
                        mainShowRanking(optionCheckd);
                        paperManagerStart();
                        if (website === "Pubmed") {
                            setInterval(function () {
                                mainShowRanking(optionCheckd);
                                paperManagerStart();
                            }, 1500);
                        } else if (website === "ConnectedPapersDetail") {
                            setInterval(function () {
                                mainShowRanking(optionCheckd);
                                paperManagerStart();
                            }, 800);
                        } else if (website === "ResearchGate") {
                            setInterval(function () {
                                mainShowRanking(optionCheckd);
                                paperManagerStart();
                            }, 3500);
                        } else {
                            setInterval(function () {
                                mainShowRanking(optionCheckd);
                                paperManagerStart();
                            }, 2500);
                        }


                    } else if (check === 10006) {
                        infoNotice(textInfo, "info", 6000, true, true);
                        mainShowRanking(optionCheckd);
                        paperManagerStart();
                        if (website === "Pubmed") {
                            setInterval(function () {
                                mainShowRanking(optionCheckd);
                                paperManagerStart();
                            }, 1500);
                        } else {
                            setInterval(function () {
                                mainShowRanking(optionCheckd);
                                paperManagerStart();
                            }, 2500);
                        }
                    } else {
                        infoNotice(textInfo, "error", 6000, true, true);
                    }
                });
            }
        }, 300);

    });
});
