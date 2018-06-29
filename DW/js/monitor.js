
/*
*堆积折线图选项初始化
*/
var optionStackedLine  = {
    tooltip : {
        trigger: 'axis'
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
 
/*
*Echarts初始化
*/
function InitEharts(echarts){ 
	var myStackedLine = echarts.init(document.getElementById('stackedLine'));
	myStackedLine.setOption(optionStackedLine); 
}
 