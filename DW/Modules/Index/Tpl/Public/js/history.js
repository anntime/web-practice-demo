//avalon初始化设置
var model=avalon.define({
	$id:"avalon",
	topUser:[
		{name:"用户1",num:"23"},
		{name:"用户2",num:"14"},
		{name:"用户3",num:"9"}
	]

});
/*
*页面初始化
*/
$(document).ready(function(){
	//初始化top10活跃用户
	//init();
});
/*
*加载Top10用户
*/
function init(){
	$.ajax({
		type:"GET",
		url:"../InterDeal/InitSimulate",
		async:false,
		error: function(XMLHttpRequest, textStatus, errorThrown){
			console.log("Error:"+XMLHttpRequest.readyState+"   "+XMLHttpRequest.responseText);
		},
		success:function(data){
			var jsonobj=eval(data);
			//处理返回数据
		 }
	});
}
/*
*填充model.topUser
*/
function fillTopUser(data){
	for(var i=0;i<data.length;i++){
		//循环插入数据
	}
}
