'use strict';
/*global console, Thenjs*/
/*
function request(url) {
	var db=window.openDatabase('MyDB', '1.0', '存储菜品信息', 5242880);
   var sqlCreate="CREATE TABLE IF NOT EXISTS pages(id unique,pagenum,content,model,stylename)";
   db.transaction(function(t){
			t.executeSql(sqlCreate,[],
			function(tx,result){  
				return true;
			},
			function(tx,err){
				var msg;
				if(err)	msg="TX:"+err.message+"("+err.code+")";
				else	msg="TX:Unknow error";
				console.log(msg);
			});
		});
	var sqlIn="INSERT INTO pages (content,model,stylename) VALUES (?,?,?)";
	var arr=["2-3","model","123",];
	db.transaction(function(t){t.executeSql(sqlIn,arr,function(result){
		console.log(result) ;
	},
			function(tx,err){
				var msg;
				if(err)	msg="TX:"+err.message+"("+err.code+")";
				else	msg="TX:Unknow error";
				console.log(msg);
			})
		});
		var sqlS="select * from pages";
		db.transaction(function(t){t.executeSql(sqlS,[],function(result){
		return result ;
		},
			function(tx,err){
				var msg;
				if(err)	msg="TX:"+err.message+"("+err.code+")";
				else	msg="TX:Unknow error";
				console.log(msg);
			})
		});
}

Thenjs(request('text.php'))
  .then(function (cont, data) {
	console.log("1"); 
    cont(null, data);
  })
  .then(function (cont, data) {
	console.log("2");  
  })
  .fail(function (cont, error) {
    console.error(error.statusText);
  });
*/
	var db=window.openDatabase('MyDB', '1.0', '存储菜品信息', 5242880);
Thenjs().series([
	function(cont){ 
	   var sqlCreate="CREATE TABLE IF NOT EXISTS pages(id unique,pagenum,content,model,stylename)";
	   console.log(sqlCreate);
	   db.transaction(function(t){
				t.executeSql(sqlCreate,[],
				function(tx,result){  
					return true;
				},
				function(tx,err){
					var msg;
					if(err)	msg="TX:"+err.message+"("+err.code+")";
					else	msg="TX:Unknow error";
					console.log(msg);
				});
			});
			cont(null,"hello");
	},
	function(cont,result){
	console.log(result);
		var sqlIn="INSERT INTO pages (content,model,stylename) VALUES (?,?,?)";
		console.log(sqlIn);
		var arr=["2-3","model","123",];
		db.transaction(function(t){t.executeSql(sqlIn,arr,function(result){
			console.log(result) ;
		},
				function(tx,err){
					var msg;
					if(err)	msg="TX:"+err.message+"("+err.code+")";
					else	msg="TX:Unknow error";
					console.log(msg);
				})
			});
			cont(null,"yueyeu");
	},
	function(cont,data){
		console.log(data);
		var sqlS="select * from pages";
		db.transaction(function(t){t.executeSql(sqlS,[],function(result){
		console.log(result) ;
		if ( typeof(callback) == 'function' ) callback(result);
		cont(null,result);
		},
			function(tx,err){
				var msg;
				if(err)	msg="TX:"+err.message+"("+err.code+")";
				else	msg="TX:Unknow error";
				console.log(msg);
			})
		});
		//cont(null,data);
	},
	function(cont,data){
		console.log(data);
	}
])
.then(function(cont,data){
	console.log(123);
	});