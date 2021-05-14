window.addEventListener('load', function () {
    var focus = document.querySelector('.focus');
    var arrow_l = document.querySelector('.arrow_l');
    var arrow_r = document.querySelector('.arrow_r');
    var focusWidth = focus.offsetWidth;
    //经过盒子显示左右按钮
    focus.addEventListener('mouseover', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        //鼠标经过停止自动轮播
        clearTimeout(timer);
    })
    //离开盒子隐藏左右按钮
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        //鼠标经过开启自动轮播
        timer = setInterval(function () {
            //手动调用点击事件:事件源.事件类型();
            arrow_r.click();
        }, 2000);
    })
    //创建添加小圆点
    var ul = focus.querySelector('ul');
    var circle = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        circle.appendChild(li);
        circle.children[0].className = 'current';
        //点击小圆圈，图片发送变化

        li.addEventListener('click', function () {
            //排他思想
            var focusWidth = focus.offsetWidth;
            var index = this.getAttribute('index');
            //把索引号给小圆圈和图绑定在一起
            num = index;
            round = index;
            fn(ul, -focusWidth * index, 15);
            circleChange();
        })
    }
    var num = 0;
    //控制小圆圈
    var round = 0;
    //克隆第一个小li
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //节流阀
    var flag = true;
    //点击右侧按钮滚动图片
    arrow_r.addEventListener('click', function () {
        if (flag) {
            //关闭节流阀
            flag = false;
            //无缝滚动
            //如果在最后一张图，跳转到第一张图
            if (num == ul.children.length - 1) {
                num = 0;
                ul.style.left = 0;
            }
            num++;
            fn(ul, -focusWidth * num, 15, function () {
                flag = true;
            });
            //小圆点和右按钮同步

            round++;
            //如果是第四个小圆圈，就跳转到第一个小圆圈（0）
            // if (round == ul.children.length - 1) {
            //     round = 0;
            // }
            round = round == ul.children.length - 1 ? 0 : round;
            //排他思想
            circleChange();
        }
    })
    //点击左侧按钮滚动图片
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            //无缝滚动
            //如果是第一个，让图跳转到最后一张图
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            fn(ul, -focusWidth * num, 15, function () {
                flag = true;
            });

            //小圆点和左按钮同步
            round--;
            //说明第一张图，小圆圈要改为第四个（3）
            // if (round < 0) {
            //     round = circle.children.length - 1;
            // }
            round = round < 0 ? circle.children.length - 1 : round;
            //排他思想
            circleChange();
        }

    })
    //封装排他函数
    function circleChange() {
        for (var i = 0; i < circle.children.length; i++) {
            circle.children[i].className = '';
        }
        circle.children[round].className = 'current';
    }
    //自动轮播效果(定时器)
    var timer = setInterval(function () {
        //手动调用点击事件:事件源.事件类型();
        arrow_r.click();
    }, 2000);
    //节流阀：防止轮播按钮连续点击造成播放过快
    //目的：上一个函数动画结束以后再执行下一个函数动画
    //核心思路：利用回调函数，添加一个变量来控制，锁住和解锁函数

    //电梯导航
    //防止刷新被隐藏封装函数
    //点击了小li此时不执行页面滚动事件
    toggleTool();
    $(".floor").each(function (i, e) {
        if ($(document).scrollTop() >= $(e).offset().top) {
            console.log(i);
            //链式编程
            $(".fixedtool li").eq(i).addClass("current").siblings().removeClass("current");
        }
    })
    function toggleTool() {
        var recomTop = $(".recom").offset().top;
        if ($(window).scrollTop() >= recomTop) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        }
    }

    $(window).scroll(function () {
        toggleTool();
        //当内容滚动到内容区域某个模块，相应的小li改变背景颜色
        if (flag) {
            $(".floor").each(function (i, e) {
                if ($(document).scrollTop() >= $(e).offset().top) {
                    console.log(i);
                    //链式编程
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass("current");
                }
            })
            console.log(22222);
        }
    })


    //点击li相应的li换背景颜色
    $(".fixedtool li").click(function () {
        flag = false;
        $(".fixedtool li").removeClass("current");
        $(this).addClass("current");
        //点击小li当前小li距离顶部的距离
        var current = $(".floor").eq($(this).index()).offset().top;
        //让页面滚动到这个位置
        $("body,html").stop().animate({
            scrollTop: current
        }, function () {
            flag = true;
        })
    })


})