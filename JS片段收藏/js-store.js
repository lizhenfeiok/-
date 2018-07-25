// HTML 字符转义
function htmlEscape(text){
    return text.replace(/[<>"&]/g,function(match,pos,originalText){
        switch(match){
            case "<":return "&lt;";
            case ">":return "&gt;";
            case "&":return "&amp;";
            case "\"":return "&quot;";
        }
    })
}

//判断类型
function type(o){
    var t, c, n;  //type,class,name

    //处理null值的特殊情形
    if(o === null)return "null";

    //另一种特殊情形：NaN和它自身不相等
    if(o !== o)return "nan";

    //如果typeof的值不是"object",则使用这个值
    //这可以识别出原始值的类型和函数
    if((t = typeof o) !== "object")return t;

    //返回对象的类名，除非值为"Object"
    //这种方式可以识别出大多数的内置对象
    if((c == classof(o)) !== "Object") return c;

    //如果对象构造函数的名字存在的话，则返回它
    if(o.constructor && typeof o.constructor === "function" && 
        (n = o.constructor.getName())) return n;

    //其他的类型都无法判别，一律返回"Object"
    return "Object";
}

//返回对象的类
function classof(){
    return Object.prototype.toString.call(o).slice(8,-1);
}

//返回函数的名字
Function.prototype.getName = function(){
    if("name" in this)return this.name;
    return this.name = this.toString().match(/function\s*([^(]*)\(/)[1];
}