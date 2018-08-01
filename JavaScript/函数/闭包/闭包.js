

/*


--------------------------------------------闭包--------------------------------------------------

  概念：有权访问另一个函数作用域中的变量的【函数】

  背景：

  	  执行环境：Web浏览器中只有两类执行环境(作用域)：1.全局执行环境(window对象) 2.函数
	  变量对象：每个执行环境都有一个与之关联的变量对象，环境中定义的所有变量和函数都保存在这个对象中。
	  作用域链：每个执行环境为保证执行环境内部对变量和函数的有序访问，会构建[当前环境变量对象->外部环境变量对象...->全局环境变量对象]的作用域链。

  原理：

	  创建fn时：在创建函数fn时，会将当前执行环境的作用域链预置在函数fn内部的[[Scopes]]属性中
	  执行fn时：
	  	1.为函数创建一个执行环境 
	  	2.复制函数的预置的[[Scopes]]属性，构建当前环境的作用域链
	  	3.使用arguments,this，参数值初始化当前函数的变量对象，并置于当前环境作用域链的顶端

  特性：
	  1.只能取得外函数变量的最后的值。
	  2.匿名闭包函数this指向window(this和arguments对象只会搜索与之关联的执行环境的变量对象)。
	  3.占用内存：
	  	由于闭包会携带包含它的函数的作用域，因此会比其他函数占用更多的内存。过度使用闭包可能会导致内存占用过多，
	  	虽然像V8等优化后的引擎会尝试回收被闭包占用的内存，但还是请慎重使用。


	


 */

	//闭包Demo：
  	function outer(){
		var count = 0;
	    return function inner(){
			console.log(count ++);
		}	
	}
	var test = outer();
	test()   //0
	test()   //1
	test()   //2
	test()   //3

	//闭包只能取得外函数变量的最后的值
	function test(){
		var result = new Array();
		for(var i=0; i<10; i++){
			result[i] = function(){
				return i;
			}
		}
		return result;
	}
	var arr = test();
	arr[0]() //10
	

	//匿名闭包函数this指向window
	var name = "This is window";
	var object = {
		name : "My Object",
		getNameFunc : function(){
			return function(){
				return this.name; 
			}
		}
	};
	alert(object.getNameFunc()())   //"This is window"
	//this和arguments对象只会搜索与之关联的执行环境的变量对象，执行环境为window