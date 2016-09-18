angular
	.module('owmCityGraph')
	.controller('HomeCtrl', ['$log', 'HttpService', '$scope', homeCtrl]);

	function homeCtrl($log, HttpService, $scope) {

		var GET_WEATHER_PATH = "group";
		var GET_WEATHER_FORECAST = "forecast";

		var xData = [];
		var yData = [];
		var results = undefined;
		var citiesId = ['1269843','1264527','1261481','1275339'];

	//{"_id":1269843,"name":"Hyderabad","country":"IN","coord":{"lon":78.474442,"lat":17.37528}}
	//{"_id":1264527,"name":"Chennai","country":"IN","coord":{"lon":80.278473,"lat":13.08784}}
	//{"_id":1261481,"name":"New Delhi","country":"IN","coord":{"lon":77.23114,"lat":28.61282}}
	//{"_id":1275339,"name":"Mumbai","country":"IN","coord":{"lon":72.847939,"lat":19.01441}}

		/**
		* Initlialize here
		*/
		(function() {
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
			param.id = cityStr;
			HttpService.get(GET_WEATHER_PATH, undefined, param).then(function(datum) {
				parseSuccessResponse(datum.list);
			}, function(error) {

			});
		};

		function parseSuccessResponse(list) {
			results = decendingOrder(list);
			var yDat = {};
			yDat.data = [];
			for(var i =0;i < results.length;i++) {
				xData.push(results[i].name);
				yDat.data.push(results[i].main.temp);
			}
			yDat.name="Temparature";
			yData.push(yDat);
			$scope.lineChartXData = xData;
			$scope.lineChartYData = yData;
		};

		$scope.getNext5DaysWeather = function(iid) {
			var param = {};
			param.id = iid;
			HttpService.get(GET_WEATHER_FORECAST, undefined, param, true).then(function(datum) {
				$scope.forecast = extractResult(datum);
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
		};

		$scope.getCustomTootip = function(n) {
			var id = undefined;
			for(var i =0;i <results.length;i++) {
				if(results[i].name == n.name) {
					id = results[i].id;
					break;
				}
			}
			return $scope.getNext5DaysWeather(id);
		};

		function extractResult(result) {
			for(var i =0;i < result.list.length;i++) {
				var strArr = result.list[i].dt_txt.split(" ");
				result.list[i].dt_txt = strArr[0];
			}
			return result;
		}
	};