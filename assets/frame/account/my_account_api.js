/**
 *
 * 内容: sdk接口
 *
 */

require("./index");

myAccount.api = (function (){

    /*****************逻辑***************/

    function init() {

        tm.notifierCenter.register(tm.Event.EVT_INIT_USER_INFO, _initUserInfo, this);
        
    }

    /**
     * 初始化userinfo
     * @param data
     * @private
     */
    function _initUserInfo (data) {
        myAccount.account.avatar = data.avatar;
        myAccount.account.nickName = data.nick_name;
        myAccount.account.phone = data.phone;
        myAccount.account.sex = data.sex;
        myAccount.account.trueName = data.true_name;
        //myAccount.account.userId = data.phone;
        myAccount.account.identity = data.identity;
        myAccount.account.invite = data.invite_code;

        tm.notifierCenter.trigger(tm.Event.EVT_REFRESH_USER_INFO);
    }

    /**
     * 通过数据改变userInfo数据
     * @param key
     * @param info
     * @private
     */
    function _changeUserInfoByKey (key, info) {
        if(myAccount.account[key]) {
            myAccount.account[key] = info;

            tm.notifierCenter.trigger(tm.Event.EVT_REFRESH_USER_INFO);
        } else {
            tm.LOGD("my_account_api ", "_changeUserInfo wrong Key: ", key);
        }
    }

    function linkServer(host, post) {
        tm.netSocketIo.linkServer(host, post)
    }

    /**savenick
     * 获取玩家昵称
     */
    function getUserNickName () {
        let nickName = myAccount.account.nickName;
        if(!nickName || nickName != "") {
            let phone = myAccount.account.phone.toString();
            if(phone.length > 10){
                nickName = phone.replace(phone.substring(3,7), "****");
            }else{
                nickName = phone;
            }
        }

        return nickName;
    }

    /**
     * 获取用户性别
     * @returns {number}
     */
    function getUserSex () {
        return myAccount.account.sex || 1;
    }

    /*******************用户数据http请求接口*************/

    /**
     * 保存性别到服务器
     */
    function saveSex2Server(sex) {
        let url = myAccount.config.ip + plt.HttpAct.User.SaveSex;
        let params = {
            "sex": sex
        };

        tm.netHttpCore.post(url, params, function (error, data) {
            if(!error){
                if(data.status == 0) {
                    _initUserInfo(data.data);
                }
            }
        }, this);
    }

    /**
     * 保存名字到服务器到服务器
     */
    function saveNickName2Server(name) {
        let url = myAccount.config.ip + plt.HttpAct.User.SaveNickName;
        let params = {
            "nick_name": name
        };

        tm.netHttpCore.post(url, params, function (error, data) {
            if(!error){
                if(data.status == 0) {
                    _initUserInfo(data.data);
                }
            }
        }, this);
    }

    /**
     * 保存用户账户
     */
    function saveUserAccount (account) {
        myAccount.account.accountNum = account;
    }

    /**
     * 保存用户密码
     */
    function saveUserPassWord (password) {
        myAccount.account.password = password;
    }

    /**
     * 获取服务器金币类型信息
     */
    function getGoldTypeInfo2Server () {
        let url = myAccount.config.ip + plt.HttpAct.Capital.Gold_Type;
        tm.netHttpCore.get(url, null, function (error, data) {
            if(!error){
                if(data.status == 0) {
                    myAccount.account.goldTypeInfo = data.data;
                    tm.notifierCenter.trigger(tm.Event.EVT_REFRESH_GOLD_TYPE_INFO);
                    tm.localStorage.setItem(tm.localStorageKey.GOLD_UPDATE_TYPE, {goldTypeName:myAccount.account.goldTypeInfo[0].type_name});
                    getGoldTypeName2LocalStorage();
                }
            }
        }, this);
    }

    function getGoldTypeName2LocalStorage(){
        let data = tm.localStorage.getItem(tm.localStorageKey.GOLD_UPDATE_TYPE);
        if(data != null && data != 'null'){
            myAccount.account.goldTypeName = data.goldTypeName;
        }else{
            if(myAccount.account.goldTypeInfo){
                myAccount.account.goldTypeName = myAccount.account.goldTypeInfo[0].type_name;
            }else{
                myAccount.account.goldTypeName = myAccount.String.GOLD_TYPE_DEFAULT_NAME;
            }
        }
    }

    /**
     * 获取金币类型名字
     */
    function getCurrGoldTypeInfo () {
        let info = null;
        if(myAccount.account.goldTypeName && myAccount.account.goldTypeInfo && myAccount.account.goldTypeInfo.length) {
            for (let i = 0; i <  myAccount.account.goldTypeInfo.length; i++) {
                let oneInfo =  myAccount.account.goldTypeInfo[i];
                if(oneInfo && oneInfo.type_name == myAccount.account.goldTypeName) {
                    info = oneInfo;
                    break;
                }
            }
        }

        return  info;
    }

    return {
        "init":init,
        "linkServer":linkServer,
        "getUserNickName": getUserNickName,
        "getUserSex": getUserSex,
        "saveSex2Server": saveSex2Server,
        "saveNickName2Server": saveNickName2Server,
        "saveUserAccount": saveUserAccount,
        "saveUserPassWord": saveUserPassWord,
        "getGoldTypeInfo2Server": getGoldTypeInfo2Server,
        "getCurrGoldTypeInfo": getCurrGoldTypeInfo,
        "getGoldTypeName2LocalStorage": getGoldTypeName2LocalStorage,
    }

})();

