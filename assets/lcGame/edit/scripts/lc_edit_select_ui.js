/**
 * 编辑器 -- 编辑器选择ui
 *
 */
cc.Class({
    extends: tm.GameWapper,

    properties: {
        mapNode: cc.Node, // 地图节点
        sweetsNode: cc.Node, // 糖果节点
        hinderNode: cc.Node, // 障碍物节点
    },

    onLoad () {
        this._super();
        this.onClickMap();
    },


    onShow: function (data) {
        this._super();

    },

    /**
     * 点击地图选项
     */
    onClickMap: function () {
        this.mapNode.active = true;
        this.sweetsNode.active = false;
        this.hinderNode.active = false;
    },

    /**
     * 点击糖果选项
     */
    onClickSweet: function () {
        this.sweetsNode.active = true;
        this.mapNode.active = false;
        this.hinderNode.active = false;
    },

    /**
     * 点击障碍物选项
     */
    onClickHinder: function () {
        this.hinderNode.active = true;
        this.mapNode.active = false;
        this.sweetsNode.active = false;
    }

});
