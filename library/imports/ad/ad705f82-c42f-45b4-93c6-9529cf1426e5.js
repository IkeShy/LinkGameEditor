"use strict";
cc._RF.push(module, 'ad705+CxC9FtJPGlSnPFCbl', 'tm_game_mgr');
// commonScript/mgr/tm_game_mgr.js

"use strict";

/**
 *
 * 内容: 游戏管理器，用于创建游戏/APP
 *
 */

window.tm = tm || {};

tm.appMgr = {

    _gameMap: {},

    createGame: function createGame(id, cls) {
        var game = this._gameMap[id];
        if (game) {
            return game;
        }
        game = new cls(id);

        this._gameMap[id] = game;
        return game;
    },

    getGame: function getGame(id) {
        return this._gameMap[id];
    },

    destroy: function destroy() {
        this._gameMap = null;
    }
};

cc._RF.pop();