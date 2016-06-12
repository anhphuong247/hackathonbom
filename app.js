/**
 * Created by Son Nui on 6/4/2016.
 */
var express = require("express");
var app = express();
app.use(express.static(__dirname));

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendfile('index.html');
});

var bombers = [];
var map = [
    [1,1,1,1,1,1,1, 1, 1, 1, 1, 1, 1, 1,1,1, 1],
    [1,0,0,3,2,2,2, 2, 2, 2, 4, 2, 2, 2,0, 0, 1],
    [1,0,0,2,1,4,1, 3, 1, 2, 1, 2, 1, 2 ,0, 0, 1],
    [1,0,0,3,2,2,3, 5, 2, 2, 2, 2, 2, 2 ,0, 0, 1],
    [1,0,0,2,1,2,1, 2, 1, 2, 1, 2, 1, 2 ,2,2, 1],
    [1,1,2,3,2,2,2, 3, 2, 2, 2, 2, 2, 2 ,1,2, 1],
    [1,2,2,2,1,2,1, 2, 1, 2, 1, 2, 1, 2 ,2,1, 1],
    [1,1,2,2,2,2,2, 2, 2, 2, 2, 2, 2, 2 ,1,2, 1],
    [1,2,2,2,1,2,1, 2, 1, 2, 1, 2, 1, 2 ,2,2, 1],
    [1,2,2,2,2,2,5, 2, 2, 4, 2, 2, 5, 2 ,1,2, 1],
    [1,2,2,2,1,2,1, 2, 1, 2, 1, 2, 1, 2 ,2,2, 1],
    [1,3,2,2,4,2,2, 3, 2, 3, 2, 2, 2, 3 ,1,2, 1],
    [1,2,4,2,1,2,1, 2, 1, 2, 1, 2, 1, 2 ,2,2, 1],
    [1,0,0,2,1,5,1, 2, 1, 2, 1, 4, 1, 3 ,0, 0, 1],
    [1,0,0,2,2,3,2, 2, 2, 2, 2, 2, 5, 2 ,0, 0, 1],
    [1,0,0,2,1,2,1, 2, 1, 2, 1, 2, 1, 2 ,0, 0, 1],
    [1,1,1,1,1,1,1, 1, 1, 1, 1, 1, 1, 1,1,1,1],
];

io.on('connection', function(socket){
    socket.on("player_created", function (data) {
        socket.emit("init", {bombers:bombers, map:map});
        socket.broadcast.emit("new_player_created", data);
        bombers.push({id:data.id, x:data.x, y:data.y, dir:0, fileName:data.fileName, point:0});
        socket.id = data.id;
        console.log("new " + data.id);
    });
    socket.on("player_update", function (data) {
        // console.log("fuck");
        for (var i = 0; i < bombers.length; i++) {
            if (bombers[i].id == data.id) {
                bombers[i].x = data.x;
                bombers[i].y = data.y;
                bombers[i].dir = data.dir;
                break;
            }
        }
        socket.broadcast.emit("new_player_update", data);
    });
    socket.on("bomb_created", function (data) {
        socket.broadcast.emit("new_bomb_created", data);
    });
    socket.on("remove_wood", function (data) {
        var sx = Math.trunc(data.x / 32);
        var sy = Math.trunc(data.y / 32);
        map[sx][sy] = 0;
    });
    socket.on("up_point", function (data) {
        for (var i = 0; i < bombers.length; i++) {
            if (bombers[i].id == data.id) {
                bombers[i].point++;
                console.log(bombers[i].point);
                socket.broadcast.emit("new_up_point", {id:data.id, point:bombers[i].point});
                break;
            }
        }
    });
    socket.on("disconnect", function () {
        console.log("Out " + socket.id);
        for (var i = 0; i < bombers.length; i++) {
            if (bombers[i].id == socket.id) {
                bombers.splice(i, 1);
            }
        }
        socket.broadcast.emit("remove_bomber",{id:socket.id});
    })
});


http.listen(3030, function(){
    console.log('listening on *:3030');
});