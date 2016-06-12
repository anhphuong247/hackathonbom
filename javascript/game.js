
var wallBrick = [];
var wallWood = [];
var bombArray = [];
var myBombArray = [];
var fireArray = [];
var giftArray = [];
var context;
var bombers = [];
var socket;
var map = [];
window.onload = function () {
    console.log(map[0].length);
    var canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    canvas.width = 1200;
    canvas.height = 1200;
    document.body.appendChild(canvas);
    gameStart();
    setInterval(gameLoop, 17);
    initSocketClient();
};

function initSocketClient() {
    socket.emit("player_created",{x:player.x, y:player.y, id:player.id, fileName:player.fileName});
    socket.on("init", function (data) {
        for (var i = 0; i < data.bombers.length; i++) {
            var bomber = new EnemyBomber(data.bombers[i].x, data.bombers[i].y, data.bombers[i].fileName);
            bomber.id = data.bombers[i].id;
            bomber.direction = data.bombers[i].dir;
            bomber.point = data.bombers[i].point;
            bombers.push(bomber);
        }
        for (var i = 0; i < 17; i++) {
            for (var j = 0; j < 17; j++) {
                if (data.map[i][j] == 1) {
                    // console.log("brick");
                    var brick = new Brick(i, j);
                    wallBrick.push(brick);
                }else if (data.map[i][j] == 2) {
                    // console.log("steel");
                    var wood = new Wood(i, j);
                    wallWood.push(wood);
                }else if (data.map[i][j] >= 3) {
                    var wood = new Wood(i, j);
                    wallWood.push(wood);
                }
            }
        }
    });
    socket.on("new_up_point", function(data) {
        
        if (data.id == player.id) player.point++;
        else {
            console.log("fuck");
            for (var i = 0; i < bombers.length; i++) {
                if (bombers[i].id == data.id && bombers[i].point < data.point){
                    bombers[i].point++;
                    break;
                }
            }
        }
    });
    socket.on("new_player_created", function (data) {
        // console.log("fuck");
        var bomber = new EnemyBomber(data.x, data.y, data.fileName);
        bomber.id = data.id;
        bombers.push(bomber)
    });

    socket.on("new_player_update", function (data) {
        // console.log("cu: " + bombers[data.id].x + " " + bombers[data.id].y);
        for (var i = 0; i < bombers.length; i++) {
            if (bombers[i].id == data.id) {
                bombers[i].x = data.x;
                bombers[i].y = data.y;
                bombers[i].direction = data.dir;
                bombers[i].update();
                break;
            }
        }
        // console.log(data.id);
    });
    socket.on("new_bomb_created", function (data) {
        var bomb = new Bomb(data.x, data.y, data.length, data.id);
        bombArray.push(bomb);
    });
    socket.on("remove_bomber", function (data) {
        for (var i = 0; i < bombers.length; i++) {
            if (bombers[i].id == data.id) {
                bombers.splice(i, 1);
            }
        }
    })
}

var player;
var startX, startY;
function randomStart() {
    startX = 0; startY = 0;
    do{
        startX = Math.trunc(Math.random() * 17);
        startY = Math.trunc(Math.random() * 17);
    }while  (startX < 1 || startX > 15 || startY < 1 || startY > 15|| map[startX][startY] != 0);

    // console.log(startX + " " +startY + " " +map[startY][startX]);
    startX *= 32;
    startY *= 32;
    startX -= 8;
    startY -= 8;
}
function gameStart() {
    socket = io.connect();
    var sound = new Audio("sound/faded.mp3");
    sound.loop = true;
    sound.play();
    randomStart();
    var kindBomber = Math.trunc(Math.random() * 2);
    if (kindBomber == 0) {
        player = new Bomber(startX, startY, "george");
        player.length = 64;
    }else {
        player = new Bomber(startX, startY, "betty");
        player.maxBoom = 2;
    }
    player.id = prompt("Please enter your name", "");
}

var gameLoop = function () {
    // console.log(giftArray.length);
    gameUpdate();
    gameDrawer(context);
};

