/**
 * 游戏的线
 */
cc.Class({
    extends: tm.GameWapper,

    properties: {
        line: cc.Node, // 连线8方向
    },

    onLoad () {
        this._super();
    },

    show () {
        this.node.active = true;
    },

    pos (x, y) {
        this.node.x = x;
        this.node.y = y;
    },

    setHigh (value) {
        this.line.height = value;
    },

    hide () {
        this.node.active = false;
    },

    setRotation(value) {
        this.node.rotation = value;
    },

    /**
     * 设置线的颜色
     * @param color
     */
    setLineColor (color) {
        this.line.color = cc.color(0, 0, 0).fromHEX(color);
    },
});
