/**
 * Created by Administrator on 29/05/2016.
 */
/**
 * Created by keldeo on 18/05/2016.
 * */
class Brick{
    constructor(x,y){
        this.x = x * 32 ;
        this.y = y * 32;
        this.sprite = new Image();
        this.sprite.src = 'images/tile_wall.png';
    }
    draw(context){
        context.drawImage(this.sprite, this.x, this.y);
    }
}
class Wood{
    constructor(x,y){
        this.x = x * 32;
        this.y = y * 32;
        this.sprite = new Image();
        this.sprite.src = 'images/tile_wood.png';
    }
    draw(context){
        context.drawImage(this.sprite, this.x, this.y);
    }
}
