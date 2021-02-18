"use strict";
cc._RF.push(module, '0af25M+MMFNWLgGansV8Mzg', 'lc_game_type');
// lcGame/scripts/utils/lc_game_type.js

"use strict";

/**
 *
 * 内容: 游戏用到的类型
 *
 */

window.lc = window.lc || {};

lc.GameType = lc.GameType || {};

lc.GameType = {};

// 元素类型
lc.GameType.ItemType = {
    "Invalid": "lc_itemType_invalid", // 无效
    "Prop": "lc_itemType_prop", // 道具
    "Sweets": "lc_itemType_sweets", // 糖果
    "Hinder": "lc_itemType_hinder", // 障碍物
    "Map": "lc_itemType_map", // 地图
    "Container": "lc_itemType_container" // 容器
};

// 组件类型
lc.GameType.ComType = {
    "Invalid": "lc_comType_invalid", // 无效
    "Move": "lc_comType_move", // 移动组件
    "Chance": "lc_comType_chance", // 选择组件
    "Remove": "lc_comType_remove", // 消除组件
    "Shape": "lc_comType_shape", // 外形组件
    "Beat": "lc_comType_beat", // 击打组件
    "Crash": "lc_comType_crash", // 撞击组件
    "Crashed": "lc_comType_crashed" // 被撞击组件
};

// 障碍物类型
lc.GameType.HinderType = {
    "Invalid": "lc_hinderType_invalid", // 无效
    "Box": "lc_hinderType_Box" // 蓝色糖果
};

// 糖果类型
lc.GameType.SweetsType = {
    "Invalid": "lc_sweetsType_invalid", // 无效
    "Blue": "lc_sweetsType_blue", // 蓝色糖果
    "Yellow": "lc_sweetsType_yellow", // 黄色糖果
    "Green": "lc_sweetsType_green", // 绿色糖果
    "Pink": "lc_sweetsType_pink", // 粉色糖果
    "Red": "lc_sweetsType_red" // 粉色糖果
};

// 地图类型
lc.GameType.MapType = {
    "RightTop": "lc_mapType_rightTop", // 右上角
    "RightBottom": "lc_mapType_rightBottom", // 右下角
    "LeftBottom": "lc_mapType_leftBottom", // 左下角
    "LeftTop": "lc_mapType_leftTop", // 左上角

    "Top": "lc_mapType_top", // 上边
    "Right": "lc_mapType_right", // 右边
    "Bottom": "lc_mapType_bottom", // 下边
    "Left": "lc_mapType_left", // 左边

    "RightTopIn": "lc_mapType_rightTopIn", // 右上内
    "RightBottomIn": "lc_mapType_rightBottomIn", // 右下内
    "LeftBottomIn": "lc_mapType_leftBottomIn", // 左下内
    "LeftTopIn": "lc_mapType_leftTopIn", // 坐上内

    "LeftTopGap": "lc_mapType_leftTopGap", // 左上角
    "RightTopGap": "lc_mapType_rightTopGap", // 右下内
    "RightBottomGap": "lc_mapType_rightBottomGap", // 左下内
    "LeftBottomGap": "lc_mapType_leftBottomGap" // 坐上内
};

cc._RF.pop();