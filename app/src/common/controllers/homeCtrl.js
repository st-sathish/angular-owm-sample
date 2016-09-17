angular
	.module('owmCityGraph')
	.controller('HomeCtrl', ['$log', 'HttpService', '$scope', homeCtrl]);

	function homeCtrl($log, HttpService, $scope) {

		var GET_WEATHER_PATH = "group";
		var GET_WEATHER_FORECAST = "forecast";

		var xData = [];
		var yData = [];

		var citiesId = ['1269843','1264527','1261481','1275339'];

	//{"_id":1269843,"name":"Hyderabad","country":"IN","coord":{"lon":78.474442,"lat":17.37528}}
	//{"_id":1264527,"name":"Chennai","country":"IN","coord":{"lon":80.278473,"lat":13.08784}}
	//{"_id":1261481,"name":"New Delhi","country":"IN","coord":{"lon":77.23114,"lat":28.61282}}
	//{"_id":1275339,"name":"Mumbai","country":"IN","coord":{"lon":72.847939,"lat":19.01441}}

		/**
		* Initlialize here
		*/
		(function() {
			getNext5DaysWeather();
			getCitiesWeatherReport();
		})();

		/**
		  * Get list of city weather condition
		*/
		function getCitiesWeatherReport() {
			var param = {};
			var cityStr = "";
			for(var i = 0;i <citiesId.length;i++) {
				cityStr = cityStr+citiesId[i];
				if(i < (citiesId.length - 1)) {
					cityStr = cityStr+",";
				}
			}
			param.id = cityStr+"&units=metric";
			HttpService.get(GET_WEATHER_PATH, undefined, param).then(function(datum) {
				parseSuccessResponse(datum.list);
			}, function(error) {

			});
		};

		function parseSuccessResponse(list) {
			list = decendingOrder(list);
			var yDat = {};
			yDat.data = [];
			for(var i =0;i < list.length;i++) {
				xData.push(list[i].name);
				yDat.data.push(list[i].main.temp);
			}
			yDat.name="Temparature";
			yData.push(yDat);
			$scope.lineChartXData = xData;
			$scope.lineChartYData = yData;
		};

		function getNext5DaysWeather() {
			var param = {};
			param.id = '1269843';
			HttpService.get(GET_WEATHER_FORECAST, undefined, param).then(function(datum) {
				console.debug("hello");
				console.debug(datum);
			}, function(error) {

			});
		};

		function decendingOrder(list) {
			var tmp;
			for(var i = 0;i < list.length;i++) {
				for(var j = (i+1);j < list.length;j++) {
					if(list[i].main.temp < list[j].main.temp) {
						tmp = list[i];
                    	list[i] = list[j];
                    	list[j] = tmp;
					}
				}
			}
			return list;
		}
	};