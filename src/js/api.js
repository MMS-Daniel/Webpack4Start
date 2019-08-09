import axios from 'axios';
import qs from 'qs';
import {getUrlParam} from './utils/url'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(config => {
    config.headers['OAuth-Token'] = localStorage['7xToken'];
    return config
}, function (error) {
    return Promise.reject(error)
});
axios.interceptors.response.use(
    response => {
        if (response.data.code === 'TOKEN_ERROR') {
            localStorage.ROUTER = location.href;
            location.href ='./login.html?pwaId='+getUrlParam('pwaId')
        }
        return response
    },
    error => {

    }
);


export const Api = {
    Wx: {
        Auth:params=>{
            return axios.post(`/api-flow/pwa/component/user/authUpsert`, qs.stringify(params)).then(res => res.data).catch(res => res.data)
        },
        Share: params => {
           return axios.post(`/api-tanabata/act/tanabata/share`, qs.stringify(params)).then(res => res.data).catch(res => res.data)
        },
        Login: params => {
            return axios.post(`/api-flow/pwa/component/user/login`, qs.stringify(params)).then(res => res.data).catch(res => res.data)
        },
        getWechatAuthUrl: params => {
            return axios.get(`/api-flow/pwa/component/user/getWechatAuthUrl`, {params: params}).then(res => res.data).catch(res => res.data)
        }
    },
    Act:{
        getQrurl: params => {
            return axios.get(`/api-tanabata/act/tanabata/getQrurl`, {params: params}).then(res => res.data).catch(res => res.data)
        },
        sendEmojiSuccessMsg: params => {
            return axios.get(`/api-tanabata/act/tanabata/sendEmojiSuccessMsg`, {params: params}).then(res => res.data).catch(res => res.data)
        },
        sendImgSuccessMsg: params => {
            return axios.get(`/api-tanabata/act/tanabata/sendImgSuccessMsg`, {params: params}).then(res => res.data).catch(res => res.data)
        }
    }

};
// 授权相关
export const  Oauth ={
    // 获取微信授权code
    auth:function(callback){
        var code = getUrlParam("code");
        var pwaId = getUrlParam("pwaId");
        var url = window.location.href;
        localStorage.removeItem('7x-sessionId');
        localStorage.removeItem('7xToken');
        if(code){
            Oauth.getSessionId(callback);
        }else{
            localStorage.pwaId=pwaId;
            Api['Wx'].getWechatAuthUrl({
                id:pwaId,
                url:url,
                snsapi:"snsapi_userinfo"
            }).then((res)=>{
                if(res.code == 'SUCCESS'){
                    window.location.replace(res.data)
                }
                else{
                    wx.closewindow();
                }
            })
        }
    },
    // 获取微信sessionId
    getSessionId: function(callback){
        var code = getUrlParam("code");
        //获取SessionID
        if(code){
            Api['Wx'].Auth({
                code:getUrlParam("code"),
                id:getUrlParam("pwaId")
            }).then((res)=>{
                if(res.code == 'SUCCESS'){
                    localStorage.setItem('7x-sessionId',res.data);
                    Oauth.getToken(callback);
                }
            })
        }else{
            Oauth.auth();
        }

    },
    // 设置token
    setToken: function(token){
        token?localStorage.setItem("7xToken", token):localStorage.removeItem("7xToken");
    },
    // 获取token
    getToken: function(callback){
        var _this = this;
        var token = localStorage.getItem("7xToken");
        var sessionId = localStorage.getItem("7x-sessionId");

        if(!sessionId){
            _this.getSessionId(callback);
        }else{
            if(token){
                return token;
            }else{
                //有sessionID  直接获取token
                Api['Wx'].Login({
                    sessionId:sessionId
                }).then((res)=>{
                    if(res.code  == 'SUCCESS'){
                        Oauth.setToken(res.data.token);
                        localStorage['nickName'] = res.data.nickName
                        token = res.data.token;
                        callback(res);
                    }
                })
            }
        }
        return token;
    },
    wxConfig:function(){
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        var id = getUrlParam("id") || false;
        var pwaId = getUrlParam("pwaId")||'';
        var url  = location.pathname+'?pwaId='+pwaId;
        id && ( url += '&id='+id);
        !isiOS && window.history.replaceState({}, "",url);
        Api['Wx'].Share({
            url:location.href.split('#')[0]
        }).then((res)=>{
            if(res.code ==  'SUCCESS'){
                var data = res.data;
                wx.config({
                    debug : false,
                    appId : data.appid,
                    timestamp : data.timeStamp,
                    nonceStr : data.nonceStr,
                    signature : data.signature,
                    jsApiList : [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'hideMenuItems'
                    ]
                });
            }
        });
    },
    wxShare:function(obj){
        var title = obj.title || '' ;
        var link = obj.link  || '';
        var img = obj.img || '';
        wx.onMenuShareAppMessage({
            title: title,
            desc: '爱与兑换券',
            link: link,
            imgUrl:img,
            success: function () {
                MtaH5.clickStat("10006")
            }
        });
        wx.onMenuShareTimeline({
            title: title,
            link: link,
            imgUrl:img,
            success: function () {
                MtaH5.clickStat("10005")
            }
        });

    },
};