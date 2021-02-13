/**
 *
 * 内容: 账号信息
 *
 */

require("index");
myAccount.account = {
    avatar: -1, // 头像
    nickName:"",
    phone: -1,
    sex:0,
    token: "",
    trueName: null,
    userId: "",
    identity: null, // 认证字段
    invite: null, // 邀请id

    accountNum: null, // 玩家游戏账号
    password: null, // 娃家游戏密码

    goldTypeInfo: null, // 金币类型数据
    goldTypeName: "GRT", // 金币类型名字

    server_ip: null, // socket ip
    server_port: null, // socket 端口

    isMe (userId) {
        return userId === this.userId;
    },
};