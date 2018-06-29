//
var yAxisData=['Top7','Top6','Top5','Top4','Top3','Top2','Top1'];

/*
*标准饼图初始化
*/	
var optionStandPie = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
   
    calculable : true,
    series : [
        {
            name:'访问资源次数',
            type:'pie',
            radius : ['50%', '70%'],
            itemStyle : {
                normal : {
                    label : {
                        show : false
                    },
                    labelLine : {
                        show : false
                    }
                },
                emphasis : {
                    label : {
                        show : true,
                        position : 'center',
                        textStyle : {
                            fontSize : '30',
                            fontWeight : 'bold'
                        }
                    }
                }
            },
            data:[
                {value:335, name:'访问权限'},
                {value:310, name:'读写权限'},
                {value:234, name:'读写删权限'} 
            ]
        }
    ]
};
/*
*堆积直方图选项初始化
*/
var optionStackedBar = {
	tooltip : {
		trigger: 'axis',
		axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		}
	},
	calculable : true,
	xAxis : [
		{
			type : 'value',
			axisLabel : {
				show:true,
				textStyle: {
					color: 'orange',
					fontFamily: 'sans-serif',
					fontSize: 12,
					fontStyle: 'italic',
					fontWeight: 'bold'
				}
			}
		}
	],
	yAxis : [
		{
			type : 'category',
			data : yAxisData,
			axisLabel : {
				show:true,
				textStyle: {
					color: 'orange',
					fontFamily: 'sans-serif',
					fontSize: 12,
					fontStyle: 'italic',
					fontWeight: 'bold'
				}
			}
		}
	],
	series : [
		{
			name:'访问',
			type:'bar',
			stack: '总量',
			itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
			data:[320, 302, 301, 334, 390, 330, 320]
		},
		{
			name:'读写',
			type:'bar',
			stack: '总量',
			itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
			data:[120, 132, 101, 134, 90, 230, 210]
		},
		{
			name:'读写删',
			type:'bar',
			stack: '总量',
			itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
			data:[220, 182, 191, 234, 290, 330, 310]
		}
		
	]
}; 
/*
*堆积折线图选项初始化
*/
var optionStackedLine  = {
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['访问','读写','读写删']
    },
      
    calculable : true,
    xAxis : [
        {
            type : 'category',
            //boundaryGap : false,
            data : ['一月','二月','三月','四月','五月','六月','七月','八月'],
			axisLabel : {
				show:true,
				textStyle: {
					color: 'orange',
					fontFamily: 'sans-serif',
					fontSize: 12,
					fontStyle: 'italic',
					fontWeight: 'bold'
				}
			}
        }
    ],
    yAxis : [
        {
            type : 'value',
			axisLabel : {
				show:true,
				textStyle: {
					color: 'orange',
					fontFamily: 'sans-serif',
					fontSize: 12,
					fontStyle: 'italic',
					fontWeight: 'bold'
				}
			}
        }
    ],
    series : [
        {
            name:'访问',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210,23,456,12,89,126,269,235,456,189,279,312,413,500]
        },
        {
            name:'读写',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310,120, 132, 101, 134, 90, 230, 210,23,456,12,89,126,120]
        },
        {
            name:'读写删',
            type:'line',
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330, 410,220, 182, 191, 234, 290, 330, 310,120, 132, 101, 134, 90, 230, ]
        } 
    ]
};
        
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
/*
*Echarts初始化
*/
function InitEharts(echarts){
	var myStackedBar = echarts.init(document.getElementById('stackedBar'));  
	myStackedBar.setOption(optionStackedBar);
	var myStandPie = echarts.init(document.getElementById('standPie'));
	myStandPie.setOption(optionStandPie);
	var myStackedLine = echarts.init(document.getElementById('stackedLine'));
	myStackedLine.setOption(optionStackedLine);
	//多图链接stackedLine
	//myStackedBar.connect([myStandPie,myStackedLine]); 
	//myStandPie.connect([myStackedBar,myStackedLine]); 
	//myStackedLine.connect([myStandPie,myStackedBar]);
}
/*
*设置堆积直方图数据
*/
function setStackedBar(myStackedBar,data){
	var barSeries=myStackedBar.getSeries();
	var arrData=[];
	for(var i=0;i<data.length;i++){
		arrData.push(data[i].num);
	}
	barSeries[0].data=arrData;
	myStackedBar.setSeries(barSeries);
}
/*
*设置标准环形图数据
*/
function setStandPie(myStandPie,data){
	var pieSeries=myStandPie.getSeries();
	var arrData=[];
	for(var i=0;i<data.length;i++){
		var num=data[i].value;
		var cateName=data[1].name;
		arrData.push({value:num,name:cateName});
	}
	pieSeries[0].data=arrData;
	myStandPie.setSeries(pieSeries);
}
                      

