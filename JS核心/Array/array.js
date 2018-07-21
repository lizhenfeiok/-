

var array = {

	check : function(arr){
		if(!array.isArray.fn1(arr))
			throw "请传入数组参数！！！"
		else
			return true;
	},
	//检测是否为数组的四种方法
	isArray :{
		fn1 : function(arr){
			return Object.prototype.toString.call(arr)==="[object Array]";
		},
		fn2 : function(arr){
			return Array.isArray(arr);
		},
		//跨iframe失效
		fn3 : function(arr){
			return arr instanceof Array;
		},
		//跨iframe失效
		fn4 : function(arr){
			return arr.constructor === Array;
		}
	},
	//去重
	unique : {
		fn1 : function(arr){
			array.check(arr);
			var newArray = [];
			arr.forEach(function(item){
				if(newArray.indexOf(item)==-1){
					newArray.push(item)
				}
			});
			return newArray;
		},
		fn2 : function(arr){
			array.check(arr);
			var o = {};
			return arr.filter(function(item){
				return o[item]?false:(o[item]=true);
			});
		},
		fn3 : function(arr){
			array.check(arr);
			return arr.filter(function(item,index){
				return arr.indexOf(item) === index;
			});
		},
		fn4 : function(arr){
			array.check(arr);
			return arr.slice().sort().filter(function(item,index,newArray){
				return item !== newArray[index-1];
			});
		}
	},
	//最大值
	max : {
		//1.apply数组 2.call参数列表
		//警惕！！如果数组中有undefined项，结果为NaN
		fn1 : function(arr){
			array.check(arr);
			return Math.max.apply(null,arr);
		},
		fn2 : function(arr){
			array.check(arr);
			var maxVal = arr[0];
			arr.forEach(function(item){
				item > maxVal && (maxVal = item);
			});
			return maxVal;
		},
		fn3 : function(arr){
			array.check(arr);
			return arr.reduce(function(last,item){
				return last > item? last : item;
			});
		},
		fn4 : function(arr){
			array.check(arr);
			return arr.slice().sort(function(a,b){
				return b - a; 
			})[0];
		}
	},

	//多维数组转一维数组=扁平化
	flatten: {
		//但是每一项都会变成字符串！！！
		fn1 : function(arr){
			array.check(arr);
			return arr.join().split(",");
		},
		fn2 : function(arr){
			array.check(arr);
			var fn = arguments.callee;
			return arr.reduce(function(newArr,item){
				return newArr.concat(Array.isArray(item)?fn(item):item);
			},[]);
		},
		fn3 : function(arr){
			array.check(arr);
			var newArr = [];
			getEachItem(arr,newArr);
			return newArr;

			function getEachItem(arr,newArr){
				for(var i=0; i<arr.length; i++){
					if(Array.isArray(arr[i])){
						getEachItem(arr[i],newArr);
					}else{
						newArr.push(arr[i])
					}
				}
			}

		}

		
	}
}


var arr = [null,undefined,Infinity,NaN,];
//元素为null或undefined,若转字符串则该项为""
//末尾逗号忽略，字符串化最后没有逗号！！
arr.toString()   // ",,Infinity,NaN"
arr.length   //4 末尾逗号不算，所以切记不是5个
//末尾逗号最后都会忽略掉一个！！！
[null,undefined,Infinity,NaN,,].toString()  // ",,Infinity,NaN,"



var arr = [,undefined]
0 in  arr  //false  若稀疏数组该项未赋值，则false
arr.length  //2 稀疏数组项会计入长度中
