var myTime = 0;
var ws = new WebSocket('ws://localhost:40510');


var app = angular.module('socketApp', ['ngRoute']);

app.controller('myController', function ($scope, websocketService) {
    $scope.msg = "...";

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

    return JSON.stringify({ seconds: sec, hours: hours,
        minutes: parseInt(time.substring(15,17)), am: ampm});
}

http://bl.ocks.org/biovisualize/5372077
$( document ).ready(function() {
    var barChart = d3.select("#chart")
        .append("svg")
        .chart("BarChart")
        .width(200)
        .height(150);

    barChart.draw([
        {name: 'a', value: 2},
        {name: 'b', value: 16},
        {name: 'c', value: 19},
        {name: 'd', value: 8},
        {name: 'e', value: 6}
    ]);
});