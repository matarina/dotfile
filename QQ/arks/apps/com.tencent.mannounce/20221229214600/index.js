(function (global, factory) {
      // 重写factory方法.让factory有独立的作用域
      var _factory = factory; factory = function(arkWeb, wasmoon) { return function(options) { return _factory(arkWeb, wasmoon)(options); }};
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@tencent/ark-web'), require('wasmoon')) :
  typeof define === 'function' && define.amd ? define(['@tencent/ark-web', 'wasmoon'], factory) :
  (global.Ark = factory(global.WebArk, global.wasmoon));
})(this, (function (arkWeb, wasmoon) {
  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var arkWeb__namespace = /*#__PURE__*/_interopNamespace(arkWeb);

  /**
   * @fileoverview 前置脚本注入
   * @author alawnxu
   * @date 2022-04-09 23:26:29
   * @version 1.0.0
   * @description 这个是一个模块文件. 变量请采用: __VAR__ 方式命名
   */

  /**
   * 暴露出局部变量.方便后续的模块挂载
   */
  let GlobalAppTemplates = {};
  const ArkGlobalContext = {
    /**
     * @private
     * @param {string} id 视图ID
     * @param {string} template 视图模板
     */
    _setViewTemplate(id, template) {
      GlobalAppTemplates[id] = template;
    },
    /**
     * 获取所有的模板
     * @public
     * @returns
     */
    getViewTemplates() {
      return GlobalAppTemplates;
    },
    /**
     * 释放所有模板
     * @date 2022-08-08 11:14:36
     */
    clearTemplates() {
      GlobalAppTemplates = {};
    }
  };

  const ArkWindow = Object.create({});
      const apis = [];
      apis.forEach(api => {
        let val;
        Object.defineProperty(ArkWindow, api, {
          get() {
            return val;
          },
          set(value) {
            val = value;
          }
        });
      });

  /**
   * @fileoverview 前置脚本注入(UI模块)
   * @author alawnxu
   * @date 2022-04-09 23:26:29
   * @version 1.0.0
   * @description 这个是一个模块文件. 变量请采用: __VAR__ 方式命名
   */

  const UI = new Proxy(arkWeb.UI, {
    get(target, propKey) {
      const func = target[propKey];
      if (typeof func === 'function') {

        /**
         * @description 这里之前传入global.app, 后面发现不太可行, 因为在Ark视图里面有注册了很多事件.这些事件的会直接调用里面声明的全局方法.这个时候就有可能不是在某一个对象上了.
         * @update 2022年07月30日22:48:18
         * @author alawnxu
         */
        return function (...params) {
          return target[propKey](...params, ArkWindow);
        };
      }
      return target[propKey];
    },
  });

  /**
   * @fileoverview 前置脚本注入(Net模块)
   * @author alawnxu
   * @date 2022-04-09 23:26:29
   * @version 1.0.0
   * @description 这个是一个模块文件. 变量请采用: __VAR__ 方式命名
   */

  const Net = new Proxy(arkWeb.Net, {
    get(target, propKey) {
      const func = target[propKey];
      if (typeof func === 'function') {

        /**
         * @description 这里之前传入global.app, 后面发现不太可行, 因为在Ark视图里面有注册了很多事件.这些事件的会直接调用里面声明的全局方法.这个时候就有可能不是在某一个对象上了.
         * @update 2022年07月30日22:48:18
         * @author alawnxu
         */
        return function (...params) {
          return target[propKey](...params, ArkWindow);
        };
      }
      return target[propKey];
    },
  });

  /**
   * @fileoverview 前置脚本注入
   * @author alawnxu
   * @date 2022-04-09 23:26:29
   * @version 1.0.0
   * @description 这个是一个模块文件. 变量请采用: __VAR__ 方式命名
   */

  const GlobalApplicationApis = {};
  ["CreateView","CreateRootView","GetRootView","GetTemplate","GetApplicationVersion"].forEach((method) => {
    GlobalApplicationApis[method] = function (...params) {
      const templates = ArkGlobalContext.getViewTemplates();

      /**
       * @description 这里之前传入global.app, 后面发现不太可行, 因为在Ark视图里面有注册了很多事件.这些事件的会直接调用里面声明的全局方法.这个时候就有可能不是在某一个对象上了.
       * @update 2022年07月30日22:48:18
       * @author alawnxu
       */
      const application = new arkWeb.Application(ArkWindow, templates);
      if (typeof application[method] === 'function') {
        return application[method](...params);
      }

      console.warn('Application not implement method:', method);
    };
  });

  const { CreateView,CreateRootView,GetRootView,GetTemplate,GetApplicationVersion } = GlobalApplicationApis;

  /**
   * @fileoverview 前置脚本注入(polyfill)
   * @author alawnxu
   * @date 2022-07-30 22:20:00
   * @version 1.0.0
   * @description 这个是一个模块文件. 变量请采用: __VAR__ 方式命名
   * 
   * 在Ark引擎中默认支持了 JSON.Stringify 和 JSON.Parse @see {@link /Users/alawnxu/workspace/qq/Ark/src/libs/net/httpwrapper.cpp}
   * 其实同 Net.JSONToTable 和 Net.TableToJSON
   * 
   * 在这里就通过注入的方式注册进去吧
   * 
   * 涉及到这个Api的Ark. 游戏中心所有的Ark因为走了单独的构建,所以都会使用到这个Api
   * @see {@link https://git.woa.com/sq-gamecenter-frontend-team/gc-ark-hub/tree/master/com_tencent_gamecenter_game_download}
   * @see {@link https://git.woa.com/group-pro/bot-frontend/bot-ark/tree/master/com_tencent_bot_groupbot}
   */
  (function() {
      JSON.Stringify = JSON.Stringify || JSON.stringify;
      JSON.Parse = JSON.Parse || JSON.parse;
  })();

  ArkGlobalContext._setViewTemplate('main', `<View id="main" margin="0,0,0,0" size="250,350" metadatatype="mannounce">

    <Event>
        <OnSetValue value="main.OnSetMetaData" name="OnSetValue"></OnSetValue>
        <OnClick value="main.OnClick" name="OnClick"></OnClick>
        <OnTouchStart value="touch.OnTouchStart" name="OnTouchStart"></OnTouchStart>
        <OnTouchEnd value="touch.OnTouchEnd" name="OnTouchEnd"></OnTouchEnd>
        <OnTouchCancel value="touch.OnTouchCancel" name="OnTouchCancel"></OnTouchCancel>
        <OnViewEvent value="touch.OnViewEvent" name="OnViewEvent"></OnViewEvent>
    </Event>
</View>
`);

  ArkGlobalContext._setViewTemplate('mannounce', `<View id="mainContent" anchors="15">
    <Layout type="ListLayout" orientation="Vertical"></Layout>
    <Texture id="bgColor" color="0xFFFFFFFF"></Texture>

    
    <View id="titleWrapper" anchors="15" size="0,45" margin="22,0,17,0">
        <Image id="signUpImage" size="18,18" anchors="1" margin="0,0,0,0" stretch="1" value="notification_1.png"></Image>
        <Text id="title" textcolor="0xFF878B99" anchors="15" margin="24,0,0,0" align="4" font="app.size16" ellipsis="true"></Text>
    </View>
    <View id="submitLin_Title" anchors="15" size="0,0.5" margin="17,0,17,5" visible="false">
        <Texture color="0xFFDEDEDE"></Texture>
    </View>
    <Text id="textContent" size="0,251" textcolor="0xFF03081A" anchors="15" margin="22,0,15,10" autosize="true" font="app.size16" multiline="true" ellipsis="true"></Text>

    <View id="imgContentParentView" size="0,150" anchors="5" margin="6,0,6,0">
        <View anchors="15" margin="18,0,18,0" radius="0,0,0,0">
            <Image id="imgContent" stretch="2" anchors="15"></Image>
        </View>
    </View>

    <View id="submitLin_Confirm" anchors="15" size="0,0.5" margin="17,0,17,0">
        <Texture color="0xFFDEDEDE"></Texture>
    </View>
    <View id="confirmWrapper_Mobile" anchors="15" size="0,53" margin="17,0,17,0">
        <Text id="confirmText_Mobile" value="" textcolor="0xFF03081A" anchors="15" margin="0,0,0,0" align="5" font="app.bold" ellipsis="true"></Text>
    </View>
    <View id="confirmWrapper_Desktop" anchors="12" size="90,28" margin="0,0,17,10" template="recommendedbutton.xml" radius="20">
        <Texture id="confirmTexture" color="0xFFFFFFFF"></Texture>
        <Text id="confirmText_Desktop" value="" textcolor="0xFF03081A" anchors="15" margin="5,0,5,0" align="5" font="pc.app.size4" ellipsis="true"></Text>
    </View>
</View>
`);

  ArkGlobalContext._setViewTemplate('mannounceforwatchqq', `<View id="mainContent" anchors="15" dimens="dimens">
    <Layout type="ListLayout" orientation="Vertical"></Layout>
    <Texture id="bgColor" color="0xFFE3E5EE"></Texture>
    
    <Text id="textContent" size="0,251" textcolor="0xFF03081A" anchors="15" margin="16,10,16,0" autosize="true" font="app.size25" multiline="true" ellipsis="true" maxline="3"></Text>
    
    <View id="confirmWrapper" anchors="15" size="0,30" margin="16,10,16,0" visible="false">         
        <Text id="confirmText" value="" textcolor="0x99000000" anchors="15" margin="0,0,0,0" font="app.size25" ellipsis="true"></Text>
    </View>
    
    
    <View id="titleWrapper" anchors="15" size="0,36" margin="0,10,0,0">
        <Texture id="bgColor" color="0x12000000"></Texture>
        <Text id="title" textcolor="0x99000000" anchors="15" margin="0,0,0,0" align="5" font="app.size25" ellipsis="true"></Text>
    </View>
</View>
`);

  ArkGlobalContext._setViewTemplate('touch', ` <View id="touch_layer_icon" anchors="15" visible="false">
    <Texture id="touchTexture" color="0x0F000000"></Texture>
</View>`);

  const code$5 = `
          TouchState={
}

function TouchState:New(view)
	local obj = {}
    setmetatable(obj, self)
    self.__index = self
    obj:Initialize(view)
	return obj
end

function TouchState:New(view, textureID, oldValue, newValue)
	local obj = {}
    setmetatable(obj, self)
    self.__index = self
    obj:Initialize(view)
    self.oldValue = oldValue;
    self.newValue = newValue;
    self.textureID = textureID;
	return obj
end

function TouchState:Initialize(view)
    self.view=view
    
    
    local templateID = "touch"
    self.touch_icon = CreateView(templateID)
    self.view:AddChild(self.touch_icon)
    
    self.touch_layer_container = self.view:GetUIObject("touch_layer_container")
    self.buttonview=view:GetUIObject("button_view")
end

function TouchState:ShowPressState(texture, oldColor, newColor, texture1, oldColor1, newColor1)
    if self.timer~= nil then
        self.timer:Stop()
        self.timer = nil
    end
    
    self.timer = Timer()
    self.timer:SetInterval(300)
    texture:SetValue(newColor)
    texture1:SetValue(newColor1)
    self.timer:AttachEvent("OnTimer", function()
        
        texture:SetValue(oldColor)
        texture1:SetValue(oldColor1)
        self.timer:Stop()
        self.timer = nil
    end)
    self.timer:Start()
end


function OnTouchStart(sender,data)
    local obj = app.GetModel(sender)
    if(obj==nil or obj.touch==nil) then return end
    
    if sender ~= sender:GetRoot() then
        return
    end
    
    if obj.touch.textureID ~= nil then
        obj.touch.texture = obj.touch.view:GetTexture(obj.touch.textureID)
    end

    if obj.touch.texture ~= nil then
        obj.touch.texture:SetValue(obj.touch.newValue)
    end
    if(obj.touch.touch_icon~=nil) then
        obj.touch.touch_icon:SetVisible(true) 
    end  
end



function OnTouchEnd(sender)
    local obj = app.GetModel(sender)
    if(obj==nil or obj.touch==nil) then return end
    
    if(obj.pressed == true) then return end 
    
    
    if (obj.timer == nil) then
        obj.timer = Timer()
        obj.timer:SetInterval(100)
     end
     obj.timer:AttachEvent("OnTimer", function()
        if obj.touch.texture ~= nil then
            obj.touch.texture:SetValue(obj.touch.oldValue)
        end
        if(obj.touch.touch_icon~=nil) then
           obj.touch.touch_icon:SetVisible(false) 
        end
        obj.timer:Stop()
        obj.timer = nil
     end)
     obj.timer:Start()
end


function OnTouchCancel(sender)
    local obj = app.GetModel(sender)
    if(obj==nil or obj.touch==nil) then return end
    
    if(obj.pressed == true) then return end 
    
    if (obj.timerTouch == nil) then
         obj.timerTouch = Timer()
         obj.timerTouch:SetInterval(100)
    end
    obj.timerTouch:AttachEvent("OnTimer", function()
    

        if obj.touch.texture ~= nil then
            obj.touch.texture:SetValue(obj.touch.oldValue)
        end
            if(obj.touch.touch_icon~=nil) then
            obj.touch.touch_icon:SetVisible(false) 
        end
            obj.timerTouch:Stop()
            obj.timerTouch = nil
    end)
    obj.timerTouch:Start()
end


function setPressed(sender,pressed)
    local obj = app.GetModel(sender)
    if(obj==nil or obj.touch==nil) then return end
    
    if sender ~= sender:GetRoot() then
        return
    end
   
    if obj.touch.textureID ~= nil then
        obj.touch.texture = obj.touch.view:GetTexture(obj.touch.textureID)
    end

    if pressed == true then
        if obj.touch.texture ~= nil then
            obj.touch.texture:SetValue(obj.touch.newValue)
        end
        if(obj.touch.touch_icon~=nil) then
            obj.touch.touch_icon:SetVisible(true) 
        end
    else
        if obj.touch.texture ~= nil then
            obj.touch.texture:SetValue(obj.touch.oldValue)
        end
        if(obj.touch.touch_icon~=nil) then
           obj.touch.touch_icon:SetVisible(false) 
        end
    end
end


function OnViewEvent(sender, eventName, data)
    local obj = app.GetModel(sender)
     app.log("OnViewEvent : eventName".. tostring(eventName))
    if(obj==nil or obj.touch==nil) then return end
    
    if eventName == "ViewPressed" and data["pressed"] ~= nil then
        if data["pressed"] == true then
            obj.pressed = true
            setPressed(sender, true)
        else
            obj.pressed = false
            setPressed(sender, false)
        end
    end
end
          _G['touch'] = {
            TouchState = TouchState,OnTouchStart = OnTouchStart,OnTouchEnd = OnTouchEnd,OnTouchCancel = OnTouchCancel,setPressed = setPressed,OnViewEvent = OnViewEvent
          }
        `;

  const code$4 = `
          
function Number(origin)
    if origin == nil then
        return 0
    end
    local t = type(origin)
    if t == "number" then
        return math.ceil(origin)
    elseif t == "string" then
        local n = tonumber(origin)
        if n then
            return Math.ceil(n)
        else
            return 0
        end
    else
        return 0
    end
end

 function IsNil(var) return type(var)=="nil" end
 function IsNumber(var) return type(var)=="number" end
 function IsString(var) return type(var)=="string" end
 function IsTable(var) return type(var)=="table" end
 function IsFunction(var) return type(var)=="function" end
 function IsUserdata(var) return type(var)=="userdata" end
 function IsNaN(var) return _Utility.IsNumber(var) and tostring(var)==tostring(0/0) end

function IsUIObject(object)
    if IsUserdata(object) and IsFunction(object.GetType) then
        local type = object:GetType()
        return (type=="UIObject"  or type=="View" or type=="Image" or type=="Text" or type=="Canvas")
    end
    return false
end
function IsView(object)
    return (IsUserdata(object) and IsFunction(object.GetType) and object:GetType()=="View")
end
function IsImage(object)
    return (IsUserdata(object) and IsFunction(object.GetType) and object:GetType()=="Image")
end
function IsText(object)
    return (IsUserdata(object) and IsFunction(object.GetType) and object:GetType()=="Text")
end
function IsCanvas(object)
    return (IsUserdata(object) and IsFunction(object.GetType) and object:GetType()=="Canvas")
end

ToBoolean = function(var) return (not not var) end

ApiQQOpenView = QQ and QQ.OpenView or (function() end)

ApiQQPreviewImage = QQ and QQ.PreviewImage

function GetSkey()
	if QQ == nil or QQ.GetSkey == nil then
		return ""
	end
	local skey = QQ.GetSkey()
    return tostring(skey or "")
end

function GetPskey(url)
	if QQ == nil or QQ.GetPskey == nil then
	    QQ.Log("mannounce | get psk is nil!!")
		return ""
	end
	if string.find(url, "qun.qq.com") then
	    local pskey = QQ.GetPskey("qun.qq.com")
        return tostring(pskey or "")
	end
	return ""
end


function GetUIN()
	if QQ == nil or QQ.GetUIN == nil then
		return ""
	end
    local uin = QQ.GetUIN()
    return tostring(uin or "")
end

local function createHttpRequest()
    if Net ~= nil and Net.HttpRequest ~= nil then
        return Net.HttpRequest()
    end
    return Http.CreateHttpRequest()
end

local function getCookie(uin, sKey, psKey)
    if psKey ~= nil and psKey ~= '' then
	    return string.format("uin=%s;skey=%s;p_uin=%s;p_skey=%s", uin, sKey, uin, psKey)
	end
	QQ.Log("mannounce | format without psk")
    return string.format("uin=%s;skey=%s", uin, sKey)
end

function getGtk(sKey)
    sKey = sKey or ""
    local hash = 5381
    for _, code in utf8.codes(sKey) do
        local c = tonumber(code)
        hash = hash + (hash << 5) + c
    end

    return string.format("%d", hash & 0x7FFFFFFF)
end

function asyncPost(url, body, callback)
    local cookie = getCookie(GetUIN(), GetSkey(), GetPskey(url))
    local httpReturned = false
    local httpTask = createHttpRequest()
    local startTime = os.time()
    Console.Log("cookie")
    Console.Log(GetUIN())
    Console.Log(GetSkey())
    Console.Log(getGtk(GetSkey()))
    httpTask:SetCookie(cookie)
    
    httpTask:AttachEvent("OnComplete", function(http)
        httpReturned = true
        local statusCode = httpTask:GetStatusCode()
        local endTime = os.time()
        local totalTime = endTime - startTime
        Console.Log("mannounce | url ="..url.." ,httpTask : asyncPost, status_code = "..statusCode.." ,total = "..totalTime.."s")
        if not http:IsSuccess() then
            Console.Log("mannounce | getData.fail..url = "..url)
            callback(url, nil)
            return
        end
        
        local data = httpTask:GetData("text/x-json")
        
        callback(url, data)
    end)
    Console.Log("getData.url: "..url)
    Console.Table(body)
    if body ~= nil then
        body["bkn"] = getGtk(GetSkey())
    end
    local _body = ""
    for key, value in pairs(body) do
        _body = _body.."&"..key.."="..value
    end
    _body = string.sub(_body, 2, string.len(_body))
    httpTask:SetHeader("Content-Type", "application/x-www-form-urlencoded")
    httpTask:Post(url, _body)

    local timer = Timer()
    timer:SetInterval(10000)
    timer:AttachEvent("OnTimer", function()
        timer:Stop()
        if httpReturned then
            return
        end
        httpTask:Abort()
        Console.Log("mannounce | getData.timeout,url = "..url)
        callback(url, nil)
    end)
    timer:Start()
end


function asyncGet(url,callback)
    local cookie = getCookie(GetUIN(), GetSkey(), GetPskey(url))
    local httpReturned = false
    local httpTask = createHttpRequest()
    local startTime = os.time()
    Console.Log("cookie")
    Console.Log(GetUIN())
    Console.Log(GetSkey())
    Console.Log(getGtk(GetSkey()))
    httpTask:SetCookie(cookie)
    httpTask:AttachEvent("OnComplete", function(http)
        local statusCode = httpTask:GetStatusCode()
        local endTime = os.time()
        local totalTime = endTime - startTime
        Console.Log("mannounce | url ="..url..",httpTask = asyncGet, status_code = "..statusCode.." ,total = "..totalTime.."s")
        httpReturned = true
        if not http:IsSuccess() then
            Console.Log("mannounce | getData.fail")
            callback(url, nil)
            return
        end

        local data = httpTask:GetData("text/x-json")
        
        callback(url, data)
    end)
    Console.Log("mannounce | getData.url: "..url)

    httpTask:SetHeader("Content-Type", "application/x-www-form-urlencoded")
    httpTask:Get(url)

    local timer = Timer()
    timer:SetInterval(10000)
    timer:AttachEvent("OnTimer", function()
        timer:Stop()
        if httpReturned then
            return
        end
        httpTask:Abort()
        Console.Log("mannounce | getData.timeout,url = "..url)
        callback(url, nil)
    end)
    timer:Start()
end


function decodeText(str)
    str = string.gsub( str, '&nbsp;', ' ')
    str = string.gsub( str, '&lt;', '<' )
    str = string.gsub( str, '&gt;', '>' )
    str = string.gsub( str, '&quot;', '"' )
    str = string.gsub( str, '&apos;', "'" )
    str = string.gsub( str, '&#(%d+);', function(n) return string.char(n) end )
    str = string.gsub( str, '&#x(%d+);', function(n) return string.char(tonumber(n,16)) end )
    str = string.gsub( str, '&amp;', '&' ) 
    return str
end

function decodeBase64(str64)
    if str64 == nil then
        return str64
    end
    local b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'  
    local temp={}  
    for i=1,64 do  
        temp[string.sub(b64chars,i,i)] = i  
    end  
    temp['=']=0  
    local str=""  
    for i=1,#str64,4 do  
        if i>#str64 then  
            break  
        end  
        local data = 0  
        local str_count=0  
        for j=0,3 do  
            local str1=string.sub(str64,i+j,i+j)  
            if not temp[str1] then  
                return  
            end  
            if temp[str1] < 1 then  
                data = data * 64  
            else  
                data = data * 64 + temp[str1]-1  
                str_count = str_count + 1  
            end  
        end  
        for j=16,0,-8 do  
            if str_count > 0 then  
                str=str..string.char(math.floor(data/(2^j)))  
                data=data%(2^j)
                str_count = str_count - 1  
            end  
        end  
    end  
  
    local last = tonumber(string.byte(str, string.len(str), string.len(str)))  
    if last == 0 then  
        str = string.sub(str, 1, string.len(str) - 1)  
    end  
    return str  
end  

-- %E6%8C%89%E6%9F%90%E4%B8%AA%E5%AD%97%E7%AC%A6%E6%8B%86%E5%88%86%E5%AD%97%E7%AC%A6%E4%B8%B2
function split( str,reps )
    local resultStrList = {}
    string.gsub(str,'[^'..reps..']+',function ( w )
    if type(w) == "string" then
      w = tonumber(w)
      table.insert(resultStrList,w)
    end
        
    end)
    return resultStrList
end
          _G['util'] = {
            Number = Number,IsNil = IsNil,IsNumber = IsNumber,IsString = IsString,IsTable = IsTable,IsFunction = IsFunction,IsUserdata = IsUserdata,IsNaN = IsNaN,IsUIObject = IsUIObject,IsView = IsView,IsImage = IsImage,IsText = IsText,IsCanvas = IsCanvas,ToBoolean = ToBoolean,ApiQQOpenView = ApiQQOpenView,ApiQQPreviewImage = ApiQQPreviewImage,GetSkey = GetSkey,GetPskey = GetPskey,GetUIN = GetUIN,createHttpRequest = createHttpRequest,getCookie = getCookie,getGtk = getGtk,asyncPost = asyncPost,asyncGet = asyncGet,decodeText = decodeText,decodeBase64 = decodeBase64,split = split
          }
        `;

  const code$3 = `
          viewModels = {}
local themeConfig = nil

function GetModel(view)
	return viewModels[view:GetRoot()]
end

function OnCreateView(view, template)
    Console.Log("create")
    Console.Log("[ArkBuilder]create view"..tostring(view))
    if template == "main" then
        viewModels[view] = main.ViewModel:New(view)
        if themeConfig ~= nil and  viewModels[view].OnStartup ~= nil then
            viewModels[view]:OnStartup(themeConfig)
        elseif themeConfig ~= nil and  viewModels[view].mannounce ~= nil and  viewModels[view].mannounce.OnStartup ~= nil then
          viewModels[view].mannounce:OnStartup(themeConfig)
        end
    end
end

function OnDestroyView(view)
    local rootView = view:GetRoot()
    if type(viewModels[rootView].Deinitialize)=="function" then
        viewModels[rootView]:Deinitialize()
    elseif viewModels[rootView].mannounce ~= nil and type(viewModels[rootView].mannounce.Deinitialize)=="function" then
      viewModels[rootView].mannounce:Deinitialize()
    end
    viewModels[rootView] = nil
end

function OnExit()
end

function OnActivate()
    Console.Log("active")
end

function OnStartup(config)
    Console.Log("OnStartup appconfig="..Net.TableToJSON(config))
    for key, model in pairs(viewModels) do
        if model ~= nil and model.OnStartup ~= nil then
            model:OnStartup(config)
        elseif model ~= nil and model.mannounce ~= nil and model.mannounce.OnStartup ~= nil then
            model.mannounce:OnStartup(config)
        end
    end
    themeConfig = config
end

function OnConfigChange(config)
    Console.Log("OnConfigChange appconfig="..Net.TableToJSON(config))
    for key, model in pairs(viewModels) do
        if model ~= nil and model.OnConfigChange ~= nil then
          model:OnConfigChange(config)
        elseif model ~= nil and model.mannounce ~= nil and model.mannounce.OnConfigChange ~= nil then
          model.mannounce:OnConfigChange(config)
        end
    end
    themeConfig = config
end

          _G['app'] = {
            viewModels = viewModels,themeConfig = themeConfig,GetModel = GetModel,OnCreateView = OnCreateView,OnDestroyView = OnDestroyView,OnExit = OnExit,OnActivate = OnActivate,OnStartup = OnStartup,OnConfigChange = OnConfigChange
          }
        `;

  const code$2 = `
          ViewModel = {
    New = function(self, view)
        local model = {}
        setmetatable(model, self)
        self.__index = self
        model:Initialize(view)
        return model
    end,

    Initialize = function(self, view)
        self.view = view

        local template = "mannounce.xml"
        local mainView = CreateView(template)
        self.view:AddChild(mainView)

        self.mainView = view:GetUIObject("mainContent")
        self.titleView = view:GetUIObject("title")
        self.titleWrapper = view:GetUIObject("titleWrapper")
        self.textContentView = view:GetUIObject("textContent")
        self.imgContentView = view:GetUIObject("imgContent")
        self.imgContentParentView = view:GetUIObject("imgContentParentView")
        self.submitLin_Confirm = view:GetUIObject("submitLin_Confirm")
        self.confirmWrapper = view:GetUIObject("confirmWrapper_Mobile")
        self.confirmText = view:GetUIObject("confirmText_Mobile")
        self.OS = System.GetOS()

        self.bHighVersion = false
        self.version = ""

        if QQ and QQ.GetVersion then
            self.version = QQ.GetVersion()
        end

        QQ.Log("version = "..self.version)

        self.platform = 1 --%E5%AE%A2%E6%88%B7%E7%AB%AF%E7%B1%BB%E5%9E%8B 1=%E5%AE%89%E5%8D%93 2=IOS 3=PC
        if self.OS == "iOS" then
            self.platform = 2
        elseif self.OS == "Windows" then
            self.platform = 3
        end

        
        if (self.OS == "Android" or self.OS == "iOS")and self.version ~= "" then
           local list = util.split(self.version, ".")
            if list[1] > 8 or (list[1] == 8 and list[2] > 2) or (list[1] == 8 and list[2] == 2 and list[3] > 7) then
                Console.Log("ark-1:"..self.version)
                self.bHighVersion = true
            else
             Console.Log("ark-2:"..self.version)
                self.bHighVersion = false
            end
        else
            QQ.Log("ark-3:"..self.version)
            -- pc%E5%85%BC%E5%AE%B9, 9.3.5 %E5%90%8E%E5%BA%94%E4%BD%BF%E7%94%A8PC%E9%80%82%E9%85%8D%E7%89%88
            if self.version ~= "" then
                local list = util.split(self.version, ".")
                if list[1] > 9 or (list[1] == 9 and list[2] > 3) or (list[1] == 9 and list[2] == 3 and list[3] > 4) then
                    self.bHighVersion = true
                    QQ.Log("Windows HighVersion=true")
                else
                    self.bHighVersion = false
                    QQ.Log("Windows HighVersion=false")
                end
            else
                self.bHighVersion = false
            end
        end

        if self.OS == "Windows" and self.bHighVersion == true then
            self.titleView:SetFont("pc.app.size16")
            self.textContentView:SetFont("pc.app.size15")
            self.confirmWrapper = view:GetUIObject("confirmWrapper_Desktop")
            self.confirmText = view:GetUIObject("confirmText_Desktop")
        end

        self.imgUrlData = {}
        self.imgPrefix = "http://gdynamic.qpic.cn/gdynamic/"
        self.imgSuffix = "/628"
        
        self.textMaxHeight = 210
        self.contentMaxHeight = 300

        
        self.totalMaxHeight = 390

        
            
            
        
            
            
        

        self.fid = -1
        self.gc = -1
        self.maxCgiCacheTime = 1 * 60
        self.maxReadCgiCacheTime = 2
    end,
    
    SetContent = function(self, data)
        
        self.fid = data["fid"]
        self.gc = data["gc"]
        
        self.needConfirm = data["cr"]
        self.senderUin = tostring(data["uin"])
        self.isSender = false
        self.needSetConfirm = false

        if self.needConfirm == 1 then
            
            if self.OS == "Windows" or self.bHighVersion == true then
                self.needShowConfirm = true
            else
                
                self.needShowConfirm = false
            end
        else
            
            if self.OS == "Windows" and self.bHighVersion == false then
                self.needShowConfirm = true
            else
                self.needShowConfirm = false
            end
        end

        self:_SetTitle(data["title"], data["encode"])

        local imgHeight = self:_SetTextImageContent(data["text"], data["encode"], data["pic"])
        Console.Log("imgHeight" .. imgHeight)

        self:_SetRootSize(data, imgHeight)

        

        local storagekey = "mannounce"..self.gc.."-"..self.fid
        local loadStorageData = Storage.Load(storagekey)
        if loadStorageData ~= nil then
            self.loadData = loadStorageData
            self:loadContent()
        end

        local uin = util.GetUIN()   
        local uinNumber = tonumber(uin)
        if self.senderUin == uin then
            self.isSender = true
        else
            self.isSender = false
        end
        QQ.Log("ark-loginUin"..uin)
        QQ.Log("ark-senderUin"..(self.senderUin))

        Console.Log('qqq OS bHighVersion', self.OS, self.bHighVersion)
        
        if self.OS == "Windows" and self.bHighVersion == false then
            if self.isSender == false and self.needConfirm == 1 then
                QQ.Log("ark-showConfirm 8")
                self:_ShowConfirm(8, 0)
            else
                QQ.Log("ark-showConfirm 9")
                self:_ShowConfirm(9, 0)
            end
        end

        
        if self.needShowConfirm and self.bHighVersion then
            if self.isSender then
                self:SetBottomButton()
            else
                if self.loadData ~= nil then
                    if os.time()- self.loadData.last_time > self.maxCgiCacheTime then
                        self:SetBottomButton()
                    else
                        if self.needSetConfirm and os.time()- self.loadData.last_time > self.maxReadCgiCacheTime then
                            self:SetBottomButton()
                        end
                    end
                else
                    self:SetBottomButton()
                end
            end
            Console.Log("announce | Listen UpdateAnnounce")
            Notification.Listen("UpdateAnnounce",function(event,data)
                Console.Log("mannounce | %E9%80%9A%E7%9F%A5 refresh  :"..event)
                Console.Table(data)

                local refreshFid = data["fid"]
                local refreshGC = data["gc"]
                local refreshAction = data["action"]
                if refreshFid == self.fid and refreshGC == self.gc then
                    QQ.Log("ark %E6%94%B6%E5%88%B0 nativeFresh fid%E5%92%8Cgc%E7%9B%B8%E5%90%8C")
                    self:_refreshNetContent (refreshAction)
                end
            end)
        else
            
            if self.OS == "Windows" and self.bHighVersion == true then
                QQ.Log("ark %E4%BB%85Content %E8%B0%83%E6%95%B4 margin")
                self.textContentView:SetMargin(22,0,15,14)
                local w, h = self.textContentView:GetSize()
                self.textContentView:SetSize(w, h + 14)
                local l, t, r, b = self.textContentView:GetMargin()
                
                self:_SetRootSize(data, imgHeight)
            end
        end

        self.mainView:AttachEvent("OnClick", function(id)
            self:HandleClick()
        end)
    end,

    _LogViewSize = function(self)
        local x, y, w, h = self.titleWrapper:GetRect()
        Console.Log("titleWrapper, rect=" .. x .. "," .. y .. "," .. w .. "," .. h)

        x, y, w, h = self.textContentView:GetRect()
        Console.Log("textContentView, size=" .. x .. "," .. y .. "," .. w .. "," .. h)
    end,

    SetBottomButton = function(self)
        local cgiUrl = "https://qun.qq.com/cgi-bin/qunapp/announce_readnum"
        local body = {}
        body["gc"] = util.tonumber(self.gc)
        body["feed_id"] = self.fid 
        body["ver"] = self.version
        body["platform"] = self.platform
        util.asyncPost(cgiUrl,body,function(url,value)
            Console.Log("mannounce | cgi return data")
            Console.Log(value)
           local nType = 1       
           local nAlreadyConfirmNum = 0  
           local uin = util.GetUIN()   
           local uinNumber = util.tonumber(uin)

           if value["retcode"]== 0 then
                if value['data']['read_num'] ~= nil then
                    nAlreadyConfirmNum = value['data']['read_num']
                else
                    QQ.Log("mannounce |read_num %E4%B8%BA%E7%A9%BA")
                    return
                end

                if value['data']['is_read'] ~= nil then
                    if value['data']["is_read"] == 0 then
                        nType = 1
                        self.needSetConfirm = true
                    else
                        nType = 2
                    end
                else
                    QQ.Log("mannounce | is_read %E4%B8%BA%E7%A9%BA")
                    return
                end

                
                if value['data']['feed_type'] == 23 then
                    local create_time =  value['data']['create_time']
                    local join_time =  value['data']['join_time']
                        if join_time > create_time then
                          
                          QQ.Log("mannounce | %E4%B8%8D%E9%9C%80%E8%A6%81%E7%A1%AE%E8%AE%A4 ")
                          nType = 7
                        end
                end

                if self.senderUin == uin then
                    nType = 3
                    QQ.Log("mannounce | the user is seeder!")
                    if value['data']['is_all_confirm'] ~= nil then
                        if value['data']["is_all_confirm"] == 1 then
                            nType = 4
                        elseif nAlreadyConfirmNum == 0 then
                            nType = 5
                        end
                    end
                end
                self:_ShowConfirm(nType,nAlreadyConfirmNum)
            end

            if value["retcode"] == 21000 then
                QQ.Log("mannounce | retcode == 21000")
                self:_ShowConfirm(6,0)
            end

            local storagekey = "mannounce"..self.gc.."-"..self.fid
            value.last_time = os.time()
            Storage.Save(storagekey, value)

        end)
    end,

    loadContent = function(self)
        local value = self.loadData
        Console.Log("mannounce | %E8%A7%A3%E6%9E%90%E7%BC%93%E5%AD%98")
        Console.Table(value)
        local nType = 1       
        local nAlreadyConfirmNum = 0  
        local uin = util.GetUIN()   
        local uinNumber = util.tonumber(uin)

        if value["retcode"]== 0 then
            if value['data']['read_num'] ~= nil then
                nAlreadyConfirmNum = value['data']['read_num']
            else
                QQ.Log("mannounce |read_num %E4%B8%BA%E7%A9%BA")
                return
            end

            if value['data']['is_read'] ~= nil then
                if value['data']["is_read"] == 0 then
                    nType = 1
                    self.needSetConfirm = true
                else
                    nType = 2
                    self.hasConfirm = true
                end
            else
                QQ.Log("mannounce | is_read %E4%B8%BA%E7%A9%BA")
                return
            end

            
            if value['data']['feed_type'] == 23 then
                local create_time =  value['data']['create_time']
                local join_time =  value['data']['join_time']
                    if join_time > create_time then
                      
                      QQ.Log("mannounce | %E4%B8%8D%E9%9C%80%E8%A6%81%E7%A1%AE%E8%AE%A4 ")
                      nType = 7
                    end
            end

            if self.senderUin == uin then
                nType = 3
                QQ.Log("mannounce | the user is seeder!")
                if value['data']['is_all_confirm'] ~= nil then
                    if value['data']["is_all_confirm"] == 1 then
                        nType = 4
                    elseif  nAlreadyConfirmNum == 0 then
                        nType = 5
                    end
                end
            end
            self:_ShowConfirm(nType,nAlreadyConfirmNum)
        elseif value["retcode"] == 21000 then
            QQ.Log("mannounce | retcode == 21000")
            self:_ShowConfirm(6,0)
        elseif value["retcode"] == 20114 then
            QQ.Log("mannounce | retcode == 20114")
            self:_ShowConfirm(7,0)
        end
     end,

    _refreshNetContent = function(self,action)
            
            local actionCache ={}
            if action ~= nil then
                local actionNum = util.tonumber(action)
                if 1 == actionNum then
                     self:_ShowConfirm (6,0)
                    actionCache["retcode"] = 21000
                elseif 2 == actionNum then
                   self:_ShowConfirm (2,0)
                   actionCache["retcode"] = 0
                   data = {["is_read"]= 1,["read_num"] = 0,["confirm_required"]=1,["is_all_confirm"]=0,}
                  actionCache["data"] = data
               end
            else
                 self:_ShowConfirm (4,0)
                 actionCache["retcode"] = 0
                 data = {["is_read"]= 1,["read_num"] = 0,["confirm_required"]=0,["is_all_confirm"]=1,}
                 actionCache["data"] = data
            end

            local storagekey = "mannounce"..self.gc.."-"..self.fid
            actionCache.last_time = os.time()
            Storage.Save(storagekey, actionCache)
     end,

    _ShowConfirm = function(self, nType,nAlreadyConfirmNum)
         QQ.Log("mannounce | ShowConfirm nType  = "..nType..",ConfirmNum = "..nAlreadyConfirmNum)
         local mobile_wrapper = self.view:GetUIObject("confirmWrapper_Mobile")
         local desktop_wrapper = self.view:GetUIObject("confirmWrapper_Desktop")
         if self.OS == "Windows" and self.bHighVersion == true then
            self.submitLin_Confirm:SetVisible(false)
            mobile_wrapper:SetVisible(false)
            desktop_wrapper:SetVisible(true)
            
            local texture = self.confirmWrapper:GetTexture("confirmTexture")
            if texture ~= nil then
                texture:SetValue(0xFFFFFFFF)
            end
         else
             mobile_wrapper:SetVisible(true)
             desktop_wrapper:SetVisible(false);
         end
        if 1 == nType then
            local confirmText = "%E7%A1%AE%E8%AE%A4%E6%94%B6%E5%88%B0"
            self.confirmText:SetFont("app.bold")
            self.confirmText:SetValue(confirmText)
            self.confirmText:SetVisible(true)
            if self.OS == "Windows" and self.bHighVersion == true then
	        self.confirmText:SetFont("app.size14")
                local texture = self.confirmWrapper:GetTexture("confirmTexture")
                if texture ~= nil then
                  Console.Log("texture not nil")
                  texture:SetValue(0xFF00CAFC)
                end
                self.confirmText:SetTextColor(0xFFFFFFFF)
            end
            self.confirmWrapper:AttachEvent("OnClick",function(id)
            self:HandleConfirmClick()
            end)
        elseif 2 == nType then
            local confirmText = "%E4%BD%A0%E5%B7%B2%E7%A1%AE%E8%AE%A4"
            self.confirmText:SetFont("app.bold")
            self.confirmText:SetValue(confirmText)
            self.confirmText:SetTextColor("0xFFBBBBBB")
            self.confirmText:SetVisible(true)
            if self.OS == "Windows" and self.bHighVersion == true then
                local texture = self.confirmWrapper:GetTexture("confirmTexture")
                if texture ~= nil then
                  texture:SetValue(0xFFEDEFF5)
                end
                self.confirmText:SetTextColor(0x4C03081A)
            end
        elseif 3 == nType then
            self.confirmText:SetFont("app.size16")
            local confirmContentText = tostring(nAlreadyConfirmNum).."%E4%BA%BA%E5%B7%B2%E7%A1%AE%E8%AE%A4"
            self.confirmText:SetValue(confirmContentText)
            self.confirmText:SetVisible(true)
            if self.OS == "Windows" and self.bHighVersion == true then
                self.confirmText:SetTextColor(0xFF03081A)
            end
        elseif 4 == nType then
            self.confirmText:SetFont("app.size16")
            local confirmContentText = "%E5%85%A8%E9%83%A8%E5%B7%B2%E7%A1%AE%E8%AE%A4"
            self.confirmText:SetValue(confirmContentText)
            self.confirmText:SetVisible(true)
        elseif 5 == nType then
            self.confirmText:SetFont("app.size16")
            local confirmContentText = "%E6%9A%82%E6%97%A0%E4%BA%BA%E7%A1%AE%E8%AE%A4"
            self.confirmText:SetValue(confirmContentText)
            self.confirmText:SetVisible(true)
        elseif 6 == nType then
            self.confirmText:SetFont("app.size16")
            local confirmContentText = "%E5%85%AC%E5%91%8A%E5%B7%B2%E5%88%A0%E9%99%A4"
            self.confirmText:SetValue(confirmContentText)
            self.confirmText:SetTextColor("0xFFBBBBBB")
            self.confirmText:SetVisible(true)
        elseif 7 == nType then
            local confirmText = "%E6%97%A0%E9%9C%80%E7%A1%AE%E8%AE%A4"
            self.confirmText:SetFont("app.bold")
            self.confirmText:SetValue(confirmText)
            self.confirmText:SetTextColor("0xFFBBBBBB")
            self.confirmText:SetVisible(true)
        elseif 8 == nType then
            local confirmText = "%E5%89%8D%E5%BE%80%E7%A1%AE%E8%AE%A4"
            self.confirmText:SetFont("app.bold")
            self.confirmText:SetValue(confirmText)
            self.confirmText:SetVisible(true)
            if self.OS == "Windows" and self.bHighVersion == true then
              local texture = self.confirmWrapper:GetTexture("confirmTexture")
              if texture ~= nil then
                Console.Log("texture not nil")
                texture:SetValue(0xFF00A0E6)
              end
              self.confirmText:SetTextColor(0xFFFFFFFF)
            end
            self.confirmWrapper:AttachEvent("OnClick",function(id)
            self:HandleClick()
            end)
        elseif 9 == nType then
            local confirmText = "%E6%9F%A5%E7%9C%8B%E8%AF%A6%E6%83%85"
            self.confirmText:SetFont("app.bold")
            self.confirmText:SetValue(confirmText)
            self.confirmText:SetVisible(true)
            self.confirmWrapper:AttachEvent("OnClick",function(id)
            self:HandleClick()
            end)
        end
        self.confirmWrapper:SetVisible(true)

    end,

    HandleConfirmClick = function(self, id)
        
        if self.needSetConfirm then
            
            self.needSetConfirm = false
            if QQ and QQ.ReportEx then
                if self.OS == "Windows" and self.bHighVersion == true then
                    QQ.ReportEx("898",
                      {
                        type = "0X800AF2A",
                        name = "0X800AF2A",
                        r1 = util.tonumber(self.gc)
                      }
                    )
                else
                    QQ.ReportEx("898",
                    {
                    type = "0X800AACF",
                    name = "0X800AACF",
                    r1 = util.tonumber(self.gc)
                    
                    })
                end
            end
            local bkn = util.getGtk(util.GetSkey())
            local gcNumber = util.tonumber(self.gc)
            local cgiUrl = "https://qun.qq.com/cgi-bin/qunapp/announce_setread?bkn="..bkn.."&gc="..gcNumber.."&feed_id="..self.fid.."&source=ark&ver="..self.version.."&platform="..self.platform
                Console.Log("mannounce | HandleConfirmClick url is "..cgiUrl)
                util.asyncGet(cgiUrl,function(url,data)
                Console.Log("mannounce | HandleConfirmClick cgi return data")
                Console.Table(data)
                 
                local clickCache = {}
                if data['retcode'] == 0 then
                    self:_ShowConfirm(2,0)
                    clickCache["retcode"] = 0
                    data = {["is_read"]= 1,["read_num"] = 0,["confirm_required"]=1,["is_all_confirm"]=0,}
                    clickCache["data"] = data
                elseif data['retcode'] == 20114 then
                    self:_ShowConfirm(7,0)
                    clickCache["retcode"] = 20114
                    data = {["is_read"]= 0,["read_num"] = 0,["confirm_required"]=0,["is_all_confirm"]=0,}
                    clickCache["data"] = data
                end

                local storagekey = "mannounce"..self.gc.."-"..self.fid
               clickCache.last_time = os.time()
               Storage.Save(storagekey, clickCache)
             end)
        end
    end,
    
    _SetTitle = function(self, text, encode)
        if encode ~= nil then
            text = util.decodeBase64(text)
        end
        self.titleView:SetValue(util.decodeText(text))
        if self.OS == "Windows" and self.bHighVersion == true then
            local titleSeperator = self.view:GetUIObject("submitLin_Title")
            if titleSeperator ~= nil then
                titleSeperator:SetVisible(true)
            end
        end
    end,
    
    _SetTextImageContent = function(self, text, encode, picInfo)
        if encode ~= nil then
            text = util.decodeBase64(text)
        end
        self.textContentView:SetValue(util.decodeText(text))
        if (self.textContentView.SetLineHeight) then
          self.textContentView:SetLineHeight(21);
        else
          Console.Log('SetLineHeight is: nil');
        end
        if (self.textContentView.SetMaxline) then
          self.textContentView:SetMaxline(13);
        else
          Console.Log('SetMaxline is: nil');
        end
        
        local w,h = self.textContentView:GetSize()
        self.textContentView:SetSize(w, self.contentMaxHeight)
        local textContentWidth, textContentHeight = self.textContentView:MeasureTextSize()
        

        if picInfo ~= nil  and #picInfo > 0 then
            self.imgUrlData = picInfo
            local firstImg = picInfo[1]
            local imgWidth = firstImg["width"]
            local imgHeight = firstImg["height"]
            local width, _ = self.imgContentView:GetSize()
            self.imgContentView:SetValue(self.imgPrefix..firstImg["url"]..self.imgSuffix)
            self.imgContentView:AttachEvent("OnClick", function()
                self: HandleClick()
            end)

            if imgWidth == 0 then
                imgWidth = 0.01
            end

            if imgHeight == 0 then
                imgHeight = 0.01
            end

            local androidMaxImgHeight = 150
            local realMaxImgHeight = util.Number((imgHeight * width)/imgWidth)
            if realMaxImgHeight > androidMaxImgHeight then
                realMaxImgHeight = androidMaxImgHeight
            end

            if textContentHeight + realMaxImgHeight < self.contentMaxHeight then
                self.textContentView:SetSize(textContentWidth, textContentHeight)
                self.imgContentView:SetSize(util.Number((realMaxImgHeight * imgWidth)/imgHeight), realMaxImgHeight)
                return realMaxImgHeight
            else
                local  leftImgHeight = 0
                if textContentHeight > self.textMaxHeight then
                    self.textContentView:SetSize(textContentWidth, self.textMaxHeight)
                    leftImgHeight = self.contentMaxHeight - self.textMaxHeight
                else
                    self.textContentView:SetSize(textContentWidth, textContentHeight)
                    leftImgHeight = self.contentMaxHeight - textContentHeight
                end

                if leftImgHeight > androidMaxImgHeight then
                    leftImgHeight = androidMaxImgHeight
                end

                if util.Number(width/leftImgHeight) > util.Number(imgWidth/imgHeight) then
                    local realWidth = util.Number((leftImgHeight * imgWidth)/imgHeight)
                    self.imgContentView:SetSize(realWidth, leftImgHeight)
                    return leftImgHeight
                else
                    local realHeight = util.Number((width * imgHeight)/imgWidth)
                    if realHeight > androidMaxImgHeight then
                        realHeight = androidMaxImgHeight
                    end
                    self.imgContentView:SetSize(util.Number((realHeight * imgWidth)/imgHeight), realHeight)
                    return realHeight
                end
            end
        else 
            self.imgContentView:SetSize(0,0)
            self.imgContentParentView:SetMargin(6,0,6,0)
            if textContentHeight > self.contentMaxHeight then
                self.textContentView:SetSize(textContentWidth, self.contentMaxHeight)
            else
                self.textContentView:SetSize(textContentWidth, textContentHeight)
            end
            return 0
        end

    end,
    
    PreviewImage = function(self)
        local array = {}
        for i=1,#self.imgUrlData do
            Console.Log(self.imgPrefix..self.imgUrlData[i]["url"])
            array[i-1] = self.imgPrefix..self.imgUrlData[i]["url"]..self.imgSuffix
        end
        Console.Table(array)
        if QQ and QQ.PreviewImage then
            QQ.PreviewImage(array, 0)
        end
    end,
    
    
    _SetRootSize = function(self, data, imgHeight)
        
        local imageWidth,imageHeight = self.imgContentView:GetSize()
        self.imgContentParentView:SetSize(imageWidth, imageHeight)
        
        self.imgContentView:SetSize(imageWidth, imageHeight)
        local textContentWidth, textContentHeight = self.textContentView:GetSize()
        local titleWidth, titleHeight = self.titleView:GetSize()
        local totalHeight = 45 + util.Number(textContentHeight) + 10

        if imgHeight > 0 then
            
            self.imgContentParentView:SetMargin(6,0,6,10)
            totalHeight = totalHeight + imgHeight + 10
        end

        if self.needShowConfirm == true then
            totalHeight = totalHeight + 53
        else
            self.submitLin_Confirm:SetVisible(false)
            self.confirmWrapper:SetVisible(false)
        end

        
        if  totalHeight > self.totalMaxHeight then
            textContentHeight = textContentHeight - (totalHeight - self.totalMaxHeight)
            totalHeight = self.totalMaxHeight
            self.textContentView:SetSize(textContentWidth, textContentHeight)
        end

        local w, h = self.view:GetSize()
        self.view:SetSize(w, totalHeight)
        Console.Log("title size, " .. titleWidth .. "," .. titleHeight)
        Console.Log("text size, " .. textContentWidth .. "," .. textContentHeight)
        Console.Log("total width, height=" .. w .. "," .. totalHeight)
    end,
    
    HandleClick = function(self, id)
        if QQ and QQ.ReportEx then
            if self.OS == "Windows" and self.bHighVersion == true then
                QQ.ReportEx("898",
                    {
                        type = "0X800AF29",
                        name = "0X800AF29",
                        r1 = util.tonumber(self.gc)
                    }
                )
            else
                QQ.ReportEx("898",
                {
                    type = "0X800AACE",
                    name = "0X800AACE",
                    r1 = util.tonumber(self.gc)
                    
                })
            end
        end
        if QQ and QQ.OpenUrl then
            if System.GetOS() == "Windows" then
                   QQ.OpenUrl("qq://qun/OpenNounce?fid="..self.fid.."&gc="..self.gc)
            else
                if self.needShowConfirm then
                 
                    QQ.OpenUrl("https://web.qun.qq.com/mannounce/detail.html?_bid=148&confirmed=1&_wv=1031#fid="..self.fid.."&gc="..self.gc)
                else
                    QQ.OpenUrl("https://web.qun.qq.com/mannounce/detail.html?_bid=148&_wv=1031#fid="..self.fid.."&gc="..self.gc)
                end
            end
        end
    end,
    setBackground = function(self, config)
        if config ~= nil and config["theme"] ~= nil then
            local texture = self.mainView:GetTexture("bgColor")
            local theme = config["theme"]
            if theme ~= nil and texture ~= nil then
                local mode = theme["mode"]
                local themeId = theme["themeId"]
                Console.Log("music setBackground appconfig:mode="..mode..",themeId="..themeId)
                if mode ~= nil and mode == "concise" and themeId ~= nil then
                    if themeId == "2971" then
                        texture:SetValue(0xFFF5F6FA)
                        Console.Log("music setBackground ConciseWhite")
                    else
                        texture:SetValue(0xFFFFFFFF)
                        Console.Log("music setBackground default")
                    end
                elseif themeId == "1102" then
                  texture:SetValue(0xFF262626)
                  self.textContentView:SetTextColor(0xFFEBEBEB)
                  self.confirmText:SetTextColor(0xFFEBEBEB)
                else
                    texture:SetValue(0xFFFFFFFF)
                    self.textContentView:SetTextColor(0xFF03081A)
                    self.confirmText:SetTextColor(0xFF03081A)
                    Console.Log("music setBackground default")
                end
            end
        end
    end,
    OnConfigChange = function(self, config)
        Console.Log("music OnConfigChange appconfig="..Net.TableToJSON(config))
        self: setBackground(config)
    end,
    OnStartup = function (self, config)
        Console.Log("music OnStartup appconfig="..Net.TableToJSON(config))
        self: setBackground(config)
    end,

    
    GetDataFromServer = function(self, gc, fid, func)
        local storagekey = "mannounce"..gc.."-"..fid
        local data = Storage.Load(storagekey)
        if data~= nil then
            if os.time()- data.last_time < self.maxCgiCacheTime then
                Console.Log("load data form cache")
                return func(data)
            end
        end

        local cgiUrl = "https://qun.qq.com/cgi-bin/qunapp/announce_readnum"
        local body = {}
        body["gc"] = gc
        body["feed_id"] = fid 
        util.asyncPost(cgiUrl,body,function(url,data)
            Console.Log("mannounce | cgi return data")
            Console.Table(data)
            if data~= nil then
                data.last_time = os.time()
                Storage.Save(storagekey,data)
              end
             func(data)
       end)
    end
}

function OnSetMetaData(sender, value)
    Console.Log("mannounce | meta:")
    Console.Log(value)

    local model = app.GetModel(sender)
    Console.Log("mannounce | meta model:"..type(model))
    if model == nil then
        return value
    end
    model:SetContent(value["mannounce"])

    if System.GetOS and System.GetOS() == "Windows" then
        _UpdateModel(model)
    end
end

function _UpdateModel(model)
    local timer = Timer()
    timer:AttachEvent("OnTimer", function()
        timer:Stop()
        timer = nil
        Console.Log("async update view begin")
        model.view:Update()
        Console.Log("async update view end")
    end)
    timer:SetInterval(200)
    timer:Start()
end

          _G['mannounce'] = {
            ViewModel = ViewModel,OnSetMetaData = OnSetMetaData,_UpdateModel = _UpdateModel
          }
        `;

  const code$1 = `
          ViewModel = {
    New = function(self, view)
        local model = {}
        setmetatable(model, self)
        self.__index = self
        model:Initialize(view)
        return model
    end,

    Initialize = function(self, view)
        self.view = view
        
        if Dimens and Dimens.Get then
            local w = Dimens.Get("@dimens/dp_240")
            local h = Dimens.Get("@dimens/dp_150")
            view:SetSize(w,h)
        end
        
        local template = "mannounceforwatchqq.xml"
        local mainView = CreateView(template)
        self.view:AddChild(mainView)
          
        self.mainView = view:GetUIObject("mainContent")
        self.titleView = view:GetUIObject("title")
        self.titleWrapper = view:GetUIObject("titleWrapper")
        self.textContentView = view:GetUIObject("textContent")
        self.confirmWrapper = view:GetUIObject("confirmWrapper")
        self.confirmText = view:GetUIObject("confirmText")
        
        self.contentMaxHeight = 300
        
        
        self.totalMaxHeight = 320
        
        self.fid = -1
        self.gc = -1
        self.maxCgiCacheTime = 1 * 60
        self.maxReadCgiCacheTime = 2
    end,
    
    SetContent = function(self, data)
        
        self.fid = data["fid"]
        self.gc = data["gc"]
        
        self.needConfirm = data["cr"]
        self.senderUin = tostring(data["uin"])
        self.isSender = false

        
        self:_SetTitle(data["title"], data["encode"])

        self:_SetTextImageContent(data["text"], data["encode"], data["pic"])

        local uin = util.GetUIN()   
        local uinNumber = tonumber(uin)
        if self.senderUin == uin then 
            self.isSender = true
        end
        if self.isSender then
            self:_ShowConfirm(5,0) 
        elseif self.needConfirm == 1 then
            self:_ShowConfirm(1,0) 
        end

        local storagekey = "mannounce"..self.gc.."-"..self.fid
        local loadStorageData = Storage.Load(storagekey)
        if loadStorageData ~= nil then
            self.loadData = loadStorageData 
            self:loadContent()
        end

        QQ.Log("ark-loginUin"..uin)
        QQ.Log("ark-senderUin"..(self.senderUin))

        if self.needConfirm == 1 then
            self.confirmWrapper:SetVisible(true)
            self:UpdateConfirmInfo() 
        end
        
        self:_SetRootSize()
    end,
    
    UpdateConfirmInfo = function(self)
        local cgiUrl = "https://qun.qq.com/cgi-bin/qunapp/announce_readnum"
        local body = {}
        body["gc"] = util.tonumber(self.gc)
        body["feed_id"] = self.fid 
        body["ver"] = self.version     
        body["platform"] = self.platform
        util.asyncPost(cgiUrl,body,function(url,value)
            Console.Log("mannounce | cgi return data")
            Console.Log(value)
           local nType = 1       
           local nAlreadyConfirmNum = 0  
           local uin = util.GetUIN()   
           local uinNumber = util.tonumber(uin)
               
           if value["retcode"]== 0 then
                if value['data']['read_num'] ~= nil then      
                    nAlreadyConfirmNum = value['data']['read_num']
                else
                    QQ.Log("mannounce |read_num %E4%B8%BA%E7%A9%BA")
                    return
                end
                 
                if value['data']['is_read'] ~= nil then
                    if value['data']["is_read"] == 0 then
                        nType = 1
                    else
                        nType = 2
                    end 
                else
                    QQ.Log("mannounce | is_read %E4%B8%BA%E7%A9%BA")
                    return
                end 
                
                
                if value['data']['feed_type'] == 23 then
                    local create_time =  value['data']['create_time']
                    local join_time =  value['data']['join_time']
                        if join_time > create_time then
                          
                          QQ.Log("mannounce | %E4%B8%8D%E9%9C%80%E8%A6%81%E7%A1%AE%E8%AE%A4 ")
                          nType = 7
                        end
                end
                
                if self.senderUin == uin then 
                    nType = 3
                    QQ.Log("mannounce | the user is seeder!")
                    if value['data']['is_all_confirm'] ~= nil then
                        if value['data']["is_all_confirm"] == 1 then
                            nType = 4
                        elseif nAlreadyConfirmNum == 0 then
                            nType = 5              
                        end
                    end
                end 
                self:_ShowConfirm(nType,nAlreadyConfirmNum)
            end
            
            if value["retcode"] == 21000 then
                QQ.Log("mannounce | retcode == 21000")
                self:_ShowConfirm(6,0)
            end

            local storagekey = "mannounce"..self.gc.."-"..self.fid
            value.last_time = os.time()
            Storage.Save(storagekey, value)

        end) 
    end,

    loadContent = function(self)
        local value = self.loadData
        Console.Log("mannounce | %E8%A7%A3%E6%9E%90%E7%BC%93%E5%AD%98")
        Console.Table(value)
        local nType = 1       
        local nAlreadyConfirmNum = 0  
        local uin = util.GetUIN()   
        local uinNumber = util.tonumber(uin)

        if value["retcode"]== 0 then
            if value['data']['read_num'] ~= nil then      
                nAlreadyConfirmNum = value['data']['read_num']
            else
                QQ.Log("mannounce |read_num %E4%B8%BA%E7%A9%BA")
                return
            end
             
            if value['data']['is_read'] ~= nil then
                if value['data']["is_read"] == 0 then
                    nType = 1
                else
                    nType = 2
                end 
            else
                QQ.Log("mannounce | is_read %E4%B8%BA%E7%A9%BA")
                return
            end
            
            
            if value['data']['feed_type'] == 23 then
                local create_time =  value['data']['create_time']
                local join_time =  value['data']['join_time']
                    if join_time > create_time then
                      
                      QQ.Log("mannounce | %E4%B8%8D%E9%9C%80%E8%A6%81%E7%A1%AE%E8%AE%A4 ")
                      nType = 7
                    end
            end
            
            if self.senderUin == uin then 
                nType = 3
                QQ.Log("mannounce | the user is seeder!")
                if value['data']['is_all_confirm'] ~= nil then
                    if value['data']["is_all_confirm"] == 1 then
                        nType = 4
                    elseif  nAlreadyConfirmNum == 0 then
                        nType = 5              
                    end
                end
            end 
            self:_ShowConfirm(nType,nAlreadyConfirmNum)
        elseif value["retcode"] == 21000 then
            QQ.Log("mannounce | retcode == 21000")
            self:_ShowConfirm(6,0)
        elseif value["retcode"] == 20114 then
            QQ.Log("mannounce | retcode == 20114")
            self:_ShowConfirm(7,0)
        end
     end,
   
    _ShowConfirm = function(self, nType,nAlreadyConfirmNum)   
         QQ.Log("mannounce | ShowConfirm nType  = "..nType..",ConfirmNum = "..nAlreadyConfirmNum)  
        if 1 == nType then
            local confirmText = "%E5%BE%85%E7%A1%AE%E8%AE%A4"
            self.confirmText:SetValue(confirmText)
        elseif 2 == nType then
            local confirmText = "%E5%B7%B2%E7%A1%AE%E8%AE%A4"
            self.confirmText:SetValue(confirmText)
        elseif 3 == nType then
            local confirmContentText = tostring(nAlreadyConfirmNum).."%E4%BA%BA%E5%B7%B2%E7%A1%AE%E8%AE%A4"   
            self.confirmText:SetValue(confirmContentText)
        elseif 4 == nType then
            local confirmContentText = "%E5%85%A8%E9%83%A8%E5%B7%B2%E7%A1%AE%E8%AE%A4"
            self.confirmText:SetValue(confirmContentText)
        elseif 5 == nType then
            local confirmContentText = "%E6%9A%82%E6%97%A0%E4%BA%BA%E7%A1%AE%E8%AE%A4"
            self.confirmText:SetValue(confirmContentText)
        elseif 6 == nType then
            local confirmContentText = "%E5%85%AC%E5%91%8A%E5%B7%B2%E5%88%A0%E9%99%A4"
            self.confirmText:SetValue(confirmContentText)
        elseif 7 == nType then
            local confirmText = "%E6%97%A0%E9%9C%80%E7%A1%AE%E8%AE%A4"
            self.confirmText:SetValue(confirmText)
        elseif 8 == nType then
            local confirmText = "%E5%89%8D%E5%BE%80%E7%A1%AE%E8%AE%A4"
            self.confirmText:SetValue(confirmText)
        elseif 9 == nType then
            local confirmText = "%E6%9F%A5%E7%9C%8B%E8%AF%A6%E6%83%85"
            self.confirmText:SetValue(confirmText)
        end
    end,
  
    
    _SetTitle = function(self, text, encode)
        if encode ~= nil then
            text = util.decodeBase64(text)
        end
        self.titleView:SetValue(util.decodeText(text))
    end,
    
    _SetTextImageContent = function(self, text, encode, picInfo)
        if encode ~= nil then
            text = util.decodeBase64(text)
        end
        local picText=""
        if picInfo ~= nil  and #picInfo > 0 then
            picText = "[%E5%9B%BE%E7%89%87]"
        end
        self.textContentView:SetValue(picText..util.decodeText(text))
        -- android%E4%B8%8Bautosize%E6%9C%89%E9%97%AE%E9%A2%98%EF%BC%8C%E9%9C%80%E8%A6%81%E5%85%88%E8%BF%99%E8%BE%B9%E8%AE%BE%E7%BD%AE%E4%B8%80%E4%B8%8B%E6%9C%80%E5%A4%A7size
        local w,h = self.textContentView:GetSize()
        self.textContentView:SetSize(w, self.contentMaxHeight)
        local textContentWidth, textContentHeight = self.textContentView:MeasureTextSize()
        -- textContentHeight = math.max(20, textContentHeight)
        Console.Log("textWidth"..textContentWidth)
        Console.Log("textHeight"..textContentHeight..text)

        if textContentHeight > self.contentMaxHeight then
            self.textContentView:SetSize(textContentWidth, self.contentMaxHeight)
        else
            self.textContentView:SetSize(textContentWidth, textContentHeight)
        end
    end,

    
    
    _SetRootSize = function(self)
        local textContentWidth, textContentHeight = self.textContentView:GetSize()
        local titleWidth, titleHeight = self.titleView:GetSize()

        local totalHeight = titleHeight+textContentHeight
        local _, top, _, bottom = self.textContentView:GetMargin()
        totalHeight = totalHeight + top + bottom
        _, top, _, bottom = self.titleWrapper:GetMargin()
        totalHeight = totalHeight + top + bottom
        
        local confirmVisible = self.confirmWrapper:GetVisible()
        if confirmVisible then
            local confirmWidth, confirmHeight = self.confirmWrapper:GetSize()
            totalHeight = totalHeight + confirmHeight
            _, top, _, bottom = self.confirmWrapper:GetMargin()
            totalHeight = totalHeight + top + bottom
            Console.Log("confirm size, " .. confirmWidth .. "," .. confirmHeight)
        end
        
        
        if  totalHeight > self.totalMaxHeight then
            textContentHeight = textContentHeight - (totalHeight - self.totalMaxHeight)
            totalHeight = self.totalMaxHeight
            self.textContentView:SetSize(textContentWidth, textContentHeight)
        end
           
        local w, h = self.view:GetSize()
        self.view:SetSize(w, totalHeight)
        Console.Log("title size, " .. titleWidth .. "," .. titleHeight)
        Console.Log("text size, " .. textContentWidth .. "," .. textContentHeight)
        Console.Log("total width, height=" .. w .. "," .. totalHeight)
    end,

    
    OnClick = function(self, sender)      
        if QQ and QQ.OpenUrl then
            QQ.OpenUrl("troop:mannounce", { groupcode=self.gc, fid=self.fid })
        end
    end
}



          _G['mannounceforwatchqq'] = {
            ViewModel = ViewModel
          }
        `;

  const code = `
          
local MannounceForWatchQQ = mannounceforwatchqq.ViewModel
local Mannounce = mannounce.ViewModel


ViewModel = {
    New = function(self, view)
        local model = {}
        setmetatable(model, self)
        self.__index = self
        model:Initialize(view)
        return model
    end,

    Initialize = function(self, view)
        Console.Log('[ArkBuilder] main Initialize'..type(view)..tostring(IsWatchQQ));
        self.view = view
        if IsWatchQQ() then
            self.mannounce = MannounceForWatchQQ:New(view)
            self.touch=touch.TouchState:New(view)
        else
            self.mannounce = Mannounce:New(view)
        end
    end,

    Deinitialize = function(self)
    end
}

function OnSetMetaData(sender, value)
    Console.Log("Main | meta:")
    Console.Log(value)
    Console.Log("[ArkBuilder]view Main sender"..type(sender))
    local model = app.GetModel(sender)
    Console.Log("Main | model:", type(model), type(luaSender))
    if model == nil then
        return value
    end
    model.mannounce:SetContent(value["mannounce"])

    if System.GetOS and System.GetOS() == "Windows" then
        _UpdateModel(model)
    end
end

function _UpdateModel(model)
    local timer = Timer()
    timer:AttachEvent("OnTimer", function()
        timer:Stop()
        timer = nil
        Console.Log("async update view begin")
        model.view:Update()
        Console.Log("async update view end")
    end)
    timer:SetInterval(200)
    timer:Start()
end

function OnClick(sender)
    local model = app.GetModel(sender)
    if model and IsWatchQQ() then
        model.mannounce:OnClick(sender)
    end
end

function IsWatchQQ()
    return QQ and QQ.IsWatchQQ
end


          _G['main'] = {
            MannounceForWatchQQ = MannounceForWatchQQ,Mannounce = Mannounce,ViewModel = ViewModel,OnSetMetaData = OnSetMetaData,_UpdateModel = _UpdateModel,OnClick = OnClick,IsWatchQQ = IsWatchQQ
          }
        `;

  ArkGlobalContext._setViewTemplate('recommendedbutton.xml', `
<View>
    <Controller type="Button"></Controller>
    <Texture id="Normal" ninegrid="5,5,5,5" value="blue_nor.png"></Texture>
    <Texture id="MouseHover" ninegrid="5,5,5,5" value="blue_nor.png"></Texture>
    <Texture id="MouseDown" ninegrid="5,5,5,5" value="blue_pressed.png"></Texture>
</View>`);

  async function luaRun() {
    if (WebArk && (!WebArk.LuaAdapter)) {
      throw new Error('[ArkRender] LuaAdapter not found');
    }
    let factory = await WebArk.LuaAdapter.getLuaFactory();
    if (!factory) {
      factory = new wasmoon.LuaFactory();
    }
    const lua = await factory.createEngine();
    Object.keys(arkWeb__namespace).forEach((key) => {
      // console.warn('aaa WebArk key', key)
      ArkWindow[key] = WebArk[key];
      if (key === 'Net') {
          ArkWindow[key] = Net;
      }
      if (key === 'UI') {
        ArkWindow[key] = UI;
        lua.global.set("jsProxyUI", UI);
      } else {
        lua.global.set(key, ArkWindow[key]);
      }
    });
    lua.global.set('ArkWindow', ArkWindow);
    lua.global.set('JSCreateView', (view) => {
        view = view.split('.')[0];
        const newView = CreateView(view);
        return newView;
    });
    const luaUIObjectInject = `
  LuaJSView2LuaViewMap = {

  }

  LuaUIObject = {
  }
  function LuaUIObject:New(jsUIObject)
    if LuaJSView2LuaViewMap[jsUIObject.hashId] then
      return LuaJSView2LuaViewMap[jsUIObject.hashId]
    end
    local model = {}
    setmetatable(model, self)
    self.__index = self
    model.jsUIObject = jsUIObject
    LuaJSView2LuaViewMap[jsUIObject.hashId] = model
    return model
  end

  -- Pos Start
  function LuaUIObject:SetPos(x, y)
    return self.jsUIObject.SetPos(x, y)
  end
  function LuaUIObject:GetPos()
    local pos = self.jsUIObject.GetPos()
    return pos.x, pos.y
  end

  -- Pos End

  function LuaUIObject:GetID()
    return self.jsUIObject.GetID();
  end

  function LuaUIObject:SetID(id)
    return self.jsUIObject.SetID(id);
  end

  function LuaUIObject:GetSize()
    local size = self.jsUIObject.GetSize();
    return size.width, size.height
  end

  function LuaUIObject:SetSize(width,height)
    return self.jsUIObject.SetSize(width,height);
  end

  function LuaUIObject:SetAutoSize(autoSize)
    return self.jsUIObject.SetAutoSize(autoSize);
  end

  function LuaUIObject:SetRadius(left, top, right, bottom)
    return self.jsUIObject.SetRadius(left, top, right, bottom);
  end

  function LuaUIObject:GetRadius()
    local radius = self.jsUIObject.SetRadius();
    return radius.left, radius.top, radius.right, radius.bottom;
  end

  function LuaUIObject:GetUIObject(id)
    local jsView = self.jsUIObject.GetUIObject(id)
    Console.Log('[ArkBuilder] LuaUIObject:GetUIObject jsView type:'..type(jsView))
    if type(jsView) == 'nil' then
      return nil
    end
    if jsView and LuaJSView2LuaViewMap[jsView.hashId] then
        Console.Log('[ArkBuilder] LuaUIObject:GetUIObject jsView cache:',LuaJSView2LuaViewMap[jsView.hashId])
      return LuaJSView2LuaViewMap[jsView.hashId]
    end
    return LuaUIObject:New(jsView)
  end

  function LuaUIObject:GetTexture(textureName)
    return self.jsUIObject.GetTexture(textureName);
  end

  function LuaUIObject:GetRoot()
    local rootView = self.jsUIObject.GetRoot();
    if rootView and LuaJSView2LuaViewMap[rootView.hashId] then
      return LuaJSView2LuaViewMap[rootView.hashId]
    end
    return LuaUIObject:New(rootView)
  end

  function LuaUIObject:GetParent()
    Console.Log('[ArkBuilder] LuaUIObject:GetParent start')
    if self.jsUIObject then
      local parentView = self.jsUIObject.GetParent()
      Console.Log('[ArkBuilder] LuaUIObject:GetParent ing:'..parentView.id)
      if parentView and LuaJSView2LuaViewMap[parentView.hashId] then
        return LuaJSView2LuaViewMap[parentView.hashId]
      else
        return LuaJSView2LuaViewMap[self.jsUIObject.hashId]
      end
    end
  end

  function LuaUIObject:MeasureTextSize()
    Console.Log('aaa MeasureTextSize start'..type(self.jsUIObject))
    if self.jsUIObject and self.jsUIObject.MeasureTextSize then
      local size = self.jsUIObject.MeasureTextSize();
      return size.width, size.height
    end
    Console.Warn('[ArkBuilder] warn LuaUIObject MeasureTextSize is nil')
    return 0, 0
  end

  function LuaUIObject:AddChild(view)
    local jsView = view.jsUIObject
    return self.jsUIObject.AddChild(jsView)
  end

  function LuaUIObject:SetAnchors(anchors, update)
    return self.jsUIObject.SetAnchors(anchors, update)
  end

  -- Margin Start
  function LuaUIObject:SetMargin(top, right, bottom, left)
    return self.jsUIObject.SetMargin(top, right, bottom, left)
  end

  function LuaUIObject:GetMargin()
    local margin = self.jsUIObject.GetMargin()
    return margin.left, margin.top, margin.right, margin.bottom
  end

  -- Margin End

  function LuaUIObject:AttachEvent(event, fn)
    return self.jsUIObject.AttachEvent(event,fn)
  end

  function LuaUIObject:SetVisible(visible)
    return self.jsUIObject.SetVisible(visible)
  end

  function LuaUIObject:GetVisible()
    return self.jsUIObject.GetVisible()
  end

  function LuaUIObject:SetRootSize(view, width, height)
    if LuaJSView2LuaViewMap[view.hashId] then
      return self.jsUIObject.SetRootSize(LuaJSView2LuaViewMap[view.hashId], width, height)
    end
  end

  function LuaUIObject:SetValue(value)
    return self.jsUIObject.SetValue(value, true)
  end

  function LuaUIObject:GetValue()
    return self.jsUIObject.GetValue()
  end

  function LuaUIObject:GetFont()
    return self.jsUIObject.GetFont()
  end

  function LuaUIObject:SetFont(value)
    Console.Log('aaa LuaUIObject:SetFont')
    return self.jsUIObject.SetFont(value)
  end

  function LuaUIObject:GetLineHeight()
    return self.jsUIObject.GetLineHeight()
  end

  function LuaUIObject:SetLineHeight(height)
    return self.jsUIObject.SetLineHeight(height)
  end

  function LuaUIObject:SetMaxline(value)
    return self.jsUIObject.SetMaxline(value)
  end

  function LuaUIObject:LockUpdate()
    return self.jsUIObject.LockUpdate()
  end

  function LuaUIObject:UnlockUpdate()
    return self.jsUIObject.UnlockUpdate()
  end

  function LuaUIObject:ClearChildren()
    return self.jsUIObject.ClearChildren()
  end

  function LuaUIObject:SetRect(left, top, right, bottom)
    return self.jsUIObject.SetRect(left, top, right, bottom)
  end

  function LuaUIObject:SetStretch(stretch)
    return self.jsUIObject.SetStretch(stretch)
  end

  function LuaUIObject:GetType()
    return self.jsUIObject.GetType()
  end

  function LuaUIObject:SetMode(mode)
    return self.jsUIObject.SetMode(mode)
  end

  function LuaUIObject:GetMode()
    return self.jsUIObject.GetMode()
  end

  function LuaUIObject:SetTextColor(color)
    return self.jsUIObject.SetTextColor(color)
  end

  function LuaUIObject:IsType(type)
    return self.jsUIObject.IsType(type)
  end

  function LuaUIObject:GetStyle()
    return self.jsUIObject.GetStyle()
  end

  function LuaUIObject:SetStyle(style)
    return self.jsUIObject.SetStyle(style)
  end

  function LuaUIObject:DetachEvent(event)
    return self.jsUIObject.DetachEvent(event)
  end

  function LuaUIObject:GetRect()
    local rect = self.jsUIObject.GetRect()
    return rect.left, rect.top, rect.right, rect.bottom
  end

  -- canvas Start
  function LuaUIObject:ClearRect(x,y,width,height)
    return self.jsUIObject.ClearRect(x,y,width,height)
  end

  function LuaUIObject:Save()
    return self.jsUIObject.Save()
  end

  function LuaUIObject:DrawImage(image, left, top, iconWidth, iconHeight)
    return self.jsUIObject.DrawImage(image, left, top, iconWidth, iconHeight)
  end

  function LuaUIObject:SetDrawStyle(color)
    return self.jsUIObject.SetDrawStyle(color)
  end

  function LuaUIObject:DrawCircle(x, y, length)
    return self.jsUIObject.DrawCircle(x, y, length)
  end

  function LuaUIObject:Restore()
    return self.jsUIObject.Restore()
  end
  -- Canvas End

  -- UI start
  UI = {
  }

  function UI:View()
    local jsProxyObj = jsProxyUI.View()
    local model = LuaUIObject:New(jsProxyObj)
    return model
  end
  function UI:Text()
    Console.Log('UI:Text start')
    local jsProxyObj = jsProxyUI.Text()
    Console.Log('UI:Text jsProxyObj', jsProxyObj)
    local model = LuaUIObject:New(jsProxyObj)
    Console.Log('UI:Text model', model)
    return model
  end

  function UI:Image()
    local jsProxyObj = jsProxyUI.Image()
    local model = LuaUIObject:New(jsProxyObj)
    return model
  end
  function UI:Canvas()
    local jsProxyObj = jsProxyUI.Canvas()
    local model = LuaUIObject:New(jsProxyObj)
    return model
  end
  function UI:Video()
    local jsProxyObj = jsProxyUI.Video()
    local model = LuaUIObject:New(jsProxyObj)
    return model
  end
  -- UI end
  `;
    let finalCode = '';
    const moduleIdList = [];
    
        





            finalCode = finalCode + code$5;
            moduleIdList.push('touch');
          

            finalCode = finalCode + code$4;
            moduleIdList.push('util');
          

            finalCode = finalCode + code$3;
            moduleIdList.push('app');
          

            finalCode = finalCode + code$2;
            moduleIdList.push('mannounce');
          

            finalCode = finalCode + code$1;
            moduleIdList.push('mannounceforwatchqq');
          

            finalCode = finalCode + code;
            moduleIdList.push('main');
          

        const applicationViewEvents = {};
          applicationViewEvents['main'] = [{
      "eventName": "OnSetValue",
      "callback": "main.OnSetMetaData"
  }, {
      "eventName": "OnClick",
      "callback": "main.OnClick"
  }, {
      "eventName": "OnTouchStart",
      "callback": "touch.OnTouchStart"
  }, {
      "eventName": "OnTouchEnd",
      "callback": "touch.OnTouchEnd"
  }, {
      "eventName": "OnTouchCancel",
      "callback": "touch.OnTouchCancel"
  }, {
      "eventName": "OnViewEvent",
      "callback": "touch.OnViewEvent"
  }];
        
          applicationViewEvents['mannounce'] = [];
        
          applicationViewEvents['mannounceforwatchqq'] = [];
        
          applicationViewEvents['touch'] = [];
        
          applicationViewEvents['recommendedbutton.xml'] = [];
        
        
    /** 注入app的注册事件 */
    applicationViewEvents['app'] = [{"eventName":"OnCreateView","callback":"app.OnCreateView"},{"eventName":"OnDestroyView","callback":"app.OnDestroyView"},{"eventName":"OnExit","callback":"app.OnExit"},{"eventName":"OnActivate","callback":"app.OnActivate"},{"eventName":"OnStartup","callback":"app.OnStartup"},{"eventName":"OnConfigChange","callback":"app.OnConfigChange"}];
    /**
     * getSupportProxyEventNameTemplates
     * @params eventName 事件名称
     * @params host 事件宿主
     * */
    const getSupportProxyEventNameTemplates = (eventName, host, callbackName) => {
      host = host || '_ENV._G';
      callbackName = callbackName || 'OnSetMetadata';
      const supportProxyEventNameTemplates = {
        OnSetValue: `
        function (sender, value)
          if type(value) ~= 'table' and type(value) ~= 'userdata' then
            Console.Log('LuaBridge: ${callbackName} value is not table')
            return
          end
          local luaView = LuaJSView2LuaViewMap[sender.hashId]
          if type(luaView) == 'nil' then
            luaView = LuaUIObject:New(sender)
          end
          local tableValue = {}
          Console.Log('LuaBridge:${callbackName} value', value)
          for k, v in pairs(value) do
            tableValue[k] = v
          end
          Console.Log('LuaBridge:${callbackName} jsonToTable', tableValue)
          ${host}['${callbackName}'](luaView, tableValue)
        end
      `,
        OnCreateView: `
        function (view, template)
          local luaView = LuaUIObject:New(view)
          ${host}['OnCreateView'](luaView, template)
        end
      `,
        OnConfigChange: `
      function (config)
        Console.Log('LuaBridge:OnConfigChange start config:', config)
        ${host}['${callbackName}'](config)
      end
      `,
        OnStartup: `
      function (config)
        Console.Log('LuaBridge:OnStartup start config:', config)
        ${host}['${callbackName}'](config)
      end
      `,
        OnClick: `
        function (sender)
          local luaView = LuaJSView2LuaViewMap[sender.hashId]
          if type(luaView) == 'nil' then
            luaView = LuaUIObject:New(sender)
          end
          Console.Log('LuaBridge:${callbackName} ${host} ${callbackName}')
          ${host}['${callbackName}'](luaView)
        end
      `,
        OnDestroyView: `
        function (view)
          local luaView = LuaUIObject:New(view)
          ${host}['${callbackName}'](luaView, template)
        end
      `,
        OnExit: `
        function ()
        ${host}['OnExit']()
        end
      `,
        // 'OnTouchStart',
        // 'OnTouchEnd',
        // 'OnTouchEnd',
      };
      return supportProxyEventNameTemplates[eventName];
    };
    // luaBridge对象构造
    const luaBridgeTemp = {};
    // luaBridge函数对象映射
    const luaBridgeFunctionMap = {};

    /**
     *
     * 替换对应Lua函数代码
     * @param {*} luaBridgeFunctionMap
     * @return {*}
     */
    const generateLuaBridgeInjectCode = (luaBridgeFunctionMap) => {
      const luaBridgeFunctionMapStr = JSON.stringify(luaBridgeFunctionMap);
        return luaBridgeFunctionMapStr.replace(/\"(\w)*\"(:|=)/g, (a) => {
          return a.replace(/\"/g, "").replace(/:/g, '=');
        }).replace(/\"|\\n/g, "");
    };
    /**
     * 将字符串数组转成深度对象
     * @params curObj 当前操作对象
     * @params eventCasts剩余数组
     */
    const listToDeepObj = function (curObj, eventCasts) {
      if (!eventCasts || eventCasts.length === 0) {
        return;
      }
      if (eventCasts.length === 1) {
        curObj[eventCasts[0]] = `__${eventCasts[0]}__`;
        return;
      }
      const cast = eventCasts.shift();
      curObj[cast] = {};
      listToDeepObj(curObj[cast], eventCasts);
    };
    Object.keys(applicationViewEvents).forEach((key) => {
      const viewEvents = applicationViewEvents[key];
      viewEvents && viewEvents.forEach((viewEvent) => {
        const { eventName, callback } = viewEvent;
        if (!getSupportProxyEventNameTemplates(eventName)) {
          return;
        }
        const eventCasts = callback.split('.');
        let tempHost = '';
        if (eventCasts.length < 2) {
          tempHost = '';
        }
        if (eventCasts.length === 2 && eventCasts[0] != 'app') {
          tempHost = eventCasts[0];
        }
        if (eventCasts.length > 2) {
          tempHost = eventCasts.slice(1,eventCasts.length-1).join('.');
        }
        const eventTemplate = getSupportProxyEventNameTemplates(eventName, tempHost, eventCasts[eventCasts.length-1]);
        const lastIdx = eventCasts.length - 1;
        const viewKey = tempHost || 'app';
        if (!luaBridgeFunctionMap[viewKey]) {
          luaBridgeFunctionMap[viewKey] = {};
        }
        luaBridgeFunctionMap[viewKey][eventCasts[lastIdx]] = eventTemplate;
        /**
         * {app: {OnSetMetaData: function}}
         */
        const bridgeItemKey = eventCasts.shift();
        if(!luaBridgeTemp[bridgeItemKey]) {
          luaBridgeTemp[bridgeItemKey] = {};
        }
        const eventCastObj = {};
        listToDeepObj(eventCastObj, eventCasts);
        Object.keys(eventCastObj).forEach((key)=>{
          luaBridgeTemp[bridgeItemKey][key] = eventCastObj[key];
        });
      });
    });
    const luaBridgeInject =  `
    LuaBridge = ${generateLuaBridgeInjectCode(luaBridgeFunctionMap)}
    _ENV._G['LuaBridge'] = LuaBridge
    -- 注入全局Bridge CreateView
    _ENV._G['CreateView'] = function(id)
      Console.Log('[ArkBuilder] Lua Bridge _G CreateView start id:'..id)
      local jsView = JSCreateView(id)
      Console.Log('[ArkBuilder] Lua Bridge _G CreateView:'..jsView.id)
      local luaView = LuaUIObject:New(jsView)
      return luaView
    end
  `;
    finalCode = `
    ${luaUIObjectInject}
    ${luaBridgeInject}
    ${finalCode}
  `;
    await lua.doString(finalCode);
    // 将app以及app内部字段依赖注入lua全局
    const luaGlobalWith = lua.global.get('_G');
    ArkWindow.app = luaGlobalWith['app'];
    // 注入其他依赖Lua模块
    moduleIdList.forEach((moduleId) =>{
      ArkWindow[moduleId] = luaGlobalWith[moduleId];
    });
    // 覆盖需要代理的类型
    const luaBridgeApi = luaGlobalWith['LuaBridge'];
    ArkWindow['LuaBridge'] = luaBridgeApi;
    if (ArkWindow.app && luaBridgeApi) {
      Object.keys(luaBridgeApi).forEach((key) => {
        ArkWindow.app[key] = luaBridgeApi[key];
      });
    }
    // 覆盖需要代理的函数
    ArkWindow.app.getExtendObject = ArkWindow.getExtendObject;

    return lua;
  }

  const uniqueApplicationId = (function() {
     function S4() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
     }
     return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
   })();

   /**
    * 有很多地方会用到这里数据.所以这里最好还是挂载到app上.
    * @returns
    * @update 2022-07-30 22:47:10
    * @author alawnxu
    * @description 这里之前挂载app上.不过后面发现不可行.因为在Ark视图里面有注册了很多事件.这些事件的会直接调用里面声明的全局方法.这个时候就有可能不是在某一个对象上了.
    */
    ArkWindow.getExtendObject = function () {
     var appKey = 'c8ab90af545909e82b798ad4b6899b10';


     return {
       appid: 'com.tencent.mannounce',
       appKey,
       images: [{"name":"blue_nor.png","url":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAElBMVEUAAAASv/YSuPYTuPUSt/USuPXVjNwNAAAABnRSTlMAHKbm/+1DRvRuAAAANElEQVR4AWNgVHZBA0YCDKIuGCCQQQVT0InBBFPQmcEFCxgkgqOCo4JYEy3W5I01I2DNMgBq4NKDrrHf9gAAAABJRU5ErkJggg=="},{"name":"blue_pressed.png","url":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAElBMVEUAAAASm9EPmMwOmcwOmMsPmcuPav30AAAABnRSTlMAHKbm/+1DRvRuAAAANElEQVR4AWNgVHZBA0YCDKIuGCCQQQVT0InBBFPQmcEFCxgkgqOCo4JYEy3W5I01I2DNMgBq4NKDrrHf9gAAAABJRU5ErkJggg=="},{"name":"disable.png","url":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAElBMVEUAAADt7e3p6+3q6+zp6+zp7O2fTr8lAAAABnRSTlMAHKbm/+1DRvRuAAAANElEQVR4AWNgVHZBA0YCDKIuGCCQQQVT0InBBFPQmcEFCxgkgqOCo4JYEy3W5I01I2DNMgBq4NKDrrHf9gAAAABJRU5ErkJggg=="},{"name":"notification_1.png","url":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABLhJREFUWAntlk2IHEUUx6uqe8ZNcJUYomQ2BjIQCbp+ZV0PKl6iZAWjIIR4CRq8elIieFDPAQ8BDXgQD3rwoAeR4EFcEBS9xIPRVUTFz4iLIdld3Y/Z7a7n//9qarrX7R7cld2DTA3dVf2q6r1f/V9VTxszKAMFBgoMFPj/KtD6Lnt097fZG63v5Z66VaZ1HZtp3/OLbPPL+RnxcsIYa3yeH0K8VlXMLQfc88PKhHT8GRHTxoUi+NndVXC0bRng9T9LK1/JT+eZHFUopbNGUPOqK5sOOPKr7IRiT2ad/GmADTOlAYpIqp7etxxw70/S9rl/ynfyExBou+J0hfKoLfcelaOCdXSwr1dBW+NLY7R/k70ri/7BXORIlvn7oVTC6KpYd2JMp8LBxol9MvzvAeG4eSEzY4zz5lfnz5+W1oi9crjtrWsnLtkv3h/qLGY3UxsWPAdlFFBNeA7p1X5dUn84jqtVcN8FOWLFv4zV7aKvB34X++pOO8RJ7+84YMwSAASJskgVc6bBGbBoq40TgEZzL5mYF5XUXk6pKbWAkvtX4LCljuHAO3pJ1A3eX92lC+A8bAR1GjTGUs4eWIweFxOAaV0FHoeV6npAkRaTFQKFOsMzcTLyoSGu6wkqxoUQNu6voGBADv1FmzMDHFt1W7tPijlNM4ea6fBwMg8oAvbsbDgoh1+vMCoLKk0jYqvINMWuXs1GWBynVJU+CgaHwalV1RbgL8elkIAT11059lQsZOYrhNAMT6XLhTYWwkfgYKm+1wJy4/MAxJLBGwEZLyecdoTNzjbHxoBMcWxzGNvh0pFoh7ro43N1qQXk8OiUtYdKMcU5FCKhHpaootq6qpXixRMewscFU2H65z20Q//ae9zma3vEfaFpoAP4oXJUUNMMBZlKvtdCzQUUcByvczS9nB8UZc1xQWEMou/oYC2BWmoVTBJ3LMvMCwh1LdOHgcNLYu7grGbivkydtFaMuYaQ/LGsVktNCkMQVbxbsyeop+YwsOYeNa/pLszviVx1ed48QsvyHz++c6nZejZz6TNz3prLxsy/PeffwgE6DEj9dKI+CtE9QPGZyrLEWlXEw8LBZiVLpTG4qLz3xr80nZ9MrD3FLeigcMOZex/fYT7e9Y0Zy7LsIeyJJ8CCF32Rej3dShb2XVgAVbRmcazR812OXL8Hy6OKtgrBx6aV6WZikW5c8AL3d2IryMUD9tzMaOP5kSTdZ519DLbP9UQAIp5u3YfYe2TVLajQRZBya72Aca5sayZTKdbMdUM9kzhzLHaynrrJLs+Mpq/P3tK4DQrfh8PwWQSNPKEOh7A8t9zeKKC57mrz9RX4mOpBWjN+9k8ZLTuP7dlbG5N/3d4YF+OQdjtNMH5osObBisBxfLneMOBha+eh3FQT3w9UUHeQNc+VnZfbTP/CwfS1oeHkBrRfBFQe+wH9j/+b2IP9XTTX3wLYhwRTFQmZmKOTC3JXP0+X9ts5HIiTmDYBsBmqh/bZujn/DdCYSaqnhwQ13pU2SVfvxbrAS+OND1Kb3uhSO/HweKqvr6qxgN94OSeyfbZjLoJtCK+bd1NnTt3dsJ9u3OMmzPxoWY5/IoJP7EEZKDBQYKBAlQJ/A0vQj/btXtnsAAAAAElFTkSuQmCC"}],
       fonts: {"app.default":{"fontFamily":"Helvetica,sans-serif,Microsoft YaHei","size":12,"bold":false},"app.bold":{"fontFamily":"Helvetica,sans-serif,Microsoft YaHei","size":16,"bold":true},"app.size14":{"fontFamily":"Helvetica,sans-serif,Microsoft YaHei","size":14,"bold":false},"app.size16":{"fontFamily":"Helvetica,sans-serif,Microsoft YaHei","size":16,"bold":false},"app.size18":{"fontFamily":"Helvetica,sans-serif,Microsoft YaHei","size":18,"bold":false},"app.size72":{"fontFamily":"Helvetica,sans-serif,Microsoft YaHei","size":72,"bold":false},"app.size28":{"fontFamily":"Helvetica,sans-serif,Microsoft YaHei","size":28,"bold":false},"app.size36":{"fontFamily":"Helvetica,sans-serif,Microsoft YaHei","size":36,"bold":false},"app.size25":{"fontFamily":"Helvetica,sans-serif,Microsoft YaHei","size":25,"bold":false},"app.size22":{"fontFamily":"Helvetica,sans-serif,Microsoft YaHei","size":22,"bold":false},"pc.app.size4":{"fontFamily":"Microsoft YaHei,SimSun","size":4,"bold":false},"pc.app.size15":{"fontFamily":"Microsoft YaHei,SimSun","size":15,"bold":false},"app.size30":{"fontFamily":"Helvetica,sans-serif,Microsoft YaHei","size":30,"bold":false},"app.size24":{"fontFamily":"Helvetica,sans-serif,Microsoft YaHei","size":24,"bold":false},"pc.app.size16":{"fontFamily":"Microsoft YaHei,SimSun","size":16,"bold":false}},
       appVersion: "1.0.0.202",
       buildVersion: "20221229214600",
       styles: {},
       applicationEvents: [{"eventName":"OnCreateView","callback":"app.OnCreateView"},{"eventName":"OnDestroyView","callback":"app.OnDestroyView"},{"eventName":"OnExit","callback":"app.OnExit"},{"eventName":"OnActivate","callback":"app.OnActivate"},{"eventName":"OnStartup","callback":"app.OnStartup"},{"eventName":"OnConfigChange","callback":"app.OnConfigChange"}],
       applicationId: appKey + '_' + uniqueApplicationId,
       urlWhiteList: []
     };
   };

   /**
    * 释放资源
    * @description 使用_命名,防止被重写
    */
   ArkWindow._destroyResource_ = function () {
     ArkGlobalContext.clearTemplates();
   };

   /** 标识是Lua Ark */
   ArkWindow.isLua = true;

   async function createApp(options) {
     const lua = await luaRun();
     const templates = ArkGlobalContext.getViewTemplates();
     ArkWindow.lua = lua;
     return new arkWeb.WebARKView({
       /**
        * 这里之前是导出的唯一的对象.不过后面发现不可行.因为在Ark视图里面有注册了很多事件.这些事件的会直接调用里面声明的全局方法.这个时候就有可能不是在某一个对象上了.
        * @author alawnxu
        * @date 2022-07-30 22:41:12
        * @see
        * com.tencent.qq_vip_collect_card_template
        * <Event>
        *  <OnSetValue value="gameLogic.OnSetData" />
        * </Event>
        *
        * 而游戏中心的大部分都是:
        * com.tencent.gamecenter.gshare
        * <Event>
        *  <OnSetValue value="Vark.onSetMetaData" />
        * </Event>
        *
        * 还有多个的:
        * com.tencent.mobileqq.reading
        * <OnSetValue value="bookUpdate.OnSetMetadata" name="OnSetValue"></OnSetValue>
        * <OnSetValue value="accountChange.OnSetMetadata" name="OnSetValue"></OnSetValue>
        *
        * 而根据不同的模板调用不同的初始化方法在正常不过.所以这里统一导出ArkWindow
        */
       app: ArkWindow,
       templates,
       ...(options || {}),
     });
   }

  return createApp;

}));
