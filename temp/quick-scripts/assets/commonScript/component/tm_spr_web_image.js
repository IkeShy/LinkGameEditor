(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/commonScript/component/tm_spr_web_image.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ebffd9p3mhCs5/V39sS39uH', 'tm_spr_web_image', __filename);
// commonScript/component/tm_spr_web_image.js

"use strict";

/**
 * 网络资源
 */

cc.Class({
    extends: cc.Component,

    properties: {
        _bDestroy: false,

        sprImg: {
            default: null,
            type: cc.Sprite
        },

        url: {
            get: function get() {
                return this._url;
            },

            set: function set(url) {
                if (!url || this._url == url) {
                    return;
                }
                this._url = url;

                this.loadImage();
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:

    ctor: function ctor() {

        this._bDestroy = false;
    },

    onLoad: function onLoad() {},


    onDestroy: function onDestroy() {
        this._bDestroy = true;
    },

    setUrl: function setUrl(url) {
        if (this._url == url) {
            return;
        }

        this._url = url;
        this.loadImage();
    },
    getUrl: function getUrl() {
        return this._url;
    },


    loadCallBack: function loadCallBack(error, tex) {
        if (this._bDestroy) {
            return;
        }
        if (error || !tex) {
            return;
        }

        if (this._url == tex.url) {
            this.updateSf(tex);
        }
    },

    updateSf: function updateSf(tex) {
        var spriteFrame = new cc.SpriteFrame(tex);
        if (spriteFrame) {
            this.sprImg.node.active = true;
            this.sprImg.spriteFrame = spriteFrame;
        }
    },


    loadImage: function loadImage() {
        if (cc.sys.isNative) {
            this.sprImg.node.active = false;
            var texture = cc.loader.getRes(this._url);
            if (texture) {
                if (!this._bDestroy) {
                    this.updateSf(texture);
                }
            } else {
                cc.loader.load(this._url, this.loadCallBack.bind(this));
            }
        }
    }

});

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
        //# sourceMappingURL=tm_spr_web_image.js.map
        