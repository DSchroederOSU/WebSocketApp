angular.module('socketApp', [])

var ws = new WebSocket('ws://localhost:40510');
ws.onopen = function () {
    console.log('websocket is connected ...')
    ws.send('BLAH BLAH BLAH')
}

ws.onmessage = function (ev) {
    console.log("HAHA");
    console.log(ev);
}
