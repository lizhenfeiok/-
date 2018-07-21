

var obj = {



	//属性常用操作
	prop : {
		getProps : {
			ownEnumerable : function(o){
				return Object.keys(o);
			},
			ownAll : function(o){
				return Object.getOwnPropertyNames(o);
			},
			allEnumerable : function(o){
				var keys = [];
				for(var prop in o)keys.push(prop);
				return keys;
			}
		},
		hasProp : {
			ownEnumerable :function(o,prop){
				//可以被for..in..枚举的自身属性
				return o.propertyIsEnumerable(prop);
			},
			ownAll : function(o,prop){
				return o.hasOwnProperty(prop);
			},
			//包括配置为不可枚举的属性，也返回true!!!
			allProp : function(o,prop){
				return prop in o;
			}
		},
		//1.只能删除自身的属性
		//2.仅在configurable为false时返回true
		//3.var 声明的变量作为window属性不能删除
		//4.无声明的变量自动作为window属性的可以删除
		delProp : function(o,prop){
			return delete o[prop];
		}
	},

	//存取器属性
	accessor : {
		setter : {
			set : {
				standard : function(o,prop,setfn){
					Object.defineProperty(o,prop,{set:setfn});
				},
				hidden : function(o,prop,setfn){
					o.__defineSetter__(prop,setfn);
				}
			},
			get : {
				standard : function(o,prop){
					return Object.getOwnPropertyDescriptor(o,prop).set;
				},
				hidden : function(o,prop){
					return o.__lookupSetter__(prop);
				}
			}
		},
		getter : {
			set : {
				standard : function(o,prop,getfn){
					Object.defineProperty(o,prop,{get:getfn});
				},
				hidden : function(o,prop,getfn){
					o.__defineGetter__(prop,getfn);
				}
			},
			get : {
				standard : function(o,prop){
					return Object.getOwnPropertyDescriptor(prop).get;
				},
				hidden : function(o,prop){
					return o.__lookupGetter__(prop);
				}
			}
		}
	},

	//原型相关
	proto : {
		//这两种方法都可以设置原型为 null
		set : {
			create : function(proto,propDescriptors){
				//propDescriptors 设置即将创建的对象的属性描述符
				return Object.create(proto,propDescriptors)
			},
			exist : function(o,proto){
				return Object.setPrototypeOf(o,proto);
			}
		},
		get : {
			standard : function(o){
				return Object.getPrototypeOf(o);
			},
			hidden : function(o){
				return o.__proto__;
			}
		},
		check : function(o,proto){
			return proto.isPrototypeOf(o);
		}
	},

	//属性描述符
	propDescriptor : {
		set : {
			one : function(o,prop,propDescriptor){
				//Object.defineProperty(o,"x",{value:1})
				return Object.defineProperty(o,prop,propDescriptor);
			},
			many : function(o,propDescriptors){
				/*
				Object.defineProperty(o,{
					x:{value:1}
					y:{value:2,writable:false}
				)
				*/
				return Object.defineProperties(o,propDescriptors)
			}
		},
		get : function(o,prop){
			return Object.getOwnPropertyDescriptor(o,prop);
		}
	}
}

//1.新创建属性的同时设置属性描述符的，默认都为false ！！
var o = Object.create({x:1},{
	name : {value : "lizhenfei" , writable : true},   //设置的o的属性
	age : {value : 29 , enumerable : true}    //设置的o的属性
});
o.propertyIsEnumerable(o,"name")  //false

var o = {};
Object.defineProperty(o,"x",{value:1});
Object.getOwnPropertyDescriptor(o,"x");  //{value: 1, writable: false, enumerable: false, configurable: false}

//2.设置已存在的属性，则其他属性描述符保持不变
var o = {y:1};
Object.defineProperty(o,"x",{value:1})
Object.getOwnPropertyDescriptor(o,"y")   //{value: 1, writable: true, enumerable: true, configurable: true}