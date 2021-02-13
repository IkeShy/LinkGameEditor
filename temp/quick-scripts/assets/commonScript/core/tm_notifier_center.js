(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/commonScript/core/tm_notifier_center.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fc24frRVBVDDI6Vwy+z5bNB', 'tm_notifier_center', __filename);
// commonScript/core/tm_notifier_center.js

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 *
 * 注意: 标记为Ref的对象为引用对象, 不要在这个类改变属性.
 *
 */

var NotifierCenter = function () {
    function NotifierCenter() {
        _classCallCheck(this, NotifierCenter);

        this.events = {};
    }

    /**
     * 检查是否重复
     * @param observers
     * @param scope
     * @param handler
     * @returns {boolean}
     */


    _createClass(NotifierCenter, [{
        key: 'checkOverlap',
        value: function checkOverlap(observers, scope, handler) {
            var obs = null;
            for (var i = 0; obs = observers[i]; i++) {
                if (obs.scope == scope && obs.handler == handler) {
                    tm.LOGE(false, '[tm.NotifierCenter] 消息重复注册:' + ' function:' + handler.name);
                    return true;
                }
            }

            return false;
        }
        /**
         * 添加观察者
         * @param eventName
         * @param handler
         * @param scope
         */

    }, {
        key: 'register',
        value: function register(eventName, handler, scope) {
            if (typeof eventName != 'string' || typeof handler != 'function' || !scope) {
                tm.LOGE(false, 'tm.NotifierCenter listen err: eName :' + eventName + 'handler:' + handler + ' !scope : ' + scope);
                return;
            }

            var observers = this.events[eventName] || [];

            if (!this.checkOverlap(observers, scope, handler)) {

                var observer = { handler: handler, scope: scope };
                observers.push(observer);

                this.events[eventName] = observers;
            }
        }
        /**
         * 删除观察者
         * @param eventName
         * @param handler
         * @param scope
         */

    }, {
        key: 'ignore',
        value: function ignore(eventName, handler, scope) {
            if (arguments.length == 1) {
                this.ignoreScope(arguments[0]);
                return;
            }

            if (typeof eventName != 'string' || typeof handler != 'function' || !scope) {
                tm.LOGE(false, 'tm.NotifierCenter remove err: eName :' + eventName + 'handler:' + handler + ' scope: ' + scope);
                return;
            }

            //var observers = this.events[eventName],length = observers.length;
            //if (!observers || length <= 0) {
            //    return;
            //}

            var observers = this.events[eventName];
            if (!observers) {
                return;
            }

            var length = observers.length;
            if (length <= 0) {
                return;
            }

            for (var i = length - 1; i >= 0; i--) {
                var obs = observers[i];
                if (obs.scope == scope && obs.handler == handler) {
                    observers.splice(i, 1);
                    break;
                }
            }
        }

        /**
         * 触发事件
         * @param eventName
         * @param params
         */

    }, {
        key: 'trigger',
        value: function trigger(eventName, params) {

            if (typeof eventName != 'string') {
                tm.LOGE(false, 'tm.NotifierCenter trigger err: eventName :' + eventName);
                return;
            }

            var obs = this.events[eventName],
                ob;
            if (!obs) {
                return;
            }

            var args = Array.prototype.slice.call(arguments, 1);
            var length = obs.length;
            for (var i = length - 1; i >= 0; i--) {
                var ob = obs[i];
                if (ob) {
                    if (CC_DEBUG) {
                        ob.handler.apply(ob.scope, args);
                    } else {
                        try {
                            ob.handler.apply(ob.scope, args);
                        } catch (e) {
                            tm.notifierCenter.trigger(tm.Event.APP_CATCH, e);
                        }
                    }
                }
            }
        }
        /**
         * 删除scope相同的观察者
         * @param scope
         */

    }, {
        key: 'ignoreScope',
        value: function ignoreScope(scope) {
            if (typeof scope == 'string') {
                tm.LOGE(false, 'ignoreScope parameter error');
                return;
            }

            for (var eventName in this.events) {
                var obs = this.events[eventName];
                if (obs) {
                    var length = obs.length;
                    for (var i = length - 1; i >= 0; i--) {
                        var ob = obs[i];
                        if (ob['scope'] == scope) {
                            obs.splice(i, 1);
                        }
                    }
                }
            }
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.events = null;
        }
    }]);

    return NotifierCenter;
}();

tm.NotifierCenter = NotifierCenter;

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
        //# sourceMappingURL=tm_notifier_center.js.map
        