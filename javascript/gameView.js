/**
 * Created by banYing on 2017/8/24 0024.
 */


/* 全局变量
 * atuoTime：倒计时
 * level：当前等级 默认为 1级
 * beadNum：珠子基数
 * beatArr 当前数组
 * ansNum：当前等级答题次数
 * errorNum：当前错误次数
 * levelData: 每个的等级三次答题情况  格式：[{level1:[]},level2:[]......]
 * chose ：返回数据 存储每个等级选择是否正确  yes：答对  No：答错
 *
 */

var atuoTime,
    speed = "drop15",
    level = 1,
    beadNum = 5,
    beatArr = [],
    ansNum = 0,
    errorNum = 0,
    levelData = [],
    chose = [];


_event();

// 游戏内事件处理
function _event() {

    $('#goScreen2').click(function () {

        $('#screen1').remove()
        $('#screen2').show()

    })

    $('#goPractice').click(function () {


    })

    $('#goTest').click(function () {



    })


    $('.button[data-role="out"]').click(function () {

        _out()
    })


}


// 点击按钮事件处理
function _clickBtn(e) {



}


//设置答题界面 _setPart
function _setPart() {

    //清空界面


}


//游戏结束
function _over() {


    /* ajax 请求接口路径，返回json 数据
     * levelData: 每个的等级三次答题情况
     *
     * */

    var param = {

    }

    console.log('当前返回参数', JSON.stringify(param))

}

//游戏退出
function _out() {

    console.log('游戏退出')

}

/*** 果实降落A
 * i：执行次数
 * fn：降落结束回调
 ***/
function _beatDropA(i, fn) {

    var $beadW = $('.part').width()

    var atuoTime

    $('#basinA').addClass('even-no')

    var timeFn = function () {

        i = i - 1

        $('#partA').append('<div style="height: ' + $beadW * 0.26 + 'px" class="bead ' + speed + '"></div>')


        if (i == 0) {

            clearInterval(atuoTime)

            fn && fn.call(this)

            setTimeout(function () {

                $('#partA').children('.bead').remove()
                $('#basinA').removeClass('even-no')

            }, 1800)

        }

    }

    atuoTime = setInterval(timeFn, 300);

}



/*** 倒计时
 * i：时间
 * fn：倒计时结束回调
 ***/
function _time(i, fn) {

    $('#time').text(i)

    var timeFn = function () {

        i = i - 1

        $('#time').text(i)

        if (i == 0) {

            clearInterval(atuoTime)

            fn && fn.call(this)

        }

    }

    atuoTime = setInterval(timeFn, 1000);

}


/*** 数组随机
 * arr：数组
 * num：随机个数
 ***/
function _getArrayItems(arr, num) {

    var array = [];

    for (var index in arr) {

        array.push(arr[index]);
    }

    var return_array = [];

    for (var i = 0; i < num; i++) {

        if (array.length > 0) {

            var arrIndex = Math.floor(Math.random() * array.length);

            return_array[i] = array[arrIndex];

            array.splice(arrIndex, 1);

        } else {
            break;
        }
    }
    return return_array;
}

/*** 可均衡获取0到n的随机整数。
 * n：数组
 ***/
function _random(n) {

    return Math.floor(Math.random() * n)
}
