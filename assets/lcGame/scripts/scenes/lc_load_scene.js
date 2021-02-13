cc.Class({
    extends: cc.Component,

    properties: {
        _loadIndex: 0, // 当前index
        _resList: null, // 资源列表
    },

    onLoad: function () {
        this._resList = lc.game.asssetMgr.getResList();
        if(this._resList && this._resList.length) {
            this.preLoadRes();
        }
    },

    /*
     * 预加载资源
     */
    preLoadRes: function() {
        let res = this._resList[this._loadIndex];
        cc.loader.loadRes(res.url, res.type, (err, resource) => {
            if(err) {
                cc.error(err.message || err);
                return;
            }

            if (res.type === cc.Prefab) {
                lc.game.asssetMgr.addPrefab(res.url, resource);
            }

            this._loadIndex ++;

            if (this._loadIndex < this._resList.length) {
                this.preLoadRes();
            }
            else {
                tm.notifierCenter.trigger(tm.Event.EVT_RES_RELOAD_FINISH);
                tm.sceneMgr.preloadScene("lc_game_scene");
                //tm.sceneMgr.preloadScene("lc_edit_scene");
                tm.LOGD(true, "进入游戏");
            }
        }); 
    },

});
