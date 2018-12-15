>1.深复制和浅复制

（1）浅复制一般用于原始类型数据，若其中有引用类型，则会出现其中一个修改引用类型值另外一个也跟着改变的情况，因为他们的引用地址相同。
```
 //浅复制
 function shallowCopy(from,to){
     for(var prop in from){         //循环自有包括继承的可枚举属性
        to[prop] = from[prop];
     }
 }
 ```
 （2）深复制可以拷贝引用类型的属性和属性值，而非引用地址，和旧的对象不会互相影响。
 ```
 //深复制（简化起见，未考虑数组）
 function deepCopy(from,to){
     for(val prop in from){
         if(typeof from[prop] === 'object'){
             deepCopy(from[prop],(to[prop])={}));
         }else{
             to[prop] = from[prop];
         }
     }
 }
 ```
