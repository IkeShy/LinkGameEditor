(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/utils/lc_event_type.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '51eb2gT6+JLd7PAZcol/3NO', 'lc_event_type', __filename);
// lcGame/scripts/utils/lc_event_type.js

"use strict";

/**
 *
 * 内容: 平台---事件、常量定义
 *
 */

window.lc = window.lc || {};

lc.Event = lc.Event || {};

lc.Event = {};

lc.Event.GameEvent = {
    LevelLoadSuccess: "lc_Event_GameEvent_LevelLoadOver", // 关卡加载成功

    AddScore: "lc_Event_GameEvent_AddScore",
    AddStepCount: "lc_Event_GameEvent_AddStepCount",
    SubStepCount: "lc_Event_GameEvent_SubStepCount",

    RefreshStep: "lc_Event_GameEvent_RefreshStep",
    RefreshAllScore: "lc_Event_GameEvent_RefreshAllScore",
    RefreshAchieveScore: "lc_Event_GameEvent_RefreshAchieveScore",

    HideLastLine: "lc_Event_GameEvent_HideLastLine",
    CrashOtherContainer: "lc_Event_GameEvent_CrashOtherContainer"

    // 道具相关事件
};lc.Event.PropEvent = {
    UseHammer: "lc_Event_PropEvent_UseHammer" // 使用锤子
};

lc.Event.Ctrl = {
    ChangeSkinModel: "lc_Event_Ctrl_Change_Skin_Model"
};

/**
 * ui名字
 * @type {{LoginIn: string, Show_Ui: string}}
 */
lc.Event.UiName = {};

/**
 * 编辑器事件
 * @type {{ChangeMap: string}}
 */
lc.Event.Edit = {
    ChooseMap: 'lc_Event_Edit_ChooseMap', // 选择地图
    ShowMapEle: 'lc_Event_Edit_ShowMapEle', // 显示地图元素
    IsOpenMap: 'lc_Event_Edit_IsOpenMap', // 是否打开地图
    ShowMapBound: 'lc_Event_Edit_ShowMapBound', // 显示地图边框
    ChooseSweets: 'lc_Event_Edit_ChooseSweets', // 选择糖果
    ChooseHinder: 'lc_Event_Edit_ChooseHinder' // 选择障碍物
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
        //# sourceMappingURL=lc_event_type.js.map
        