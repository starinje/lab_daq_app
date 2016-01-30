

var chart = AmCharts.makeChart("chartdiv3",
				{
					"type": "serial",
					"categoryField": "date",
					"startDuration": 1,
					"categoryAxis": {
						"gridPosition": "start"
					},
					"trendLines": [],
					"graphs": [
						{
							"balloonText": "[[title]] of [[category]]:[[value]]",
							"bullet": "round",
							"id": "AmGraph-1",
							"title": "Portfolio Value",
							"valueField": "portfolio_value"
						},
						{
							"balloonText": "[[title]] of [[category]]:[[value]]",
							"bullet": "square",
							"id": "AmGraph-2",
							"title": "Trade Action",
							"valueField": "trade_action"
						},
												{
							"balloonText": "[[title]] of [[category]]:[[value]]",
							"bullet": "square",
							"id": "AmGraph-3",
							"title": "Close Price",
							"valueField": "close_price"
						},

						
					],
					"guides": [],
					"valueAxes": [
						{
							"id": "ValueAxis-1",
							"title": "Axis title"
						}
					],
					"allLabels": [],
					"balloon": {},
					"legend": {
						"useGraphSettings": true
					},
			

					
			
					
					
					
				}
			);
			
function ResetGraphData() {
	console.log(chart.dataProvider)

	var file_new = "./js/bitscope_output.json";

	$.getJSON(file_new, function(data_new) {
 	    console.log(data_new)
 		chart.dataProvider = data_new;
 		console.log(chart.dataProvider)
 		chart.validateData();
	});
	
}