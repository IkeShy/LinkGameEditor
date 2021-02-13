/**
 *  形状组件
 */
window.lc = window.lc || {};
lc.ComponentShape = cc.Class({
    extends: lc.ComponentBase,

    properties: {
        _shapeNode: null, // 形状精灵
    },

    ctor () {
        this._type = lc.GameType.ComType.Shape;
    },

    init () {
        if(this._item) {
            let spf = this._item.spf[0];
            let comNode = this._item.comNode;

            this._shapeNode = new cc.Node();
            let sp = this._shapeNode.addComponent(cc.Sprite);
            sp.spriteFrame = spf;
            sp.node.width = sp.node.width / 2;
            sp.node.height = sp.node.height / 2;
            comNode.addChild(this._shapeNode);

        }
    },


    doLogic () {
        // 如果开启
        if(this.enabled) {

        }
    },

    /**
     * 改变形状 -- 贴图
     */
    changeShape (spf) {
        if(this._shapeNode) {
            let sp = this._shapeNode.getComponent("cc.Sprite");
            if(sp) {
                sp.spriteFrame = spf;
            }
        }
    },

    destroy () {
        if(this._shapeNode) {
            this._shapeNode.removeFromParent(true);
            this._shapeNode = null;
        }

        this._super();
    }

});

