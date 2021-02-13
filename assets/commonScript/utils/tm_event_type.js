/**
 * app通用事件定义
 */

window.tm = window.tm || {};

tm.Event = {
    /***** App *******/
    APP_CATCH:"tm_event_app_catch", //app报错崩溃

    /*****  网络 ******/
    //发送HTTP请求前,用来显示转菊花
    EVT_NET_HTTP_POST_BEFORE: "EVT_NET_HTTP_POST_BEFORE",

    //SOCKET还没初始化
    EVT_NET_WEB_SOCKET_UNINIT:"EVT_NET_WEB_SOCKET_UNINIT",
    //链接成功
    EVT_NET_WEB_SOCKET_CONNECT:"EVT_NET_WEB_SOCKET_CONNECT",
    //被断开链接
    EVT_NET_WEB_SOCKET_DISCONNECT:"EVT_NET_WEB_SOCKET_DISCONNECT",
    //没有链接成功
    EVT_NET_WEB_SOCKET_UNCONNECT:"EVT_NET_WEB_SOCKET_UNCONNECT",
    //开始重新连接
    EVT_NET_WEB_SOCKET_RECT_BEGIN:"EVT_NET_WEB_SOCKET_RECT_BEGIN",
    //重新连接失败
    EVT_NET_WEB_SOCKET_RECT_ERROR:"EVT_NET_WEB_SOCKET_RECT_ERROR",

    //无网络链接
    EVT_NET_NO_NETWORK:"EVT_NET_NO_NETWORK",

    EVT_NET_WEB_PING_UPDATE:"EVT_NET_WEB_PING_UPDATE",

    /***** 系统 ******/
    EVT_SYS_GAME_HIDE:"EVT_SYS_GAME_HIDE",
    EVT_SYS_GAME_SHOW:"EVT_SYS_GAME_SHOW",

    /***** 音乐/音效 开关事件************/
    EVT_SOUND_OPEN_STATE_UPDATE:"EVT_SOUND_OPEN_STATE_UPDATE",

    //时间同步
    GAME_SYNC_TIME:"game_sync_time",

    //弹出提示条事件
    EVT_POP_COMMON_SM_HINT:"evt_pop_common_sm_hint",
    //Loading特效事件
    EVT_POP_COMMON_LOADING_EFFECT:"evt_pop_loading_effect",
    //弹出对话框
    EVT_POP_COMMON_DIALOG_BOX:"evt_pop_common_dialog_box",

    // 显示通用跑马灯
    EVT_SHOW_COMMON_SCROLL_MSG: "evt_show_common_scroll_msg",

    // 调整背景音乐大小
    EVT_CHANGE_BG_MUSIC_VAL: "evt_change_bg_music_val",

    // 调整音效大小
    EVT_CHANGE_EFFECT_VAL: "evt_change_effect_val",

    // 初始化用户数据
    EVT_INIT_USER_INFO: "evt_init_user_info",

    // 初始化用户数据
    EVT_REFRESH_USER_INFO: "evt_refresh_user_info",

    // 刷新金币类型数据
    EVT_REFRESH_GOLD_TYPE_INFO: "evt_refresh_gold_type_info",

    // 修改金币类型
    EVT_UPDATE_GOLD_TYPE: "evt_update_gold_type",

    // 资源加载完毕
    EVT_RES_RELOAD_FINISH: "evt_res_reload_finish",
};


tm.String = {
    NET_ERROR:"您的网络好像不太给力，请稍后再试",
    NO_NETWORK_HINT:"当前网络不可用，请检你的网络设置",
    NET_RECONNECT:"重连中",

    NET_RECONNECT_HINT:"网络不稳定，重新连接",

    BTN_CANCEL:"取消",
    BTN_ENTER:"确定",

    TITLE_YICHANG:"异常",

    TITLE_TISHI:"友情提示",

    LOADING:"加载中"
};

/**
 * 节点点击事件
 * @type {{TOUCH_START: string, TOUCH_MOVE: string, TOUCH_END: string, TOUCH_CANCEL: string}}
 */
tm.NodeEventType = {
    TOUCH_START: cc.Node.EventType.TOUCH_START,
    TOUCH_MOVE: cc.Node.EventType.TOUCH_MOVE,
    TOUCH_END: cc.Node.EventType.TOUCH_END,
    TOUCH_CANCEL: cc.Node.EventType.TOUCH_CANCEL,
}