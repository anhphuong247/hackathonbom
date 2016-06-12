/**
 * Created by Son Nui on 5/29/2016.
 */
/**
 * Created by Son Nui on 5/22/2016.
 */
class Animation {
    constructor(x, y, name, width, height, dir, countFrame, speed, widthframe, heightframe) {
        this.x = x;
        this.y = y;
        this.countFrame = countFrame;
        this.index = 0;
        this.speed = speed;
        this.width = width;
        this.height = height;
        this.sprites = new Image();
        this.dir = dir;
        this.count = 0;
        this.sprites.src = "images/" + name + ".png";
        this.widthframe = widthframe;
        this.heightframe = heightframe;
    }
    update(x, y, dir) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.count++;
        if (this.count >= this.speed) {
            this.index++;
            this.count = 0;
            this.index %= this.countFrame;
        }
    }
    draw(context) {
        //context.drawImage(this.sprites, 100,100);
        context.drawImage(this.sprites, this.index * this.width, this.dir*this.height, this.width, this.height, this.x, this.y, this.widthframe, this.heightframe);
   }
}