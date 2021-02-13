/**
 *
 * 内容: 游戏用到的枚举
 *
 */

window.lc = window.lc || {};

lc.GameEnum = lc.GameEnum || {};
lc.GameEnum = {};

lc.GameEnum.CrashToType = cc.Enum({
    "Invalid": 0, // 无效
    "Left" : 1,  // 左
    "Right" : 2,  // 右
    "Up" : 3,  // 上
    "Down" : 4,  // 下

    "LeftUpAndRightDown" : 5,  // 左上和右下
    "RightUpAndLeftDown" : 6,  // 左下和右上

    "Row" : 7,  // 行
    "Vertical" : 8,  // 竖
    "Cross" : 9,  // 十字

    "MiZi": 10 // 米字
});
