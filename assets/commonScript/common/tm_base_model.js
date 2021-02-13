/**
 *
 * 内容: tm.BaseModel
 *
 */

window.tm = window.tm || {};

tm.BaseModel = cc.Class({

    properties:{
        _notifierCenter:null,
        _callbacks:null,
        model_name:null,

        data:{

            get: function () {
                return this._data;
            },

            set: function (value) {
                //this._data = cc.clone(value);
                this._data = JSON.parse(JSON.stringify(value));
            }
        }
    },
    /**
     * arg0: name
     * arg1: 触发器
     */
    ctor:function() {
        this.model_name = arguments[0];
        this._notifierCenter = arguments[1];

        this.CHANGE_MSG = this.model_name + '_change';
    },


    destroy : function () {
        this._data = null;
        this.model_name = null;

        this._super();
    },

    getValue: function (key, defaultValue) {
        if (!this._data || this._data[key] === undefined) {
            return defaultValue
        }
        return this._data[key]
    },

    setValue: function (key, value, isTrigger) {
        if (this._data[key] != undefined) {
            this._data[key] = value
        } else return;

        isTrigger = typeof isTrigger == 'Boolean' ? isTrigger : true;
        if (isTrigger) {
            this._notifierCenter.trigger(this.CHANGE_MSG, key, value)
        }
    },

    parse : function (result) { }
});


module.exports = tm.BaseModel;