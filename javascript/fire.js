class Fire{
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.sprite = new Animation(this.x, this.y,"fire", 38, 38, 0, 8, 17, 32, 32);
        this.count = 16*5;
    }
    update() {
        this.sprite.update(this.x, this.y, 0);
        this.count--;
    }
    checkDone() {
        if (this.count < 0) return true;
        else return false;
    }
    draw(context) {
        this.sprite.draw(context);
    }
    checkCollision(rect1, rect2) {
        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y) {
            return true;
        }
        return false;
    }
    kill() {
        var sx = Math.trunc((player.x + 10) / 32) * 32;
        var sy = Math.trunc((player.y + 10) / 32) * 32;
        if ((player.x + 10) % 32 == 0 || (player.x + 10) % 32 > 20) sx += 32;
        if ((player.y + 10) % 32 == 0 || (player.y + 10) % 32 > 20) sy += 32;
        if (sx == this.x && sy == this.y) {
            if (player.dead == false) {
                player.dead = true;
                if (this.id != player.id) {
                    for (var i = 0; i < bombers.length; i++) {
                        if (bombers[i].id == this.id) {
                            bombers[i].point++;
                            console.log(bombers[i].point);
                            socket.emit("up_point", {id:this.id});
                            break;
                        }
                    }
                }
            }
        }
    }
}