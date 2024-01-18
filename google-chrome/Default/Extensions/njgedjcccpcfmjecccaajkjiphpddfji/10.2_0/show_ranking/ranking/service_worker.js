chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    let lastCheckTime;
    if (request.action == "trans_google") {
        let row_data = request.data;
        let flag = 0;
        let tl2;
        let re = /[\u4E00-\u9FA5]/;

        if (re.test(row_data)) {
            flag = 1;
        }
        tl2 = (flag == 0) ? "zh-CN" : "en";

        fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=" + tl2 + "&dt=t&q=" + encodeURIComponent(row_data), {
            method: "get"
        }).then(result => result.json()).then(function (result) {
            let all_result = "";
            for (let i = 0; i < result[0].length; i++) {
                all_result += result[0][i][0];
            }
            sendResponse(all_result);
        }).catch(function () {
            sendResponse("服务暂时不可用，有可能被谷歌禁止。若您是国内用户，则可能需要切换VPN，或更换翻译源。若长时间未恢复，请及时和我们联系：support@easyscholar.cc 建议使用小牛翻译，其在几个翻译源之中最快最稳定");
        });


    } else if (request.action == "trans_google_mirro") {
        let row_data = request.data;
        row_data = row_data.replaceAll("/", " ");
        let flag = 0;
        let tl2;
        let re = /[\u4E00-\u9FA5]/;

        if (re.test(row_data)) {
            flag = 1;
        }
        tl2 = (flag == 0) ? "zh" : "en";

        fetch("https://translate.paperguard.cc/api/v1/auto/" + tl2 + "/" + encodeURIComponent(row_data), {
            method: "get"
        }).then(result => result.json()).then(function (result) {
            sendResponse(result["translation"]);
        }).catch(function () {
            sendResponse("服务暂时不可用，有可能镜像网站访问过慢，您可以稍后尝试，或更换翻译源。建议使用小牛翻译，其在几个翻译源之中最快最稳定");
        });

    } else if (request.action == "trans_keyan") {
        let url2 = 'https://www.easyscholar.cc/extension/translateByKeyan';
        let row_data = request.data;
        if (row_data.length > 3000) {
            sendResponse( "当前选择的字符数为" + row_data.length + "，已经超过3000，请缩小范围选择。");
            return ;
        }
        fetch(url2 + "?s=" + encodeURIComponent(row_data), {
            method: "get",
        }).then(response => response.json()).then(function (response) {
            if (response['code'] == 200) {
                sendResponse(response['data']);
            } else {
                sendResponse("错误码：" + response['code'] + "提示消息：" + response['msg']);
            }
        }).catch(function (response) {
            sendResponse("服务暂时不可用，请稍后再试，有可能因为调用次数过多受到限制，请您稍后再试，若长时间未回复，请您及时联系我们：support@easyscholar.cc。建议使用小牛翻译，其在几个翻译源之中最快最稳定");
        });

    } else if (request.action == "trans_sougou") {
        let url2 = "https://fanyi.sogou.com/text?keyword=";
        let row_data = request.data;
        if (row_data.length > 5000) {
            sendResponse( "当前选择的字符数为" + row_data.length + "，已经超过5000，请缩小范围选择。");
            return ;
        }
        row_data = encodeURIComponent(row_data);
        fetch(url2 + row_data).then(response => response.text()).then(function (response) {
            sendResponse(response);
        }).catch(function () {
            sendResponse("服务暂时不可用，请稍后再试222，若您是火狐浏览器，需要在插件设置中切换到谷歌翻译国内镜像、棵岩阅读、彩云等其他引擎。建议使用小牛翻译，其在几个翻译源之中最快最稳定");
        });
    } else if (request.action == "trans_youdao") {
        let row_data = request.data;

        let param = /[\u4E00-\u9FA5]/.test(row_data) ? "zh_en" : "en_zh";

        row_data = encodeURIComponent(row_data.replace(/\s+/g, ' '));
        fetch("http://fanyi.youdao.com/translate?&doctype=json&type=" + param + "&i=" + row_data).then(response => response.json()).then(function (response) {
            let result = "";
            let temp = response["translateResult"][0];
            for (let i = 0; i < temp.length; i++) {
                result += temp[i]["tgt"];
            }
            sendResponse(result);
        }).catch(function () {
            sendResponse("服务暂时不可用，请稍后再试333，若您是火狐浏览器，需要在插件设置中切换到谷歌翻译国内镜像、棵岩阅读、彩云等其他引擎。建议使用小牛翻译，其在几个翻译源之中最快最稳定");
        });
    } else if (request.action == "trans_caiyunweb") {
        let row_data = request.data;

        let param = /[\u4E00-\u9FA5]/.test(row_data) ? "zh2en" : "en2zh";

        chrome.storage.local.get({
            "caiyun_token": "3975l6lr5pcbvidl6jl2",
        }, function (items) {
            let caiyun_token = items.caiyun_token;

            fetch('https://api.interpreter.caiyunai.com/v1/translator?', {
                method: 'post',
                headers: {
                    "content-type": "application/json",
                    "x-authorization": "token " + caiyun_token,
                },
                body: JSON.stringify({
                    source: [row_data],
                    trans_type: param,
                    request_id: new Date().valueOf() / 10000,
                    detect: true,
                }),
                responseType: "json",
            })
                .then(response => response.json()).then(function (response) {
                sendResponse(response.target[0]);
            }).catch(function () {
                sendResponse("API rate limit exceeded" + "请稍后再试。建议使用小牛翻译，其在几个翻译源之中最快最稳定");
            });
        });
    } else if (request.action === "trans_reverso") {
        let row_data = request.data;
        let from;
        let to;
        if(/[\u4E00-\u9FA5]/.test(row_data)){
            from = "chi";
            to = "eng";
        }else{
            to = "chi";
            from = "eng";
        }


        fetch('https://api.reverso.net/translate/v1/translation', {
            method: 'post',
            headers: {
                "accept": "application/json, text/plain, */*",
                "accept-language": "zh-CN,zh;q=0.9",
                "content-type": "application/json",
                "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "x-reverso-origin": "translation.web"
            },
            body: JSON.stringify({
                format: 'text',
                from: from,
                to: to,
                input : row_data,
                options : {
                    "contextResults":true,
                    "languageDetection":true,
                    "origin":"translation.web",
                    "sentenceSplitter":true,
                }
            }),
            responseType: "json",
        }).then(response => response.json()).then(function (response) {
            let result = "";
            for (let i of response["translation"]){
                result +=i;
            }
            sendResponse(result);
        }).catch(function () {
            sendResponse("reverso出错，请稍后再试。建议使用小牛翻译，其在几个翻译源之中最快最稳定");
        });
    } else if (request.action === "trans_yandex") {
        let row_data = request.data;
        if (row_data.length > 5000) {
            sendResponse("当前选择的字符数为" + row_data.length + "，已经超过5000，请缩小范围选择。");
            return ;
        }
        let lang;
        lang = /[\u4E00-\u9FA5]/.test(row_data) ? "zh-en" : "en-zh";
        let key = "";
        chrome.storage.local.get({
            "yandex_sid_time" : "2023-01-02 00:00:00",
            "yandex_sid" : "",
        }, function (item){
            let lastTime = new Date(item["yandex_sid_time"]);
            let curTime = new Date(formattedDate());
            let hours = parseInt(Math.abs(curTime - lastTime) / 1000 / 60 / 60); //把差的毫秒数转换为小时

            let yandex_sid = item["yandex_sid"];

            if(hours >= "12" || yandex_sid === ""){
                fetch("https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=en&widgetTheme=light&autoMode=false", {
                    "headers": {
                        "accept": "*/*",
                        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
                        "sec-ch-ua": "\"Microsoft Edge\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "\"Windows\"",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "none"
                    },
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": null,
                    "method": "GET",
                    "mode": "cors",
                    "credentials": "include"
                }).then(response => response.text()).then(function (response) {
                    if(/(?=sid: ').*(?=',)/.test(response)){
                        key = response.match(/(?=sid: ').*(?=',)/)[0].replaceAll("sid: '","") + "-0-0";
                        chrome.storage.local.set({
                            "yandex_sid": key,
                            "yandex_sid_time" : formattedDate(),
                        });
                    }else{
                        sendResponse("reverso出错，请稍后再试。建议使用小牛翻译，其在几个翻译源之中最快最稳定");
                    }
                    fetch("https://translate.yandex.net/api/v1/tr.json/translate?srv=tr-url-widget&id=" + key +"&format=text&lang= " + lang +"&text=" + encodeURIComponent(row_data), {
                        "headers": {
                            "accept": "*/*",
                            "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
                            "sec-ch-ua": "\"Microsoft Edge\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
                            "sec-ch-ua-mobile": "?0",
                            "sec-ch-ua-platform": "\"Windows\"",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "none"
                        },
                        "referrerPolicy": "strict-origin-when-cross-origin",
                        "body": null,
                        "method": "GET",
                        "mode": "cors",
                        "credentials": "include"
                    }).then(response => response.json()).then(function (response) {
                        sendResponse(response["text"][0]);
                    }).catch(function () {
                        sendResponse("reverso出错，请稍后再试。建议使用小牛翻译，其在几个翻译源之中最快最稳定");
                    });
                }).catch(function () {
                    sendResponse("reverso出错，请稍后再试。建议使用小牛翻译，其在几个翻译源之中最快最稳定");
                });
            }else{
                fetch("https://translate.yandex.net/api/v1/tr.json/translate?srv=tr-url-widget&id=" + yandex_sid +"&format=text&lang= " + lang +"&text=" + encodeURIComponent(row_data), {
                    "headers": {
                        "accept": "*/*",
                        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
                        "sec-ch-ua": "\"Microsoft Edge\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "\"Windows\"",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "none"
                    },
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": null,
                    "method": "GET",
                    "mode": "cors",
                    "credentials": "include"
                }).then(response => response.json()).then(function (response) {
                    sendResponse(response["text"][0]);
                }).catch(function () {
                    sendResponse("reverso出错，请稍后再试。建议使用小牛翻译，其在几个翻译源之中最快最稳定");
                });
            }
        });

    } else if (request.action == "trans_xiaoniu"){
        let row_data = request.data;
        if (row_data.length > 5000) {
            sendResponse("当前选择的字符数为" + row_data.length + "，已经超过5000，请缩小范围选择。");
            return ;
        }
        chrome.storage.local.get({
            "translatexiaoniuapikey": "",
        }, function (items) {
            let translatexiaoniuapikey = items.translatexiaoniuapikey;
            if(!translatexiaoniuapikey){
                sendResponse("您还未填写小牛翻译api-key，请前往小牛翻译官网获取。https://niutrans.com/cloud/account_info/info");
                return ;
            }
            let from;
            let to;
            if(/[\u4E00-\u9FA5]/.test(row_data)){
                from = "zh";
                to = "en";
            }else{
                from = "en";
                to = "zh";
            }

            fetch("https://api.niutrans.com/NiuTransServer/translation" + "?from=" + from + "&to=" + to
                + "&src_text=" + encodeURIComponent(row_data)
                + "&apikey=" + translatexiaoniuapikey
                + "&source=" + "easyscholar" )
                .then(response => response.json()).then(function (response) {
                if(response["error_msg"]){
                    sendResponse(response["error_msg"]);
                }else{
                    sendResponse(response["tgt_text"]);
                }
            }).catch(function () {
                sendResponse("服务暂时不可用，请稍后再试xiaoniu。");
            });
        });
    }else if (request.action == "check_version") {
        chrome.storage.local.get({
            "check_time": "2022-1-02",
            "publicationRankIntro": ""
        }, function (data) {
            lastCheckTime = data["check_time"];
            let lastTime = new Date(lastCheckTime);
            let date = new Date();
            let curTimeSimple = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
            let curTime = new Date(curTimeSimple);
            let days = parseInt(Math.abs(curTime - lastTime) / 1000 / 60 / 60 / 24); //把差的毫秒数转换为天数


            if (days >= 3 || days < 0 || (data.publicationRankIntro == "")) {
                fetch("https://www.easyscholar.cc/extension/checkVersion?version=" + request.version, {
                    method: "get",
                }).then(response => response.json()).then(function (response) {
                    sendResponse(response);
                    if (response["code"] == 200) {
                        chrome.storage.local.set({
                            "check_time": curTimeSimple,
                            "caiyun_token": response.data.caiyunToken
                        });
                    }
                }).catch(function (response) {
                    sendResponse({
                        "code": 199,
                        "msg": "无法连接至easyScholar服务器，请稍后再试。您可以按照以下步骤依次排查问题： " +
                            "1.使用手机（运营商流量）访问官网，若同样无法访问，则可能已停止服务，请您及时和我们反馈。若可以访问，则继续尝试如下步骤。 " +
                            "2.若您使用了VPN，可能由于节点超时，您可以切换其他VPN节点、关闭VPN使用谷歌学术国内镜像、将本网站添加进VPN白名单等。 " +
                            "3.若是校园网（或科研单位内部网络），请尝试设置其他公共DNS服务器，或寻找本校校园网备用DNS服务器地址。 " +
                            "4.若不符合上述两种情况，且在电脑上能访问官网，请卸载重装试试。",
                        "data": null
                    });
                });
                fetch("https://www.easyscholar.cc/extension/getPublicationRankIntro").then(res => res.json())
                // fetch("http://127.0.0.1:7050/extension/getPublicationRankIntro").then(res => res.json())
                    .then(function (response) {
                        chrome.storage.local.set({
                            "publicationRankIntro": response.data
                        });
                    }).catch(function (response) {
                    sendResponse({
                        "code": 199,
                        "msg": "无法连接至easyScholar服务器，请稍后再试。您可以按照以下步骤依次排查问题： " +
                            "1.使用手机（运营商流量）访问官网，若同样无法访问，则可能已停止服务，请您及时和我们反馈。若可以访问，则继续尝试如下步骤。 " +
                            "2.若您使用了VPN，可能由于节点超时，您可以切换其他VPN节点、关闭VPN使用谷歌学术国内镜像、将本网站添加进VPN白名单等。 " +
                            "3.若是校园网（或科研单位内部网络），请尝试设置其他公共DNS服务器，或寻找本校校园网备用DNS服务器地址。 " +
                            "4.若不符合上述两种情况，且在电脑上能访问官网，请卸载重装试试。",
                        "data": null
                    });
                });
            } else {
                sendResponse({
                    "code": 200,
                    "msg": "SUCCESS",
                    "data": null
                });
            }
            return true;
        });

    } else if (request.action == "showInfo") {
        fetch(
            "https://www.easyscholar.cc/homeController/showInfo.ajax", {
                method: "post",
                credentials: "include"
            }).then(response => response.json()).then(function (response) {
            sendResponse(response);

        }).catch(function (response) {
                sendResponse({"textInfo": "无法连接easyScholar服务器，请稍后再试", "checkVersion": "error"});
            }
        );
    } else if (request.action == "getPaperAllType") {
        fetch(
            "https://www.easyscholar.cc/extension/getPaperAllType", {
                // "http://127.0.0.1:7050/extension/getPaperAllType", {
                method: "get",
                credentials: "include"
            }
        ).then(response => response.json()).then(function (response) {
            sendResponse(response);
        }).catch(function (response) {
            sendResponse({"textInfo": "无法连接easyScholar服务器，请稍后再试", "checkVersion": "error"});
        });
    } else if (request.action == "insertPaper") {
        fetch("https://www.easyscholar.cc/extension/insertPaper", {
            // fetch("http://127.0.0.1:7050/extension/insertPaper", {
            method: "post",
            credentials: "include",
            body: JSON.stringify(request.data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json()).then(function (response) {
            sendResponse(response);
        }).catch(function () {
            sendResponse({"textInfo": "无法连接easyScholar服务器，请稍后再试22", "checkVersion": "error"});
        });
    } else if (request.action == "getPapersRank") {
        fetch("https://www.easyscholar.cc/extension/listPublicationRank8", {
            // fetch("http://127.0.0.1:7050/extension/listPublicationRank8", {
            method: "post",
            credentials: "include",
            body: JSON.stringify(request.data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.ok) {
                response = response.json();
            } else if (response.status === 514){
                let tempResponse = {};
                tempResponse["msg"] = "您的访问过于频繁，已被腾讯云CDN安全中心拦截。请检查zotero中是否有安装调用了easyScholar服务的插件，若有则请将它们更新至最新。"
                tempResponse["code"] = 199;
                response = tempResponse;
            }else if (response.status >= 500) {
                let tempResponse = {};
                tempResponse["msg"] = "已经成功连接至服务器，但是服务已停止。若该提示出现在凌晨，则有可能在维护服务器，一般不超过15分钟；若是在白天，则可能受到网络攻击，请您及时联系我们"
                tempResponse["code"] = 199;
                response = tempResponse;
            } else {
                let tempResponse = {};
                tempResponse["msg"] = "请求错误，响应状态码为：" + response.status;
                tempResponse["code"] = 199;
                response = tempResponse;
            }
            return response;
        }).then(response => {
            sendResponse(response);
        }).catch(error => {
                let tempResponse = {};
                tempResponse["msg"] = "无法连接至easyScholar服务器，请稍后再试。您可以按照以下步骤依次排查问题： " +
                    "1.使用手机（运营商流量）访问官网，若同样无法访问，则可能已停止服务，请您及时和我们反馈。若可以访问，则继续尝试如下步骤。 " +
                    "2.若您使用了VPN，可能由于节点超时，您可以切换其他VPN节点、关闭VPN使用谷歌学术国内镜像、将本网站添加进VPN白名单等。 " +
                    "3.若是校园网（或科研单位内部网络），请尝试设置其他公共DNS服务器，或寻找本校校园网备用DNS服务器地址。 " +
                    "4.若不符合上述两种情况，且在电脑上能访问官网，请卸载重装试试。"
                tempResponse["code"] = 199;
                sendResponse(tempResponse);
            }
        );
    } else if (request.action == "getSciLink") {
        fetch("https://www.easyscholar.cc/extension/getSciLink").then(response => response.json()).then(function (response) {
            sendResponse(response);
        }).catch(function () {
            sendResponse({"textInfo": "无法连接easyScholar服务器，请稍后再试22", "checkVersion": "error"});
        });
    }
    return true;
});

function stringifyQueryParameter(data) {
    const ret = Object.keys(data).map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
    );
    return ret.join("&");
}

chrome.runtime.onInstalled.addListener(details => {
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.storage.local.set({
            "skin": "soft_skin",
            "easyScholarColour1": "#ff9999",
            "easyScholarColour2": "#86dad1",
            "easyScholarColour3": "#ffe78f",
            "easyScholarColour4": "#ffd4a9",
            "easyScholarColour5": "#cce5ff",
            "fontColour": "#000000",
            "fontSize": "13",
            "isFontBold": "noBold"
        });
        chrome.runtime.setUninstallURL('https://www.wjx.cn/vj/Y8gpyI3.aspx');
        chrome.tabs.create({
            url: "https://www.easyscholar.cc"
        });
        chrome.storage.local.set({
            "firstInstall": "true"
        });
    }
});


function formattedDate(){
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let hour = date.getHours().toString().padStart(2, '0');
    let minute = date.getMinutes().toString().padStart(2, '0');
    let second = date.getSeconds().toString().padStart(2, '0');
    let formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    return formattedDate
}
