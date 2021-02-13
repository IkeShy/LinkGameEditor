/**
 *
 * 内容:
 *
 *  我的账号 <myAccount> 命名空间初始化
 *
 */

window.myAccount = window.myAccount || {};

myAccount.AuthState = {
    OK:1, //已经授权
    FIRST:2,//第一次调用相关接口，自动弹出授权
    REFUSED:3 //拒绝过的授权
};

module.exports = window.myAccount;