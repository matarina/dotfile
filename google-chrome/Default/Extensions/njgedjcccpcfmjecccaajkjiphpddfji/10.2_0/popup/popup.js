let default_displayUnit = ['all', 'sci', 'swufe', 'ccf', 'cufe', 'sciif', 'fdu', 'sjtu', 'cssci', 'xmu', 'ruc', 'cscd',
    'uibe', 'swjtu', 'xdu', 'sci-base', 'sci-up', 'pku', 'sdufe', 'eii', 'nju', 'ahci', 'zhongguokejihexin', 'cqu',
    'hhu', 'ajg', 'xju', 'cug', 'ssci', 'fms', 'scu', 'sciif5', 'sciwarn', 'jci', 'cju', 'zju', "zhintro", "enintro", "ft50", "utd24"];

let default_skin = "soft_skin";


$(function () {
    $('#loglogout').hide();
    $(".unlock").hide();
    document.getElementById("easyScholar_version").innerText = chrome.runtime.getManifest().version;

    chrome.storage.local.get({
        "skin": default_skin
    }, function (items2) {
        document.getElementById(items2["skin"]).checked = true;
    });

    $('#skinList li input').click(function () {
        let skin = $(this)[0].defaultValue;
        if (skin === "soft_skin" || skin === "square_skin") {
            chrome.storage.local.set({
                "skin": skin,
                "easyScholarColour1": "#ff9999",
                "easyScholarColour2": "#86dad1",
                "easyScholarColour3": "#ffe78f",
                "easyScholarColour4": "#ffd4a9",
                "easyScholarColour5": "#cce5ff",
                "fontColour": "#000000",
                "fontSize": "13",
                "isFontBold": "noBold"
            }, function () {
                infoNotice('成功保存至本地', 'success');
            });
        } else if (skin === "default_skin") {
            chrome.storage.local.set({
                "skin": skin,
                "easyScholarColour1": "#ff55ff",
                "easyScholarColour2": "#b94a48",
                "easyScholarColour3": "#f89406",
                "easyScholarColour4": "#468847",
                "easyScholarColour5": "#55aaff",
                "fontColour": "#ffffff",
                "fontSize": "12",
                "isFontBold": "bold"
            }, function () {
                infoNotice('成功保存至本地', 'success');
            });
        }
    });

    // fetch("http://127.0.0.1:7050/extension/getRank8")
    fetch("https://www.easyscholar.cc/extension/getRank8")
        .then(res => res.json())
        .then(res => {
            let user = res.data.user;

            let freeRank = res.data.freeRank;
            let limitRank = res.data.limitRank;
            let customRank = res.data.customRank;

            let limitRankAuth = res.data.limitRankAuth;
            let customRankAuth = res.data.customRankAuth;
            let freeRankAuth = res.data.freeRankAuth;


            let limitRankAuthInfo = res.data.limitRankAuthInfo;
            let customRankAuthInfo = res.data.customRankAuthInfo;
            let freeRankAuthInfo = res.data.freeRankAuthInfo;

            let customPublicationRankIntro = res.data.customPublicationRankIntro;

            if (customPublicationRankIntro !== undefined) {
                chrome.storage.local.set({
                    "customPublicationRankIntro": customPublicationRankIntro
                });
            }
            if (user != null) {
                $('#loglogout').show().click(function () {
                    // fetch('http://127.0.0.1:7050/loglogout')
                    fetch('https://www.easyscholar.cc/loglogout')
                        .then(res => res.json()).then(res => {
                        location.reload();
                    });
                });

                $("#loginText").text(user.userName);
            }

            if (freeRank !== undefined) {
                if (freeRankAuth === true) {
                    $(".freeRank .lock").hide();
                    $(".freeRank .unlock").show();
                    $(".freeRank .mask").removeAttr("class");
                }else{
                    $(".freeRank .tip span").text(freeRankAuthInfo);
                }
                let freeRankList = '';
                for (let i = 0; i < freeRank.length; i++) {
                    if (freeRank[i]['select'] === 1) {
                        freeRankList += '<li><input type="checkbox" checked value="' + freeRank[i]["code"] + '" name="checkbox" data-labelauty="' + freeRank[i]["name"] + '"></li>'
                    } else {
                        freeRankList += '<li><input type="checkbox" value="' + freeRank[i]["code"] + '" name="checkbox" data-labelauty="' + freeRank[i]["name"] + '"></li>'
                    }

                }
                $('#freeRankList').append($(freeRankList));
            }

            if (limitRank !== undefined) {
                if (limitRankAuth === true) {
                    $(".limitRank .lock").hide();
                    $(".limitRank .unlock").show();
                    $(".limitRank .mask").removeAttr("class");
                }else{
                    $(".limitRank .tip span").text(limitRankAuthInfo);
                }
                let limitRankList = '';
                for (let i = 0; i < limitRank.length; i++) {
                    if (limitRank[i]['select'] === 1) {
                        limitRankList += '<li><input type="checkbox" checked value="' + limitRank[i]["code"] + '" name="checkbox" data-labelauty="' + limitRank[i]["name"] + '"></li>'
                    } else {
                        limitRankList += '<li><input type="checkbox" value="' + limitRank[i]["code"] + '" name="checkbox" data-labelauty="' + limitRank[i]["name"] + '"></li>'
                    }
                }
                $('#limitRankList').append($(limitRankList));
            }

            if (customRank !== undefined) {
                if (customRankAuth === true) {
                    $(".customRank .lock").hide();
                    $(".customRank .unlock").show();
                    $(".customRank .mask").removeAttr("class");
                }else{
                    $(".customRank .tip span").text(customRankAuthInfo);
                }
                let customRankList = '';
                if(customRank !== null){
                    for (let i = 0; i < customRank.length; i++) {
                        if (customRank[i]['select'] === 1) {
                            customRankList += '<li><input type="checkbox" checked value="' + customRank[i]["code"] + '" name="checkbox" data-labelauty="' + customRank[i]["name"] + '"></li>'
                        } else {
                            customRankList += '<li><input type="checkbox" value="' + customRank[i]["code"] + '" name="checkbox" data-labelauty="' + customRank[i]["name"] + '"></li>'
                        }
                    }
                    if(customRank.length === 0){
                        customRankList += '<li>您还未添加自定义数据集</li>'
                    }
                }
                $('#customRankList').append($(customRankList));
            }
            $(':input').labelauty({icon: false});
            if (user != null) {
                if (freeRankAuth === true) {
                    $('#freeRankList li input').click(function () {
                        let array = [];
                        let checkboxes = $('#freeRankList li input[type=checkbox]:checked, #limitRankList li input[type=checkbox]:checked')

                        for (let i = 0; i < checkboxes.length; i++) {
                            array.push(checkboxes[i].value);
                        }
                        let param = new URLSearchParams();
                        param.append("selectRank", array.toString());
                        // fetch("http://127.0.0.1:7050/extension/updateSelect"
                        fetch("https://www.easyscholar.cc/extension/updateSelect"
                            , {
                                method: "post",
                                headers: {'content-type': 'application/x-www-form-urlencoded'},
                                body: param,
                            })
                            .then(res => res.json()).then(res => {
                            infoNotice(res.msg, 'success');
                        }).catch(function () {
                            infoNotice("无法连接至easyScholar服务器", 'error');
                        })
                    });
                }
                if (limitRankAuth === true) {
                    $('#limitRankList li input').click(function () {
                        let array = [];
                        let checkboxes = $('#freeRankList li input[type=checkbox]:checked, #limitRankList li input[type=checkbox]:checked')

                        for (let i = 0; i < checkboxes.length; i++) {
                            array.push(checkboxes[i].value);
                        }
                        let param = new URLSearchParams();
                        param.append("selectRank", array.toString());
                        // fetch("http://127.0.0.1:7050/extension/updateSelect"
                        fetch("https://www.easyscholar.cc/extension/updateSelect"
                            , {
                                method: "post",
                                headers: {'content-type': 'application/x-www-form-urlencoded'},
                                body: param,
                            })
                            .then(res => res.json()).then(res => {
                            infoNotice(res.msg, 'success');
                        }).catch(function () {
                            infoNotice("无法连接至easyScholar服务器", 'error');
                        })
                    });
                }
                if(customRankAuth === true){
                    $('#customRankList li input').click(function () {
                        let rankId = $(this)[0].defaultValue;
                        let selected = $(this)[0].checked;
                        let selectedInteger;
                        selected === true ? selectedInteger = 1 : selectedInteger = 0;
                        let param = new URLSearchParams();
                        param.append('select', selectedInteger);
                        param.append('rankInfoUuid', rankId);
                        // fetch("http://127.0.0.1:7050/api/console/rankInfo/userChooseRankInfo"
                        fetch("https://www.easyscholar.cc/api/console/rankInfo/userChooseRankInfo"
                            , {
                                method: "post",
                                headers: {'content-type': 'application/x-www-form-urlencoded'},
                                body: param,
                            })
                            .then(res => res.json()).then(res => {
                            infoNotice(res.msg, 'success');
                        }).catch(function () {
                            infoNotice("无法连接至easyScholar服务器", 'error');
                        })
                    });
                }
            }

        });
});

function infoNotice(text, type) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: type,
        title: "easyScholar提示您：" + text
    })
};





