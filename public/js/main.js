var myTime = 0;
var ws = new WebSocket('ws://localhost:40510');


var app = angular.module('socketApp', ['ngRoute']);

app.controller('myController', function ($scope, websocketService) {
    $scope.options = {width: 500, height: 300, 'bar': 'aaa'};
    $scope.data = [1, 2, 3, 4];
    $scope.hovered = function(d){
        $scope.barValue = d;
        $scope.$apply();
    };
    $scope.barValue = 'None';


    websocketService.start("ws://localhost:40510", function (evt) {

        var obj = formatTime(evt.data);
        var json = JSON.parse(obj);

        $scope.$apply(function () {

            if (json.am == 0)
                $scope.time = json.hours + " : " + json.minutes + " : " +  json.seconds + " AM";
            else
                $scope.time = json.hours + " : " + json.minutes + " : " +  json.seconds + " PM";

        });

    });
});

app.factory('websocketService', function () {
        return {
            start: function (url, callback) {
                var websocket = new WebSocket(url);
                websocket.onopen = function () {
                };
                websocket.onclose = function () {
                };
                websocket.onmessage = function (evt) {
                    callback(evt);
                };
            }
        }
    }
);

app.directive('barChart', function(){
    var chart = d3.custom.barChart();
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="chart"></div>',
        scope:{
            height: '=height',
            data: '=data',
            hovered: '&hovered'
        },
        link: function(scope, element, attrs) {
            var chartEl = d3.select(element[0]);
            chart.on('customHover', function(d, i){
                scope.hovered({args:d});
            });

            scope.$watch('data', function (newVal, oldVal) {
                chartEl.datum(newVal).call(chart);
            });

            scope.$watch('height', function(d, i){
                chartEl.call(chart.height(scope.height));
            })
        }
    }
})
app.directive('chartForm', function(){
    return {
        restrict: 'E',
        replace: true,
        controller: function AppCtrl ($scope) {
            $scope.update = function(d, i){ $scope.data = randomData(); };
            function randomData(){
                return d3.range(~~(Math.random()*50)+1).map(function(d, i){return ~~(Math.random()*1000);});
            }
        },
        template: '<div class="form">' +
        'Height: {{options.height}}<br />' +
        '<input type="range" ng-model="options.height" min="100" max="800"/>' +
        '<br /><button ng-click="update()">Update Data</button>' +
        '<br />Hovered bar data: {{barValue}}</div>'
    }
});

function formatTime(time){
    //ampm 0 means AM
    var ampm = 0;
    var hours = (parseInt(time.substring(12,14)) + 16) % 24;
    if(hours > 12){
        hours = hours - 12;
        ampm = 1;
    }
    else if(hours == 0){
        hours = 12;
        ampm = 0;
    }
    if (hours.toString().length == 1)
        hours = "0"+hours;


    var sec = parseInt(time.substring(18,20));
    if (sec.toString().length == 1)
        sec = "0"+sec;

    var mins = parseInt(time.substring(15,17));
    if (mins.toString().length == 1)
        mins = "0"+mins;

    return JSON.stringify({ seconds: sec, hours: hours,
        minutes: mins, am: ampm});
}

//http://bl.ocks.org/biovisualize/5372077
