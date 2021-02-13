/**
 * 内容:
 */

require("./index");

/**
 * 用户性别
 * @type {{MAN: number, WOMAN: number}}
 */
myAccount.Sex = {
    MAN: 1,
    WOMAN: 2,
};

/**
 * 用户登陆事件
 */
myAccount.Event = {
    MYACCOUNT_EVENT_LOGIN_OK: "myAccount_event_login_ok",
    MYACCOUNT_EVENT_LOGIN_FAIL: "myAccount_event_login_fail",
};

/**
 * 触发分享方式
 * 统计使用
 * @type {{SYS_RIGHT_TOP_SHARE: string}}
 */
myAccount.ShareType = {
    RT_SHARE:1, //微信小游戏右上角点击转发,被动转发
    ACCORD_SHARE:2 //小游戏中，点击转发
};


myAccount.SrImgType = {
    URL:"URL",
    MAKE_LOCALITY:"MAKE_LOCALITY"
};