/**
 * Created by Son Nui on 5/18/2016.
 */
class EnemyBomber{
    constructor(x, y, fileName) {
        this.point = 0;
        this.id = -1;
        this.x = x;
        this.y = y;
        this.sprite = new Animation(this.x, this.y,fileName, 48, 48, 0, 4, 17, 48, 48);
        this.direction = 0;
    }
    update() {
        var sx = this.x;
        var sy = this.y;
        if (this.speedX != 0)
            sx = Math.trunc(sx / 4) * 4;
        if (this.speedY != 0)
            sy = Math.trunc(sy / 4) * 4;
        this.sprite.update(sx, sy, this.direction);
    }
    draw(context) {
        context.font = "15px black Arial";
        context.fillText(this.id,this.x + 8,this.y);
        this.sprite.draw(context);
    }
}