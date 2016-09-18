'use strict';

angular
	.module('owmCityGraph')
	.directive('chart', ['$log', 'HttpService', function ($log, HttpService) {
    return {
        restrict:'E',
        template:'<div></div>',
        transclude:true,
        replace:true,
        scope: '=',
        link:function (scope, element, attrs) {
            var opt = {
                chart:{
                    renderTo:element[0],
                    type:'line',
                    marginRight:130,
                    marginBottom:40
                },
                title:{
                    text:attrs.title,
                    x:-20 //center
                },
                subtitle:{
                    text:attrs.subtitle,
                    x:-20
                },
                xAxis: {
                    title:{
                        text:attrs.xname
                    }
                },
                plotOptions: {
                    series: {
                        allowPointSelect: true
                    }
                },
                yAxis:{
                    title:{
                        text:attrs.yname
                    },
                    labels: {
                        formatter: function () {
                            return this.value + '°C';
                        }
                    },
                    tickInterval:(attrs.yinterval) ? new Number(attrs.yinterval) : null,
                    max:attrs.ymax,
                    min: attrs.ymin
                },
                tooltip:{
                    useHTML: false,
                    formatter:function () {
                        scope.getCustomTootip({name:this.x});
                        return "<div>"+this.y+"</div>";
                    }
                },
                legend:{
                    layout:'vertical',
                    align:'center',
                    verticalAlign:'bottom'
                }
            }

            //Update when charts data changes
            scope.$watch(function (scope) {
                return JSON.stringify({
                    xAxis:{
                        categories:scope[attrs.xdata]
                        },
                    series:scope[attrs.ydata]
                });
            }, function (news) {
                console.log('ola')
//                if (!attrs) return;
                news = JSON.parse(news)
                if (!news.series)return;
                angular.extend(opt,news)
                var chart = new Highcharts.Chart(opt);
            });
        }
    }

}]);