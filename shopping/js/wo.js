//加载完以后执行
window.addEventListener('load', function () {
    //显示隐藏
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    preview_img.addEventListener('mouseover', function () {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    //移动小图
    preview_img.addEventListener('mousemove', function (e) {
        var x = e.pageX - preview_img.offsetLeft;
        var y = e.pageY - preview_img.offsetTop;
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        var maskMax = preview_img.offsetWidth - mask.offsetWidth;//遮挡层最大移动距离
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        }
        else if (maskY >= maskMax) {
            maskY = maskMax;
        }
        mask.style.top = maskY + "px";
        mask.style.left = maskX + "px";
        //大图一起移动 大图移动距离=遮挡层移动距离*大图最大移动距离/遮挡层最大移动距离
        var bigImg = document.querySelector('.bigImg');
        var big = document.querySelector('.big');
        var bigMax = bigImg.offsetWidth - big.offsetWidth;//大图最大移动距离
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        //大图和小图移动方向相反
        bigImg.style.top = -bigY + "px";
        bigImg.style.left = -bigX + "px";
    })

})