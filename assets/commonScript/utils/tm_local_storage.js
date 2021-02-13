/**
 *
 * 内容: 本地存储
 *
 */


window.tm = window.tm || {};

tm.localStorage = {

    getItem:function (key) {
        let info = cc.sys.localStorage.getItem(key);
        if(info != "null" && info != "" && info != null) {
            return JSON.parse(info);
        }
        return "null";
    },

    setItem:function (key, value) {
        if(!key){
            return
        }
        cc.sys.localStorage.setItem(key, JSON.stringify(value));
    },
};

tm.localStorageKey = {

    SETTING_MUSIC_KEY: "MUSIC_VALUE", // 音乐音效设置 {effect:0.5, music:0.5, isMute: 1}  //音效，音乐， 静音(0:关，1:开)

    GOLD_UPDATE_TYPE: "GOLD_UPDATE_TYPE", // 玩家当前金币类型
};