
		function DrawEChart(ec) {
			var myChart = ec.init(document.getElementById('userInfoBar'));
			myChart.showLoading({
				text :"数据加载中",
				effect : 'whirling' ,
				textStyle : {
					fontSize : 20
				}
			});
			var option = {
				title: {
					x: 'center',
					text: '用户请求权限统计',
					subtext: '数据纯属虚构'
				},
				tooltip: {
					trigger: 'item'
				},
				calculable: true,
				grid: {
					borderWidth: 0,
					y: 80,
					y2: 60
				},
				xAxis: [
					{
						type: 'authority',
						show: false,
						data: ['Line', 'Bar', 'Scatter', 'K', 'Pie', 'Radar', 'Chord', 'Force', 'Map', 'Gauge', 'Funnel']
					}
				],
				yAxis: [
					{
						type: 'value',
						show: false
					}
				],
				series: [
					{
						name: 'ECharts例子个数统计',
						type: 'bar',
						itemStyle: {
							normal: {
								color: function(params) {
									// build a color map as your need.
									var colorList = [
									  '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
									   '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
									   '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
									];
									return colorList[params.dataIndex]
								},
								label: {
									show: true,
									position: 'top',
									formatter: '{b}\n{c}'
								}
							}
						},
						data: [12,21,10,4,12,5,6,5,25,23,7],
						markPoint: {
							tooltip: {
								trigger: 'item',
								backgroundColor: 'rgba(0,0,0,0)',
								formatter: function(params){
									return '<img src="' 
											+ params.data.symbol.replace('image://', '')
											+ '"/>';
								}
							},
							data: [
								{xAxis:0, y: 350, name:'Line', symbolSize:20, symbol: 'image://../asset/ico/折线图.png'},
								{xAxis:1, y: 350, name:'Bar', symbolSize:20, symbol: 'image://../asset/ico/柱状图.png'},
								{xAxis:2, y: 350, name:'Scatter', symbolSize:20, symbol: 'image://../asset/ico/散点图.png'},
								{xAxis:3, y: 350, name:'K', symbolSize:20, symbol: 'image://../asset/ico/K线图.png'},
								{xAxis:4, y: 350, name:'Pie', symbolSize:20, symbol: 'image://../asset/ico/饼状图.png'},
								{xAxis:5, y: 350, name:'Radar', symbolSize:20, symbol: 'image://../asset/ico/雷达图.png'},
								{xAxis:6, y: 350, name:'Chord', symbolSize:20, symbol: 'image://../asset/ico/和弦图.png'},
								{xAxis:7, y: 350, name:'Force', symbolSize:20, symbol: 'image://../asset/ico/力导向图.png'},
								{xAxis:8, y: 350, name:'Map', symbolSize:20, symbol: 'image://../asset/ico/地图.png'},
								{xAxis:9, y: 350, name:'Gauge', symbolSize:20, symbol: 'image://../asset/ico/仪表盘.png'},
								{xAxis:10, y: 350, name:'Funnel', symbolSize:20, symbol: 'image://../asset/ico/漏斗图.png'},
							]
						}
					}
				]
			};
                    
			myChart.setOption(option);
			//得到series
			var series=myChart.getSeries();
			askOption(series,myChart);
			myChart.hideLoading();
			var ecConfig = require('echarts/config');
			//单击模拟请求主体
			function clickRequest(param,myChart) {
				console.log(param.value);
				var id=param.value;
				//将请求的权限一起传递到后台
				layerMake(id,series,myChart);
					
				
			}
			 
			myChart.on(ecConfig.EVENT.CLICK, clickRequest);
           }
		   //将数据库中的数据填充入Option
		   function makeOption(data,geoCoord,markPointData){
				console.log(markPointData);
				var jsonobj=eval(data);
				for(var i=0;i<jsonobj.length;i++){
					name=jsonobj[i].city;
					longitude=jsonobj[i].longitude;
					latitude=jsonobj[i].latitude;
					value=jsonobj[i].id;
					//geoCoord."'"+name+"'"=[longitude+","+latitude];
					markPointData.push({name:name,value:value});
				}
				console.log(markPointData);
				return markPointData;
				
			}
			//向后台请求客体信息
			function askOption(series,myChart){
				//通过Ajax获取图表数据
				$.ajax({
					type:"GET",
					url:"../UserInfo/getInfo",
					async:false,
					error: function(XMLHttpRequest, textStatus, errorThrown){
						console.log("Error:"+XMLHttpRequest.readyState+"   "+XMLHttpRequest.responseText);
					},
					success:function(data){
						console.log(data);
						//得到series中的geoCoord
						var geoCoord=series[0].geoCoord;
						//得到series中markPoint的data
						var markPointData=series[0].markPoint.data;
						markPointData=makeOption(data,geoCoord,markPointData);
						series[0].markPoint.data=markPointData;
						myChart.setSeries(series);
					 }
				});
			}
			function clickAjax(id,authority,series,myChart){
				$.ajax({
					type:"GET",
					//authority也应该一起传递到后台
					url:"../UserInfo/getInfoById/id/"+id,
					async:false,
					error: function(XMLHttpRequest, textStatus, errorThrown){
						console.log("Error:"+XMLHttpRequest.readyState+"   "+XMLHttpRequest.responseText);
					},
					success:function(data){
						console.log(data);
						//下面通过传回来的值将不同的数据放入不同的组内。不同的组对应的是series的不同元素
						//得到series中的geoCoord
						var geoCoord=series[0].geoCoord;
						//得到series中markPoint的data
						var markPointData=series[0].markPoint.data;
						console.log(markPointData);
						markPointData=makeOption(data,geoCoord,markPointData);
						series[0].markPoint.data=markPointData;
						myChart.setSeries(series);
					 }
				});
			}
			function layerMake(id,series,myChart){
				var authority;
				$.layer({
					type: 2,
					shade: [0],
					fix: false,
					title: '资源请求选择',
					maxmin: true,
					iframe: {src : 'http://localhost/OriginalSystem/Home/Modules/Index/Tpl/UserInfo/choose.html'},
					area: ['400px' , '200px'],
					close: function(index){
						authority=layer.getChildFrame(':radio:checked', index).val();
						console.log(authority);
						//请求数据返回数据并填充地图
						var layerLoad=layer.load(3);
						if(authority!=undefined){
							clickAjax(id,authority,series,myChart);
						}
						layer.close(layerLoad);
					}
				}); 
				
			}	