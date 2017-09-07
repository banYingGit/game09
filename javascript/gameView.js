/**
 * Created by banYing on 2017/8/24 0024.
 */


/* 全局变量
 * atuoTime：倒计时
 * atuoDropA：小叶子下落定时器
 * curIndex 当前下降数量 默认30
 * curClick 当前点击次数 0
 * levelData: 每个的等级三次答题情况  格式：[{level1:[]},level2:[]......]
 * chose ：返回数据 存储每个等级选择是否正确  yes：答对  No：答错
 */

var atuoTime,
    atuoDrop,
    curIndex = 30,
    curClick = 0,
    levelData = [],
    chose = [];

/* 全局变量
 * sourcesY：黄色叶子
 * sourcesV: 紫色叶子
 * sourcesO：橘黄色叶子
 * sourcesG：绿色叶子
 * sourcesSum：16个叶子汇总
 * sorecesBtn：随机底部4个叶子按钮
 */

var sourcesY = [
        {"name": "s11", "color": "yellow", "shape": "A"},
        {"name": "s12", "color": "yellow", "shape": "B"},
        {"name": "s13", "color": "yellow", "shape": "C"},
        {"name": "s14", "color": "yellow", "shape": "D"}
    ],
    sourcesV = [
        {"name": "s21", "color": "violet", "shape": "A"},
        {"name": "s22", "color": "violet", "shape": "B"},
        {"name": "s23", "color": "violet", "shape": "C"},
        {"name": "s24", "color": "violet", "shape": "D"}
    ],
    sourcesO = [
        {"name": "s31", "color": "orange", "shape": "A"},
        {"name": "s32", "color": "orange", "shape": "B"},
        {"name": "s33", "color": "orange", "shape": "C"},
        {"name": "s34", "color": "orange", "shape": "D"}
    ],
    sourcesG = [
        {"name": "s41", "color": "green", "shape": "A"},
        {"name": "s42", "color": "green", "shape": "B"},
        {"name": "s43", "color": "green", "shape": "C"},
        {"name": "s44", "color": "green", "shape": "D"}
    ],
    sourcesSum = sourcesY.concat(sourcesV).concat(sourcesO).concat(sourcesG),

    sorecesBtn = [];

/* 全局变量
 * num：10-20 个小叶子 用于分布左右叶子数量
 * leafArrA：左边小叶子数组 监听颜色
 * leafArrB：右边小叶子数组 监听形状
 * leafArr: 30个小叶子数组
 * areaArr: 坐标位置 30个
 */

var num = [],

    leafArrA = [],

    leafArrB = [],

    leafArr = [],

    areaArr = [];

for (var i = 10; i < 21; i++) {

    num.push(i)

}
for (var i = 0; i < 15; i++) {

    areaArr.push("left")
    areaArr.push("right")

}
var $areaArr = _getArrayItems(areaArr, 30)

_event();


// 游戏内事件处理
function _event() {

    $('#goScreen2').click(function () {

        $('#screen1').remove()
        $('#screen2').show()

    })

    $('#goPractice').click(function () {

        $('#screen2').remove()

        $('#list').show().attr('data-role', 'practice')

        _setPart(15)

    })

    $('#goTest').click(function () {

        $('#screen3').remove()

        $('#list').show().attr('data-role', '')

        $('#stopBntBox').show()

        curClick = 0

        curIndex = 30

        levelData = []

        _setPart(30)

        _time(360, function () {

            clearInterval(atuoDrop)

            setTimeout(function () {

                _over()

            }, 2000)


        })


    })

    $('#stop').click(function () {

        clearInterval(atuoTime)
        clearInterval(atuoDrop)

        $('#stopBox').show()

        $('#list').hide()

    })

    $('#continue').click(function () {

        $('#stopBox').hide()

        $('#list').show()

        _leafDrop(curIndex, function () {

            clearInterval(atuoTime)

            setTimeout(function () {

                _over()

            }, 2000)

        })

        var $timeB = $('#hideTime').text()

        _time($timeB, function () {

            clearInterval(atuoDrop)

            setTimeout(function () {

                _over()

            }, 2000)


        })

    })

    $('.button[data-role="out"]').click(function () {

        _out()
    })


}


// 点击按钮事件处理
function _clickBtn(e) {

    var getArea = $('#leafDrop').attr('data-area'),
        getColor = '',
        getShape = '';

    var $getBtnColor = $(e.target).attr('data-color'),

        $getBtnShape = $(e.target).attr('data-shape')

    $('#leafDrop').addClass('result')

    $('#leafBtn li p').removeAttr('onclick')


    var $level = "leaf" + (30 - curIndex),

        $obj = {};

    chose = []

    if (getArea == 'left') {

        if ($('#list').attr('data-role') == "practice") getColor = $('#leafDrop').attr('data-color')

        if ($getBtnColor == getColor) {

            //此处颜色判断正确
            $('#leafDrop').attr('data-result', '✔')
            chose.push("Yes")
            chose.push("color")

        } else {

            //此处颜色判断错误
            $('#leafDrop').attr('data-result', '✖')
            chose.push("No")
            chose.push("color")

        }


    } else if (getArea == 'right') {

        getShape = $('#leafDrop').attr('data-shape')

        if ($getBtnShape == getShape) {

            //此处形状判断正确
            $('#leafDrop').attr('data-result', '✔')
            chose.push("Yes")
            chose.push("shape")

        } else {

            //此处形状判断错误
            $('#leafDrop').attr('data-result', '✖')
            chose.push("No")
            chose.push("shape")

        }

    }


    setTimeout(function () {

        $('#leafDrop').animate({'opacity': '0'}, 500)

    }, 500)


    if ($('#list').attr('data-role') == "practice") {

        curClick = curClick + 1

        if (curClick >= 4) {

            //练习4次结束
            clearInterval(atuoDrop)

            setTimeout(function () {

                $('#list').hide()

                $('#screen3').show()

            }, 2000)


        }
    } else {

        $obj[$level] = chose

        levelData.push($obj)

        console.log('levelData', levelData)

    }

}


