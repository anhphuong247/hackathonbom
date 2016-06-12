/**
 * Created by Son Nui on 5/30/2016.
 */
class Gift{
    constructor (x, y, kind) {
        console.log(kind);
        this.x = x;
        this.y = y;
        this.kind = kind;
        this.sprite = new Image();
        this.sprite.src = "images/bonuses.png";
    }
    draw(context) {
        context.drawImage(this.sprite, this.kind * 32 , 0, 32, 32, this.x, this.y, 32, 32);
    }
}