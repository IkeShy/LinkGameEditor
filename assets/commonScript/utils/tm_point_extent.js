

window.tm = tm || {};

tm.pointExt = {
    ZERO: cc.v2(0.0, 0.0),
    _outV: cc.v2(0.0, 0.0),
};

tm.pointExt.pAdd = function (v1, v2, out) {
    if (!out) {
        return cc.v2(v1.x + v2.x, v1.y + v2.y);
    }

    out.x = v1.x + v2.x;
    out.y = v1.y + v2.y;
    return out;
};

tm.pointExt.pSub = function (v1, v2, out) {
    if (!out) {
        return cc.v2(v1.x - v2.x, v1.y - v2.y);
    }
    out.x = v1.x - v2.x;
    out.y = v1.y - v2.y;
    return out;
};

tm.pointExt.pMult = function (point, floatVar, out) {
    if (!out) {
        return cc.v2(point.x * floatVar, point.y * floatVar);
    }
    out.x = point.x * floatVar;
    out.y = point.y * floatVar;
    return out;
};

tm.pointExt.pMidpoint = function (v1, v2, out) {
    if (!out) {
        return cc.pMult(cc.pAdd(v1, v2), 0.5);
    }
    tm.pointExt.pAdd(v1, v2, out);
    tm.pointExt.pMult(out, 0.5, out);
    return out;
};

tm.pointExt.pDot = function (v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
};

tm.pointExt.pCross = function (v1, v2) {
    return v1.x * v2.y - v1.y * v2.x;
};

// 返回逆时针旋转 90 度后的新向量
tm.pointExt.pPerp = function (point, out) {
    if (!out) {
        return cc.v2(-point.y, point.x);
    }
    out.x = -point.y;
    out.y = point.x;
    return out;
};

//将指定向量顺时针旋转 90 度并返回。
tm.pointExt.pRPerp = function (point, out) {
    if (!out) {
        return cc.v2(point.y, -point.x);
    }
    out.x = point.y;
    out.y = -point.x;
    return out;
};

//返回 v1 在 v2 上的投影向量。
tm.pointExt.pProject = function (v1, v2, out) {
    if (!out) {
        return cc.pMult(v2, cc.pDot(v1, v2) / cc.pDot(v2, v2));
    }

    tm.pointExt.pMult(v2, tm.pointExt.pDot(v1, v2) / tm.pointExt.pDot(v2, v2), out);

    return out;
};

//返回指定向量长度的平方。
tm.pointExt.pLengthSQ = function (v) {
    return tm.pointExt.pDot(v, v);
};

// 返回指定向量的长度
tm.pointExt.pLength = function (v) {
    return Math.sqrt(tm.pointExt.pLengthSQ(v));
};

// 2个向量之间的距离
tm.pointExt.pDistance = function (v1, v2) {
    return tm.pointExt.pLength(tm.pointExt.pSub(v1, v2, this._outV));
};

//返回一个长度为 1 的标准化过后的向量
tm.pointExt.pNormalize = function (v, out) {
    let n = tm.pointExt.pLength(v);

    if (!out) {
        return n === 0 ? cc.v2(v) : cc.pMult(v, 1.0 / n);
    }

    if (n === 0) {
        out.x = v.x;
        out.y = v.y;

    } else {
        tm.pointExt.pMult(v, 1.0 / n, out);
    }

    return out;
};

// 将弧度转换为一个标准化后的向量，返回坐标 x = cos(a) , y = sin(a)。
tm.pointExt.pForAngle = function (a, out) {
    if (!out) {
        return cc.v2(Math.cos(a), Math.sin(a));
    }
    out.x = Math.cos(a);
    out.y = Math.sin(a);
    return out;
};

//返回指定向量的弧度。
tm.pointExt.pToAngle = function (v) {
    return Math.atan2(v.y, v.x);
};

// 度数转换成弧度
tm.pointExt.Angle2Radian = function (angle) {
    return (Math.PI/180) * angle;
};