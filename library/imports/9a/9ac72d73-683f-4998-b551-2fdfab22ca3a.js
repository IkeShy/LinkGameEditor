"use strict";
cc._RF.push(module, '9ac721zaD9JmLVRL9+rIso6', 'lc_game_component_base');
// lcGame/scripts/compoent/lc_game_component_base.js

"use strict";

/**
 * 组件父类
 */
window.lc = window.lc || {};

lc.ComponentBase = cc.Class({

    properties: {
        item: {
            set: function set(value) {
                this._item = value;
            }
        },

        enabled: {
            get: function get() {
                return this._enabled;
            },

            set: function set(value) {
                this._enabled = value;
            }
        }, // 是否启用

        type: {
            get: function get() {
                return this._type;
            },

            set: function set(value) {
                this._type = value;
            }
        } // 组建类型
    },

    ctor: function ctor() {
        this.type = lc.GameType.ComType.Invalid;
    },
    init: function init() {},


    /**
     * 执行逻辑
     */
    doLogic: function doLogic(info) {},
    destroy: function destroy() {
        this.item = null;
    }
});

module.exports = lc.ComponentBase;

cc._RF.pop();