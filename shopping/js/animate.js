function fn(obj, target, s, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        //步长值写到定时器里面
        //把步长值改为整数（正值往上取整）Math.ceil()  (负值往小了取) Math.floor() 预防出现小数影响目标位置的准确性
        var step = (target - obj.offsetLeft) / 10;
        var step = step > 0 ? Math.ceil(step) : Math.floor(step)
        //计时器的结束条件:(目标值-现在的位置)/10
        if (obj.offsetLeft == target) {
            //利用定时器不断重复这个操作
            clearInterval(obj.timer);
            // if (callback) {
            //     callback();
            // }
            callback && callback();
        } else {
            obj.style.left = obj.offsetLeft + step + 'px';
        }
        //注意元素要添加定位，才能使用 element.style.left
    }, s);
}
