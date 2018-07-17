
var date = {

	now : {
		obj : function(){
			return new Date(); //或new Date 可省略小括号
		},
		stamp : {
			fn1 : function(){
				return Date.now();
			},
			fn2 : function(){
				return +new Date();
			},
			fn3 : function(){
				return new Date().valueOf();
			},
			fn4 : function(){
				return new Date().getTime();
			}
		},
		str : function(){
			return new Date().toLocaleString();
		}
	},

	that : {
		//(xxxx/xx/xx xx:xx:xx),(xxxx-xx-xx)
		strToStamp : function(str){
			return Date.parse(str);
		},

		//时间戳转日期对象
		stampToObj : function(stamp){
			return new Date(stamp);
		},
		
		//内部调用Date.parse()
		strToObj : function(str){
			return new Date(str);
		},

		//year和month是必需的,其他可省略
		argsToStamp : function(year,month,day,hour,min,sec){

			//月份从0开始，1月是0,2月是1；
			month--;   

			//注意：UTC为格林尼治时间，与中国差8时区，所以此方法慎用！！
			//所以Date.UTC(2017,05,03,00,22,03)是中国的标准时间：2017年6月03号，上午8点22分03秒！！
			hour = hour - 8;

			return Date.UTC(year,month,day,hour,min,sec);
		},
		//内部调用Date.UTC()
		argsToObj : function(year,month,day,hour,min,sec){
			month--;
			hour = hour - 8;
			return new Date(year,month,day,hour,min,sec);
		}


	},

	format : {
		dateTime : function(strOrStamp){
			return new Date(strOrStamp).toLocaleString();
		},
		date : function(strOrStamp){
			return new Date(strOrStamp).toLocaleDateString();
		},
		time : function(strOrStamp){
			return new Date(strOrStamp).toLocaleTimeString();
		}
	},

	//获取日期对象中的部分数据
	get : {
		year : function(strOrStamp){
			return new Date(strOrStamp).getFullYear();
		},
		//月份从0开始，1月是0,2月是1；
		month : function(strOrStamp){
			return new Date(strOrStamp).getMonth()+1;
		},
		//月份中第几天
		date : function(strOrStamp){
			return new Date(strOrStamp).getDate();
		},
		//一星期中的第几天：0表示星期日，1表示星期1,6表示星期6
		day : function(strOrStamp){
			return new Date(strOrStamp).getDay();
		},
		//0到23
		hours : function(strOrStamp){
			return new Date(strOrStamp).getHours();
		},
		minutes : function(strOrStamp){
			return new Date(strOrStamp).getMinutes();
		},
		seconds : function(){
			return new Date(strOrStamp).getSeconds();
		},
		//毫秒数
		milliseconds : function(strOrStamp){
			return new Date(strOrStamp).getMilliseconds();
		}
	},

	//设置日期，set为同样的get方法，可改变日期
	set : {
		//......
	}
}




new Date().toString()  //"Sun Jun 17 2018 11:43:00 GMT+0800 (中国标准时间)"
new Date().toLocaleString()  // "2018/6/17 上午11:43:05"
new Date().valueOf()  //时间戳1529207041471