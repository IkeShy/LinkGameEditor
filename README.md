# 德州扑克项目 客户端工程 
编辑器：cocoscreator 2.0.9

## 客户端架构：说明

commonPrefab文件夹：
common_effect_loading -- 通用loading特效
event_mask_spr -- 通用点击遮罩
plt_common_sm_hint -- 通用提示框
progressBar -- 进度条
spr_web_image --  动态资源

commonSript文件夹：
commonSript/common/tm_base_model.js -- 数据模型基类
commonSript/common/tm_base_scene.js -- 场景模型基类
commonSript/common/tm_base_wapper.js -- 包装器模型基类
commonSript/common/tm_msg_model.js -- 网络协议模型
commonSript/component/tm_progress_timer.js --commonPrefab/progressBar  用脚本 计时器
commonSript/component/tm_spr_web_image.js -- commonPrefab/spr_web_image 加载网络图片用脚本
commonSript/core/tm_base_app_core.js -- 游戏核心基类
commonSript/core/tm_tm_notifier_center.js -- 事件中心
commonSript/core/tm_sound_core.js -- 音乐音效核心
commonSript/mgr/tm_game_mgr.js -- 游戏管理器
commonSript/mgr/tm_model_mgr.js -- 数据管理器
commonSript/mgr/tm_scene_mgr.js -- 场景管理器
commonSript/net/net_http_core.js -- http代码
commonSript/net/net_web_socket_core.js -- websocket代码
commonSript/utils/tm_event_type.js --通用事件定义
commonSript/utils/tm_local_storage.js --本地存储定义
commonSript/utils/tm_message_queue.js --消息队列
commonSript/utils/tm_point_extent.js -- 数学和点方法
commonSript/utils/tm_utils_funs.js -- 通用工具类方法

frame文件夹：-- 第三方库和账号系统
frame/lib -- 第三方代码库
frame/account -- 账号系统

games文件夹：-- 具体游戏玩法
view/prefab -- ui
view/scene -- 场景
script/core/pm_app_core.js  -- 游戏核心
script/items/ 游戏内元素
script/layers/ 游戏内ui

platform文件夹: -- 平台代码，公用数据。
cpt/plt_cpt_count_down.js  -- 倒计时插件
cpt/plt_ctrl_common_sm_hint.js  --  commonPrefab/plt_common_sm_hint 通用对话框脚本
cpt/plt_ctrl_preload_res_loading.js  -- 预加载资源

res/prefabricate/plt_ui/plt_load_progressNode.prefab -- loading组件
src/core/plt_app_core.js -- 平台应用初始化入口
src/mgr/plt_login_manage.js -- 登陆管理器（链接登录服务器，建立socket）
src/model/plt_user_info.js -- 用户数据模型，网络层缓存。
src/msgProtocol/plt_protocol_main.js  -- 网络层注册消息。
src/utils/plt_config.js -- 平台配置 应用id
src/utils/plt_utils_funs.js -- 平台方法
boot.js -- 框架初始化入口
login_scene_ctrl.js -- 登录场景控制器
plt_event_constant.js -- 平台消息
plt_string_constant.js -- 平台语言

## 1:启动流程
platform中boot.js 中启动相应代码
