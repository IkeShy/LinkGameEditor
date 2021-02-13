(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/commonScript/mgr/tm_game_mgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ad705+CxC9FtJPGlSnPFCbl', 'tm_game_mgr', __filename);
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
        //# sourceMappingURL=tm_game_mgr.js.map
        