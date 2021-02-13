/**
 * 下方ui元素
 */
cc.Class({
    extends: tm.GameWapper,

    properties: {
        m_propRocket: cc.Node, // 火箭
        m_propBrush: cc.Node, // 刷子
        m_propBomb: cc.Node, // 炸弹
        m_propHammer: cc.Node, // 锤子
    },

    onLoad () {
        this._super();
    },

    onShow () {
        this._super();
    },

    onDestroy () {
        this._super();
    },

    /**
     * 火箭道具
     */
    onPropRocketFunc () {

    },

    /**
     * 刷子道具
     */
    onPropBrushFunc () {

    },

    /**
     * 炸弹道具道具
     */
    onPropBombFunc () {

    },

    /**
     * 锤子道具
     */
    onHammerFunc () {
        this.trigger(lc.Event.PropEvent.UseHammer, {use: true});
    }
});
