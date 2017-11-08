var myTime = 0;
var ws = new WebSocket('ws://localhost:40510');


var app = angular.module('socketApp', ['ngRoute']);

app.controller('myController', function ($scope, websocketService) {
    $scope.msg = "...";

    websocketService.start("ws://localhost:40510", function (evt) {

        var obj = formatTime(evt.data);
        var json = JSON.parse(obj);

        $scope.$apply(function () {
            $scope.hours = json.hours;
            $scope.seconds = json.seconds;
            $scope.minutes = json.minutes;
            $scope.time = obj
            if (json.am == 0)
                $scope.am = "AM"
            else
                $scope.am = "PM"
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
    var sec = parseInt(time.substring(18,20));
    if (sec.toString().length == 1)
        sec = "0"+sec;

    return JSON.stringify({ seconds: sec, hours: hours,
        minutes: parseInt(time.substring(15,17)), am: ampm});
}