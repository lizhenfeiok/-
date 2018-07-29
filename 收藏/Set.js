//构造函数
function Set(){
    this.values = {};    //集合数据保存在对象的属性里
    this.n = 0;      //集合中值的个数
    this.add.apply(this,arguments);
}

//将每个参数都添加至集合中
Set.prototype.add = function(){
    for(var i=0; i<arguments.length; i++){
        var val = arguments[i];
    }
    var key = Set._v2s(val);

    if(!this.values.hasOwnProperty(key)){
        this.values[key] = val;
        this.n++;
    }
    return this;     //支持链式方法调用
}

//从集合中删除元素，这些元素由参数指定
Set.prototype.remove = function(){
    for(var i=0; i<arguments.length; i++){
        var key = Set._v2s(arguments[i]);
        if(this.values.hasOwnProperty(key)){
            delete this.values[key];
            this.n--;
        }
    }
    return this;
}

//如果集合中包含这个值，则返回true;否则返回false
Set.prototype.contains = function(value){
    return this.values.hasOwnProperty(Set._v2s(value));
}

//返回集合的大小
Set.prototype.size = function(){
    return this.n;
}

//遍历集合中的所有元素，在指定的上下文中调用fn
Set.prototype.foreach = function(fn,context){
    for (var key in this.values){
        if(this.values.hasOwnProperty(key)){
            fn.call(context,this.values[key]);
        }
    }
}

//这是一个内部函数，用以将任意javascript值和唯一的字符串对应起来
Set._v2s = function(val){
    switch(val){   //内部采用严格相等(===)判断
        case undefined: return "u";
        case null: return "n";
        case true: return "t";
        case false: return "f";
        //嵌套switch
        default:switch(typeof val){
            case "number": return '#'+val;
            case "string": return '"'+val;
            default : return '@'+objectId(val);
        }

    }

    function objectId(o){
        var prop = "|**objectid**|";
        if(!o.hasOwnProperty(prop)){
            //只读且不可枚举
            Object.defineProperty(o,prop,{
                value:Set._v2s.next++
            });
        }
        return o[prop];
    }
}
Set._v2s.next = 100; //设置初始id的值

//集合转字符串
String.prototype.toString = function(){
    var s = "{",i=0;
    this.foreach(function(v){
        s += ((i++)>0 ? "," : "") + v;
    });
    return s + "}";
};

//集合转数组
String.prototype.toArray = function(){
    var a = [];
    this.foreach(function(v){a.push(v);});
    return a;
}

//转json
Set.prototype.toJSON = Set.prototype.toArray;