function gameDrawer(context) {
    context.clearRect(0, 0, 1200, 1200);
    context.fillStyle = 'black';
    var j = 0;
    var s = "";
    for (j = 0; j < bombers.length; j++) {
        s = "";
        s += bombers[j].id + " - " + bombers[j].point ;
        if (bombers[j].point <= player.point) break;
        context.font = "15px black Arial";
        context.fillText(s, 630, (j + 1) * 40);
    }
    s = "";
    s += player.id + " - " + player.point ;
        context.font = "15px black Arial";
        context.fillText(s, 630, (j + 1) * 40);
    for (; j < bombers.length; j++) {
        s = "";
        s += bombers[j].id + " - " + bombers[j].point ;
        context.font = "15px black Arial";
        context.fillText(s, 630, (j + 2) * 40);
    }
    
    for (var i = 0; i < fireArray.length; i++) {
        fireArray[i].draw(context);
    }
    for (var i = 0; i < wallBrick.length; i++) {
        wallBrick[i].draw(context);
    }
    for (var i = 0; i < giftArray.length; i++) {
        giftArray[i].draw(context);
    }
    for (var i = 0; i < wallWood.length; i++) {
        wallWood[i].draw(context);
    }
    for (var i = 0; i < bombArray.length; i++) {
        bombArray[i].draw(context);
    }
    for (var i = 0; i < myBombArray.length; i++) {
        myBombArray[i].draw(context);
    }
    player.draw(context);
    for (var i = 0; i < bombers.length; i++) {

        // console.log("moi: " + bombers[i].x + " " + bombers[i].y);
        bombers[i].draw(context);
    }
};
function gameUpdate() {
    // console.log(player.countBoom);
    player.update();

    for (var i = 0; i < bombers.length; i++) {

        // console.log("moi: " + bombers[i].x + " " + bombers[i].y);
        bombers[i].update();
    }
    for (var i = 0; i < bombers.length; i++) {
        for (var j = i + 1; j < bombers.length; j++) {
            if (bombers[i].point < bombers[j].point) {
                var tmp = bombers[i];
                bombers[i] = bombers[j];
                bombers[j] = tmp;
            }
        }
    }
    if (player.speedX + player.speedY != 0 || player.direction == 4) {
        socket.emit("player_update", {id:player.id, x:player.x, y:player.y, dir:player.direction});
        // console.log("fuck");
    }
    for (var i = 0; i < bombArray.length; i++) {
        bombArray[i].update();
        if (bombArray[i].checkBlowUp()) {
            // console.log(1);
            bombArray[i].blowUp();
            bombArray.splice(i, 1);
        }
    }
    for (var i = 0; i < myBombArray.length; i++) {
        myBombArray[i].update();
        if (myBombArray[i].checkBlowUp()) {
            // console.log(1);
            if(player.countBoom > 0)player.countBoom--;
            myBombArray[i].blowUp();
            myBombArray.splice(i, 1);
        }
    }
    for (var i = 0; i < fireArray.length; i++) {
        fireArray[i].update();
        fireArray[i].kill();
        if (fireArray[i].checkDone()) {
            fireArray.splice(i,1);
        }
    }
}

window.onkeydown = function (e) {
    switch (e.keyCode) {
        case 65:
            player.move(3);
            break;
        case 68:
            player.move(4);
            break;
        case 87:
            player.move(1);
            break;
        case 83:
            player.move(2);
            break;
        case 32:
            player.shot();
            break;
    }
};

window.onkeyup = function (e) {
    switch (e.keyCode){
        case 65://a
            if(player.speedX < 0){
                player.speedX = 0;
            }
            break;
        case 68://d
            if(player.speedX > 0){
                player.speedX = 0;
            }
            break;
        case 83://s
            if(player.speedY > 0){
                player.speedY = 0;
            }
            break;
        case 87://w
            if(player.speedY < 0){
                player.speedY = 0;
            }
            break;
    }
};