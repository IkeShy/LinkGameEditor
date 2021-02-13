/**
 * loading 界面
 */
cc.Class({
    extends: cc.Component,

    properties: {
        title:cc.Label,

        bg:cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._aniCtrl = this.getComponent(cc.Animation);
        this.node.active = false;
        tm.notifierCenter.register(tm.Event.EVT_POP_COMMON_LOADING_EFFECT, this.onShowEffect, this);
    },

    onDestroy(){
        tm.notifierCenter.ignoreScope(this);
    },

    onShowEffect(args){

        let bShow = args;
        if(typeof args == 'boolean'){
            this.title.node.active = false;
            this.bg.height = this.bg.width;
        }else {
            let info = args;
            bShow = info.bShow;

            if(info.title){
                this.title.node.active = true;
                this.title.string = info.title;
                this.bg.height = this.bg.width + 20;
            }
        }

        if(bShow){
            this._aniCtrl.play("common_effect_loading");
            this.node.active = true;
        }else {
            this.node.active = false;
        }
    },

    start () {

    },

    // update (dt) {},
});
