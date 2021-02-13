/**
 *
 * 内容: 游戏管理器，用于创建游戏/APP
 *
 */

window.tm = tm || {};

tm.appMgr = {

    _gameMap:{},

    createGame:function (id, cls) {
        var game = this._gameMap[id];
        if(game){
            return game;
        }
        game = new cls(id);

        this._gameMap[id] = game;
        return game;
    },

    getGame:function (id) {
        return this._gameMap[id];
    },

    destroy:function () {
        this._gameMap = null;
    },
};

