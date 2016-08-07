var gameArray = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];
var pickedTiles = [];
var scoreText;
var moves =0;
var shuffle = function(v) {
    for(var j,x,i = v.length;i;j=parseInt(Math.random()*i),x=v[--i],v[i]=v[j],v[j]=x);
        return v;
};
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);

        return true;
    }
});
var backgroundLayer;
var gameLayer = cc.Layer.extend({
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size

        var size = cc.winSize;
        gradient = cc.LayerGradient.create(new cc.Color(0,0,00,255),new cc.Color(0x46,0x82,0xB4,255));
        this.addChild(gradient);
        scoreText=cc.LabelTTF.create("Moves:0","Arial","32",cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(scoreText);
        scoreText.setPosition(90,50);
        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Match the monsters!!!", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        for(var i =0;i<16;i++){
            var tile = new MemoryTile();
            tile.pictureValue=gameArray[i];
            this.addChild(tile,0);
            tile.setPosition((size.width/2-2*60)+i%4*74,400-Math.floor(i/4)*74);
        }
       
        return true;
    }
});
var MemoryTile = cc.Sprite.extend ({
    ctor:function(){
        this._super();
        this.initWithFile("res/cover.jpg");
        var listener = cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan: function(touch,event){
                if(pickedTiles.length < 2 ){
                    var target = event.getCurrentTarget();
                    var location = target.convertToNodeSpace(touch.getLocation());
                    var targetSize =  target.getContentSize();
                    var targetRectangle = cc.rect(0,0,targetSize.width,targetSize.height);
                    if(cc.rectContainsPoint(targetRectangle,location)){
                        console.log("I picked a tile!");
                        if(pickedTiles.indexOf(target)==-1){
                            target.initWithFile("res/tile_"+target.pictureValue+".png");
                        }
                        pickedTiles.push(target);
                        if(pickedTiles.length==2){
                            checkTiles();
                        }
                    }
                }
            }
        });
        cc.eventManager.addListener(listener.clone(),this);
    }
});

function checkTiles(){
    moves++;
    scoreText.setString("Moves: "+moves);
    var pause = setTimeout(function(){
        if(pickedTiles[0].pictureValue != pickedTiles[1].pictureValue){
            pickedTiles[0].initWithFile("res/cover.jpg");
            pickedTiles[1].initWithFile("res/cover.jpg");
        }
        else  {
            pickedTiles[0].removeFromParent(true);
            pickedTiles[1].removeFromParent(true);
        }
        pickedTiles=[];
    },2000);
}
var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

var gameScene = cc.Scene.extend({
    onEnter:function () {
        gameArray = shuffle(gameArray);
        this._super();
        console.log("my awesome game starts here");
        var layer = new gameLayer();
        this.addChild(layer);
    }
});