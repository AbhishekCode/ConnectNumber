

var play_state = {

    // No more preload, since it is already done in the 'load' state
    backgroundTiles :  [],
    titleSize : 50,
    indexOfPlayer : 0,
    countX : 0,
    countY : 0,
    
    create: function() { 
        //var space_key = this.game.input.keyboard.addKey(Phaser.input.onDown);
         
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        var w_key = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        var a_key = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        var s_key = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        var d_key = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        
        w_key.onDown.add(this.moveUp, this); 
        a_key.onDown.add(this.moveLeft, this); 
        s_key.onDown.add(this.moveDown, this); 
        d_key.onDown.add(this.moveRight, this); 
        
        space_key.onDown.add(this.jump, this); 
        
        game.input.onDown.add(this.jump, this);
        
        /// here write fucking code to create gameRoom 
        
		//var touch_key = this.game.input.touch.addKey(Phaser.mouse.touch);
        //space_key.onDown.add(this.jump, this); 
		//touch_key.onDown.add(this.jump, this);

//        this.pipes = game.add.group();
//        this.pipes.createMultiple(20, 'pipe');  
//        this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);    
        
        // background tiles 
        this.drawTiles();
        this.assignNumber();
        
        
        /// tile which will move 
        var x = 0, y = 0;
        this.bird = this.game.add.sprite(x, y, 'bird');
        this.indexOfPlayer =0;
       // this.bird.body.gravity.y = 1000; 
        this.bird.anchor.setTo(0, 0);
        
        // Not 'this.score', but just 'score'
        score = 0; 
        var style = { font: "30px Arial", fill: "#ffffff" };
        this.label_score = this.game.add.text(20, 20, "0", style); 

        this.jump_sound = this.game.add.audio('jump');
        
     
    },
    
    drawTiles: function () {
        // draw tiles somehow
        var x=0, y=0;
        this.countx = game.world.width / this.titleSize;
        this.county = game.world.height / this.titleSize;
        var index =0;
        for(var i=0; i<this.countx;  i++) {
            x = i* game.world.width /this.countx;
            for (var j=0; j<this.county; j++){
              y = j * game.world.height /this.county;
              this.pipe = this.game.add.sprite(x, y, 'pipe');
              this.backgroundTiles[index] = {tile: this.pipe , hasNumber : false, visted:false}; 
              index++;
            } 
        }
        
    },
    
    assignNumber: function () {
        var countOfNumbers = 10;
        var count = 0;
        
        do {
             var random = Math.floor(Math.random() * (this.backgroundTiles.length)); 
            console.log ( "random "+random +" lenght "+ this.backgroundTiles.length +" has num "+this.backgroundTiles[random].hasNumber)
            if(! this.backgroundTiles[random].hasNumber) {
                var style = { font: "30px Arial", fill: "#ff0000" };
                var no = this.game.add.text( this.backgroundTiles[random].tile.x+10, this.backgroundTiles[random].tile.y+10, count, style)
                this.backgroundTiles[random].hasNumber = true; 
                count++;
            }
            
        }while (count < countOfNumbers);
    },

    update: function() {
        if (this.bird.inWorld == false)
            this.restart_game(); 

//        if (this.bird.angle < 20)
//            this.bird.angle += 1;
//
//        this.game.physics.overlap(this.bird, this.pipes, this.hit_pipe, null, this);      
    },

    jump: function() {
        if (this.bird.alive == false)
            return; 

//        this.bird.body.velocity.y = -350;
//        this.game.add.tween(this.bird).to({angle: -20}, 100).start();
//        this.jump_sound.play();
    },
    
    restart_game: function() {
        
        this.game.time.events.remove(this.timer);

        // This time we go back to the 'menu' state
        this.game.state.start('menu');
    },    
    moveLeft: function() {
      /// code to move left, when pressed key A
       // this.game.add.tween(this.bird).to({position:0}, 0).start();
       var nextIndexWouldBe = this.indexOfPlayer-this.county;
       if(! this.backgroundTiles[nextIndexWouldBe].visted ) {
           if (this.bird.alive == false)
                return; 
            this.bird.x -= this.titleSize;
            this.jump_sound.play();
            this.indexOfPlayer = nextIndexWouldBe;
            this.backgroundTiles[this.indexOfPlayer].visted = true;
            this.game.add.sprite(this.backgroundTiles[nextIndexWouldBe].tile.x, this.backgroundTiles[nextIndexWouldBe].tile.y, 'pipe_visited');
       }else {
         this.restart_game();   
       }
    },
    moveRight: function() {
      /// code to move left, when pressed key d
       var nextIndexWouldBe = this.indexOfPlayer+this.county;
       if(! this.backgroundTiles[nextIndexWouldBe].visted ) {
           if (this.bird.alive == false)
                return; 
            this.bird.x += this.titleSize;
            this.jump_sound.play();
              this.indexOfPlayer = nextIndexWouldBe;
             this.backgroundTiles[this.indexOfPlayer].visted = true;
            this.game.add.sprite(this.backgroundTiles[nextIndexWouldBe].tile.x, this.backgroundTiles[nextIndexWouldBe].tile.y, 'pipe_visited');
       }else {
         this.restart_game();   
       }
    },
    moveUp: function() {
        var nextIndexWouldBe = this.indexOfPlayer-1;
       if(! this.backgroundTiles[nextIndexWouldBe].visted ) {
             if (this.bird.alive == false)
                return; 
          /// code to move left, when pressed key w
            this.bird.y -= this.titleSize;
            this.jump_sound.play();
              this.indexOfPlayer = nextIndexWouldBe;
             this.backgroundTiles[this.indexOfPlayer].visted = true;
            this.game.add.sprite(this.backgroundTiles[nextIndexWouldBe].tile.x, this.backgroundTiles[nextIndexWouldBe].tile.y, 'pipe_visited');
       }else {
         this.restart_game();   
       }
    },
    moveDown: function() {
         var nextIndexWouldBe = this.indexOfPlayer+1;
       if(! this.backgroundTiles[nextIndexWouldBe].visted ) {
             if (this.bird.alive == false)
                return; 
          /// code to move left, when pressed key s
            this.bird.y += this.titleSize;
            this.jump_sound.play();
             this.indexOfPlayer = nextIndexWouldBe;
             this.backgroundTiles[this.indexOfPlayer].visted = true;
            this.game.add.sprite(this.backgroundTiles[nextIndexWouldBe].tile.x, this.backgroundTiles[nextIndexWouldBe].tile.y, 'pipe_visited');
      }else {
         this.restart_game();   
       }
    },
    
    
};