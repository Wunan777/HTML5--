var game=new Phaser.Game(320,505,Phaser.AUTO,'gamediv');
game.States = {}; 

game.States.boot=function(){
 	this.preload = function(){
        game.load.image('loading','assets/preloader.gif'); //加载进度条图片资源
    };
    this.create = function(){
        game.state.start('preload'); //加载完成后，调用preload场景
    };
}
game.States.preload = function(){
    this.preload = function(){
        var preloadSprite = game.add.sprite(50,game.height/2,'loading'); //创建显示loading进度的sprite
        game.load.setPreloadSprite(preloadSprite);  //用setPreloadSprite方法来实现动态进度条的效果
        
        //以下为要加载的资源
        game.load.image('background','assets/background.png'); //游戏背景图
        game.load.image('ground','assets/ground.png'); //地面
        game.load.image('title','assets/title.png'); //游戏标题
        game.load.spritesheet('bird','assets/bird.png',34,24,3); //鸟
        game.load.image('btn','assets/start-button.png');  //按钮
        game.load.spritesheet('pipe','assets/pipes.png',54,320,2); //管道
        game.load.bitmapFont('flappy_font', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');//显示分数的字体
        game.load.audio('fly_sound', 'assets/flap.wav');//飞翔的音效
        game.load.audio('score_sound', 'assets/score.wav');//得分的音效
        game.load.audio('hit_pipe_sound', 'assets/pipe-hit.wav'); //撞击管道的音效
        game.load.audio('hit_ground_sound', 'assets/ouch.wav'); //撞击地面的音效

        game.load.image('ready_text','assets/get-ready.png'); //get ready图片
        game.load.image('play_tip','assets/instructions.png'); //玩法提示图片
        game.load.image('game_over','assets/gameover.png'); //gameover图片
        game.load.image('score_board','assets/scoreboard.png'); //得分板
    }
    this.create = function(){
        game.state.start('menu'); //当以上所有资源都加载完成后就可以进入menu游戏菜单场景了
      
    }
}

game.States.menu = function(){ 

    this.create = function(){
        var bg = game.add.tileSprite(0,0,game.width,game.height,'background');//当作背景的tileSprite 
        var ground = game.add.tileSprite(0,game.height-112,game.width,112,'ground');//当作地面的tileSprite
        bg.autoScroll(-10,0);
        ground.autoScroll(-100,0);
        var titleGroup = game.add.group(); //创建存放标题的组
		titleGroup.create(0,0,'title'); //标题
		var bird = titleGroup.create(190, 10, 'bird'); //添加bird到组里
		bird.animations.add('fly'); //添加动画
		bird.animations.play('fly',12,true); //播放动画
		titleGroup.x = 35;
		titleGroup.y = 100;


        //让背景动起来
         //让地面动起来
    }
}
game.state.add('boot',game.States.boot);
game.state.add('preload',game.States.preload);
game.state.add('menu',game.States.menu);
game.state.start('boot'); 