//设置界面 _setPart
//leafNum:掉下叶子数量
function _setPart(leafNum) {

    //清空界面
    $('#leafBtn , #leafBox').empty()

    var $btnIndex = _getArrayItems([0, 1, 2, 3], 4)

    //设置底部四个按钮  sorecesBtn 四个按钮数组

    sorecesBtn.push(sourcesY[$btnIndex[0]])

    sorecesBtn.push(sourcesV[$btnIndex[1]])

    sorecesBtn.push(sourcesO[$btnIndex[2]])

    sorecesBtn.push(sourcesG[$btnIndex[3]])

    for (var i = 0; i < 4; i++) {

        $('#leafBtn').append('<li><p class="' + sorecesBtn[i].name + '" data-color="' + sorecesBtn[i].color + '" data-shape="' + sorecesBtn[i].shape + '"></p></li>')

    }

    //获取小叶子左右个数
    var $numA = _getArrayItems(num, 1)[0],

        $numB = 30 - $numA
    //小叶子数组  $repeatLeaf一共12个  $repeatLeafSum 一共36个
    var $repeatLeaf = _repeat(sourcesSum, sorecesBtn),

        $repeatLeafSum = $repeatLeaf.concat($repeatLeaf).concat($repeatLeaf)

    //设置左右小叶子

    leafArrA = _getArrayItems($repeatLeafSum, $numA)

    leafArrB = _getArrayItems($repeatLeafSum, $numB)


    var $leafArr = leafArrA.concat(leafArrB)

    leafArr = _getArrayItems($leafArr, 30)


    // console.log('$numA,$numB', $numA, $numB)
    //
    // console.log('leafArr', leafArr)

    console.log('leafNum', leafNum)

    _leafDrop(leafNum, function () {

        clearInterval(atuoTime)

        setTimeout(function () {

            _over()

        }, 2000)


    })


}


/*** 叶子降落
 * i：执行次数
 * fn：降落结束回调
 ***/
function _leafDrop(i, fn) {

    var screenH = $(document).height()

    // console.log('$areaArr', $areaArr)


    $('#leafBtn li p').attr('onclick', '_clickBtn(event)')

    $('#leafBox').append('<div id="leafDrop" data-area="' + $areaArr[0] + '"  data-color="' + leafArr[0].color + '" data-shape="' + leafArr[0].shape + '"   style="height: ' + screenH / 10 + 'px;width: ' + screenH / 10 + 'px" class="leaf drop ' + $areaArr[0] + ' ' + leafArr[0].name + '"></div>')

    setTimeout(function () {

        $('#leafDrop').remove()

    }, 4000)

    setTimeout(function () {

        $('#leafBtn li p').removeAttr('onclick')

    }, 3000)

    var $i = i - 1

    var timeFn = function () {

        curIndex = curIndex - 1;

        console.log('curIndex', curIndex)

        $i = $i - 1

        console.log("$i", $i)

        $('#leafBtn li p').attr('onclick', '_clickBtn(event)')

        $('#leafBox').append('<div id="leafDrop" data-area="' + $areaArr[$i] + '"  data-color="' + leafArr[$i].color + '" data-shape="' + leafArr[$i].shape + '"   style="height: ' + screenH / 10 + 'px;width: ' + screenH / 10 + 'px" class="leaf drop ' + $areaArr[$i] + ' ' + leafArr[$i].name + '"></div>')

        setTimeout(function () {

            $('#leafDrop').remove()

        }, 4000)

        setTimeout(function () {

            $('#leafBtn li p').removeAttr('onclick')

        }, 3000)

        if ($i == 0) {

            clearInterval(atuoDrop)

            fn && fn.call(this)

            //此处A全部降落结束

        }

    }

    atuoDrop = setInterval(timeFn, 4050);

}


/*** 倒计时
 * i：时间
 * fn：倒计时结束回调
 ***/
function _time(i, fn) {

    $('#hideTime').text(i)

    var timeFn = function () {

        i = i - 1

        $('#hideTime').text(i)

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

/*** 数组去重
 * sumArr：大数组
 * subArr：去重元素数组
 ***/
function _repeat(sumArr, subArr) {

    var repArr = [];

    for (var i = 0; i < sumArr.length; i++) {

        for (var n = 0; n < subArr.length; n++) {

            if (sumArr[i] == subArr[n]) {

                sumArr.splice(i, 1);

                repArr = sumArr

            }

        }

    }
    return repArr;
}

//游戏结束
function _over() {

    $('#list').remove()
    $('#over').show()
    /* ajax 请求接口路径，返回json 数据
     * levelData: 每个的等级三次答题情况
     *
     * */


    var param = {

        levelData: levelData

    }

    console.log('当前返回参数', JSON.stringify(param))

}

//游戏退出
function _out() {

    console.log('游戏退出')

}
