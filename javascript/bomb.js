class Bomb{
     constructor(x, y, length, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.length = length;
        this.sprite = new Animation(this.x, this.y,"bomb", 28, 28, 0, 3, 17, 32, 32);
        this.count = 180;
        this.isMove = false;
    }
    update() {
        this.sprite.update(this.x, this.y, 0);
        this.count--;
        // console.log(this.count);
    }
    draw(context) {
        this.sprite.draw(context);
    }
    checkBlowUp() {
        if (this.count < 0) return true;
        else return false;
    }
    blowUp() {
        var boomSound = new Audio("sound/bomb.mp3");
        boomSound.play();
        // console.log(this.length);
        // var kind1 = 1;
        for (var i = this.x; i <= this.x + this.length; i+=32) {
            var isFire = true;
            for (var j = 0; j < wallBrick.length; j++) {
                if (wallBrick[j].x == i && wallBrick[j].y == this.y) {
                    // console.log(wa)
                    isFire = false;
                    break;
                }
            }
            if (isFire == false) break;

            var fire = new Fire(i, this.y, this.id);
            fireArray.push(fire);
            for (var j = 0; j < wallWood.length; j++) {
                if (wallWood[j].x == i && wallWood[j].y == this.y) {
                    if (map[Math.trunc(wallWood[j].x / 32)][Math.trunc(wallWood[j].y / 32)] >= 3) {
                        var kind = map[Math.trunc(wallWood[j].x / 32)][Math.trunc(wallWood[j].y / 32)] % 3;
                        var gift = new Gift(wallWood[j].x, wallWood[j].y, kind);
                        giftArray.push(gift);
                    }

                    socket.emit("remove_wood", {x:i, y:this.y});
                    wallWood.splice(j, 1);
                }
            }
        }
        for (var i = this.x - 32; i >= this.x - this.length; i-=32) {
            var isFire = true;
            for (var j = 0; j < wallBrick.length; j++) {
                if (wallBrick[j].x == i && wallBrick[j].y == this.y) {
                    // console.log(wa)
                    isFire = false;
                    break;
                }
            }
            if (isFire == false) break;

            var fire = new Fire(i, this.y, this.id);
            fireArray.push(fire);
            for (var j = 0; j < wallWood.length; j++) {
                if (wallWood[j].x == i && wallWood[j].y == this.y) {
                    if (map[Math.trunc(wallWood[j].x / 32)][Math.trunc(wallWood[j].y / 32)] >= 3) {
                        var kind = map[Math.trunc(wallWood[j].x / 32)][Math.trunc(wallWood[j].y / 32)] % 3;
                        var gift = new Gift(wallWood[j].x, wallWood[j].y, kind);
                        giftArray.push(gift);
                    }

                    socket.emit("remove_wood", {x:i, y:this.y});
                    wallWood.splice(j, 1);
                }
            }
        }
        for (var i = this.y - 32; i >= this.y - this.length; i-=32) {
            var isFire = true;
            for (var j = 0; j < wallBrick.length; j++) {
                if (wallBrick[j].x == this.x && wallBrick[j].y == i) {
                    // console.log(wa)
                    isFire = false;
                    break;
                }
            }
            if (isFire == false) break;
            var fire = new Fire(this.x, i, this.id);
            fireArray.push(fire);

            for (var j = 0; j < wallWood.length; j++) {
                if (wallWood[j].x == this.x && wallWood[j].y == i) {
                    // console.log(wallWood[j].x + " " + wallWood[j].y);
                    if (map[Math.trunc(wallWood[j].x / 32)][Math.trunc(wallWood[j].y / 32)] >= 3) {
                        var kind = map[Math.trunc(wallWood[j].x / 32)][Math.trunc(wallWood[j].y / 32)] % 3;
                        var gift = new Gift(wallWood[j].x, wallWood[j].y, kind0);
                        giftArray.push(gift);
                    }

                    socket.emit("remove_wood", {x:this.x, y:i});
                    wallWood.splice(j, 1);
                }
            }
        }
        for (var i = this.y + 32; i <= this.y + this.length; i+=32) {
            var isFire = true;
            for (var j = 0; j < wallBrick.length; j++) {
                if (wallBrick[j].x == this.x && wallBrick[j].y == i) {
                    // console.log(wa)
                    isFire = false;
                    break;
                }
            }
            if (isFire == false) break;
            var fire = new Fire(this.x, i, this.id);
            fireArray.push(fire);
            for (var j = 0; j < wallWood.length; j++) {
                if (wallWood[j].x == this.x && wallWood[j].y == i) {
                    // console.log(wallWood[j].x + " " + wallWood[j].y);
                    if (map[Math.trunc(wallWood[j].x / 32)][Math.trunc(wallWood[j].y / 32)] >= 3) {
                        var kind = map[Math.trunc(wallWood[j].x / 32)][Math.trunc(wallWood[j].y / 32)] % 3;
                        var gift = new Gift(wallWood[j].x , wallWood[j].y , kind);
                        giftArray.push(gift);
                    }
                    socket.emit("remove_wood", {x:this.x, y:i});
                    wallWood.splice(j, 1);
                }
            }
        }
    }
}