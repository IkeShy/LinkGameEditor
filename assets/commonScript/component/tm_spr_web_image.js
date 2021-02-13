/**
 * 网络资源
 */

cc.Class({
    extends: cc.Component,

    properties: {
        _bDestroy: false,

        sprImg:{
            default:null,
            type:cc.Sprite
        },

        url:{
            get :function () {
                return this._url;
            },

            set:function (url) {
                if(!url || this._url == url){
                    return;
                }
                this._url = url;

                this.loadImage();
            }
        },
    },

    // LIFE-CYCLE CALLBACKS:

    ctor: function () {

        this._bDestroy = false;
    },

    onLoad () {

    },

    onDestroy:function () {
        this._bDestroy = true;
    },

    setUrl (url) {
        if(this._url == url) {
            return;
        }

        this._url = url;
        this.loadImage();
    },

    getUrl () {
        return this._url;
    },

    loadCallBack:function (error, tex) {
        if(this._bDestroy){
            return;
        }
        if(error || !tex){
            return;
        }

        if(this._url == tex.url) {
            this.updateSf(tex);
        }
    },

    updateSf(tex){
        let spriteFrame  = new cc.SpriteFrame(tex);
        if(spriteFrame) {
            this.sprImg.node.active = true;
            this.sprImg.spriteFrame = spriteFrame;
        }
    },

    loadImage:function () {
        if(cc.sys.isNative){
            this.sprImg.node.active = false;
            let texture = cc.loader.getRes(this._url);
            if(texture){
                if(!this._bDestroy){
                    this.updateSf(texture);
                }
            }else {
                cc.loader.load(this._url, this.loadCallBack.bind(this));
            }
        }
    }

});
