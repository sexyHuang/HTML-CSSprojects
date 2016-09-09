/**Created by sexyi on 2016/8/28.*/

/**
 * 浮出层类
 * @param element 浮出层内容
 * @constructor
 */
var FloatLayer = function (element) {
    this.ele = document.getElementById(element);
    this.body = document.body;
};

/**
 * 初始化浮出层
 */
FloatLayer.prototype.init = function () {
    var that = this,
        body = this.body;
    this.floatLayer = document.createElement('div');
    this.floatLayer.className = 'floatLayer';
    this.floatLayer.style = 'position:fixed; left: 0 ; top:0; width: 100%';
    this.floatLayer.style.display = 'none';
    this.floatLayer.style.height = window.innerHeight + 'px';
    this.ele.style = 'margin: 0 auto;';
    setCenter();
    //this.ele.style.marginTop = (window.innerHeight - that.ele.offsetHeight) / 2 + 'px';
    this.floatLayer.appendChild(this.ele);
    body.appendChild(this.floatLayer);
    this.floatLayer.addEventListener('click', function (event) {
        if (event.target.className !== 'floatLayer') {
            return;
        } else {
            that.close();
        }

    });

    window.onresize = function () {
        throttle(setCenter);
    };
    function setCenter() {
        that.floatLayer.style.height = window.innerHeight + 'px';
        that.ele.style.marginTop = (window.innerHeight - that.ele.offsetHeight) / 2 + 'px';
    }
};

/**
 * 浮出层展现接口
 */
FloatLayer.prototype.show = function () {
        this.body.style.overflow = 'hidden';
        this.floatLayer.style.display = 'block';
};
/**
 * 浮出层关闭接口
 */
FloatLayer.prototype.close = function () {
        this.body.style.overflow = 'auto';
        this.floatLayer.style.display = 'none';
};

/**
 * 函数节流器
 * @param method 目标函数
 * @param context 目标函数运行环境（可选）
 */
function throttle(method, context) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function () {
        method.call(context);
    }, 100);
}