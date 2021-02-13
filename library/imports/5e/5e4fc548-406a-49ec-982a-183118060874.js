"use strict";
cc._RF.push(module, '5e4fcVIQGpJ7JgqGDEYBgh0', 'lc_game_priority');
// lcGame/scripts/utils/lc_game_priority.js

"use strict";

/**
 *
 * 内容: 游戏用到的优先级
 *
 */

window.lc = window.lc || {};

lc.GamePriority = lc.GamePriority || {};

lc.GamePriority = {};

// 优先级
lc.GamePriority = {
  "Invalid": -1, // 无效
  "Sweets": 0, // 糖果
  "Prop": 0, // 道具
  "HinderBox": 1 // 障碍物--箱子
};

cc._RF.pop();