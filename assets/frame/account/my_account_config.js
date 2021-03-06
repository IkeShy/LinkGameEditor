/**
 * 内容: 配置信息
 */
require("./index");

// 是否是线上版本
const IS_ONLINE = false;

if(IS_ONLINE){
    window.myAccount.config = {
        ip: "http://39.106.230.205", //"http://39.107.31.221:30000",  http://39.106.230.205
        clientId: "texas_app_v1_0_0",
        v:"1.0"
    };
}else {
    window.myAccount.config = {
        ip: "http://192.168.8.118:9017",
        clientId: "debug_texas_app_v1_0_0",
        v:"1.0"
    };
}

/**
 * 语言设置
 * @type {{lang: string}}
 */
window.myAccount.setting = {
    lang:"zh_CN"
};