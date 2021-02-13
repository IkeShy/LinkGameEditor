(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/commonScript/utils/tm_utils_funs.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4158b2q4elLjqasHMJvotif', 'tm_utils_funs', __filename);
// commonScript/utils/tm_utils_funs.js

'use strict';

/**
 *
 *
 */
var crypto = require('crypto');

tm.utils = {
    seedRandomTimes: 0,

    /**
     * 自定义UUID,不能确保100%唯一
     * @param len 长度
     * @param radix 2/10/16 进制数
     * @returns {string}
     */
    uuid: function uuid(len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [],
            i;
        radix = radix || chars.length;

        if (len) {
            // Compact form
            for (i = 0; i < len; i++) {
                uuid[i] = chars[0 | Math.random() * radix];
            }
        } else {
            // rfc4122, version 4 form
            var r;

            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[i == 19 ? r & 0x3 | 0x8 : r];
                }
            }
        }

        return uuid.join('');
    },

    isNullorUndefined: function isNullorUndefined(a) {
        if (typeof a == 'undefined' || typeof a == 'null') {
            return true;
        }

        return false;
    },

    /**
     * 只有对战游戏，想获得相同随机数时才调用
     * 伪随机
     * @param min
     * @param max
     * @returns {string}
     */
    seededRandom: function seededRandom(min, max) {
        max = max || 1;
        min = min || 0;

        Math.seed = Math.seed || 58215;
        Math.seed = (Math.seed * 9301 + 49297) % 233280;

        var rnd = Math.seed / 233280.0;

        this.seedRandomTimes++;
        return min + rnd * (max - min);
    },

    seededRandomInt: function seededRandomInt(min, max) {
        return Math.round(this.seededRandom(min, max));
    },

    /**
     * 纯随机，没有随机种子
     * @param min
     * @param max
     * @returns {number}
     */
    randomInt: function randomInt(min, max) {
        var range = max - min;
        var rand = Math.random();
        return Math.round(min + rand * range);
    },

    /**
     * 其他地方不要调用，平台维护
     * @param seed
     */
    setRandomSeed: function setRandomSeed(seed) {
        Math.seed = seed;
        this.seedRandomTimes = 0;
    },

    /**
     * 屏幕适配
     * @param node
     */
    adaptiveWin: function adaptiveWin() {

        var canvas = cc.Canvas.instance;

        // 设计分辨率比
        var rateR = canvas.designResolution.height / canvas.designResolution.width;

        // 显示分辨率比
        var rateV = cc.view.getVisibleSize().height / cc.view.getVisibleSize().width;
        cc.log("winSize: rateR: " + rateR + " rateV: " + rateV);

        if (rateV > rateR) {
            canvas.fitHeight = false;
            canvas.fitWidth = true;
            cc.log("winSize: fitWidth");
        } else {
            canvas.fitHeight = true;
            canvas.fitWidth = false;
            cc.log("winSize: fitHeight");
        }
    },

    /**
     * pdf2cdf  PDF:密度 CDF:分布
     * @param pdf
     * @returns {Array.<T>|string|Blob|ArrayBuffer}
     */
    pdf2cdf: function pdf2cdf(pdf) {
        var cdf = pdf.slice() || [];

        for (var i = 1; i < cdf.length - 1; i++) {
            cdf[i] += cdf[i - 1];
        } // Force set last cdf to 1, preventing floating-point summing error in the loop.
        cdf[cdf.length - 1] = 1;

        return cdf;
    },

    /**
     * 根据分布值,离散取样
     * @param cdf
     * @returns {*}
     */
    discreteSampling: function discreteSampling(cdf) {
        var y = Math.random();
        for (var x in cdf) {
            if (y < cdf[x]) return x;
        }return -1; // should never runs here, assuming last element in cdf is 1
    },

    /**
     * 判断是iPhoneX
     * @returns {boolean}
     */
    isIphoneX: function isIphoneX() {
        // var glView = cc.director.getOpenGLView();
        var v_size = cc.view.getFrameSize();
        var isIOS = cc.sys.os == cc.sys.OS_IOS;
        tm.LOGD("isIphoneX isIOS", 'isIphoneX--' + v_size.width + '---' + v_size.height, isIOS);
        if (isIOS && v_size.width == 375 && v_size.height == 812) {
            return true;
        }
        return false;
    },

    checkFlagByKey: function checkFlagByKey(key) {
        if (!key) {
            return false;
        }

        var value = tm.localStorage.getItem(key) || "";

        return value == 'true';
    },


    /**
     * 显示倒计时 时-分-秒
     * 00:00:00
     * @returns {Arry}
     */
    showTimeBy_H_M_S: function showTimeBy_H_M_S(second) {
        var timeArr = [];

        var last_s = second;
        var h = Math.floor(last_s / 3600);
        if (!h) {
            timeArr.push('00');
        } else if (h < 10) {
            timeArr.push('0' + h);
        } else {
            timeArr.push(h);
        }

        last_s = second % 3600;
        var m = Math.floor(last_s / 60);
        if (!m) {
            timeArr.push('00');
        } else if (m < 10) {
            timeArr.push('0' + m);
        } else {
            timeArr.push(m);
        }

        var s = last_s % 60;
        if (!s) {
            timeArr.push('00');
        } else if (s < 10) {
            timeArr.push('0' + s);
        } else {
            timeArr.push(s);
        }

        return timeArr;
    },

    /**
     * 显示倒计时 分-秒-毫秒
     * 00:00:00
     * @returns {Arry}
     */
    showTimeBy_M_S_MS: function showTimeBy_M_S_MS(mSecond) {
        var timeArr = [];

        var last_ms = mSecond;
        var m = Math.floor(last_ms / (60 * 1000));
        if (!m) {
            timeArr.push('00');
        } else if (m < 10) {
            timeArr.push('0' + m);
        } else {
            timeArr.push(m);
        }

        last_ms = last_ms % (60 * 1000);
        var s = Math.floor(last_ms / 1000);
        if (!s) {
            timeArr.push('00');
        } else if (s < 10) {
            timeArr.push('0' + s);
        } else {
            timeArr.push(s);
        }

        last_ms = last_ms % 1000;
        var ms = Math.floor(last_ms / 10);
        if (!ms) {
            timeArr.push('00');
        } else if (ms < 10) {
            timeArr.push('0' + ms);
        } else {
            timeArr.push(ms);
        }

        return timeArr;
    },

    /**
     * 检查指定shareTicket是否在存储记录中
     * @param shareTicket
     */
    isShareTicketSaved: function isShareTicketSaved(shareTicket) {
        tm.LOGD("tm.uitls.isShareTicketSaved: " + shareTicket);

        var valueStr = tm.localStorage.getItem('savedTickets');
        var savedTickets = null;

        tm.LOGD("valueStr: " + valueStr);

        if (valueStr) {
            savedTickets = JSON.parse(valueStr);
        }

        return savedTickets ? !!savedTickets[shareTicket] : false;
    },


    /**
     * 检查指定shareTicket是否为同一天
     * 以零点为界, 超过零点即为超过一天
     * @param shareTicket
     * @returns {boolean}
     */
    isShareTicketSameDay: function isShareTicketSameDay(shareTicket) {
        //
        tm.LOGD("tm.uitls.isShareTicketPassedDay: " + shareTicket);

        var valueStr = tm.localStorage.getItem('savedTickets');
        var savedTickets = null;

        tm.LOGD("valueStr: " + valueStr);

        if (valueStr) {
            savedTickets = JSON.parse(valueStr);
        }

        if (!savedTickets[shareTicket]) {
            tm.LOGD("shareTicket not saved: " + valueStr);
            return false;
        }

        var nowDate = new Date();
        var saveDate = new Date(savedTickets[shareTicket]);

        return nowDate.getDate() === saveDate.getDate();
    },


    /**
     * 清除一个保存的shareTicket
     * @param shareTicket
     */
    clearShareTicket: function clearShareTicket(shareTicket) {
        tm.LOGD("tm.uitls.clearShareTicket: " + shareTicket);

        var valueStr = tm.localStorage.getItem('savedTickets');
        var savedTickets = null;

        tm.LOGD("valueStr: " + valueStr);

        if (valueStr) {
            savedTickets = JSON.parse(valueStr);
        }

        if (savedTickets[shareTicket]) {
            delete savedTickets[shareTicket];

            // 回写保存
            valueStr = JSON.stringify(savedTickets);
            tm.localStorage.setItem('savedTickets', valueStr);
        }
    },


    /**
     * 检查指定shareTicket是否在存储记录中
     * @param shareTicket
     */
    saveShareTicket: function saveShareTicket(shareTicket) {
        tm.LOGD("tm.uitls.saveShareTicket: " + shareTicket);

        var valueStr = tm.localStorage.getItem('savedTickets');
        var savedTickets = {};

        tm.LOGD("valueStr: " + valueStr);

        if (valueStr) {
            savedTickets = JSON.parse(valueStr);
        }

        savedTickets[shareTicket] = new Date().getTime();

        //
        valueStr = JSON.stringify(savedTickets);
        tm.localStorage.setItem('savedTickets', valueStr);
    },


    /**
     * 接收到服务器返回的群id信息
     * @param data
     */
    onWechatDecrypt: function onWechatDecrypt(data) {
        tm.LOGD("tm.uitls.onWechatDecrypt: ", data);

        var callfunc = this._getDecryptCallback;
        var target = this._getDecryptTarget;
        var result = null;

        if (data.code === 0) {
            mySdk.account.wxgame_sessionKey = data.wxgame_sessionKey;

            var decryptData = JSON.parse(data['decryptMsg']);
            if (decryptData) {
                result = decryptData['openGId'];
            }
        }

        tm.LOGD("result openGId: ", result);

        if (callfunc) {
            if (target) {
                callfunc.call(target, result);
            } else {
                callfunc(result);
            }
        }

        this._getDecryptCallback = null;
        this._getDecryptTarget = null;
    },


    /**
     * 解密群分享的ShareTicket, 得到该群的id信息
     * @param shareTicket
     * @param callfunc
     * @param target
     */
    decryptShareTicket: function decryptShareTicket(shareTicket, callfunc, target, shareCb) {
        //
        tm.LOGD("tm.uitls.decryptShareTicket: " + shareTicket);

        var self = this;
        mySdk.shareApi.getShareInfo({
            "target": this,
            "shareTicket": shareTicket,
            "cb": function cb(flag, res, code) {
                if (flag) {
                    tm.LOGD("getShareInfo encryptedData: ", res.encryptedData);
                    tm.LOGD("_sendItemGive ", res.iv);

                    shareCb && shareCb(false, res, code);

                    if (code != -1 || !mySdk.account.wxgame_sessionKey) {
                        //  wxgame_sessionKey 过期
                        //
                        this._getDecryptCallback = callfunc;
                        this._getDecryptTarget = target;

                        if (!this._isDecryptShareTicketMsgReg) {
                            pm.game.listenMsg("game_wechatDecrypt", this.onWechatDecrypt, this);
                            this._isDecryptShareTicketMsgReg = true;
                        }

                        pm.game.requestMsg("game_wechatDecrypt", {
                            "iv": res.iv,
                            "encryptedData": res.encryptedData,
                            "code": code
                        });

                        return;
                    }

                    var resultString = self.decrypt(mySdk.account.wxgame_sessionKey, res.iv, res.encryptedData);
                    var decryptData = JSON.parse(resultString);
                    var result = decryptData ? decryptData['openGId'] : null;

                    if (callfunc) {
                        if (target) {
                            callfunc.call(target, result);
                        } else {
                            callfunc(result);
                        }
                    }
                } else {
                    // 失败，立即回调
                    if (callfunc) {
                        if (target) {
                            callfunc.call(target, null);
                        } else {
                            callfunc(null);
                        }
                    }

                    //self._getDecryptCallback = null;
                    //self._getDecryptTarget = null;

                    shareCb && shareCb(true);
                }
            }
        });
    },
    decrypt: function decrypt(key, iv, crypted) {
        var decoded = 0;
        try {
            crypted = new Buffer(crypted, 'base64');
            iv = new Buffer(iv, 'base64');
            key = new Buffer(key, 'base64');

            var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
            decipher.setAutoPadding(true);

            decoded = decipher.update(crypted, 'binary', 'utf8');
            decoded += decipher.final('utf8');
        } catch (err) {}

        return decoded;
    },


    /**
     * 获取当前时间 秒数
     * @returns {number}
     */
    getCurrTime: function getCurrTime() {
        return parseInt(new Date().getTime() / 1000);
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
        //# sourceMappingURL=tm_utils_funs.js.map
        