/**
 * 组件父类
 */
window.lc = window.lc || {};

lc.ComponentBase = cc.Class({

    properties: {
        item: {
            set: function (value) {
                this._item = value;
            }
        },

        enabled: {
            get: function () {
                return this._enabled;
            },

            set: function (value) {
                this._enabled = value;
            }
        }, // 是否启用

        type: {
            get: function () {
                return this._type;
            },

            set: function (value) {
                this._type = value
            }
        }, // 组建类型
    },

    ctor () {
        this.type = lc.GameType.ComType.Invalid;
    },

    init () {

    },

    /**
     * 执行逻辑
     */
    doLogic (info) {

    },

    destroy () {
        this.item = null;
    }


});

module.exports = lc.ComponentBase;
