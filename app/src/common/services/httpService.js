'use strict';
angular
	.module('owmCityGraph')
	.service('HttpService', ['$resource', '$q', '$window', 'OWM_APP_ID', httpService]);

	function httpService($resource, $q, $window, OWM_APP_ID) {
		var BASE_URL = "http://api.openweathermap.org/data/2.5/";

		this.get = function(path, path_variable, param) {
			path = BASE_URL + path;
			var q = $q.defer();
			param.id = appendAppId(param.id);
			$resource(path, path_variable,{get:{method:'GET', params:param, transformRequest:transformReqHandler, transformResponse:transformResHandler}}).get(function(data) {
				q.resolve(data);
			},function(error){
				q.reject(error);
			});
			return q.promise;
		};

		function appendAppId(param) {
			return param+"&appid="+OWM_APP_ID;
		};

		function transformReqHandler(data, headers) {
			return data;
		};

		/**
		* Do all the general customization in the response data
		*/
		function transformResHandler(data, headers) {
			return angular.fromJson(data);//JSON.parse(angular.toJson(data));
		};
	};