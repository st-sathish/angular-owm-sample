angular
	.module('owmCityGraph')
	.controller('HomeCtrl', ['$log', 'HttpService', homeCtrl]);

	var citiesId = ['1269843' ,'1264527' ,'1261481' ,'1275339'];

//{"_id":1269843,"name":"Hyderabad","country":"IN","coord":{"lon":78.474442,"lat":17.37528}}
//{"_id":1264527,"name":"Chennai","country":"IN","coord":{"lon":80.278473,"lat":13.08784}}
//{"_id":1261481,"name":"New Delhi","country":"IN","coord":{"lon":77.23114,"lat":28.61282}}
//{"_id":1275339,"name":"Mumbai","country":"IN","coord":{"lon":72.847939,"lat":19.01441}}

	var GET_WEATHER_PATH = "group";

	function homeCtrl($log, HttpService) {

		/**
		* Initlialize here
		*/
		(function() {
			getCitiesWeather();
		})();

		/**
		  * Get list of city weather condition
		*/
		function getCitiesWeather() {
			//?q=London,uk&appid=b1b15e88fa797225412429c1c50c122a1
			var param = {};
			var cityIds = "";
			for(var i = 0;i <citiesId.length;i++) {
				cityIds = cityIds+citiesId[i];
				if(i <= (citiesId.length - 1)) {
					cityIds = cityIds+",";
				}
			}

			param.id = "1269843,1264527,1261481";
			HttpService.get(GET_WEATHER_PATH, undefined, param).then(function(datum) {
				console.debug(datum.list);
			}, function(error) {

			});
		};
	};