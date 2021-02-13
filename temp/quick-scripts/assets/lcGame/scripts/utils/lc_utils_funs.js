(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/utils/lc_utils_funs.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '97b1b3XWNREI5QmxPARPXXH', 'lc_utils_funs', __filename);
// lcGame/scripts/utils/lc_utils_funs.js

"use strict";

/**
 * 内容: 平台函数工具集合
 *
 */

window.lc = window.lc || {};

lc.utils = {
    /**
     * 获取用户信息
     * @returns {*}
     */
    getUserInfo: function getUserInfo() {
        //之前的段位
        var model = lc.game.getModel("game_bind_user");
        if (!model) {
            return {};
        }
        return model.getBaseInfo();
    },


    /**
     * 
     * @param {*} num 传入当前货币数量转化为简写
     */
    getChangeNumber: function getChangeNumber(num) {
        if (num >= 10000 && num < 100000) {
            num = Math.floor(num / 10000 * 100) / 100;
            return num + "万";
        } else if (num >= 100000 && num < 100000000) {
            num = Math.floor(num / 10000);
            return num + "万";
        } else if (num >= 100000000 && num < 1000000000) {
            num = Math.floor(num / 100000000 * 100) / 100;
            return num + "亿";
        } else if (num >= 1000000000) {
            num = Math.floor(num / 100000000);
            return num + "亿";
        } else {
            return num.toString();
        }
    },


    // 秒转化成（2小时25分36秒）
    formatSeconds: function formatSeconds(value) {
        var theTime = parseInt(value); // 秒  
        var theTime1 = 0; // 分  
        var theTime2 = 0; // 小时  
        if (theTime > 60) {
            theTime1 = parseInt(theTime / 60);
            theTime = parseInt(theTime % 60);
            if (theTime1 > 60) {
                theTime2 = parseInt(theTime1 / 60);
                theTime1 = parseInt(theTime1 % 60);
            }
        }
        var result = "" + parseInt(theTime) + "秒";
        if (theTime1 > 0) {
            result = "" + parseInt(theTime1) + "分" + result;
        }
        if (theTime2 > 0) {
            result = "" + parseInt(theTime2) + "小时" + result;
        }
        return result;
    },


    // 秒转化成（02：25：36）
    formatSeconds2: function formatSeconds2(a) {
        var hh = parseInt(a / 3600);
        if (hh < 10) hh = "0" + hh;
        var mm = parseInt((a - hh * 3600) / 60);
        if (mm < 10) mm = "0" + mm;
        var ss = parseInt((a - hh * 3600) % 60);
        if (ss < 10) ss = "0" + ss;
        var length = hh + ":" + mm + ":" + ss;
        if (a > 0) {
            return length;
        } else {
            return "NaN";
        }
    },


    /**
     * 
     * @param {*} orientation (1:横屏，2:竖屏)
     */
    onRotateScreen: function onRotateScreen(orientation) {

        if (cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod('org/cocos2dx/javascript/AppActivity', 'changeOrientation', '(I)V', orientation);
        } else {
            jsb.reflection.callStaticMethod("AppController", "changeOrientation:", orientation);
        }

        var frameSize = cc.view.getFrameSize();
        tm.LOGD('frameSize: ' + frameSize.width + '   ' + frameSize.height);

        if (orientation == 2) {
            cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
            if (frameSize.width > frameSize.height) {
                cc.view.setFrameSize(frameSize.height, frameSize.width);
            }
        } else {
            cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
            if (frameSize.height > frameSize.width) {
                cc.view.setFrameSize(frameSize.height, frameSize.width);
            }
        }

        if (window.jsb) {
            //手动调用触发 Wdiget 组件重新布局
            window.dispatchEvent(new cc.Event.EventCustom('resize', true));
        }
    },


    /**
     * 获得当前日期时间，格式："2019-07-04 10:36:00"
     */
    getCurFormatDate: function getCurFormatDate() {

        var d = new Date();
        var month = "" + (d.getMonth() + 1);
        var day = "" + d.getDate();
        var year = "" + d.getFullYear();
        if (month.length < 2) {
            month = "0" + month;
        }
        if (day.length < 2) {
            day = "0" + day;
        }
        var date = [year, month, day].join("-");

        var h = "" + d.getHours();
        var m = "" + d.getMinutes();
        var s = "" + d.getSeconds();
        var time = [h, m, s].join(":");

        return [date, time].join(" ");
    },


    //计算两个日期的毫秒差
    getDateDiff: function getDateDiff(firstDate, secondDate) {

        var fd = new Date(firstDate);
        var sd = new Date(secondDate);
        return fd.getTime() - sd.getTime();
    }
};

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=lc_utils_funs.js.map
        