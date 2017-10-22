// Module responsible for connecting to a web socket server
var WebSocketClientModule = (function(){

    var container, settings, websocket;

    function init(options){
        settings = $.extend({
            "uri"  : "ws://echo.websocket.org"
        }, options || {});
    }

    function start(){
        websocket = new WebSocket(settings.uri);
        websocket.onopen = onOpen;
        websocket.onclose = onClose;
        websocket.onmessage = onMessage;
        websocket.onerror = onError;
    }

    function onOpen(evt){
        writeToScreen("CONNECTED");
        doSend("WebSocket rocks");
    }

    function onClose(evt){
        writeToScreen("DISCONNECTED");
    }

    function onMessage(evt){
        writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data+'</span>');
    }

    function onError(evt){
        writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
    }

    function doSend(message){
        writeToScreen("SENT: " + message);
        websocket.send(message);
    }

    function writeToScreen(message){
        var pre = document.createElement("p");
        pre.style.wordWrap = "break-word";
        pre.innerHTML = message;

        var output = document.getElementById("output")
        output.appendChild(pre);
    }

    return{
        init:init,
        start:start,
        doSend:doSend
    }
})();

WebSocketClientModule.init();
WebSocketClientModule.start();