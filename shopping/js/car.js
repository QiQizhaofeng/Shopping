$(function () {
    //把全选复选框的状态值赋给三个小按钮
    $(".checkall").change(function () {
        var checkedall = $(this).prop("checked");
        $(".j-checkbox,.checkall").prop("checked", checkedall);
        //如果全选按钮被选中，添加背景
        if ($(this).prop("checked")) {
            $(".cart-item").addClass("check-cart-item");
        } else {
            //移除类名
            $(".cart-item").removeClass("check-cart-item");
        }
    })
    //当所有小按钮都被选中，就把全选按钮的checked值改为true，有一个小按钮未被选中就取消全选按钮
    $(".j-checkbox").change(function () {
        // console.log($(".j-checkbox:checked"));
        //被选中的小按钮的个数：$(".j-checkbox:checked").length  全部先按钮的个数：$(".j-checkbox").length
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);

        } else {
            $(".checkall").prop("checked", false);
        }
    })

    //点击＋按钮数量和金额发生变化
    $(".increment").click(function () {
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);
        // var str = $(this).parent().parent().siblings(".p-price").html();
        var str = $(this).parents(".p-num").siblings(".p-price").html(); //parents()所有父级元素
        var m = str.substr(1);
        console.log(m);
        var money = n * m;
        money = money.toFixed(2);
        //$(this).parent().parent().siblings(".p-sum").html("￥" + money);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + money);
        getSum();
    })

    //点击-按钮数量和金额发生变化
    $(".decrement").click(function () {
        var n = $(this).siblings(".itxt").val();
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n);
        var str = $(this).parents(".p-num").siblings(".p-price").html();
        var m = str.substr(1);
        var money = n * m;
        money = "￥" + money.toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").html(money);
        getSum();
    })

    //修改输入框的数值金额相应发生变化
    $(".itxt").change(function () {
        var n = $(this).val();
        var str = $(this).parents(".p-num").siblings(".p-price").html();
        var m = str.substr(1);
        var money = n * m;
        money = "￥" + money.toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").html(money);
        getSum();
    })
    //一开始就调用一次,算出一开始的金额
    getSum();
    //计算总计数量和金额封装函数
    function getSum() {
        var count = 0;
        var myMoney = 0;
        $(".itxt").each(function (i, ele) {
            count += parseInt($(ele).val());
        })
        $(".p-sum").each(function (i, ele) {
            myMoney += parseFloat($(ele).text().substr(1));
        })
        myMoney = myMoney.toFixed(2);
        $(".amount-sum em").text(count);
        $(".price-sum em").text("￥" + myMoney);
    }

    //购物车删除商品
    //1.点击删除按钮，删除本身
    $(".p-action").click(function () {
        $(this).parents(".cart-item").remove();
        getSum();
    })
    //2.点击清空购物车，删除全部孩子
    $(".clear-all").click(function () {
        $(".cart-item-list").empty();
        getSum();
    })
    //3.点击选中的商品，删除本身
    $(".remove-batch").click(function () {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    })

    //被选中的商品添加背景色
    $(".j-checkbox").change(function () {
        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    })


})
//保留小数点后两位：toFixed(2);
//返回祖先元素：parents();
//截取字符串：substr(1);
//删除类：removeClass()