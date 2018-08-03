
/*
    1.函数的定义
*/

    //(1)函数声明
    function sum(num1,num2){
        return num1 + num2;
    }

    //(2)函数表达式
    var sum = function(num1,num2){
        return num1 + num2;
    };  // 与声明其他变量一样末尾分号

    //(3)Function 构造函数  参数不固定，最后为函数体，之前参数都为函数参数
    var sum = new Function("num1","num2","return num1 + num2");

    //区别：函数声明会提升到头部，整个作用域都可访问；函数表达式则是在定义的地方赋值，之前为undefined值

/*

    2.函数的内部属性(两个特殊的内部对象) 

*/ 

    //(1) arguments 类数组对象 包含传入函数的所有参数
        
        var argArray = [].slice.call(arguments);   //类数组转真数组

        //arguments.callee  所属函数的引用
        function test(){
            console.log(arguments.callee)  //指代test  arguments.callee()调用自己
        }

        //arguments.callee.caller 调用当前函数的函数的引用
        var outer = function(){inner();},
            inner = function(){console.log(inner.caller)};  //显示outer源代码，可用arguments.callee.caller替换

        outer();

    //(2) this 引用的是函数据以执行的环境对象，所以根据执行环境的不同引用不同的对象

/*

    3.函数的属性和方法(函数是对象的一种，所以也有属性和方法)

*/

    //(1)每个函数包含两个属性：length和prototype

        //length表示函数定义的函数的参数：fn.length ,而不是实际接收的参数个数，实际接收的为: arguments.length
        //fn.prototype  是所有new fn()创建的实例的原型，为所有实例所共享
        //自定义函数的prototype属性是一个对象，只有一个属性constructor指向构造函数自身


    //(2)每个函数包含三个方法：作用域相关

        //apply()和call()   --改变函数赖以运行的作用域

            //fn.apply(thisObject, arguments等类数组对象 || array数组)  类数组对象arguments也可以！！
            //fn.call(thisObject,arg1,arg2,arg3....)

        //bind()  --绑定函数赖以运行的作用域
        //var newfn = fn.bind(thisObject);  --无论在哪里运行，newfn中的this始终绑定为thisObject对象！！