

var play_state = {

    // No more preload, since it is already done in the 'load' state
    backgroundTiles :  [],
    titleSize : 50,
    indexOfPlayer : 0,
    countX : 0,
    countY : 0,
    connectedValue: 0,
    nextValueShouldBe : 1,
    countOfValues : 6,
    score : 0,
    totalNumbersInAlevel : 6,
    back_layer : null,
    mid_layer : null,
    front_layer : null,
    autoMoveInterval : 600,
    
    moveStarted : false,
    moveTypes : {LEFT:0, RIGHT:1, UP:2, DOWN:3},
    currentMoveType: null,
    autoMoveEvent : null,
    
    levelCompleted: false,
    
    create: function() { 
        //var space_key = this.game.input.keyboard.addKey(Phaser.input.onDown);
         
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        var w_key = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        var a_key = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        var s_key = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        var d_key = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        var up_arrow = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        var down_arrow = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        var left_arrow = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        var right_arrow = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        
        w_key.onDown.add(this.moveTypeUp, this); 
        a_key.onDown.add(this.moveTypeLeft, this); 
        s_key.onDown.add(this.moveTypeDown, this); 
        d_key.onDown.add(this.moveTypeRight, this);
        up_arrow.onDown.add(this.moveTypeUp, this); 
        down_arrow.onDown.add(this.moveTypeDown, this); 
        left_arrow.onDown.add(this.moveTypeLeft, this); 
        right_arrow.onDown.add(this.moveTypeRight, this); 
        
        
        space_key.onDown.add(this.jump, this); 
        
        game.input.onDown.add(this.jump, this);
  
        this.back_layer = game.add.group();
        this.mid_layer = game.add.group();
        this.front_layer = game.add.group();
        
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
        
         
         do {
             this.indexOfPlayer = Math.floor(Math.random() * (this.backgroundTiles.length)); 
           
            
        }while ( this.backgroundTiles[this.indexOfPlayer].hasNumber);
        
        /// tile which will move 
        var x = this.backgroundTiles[this.indexOfPlayer].tile.x, y =this.backgroundTiles[this.indexOfPlayer].tile.y;
        this.bird = this.game.add.sprite(x, y, 'bird');
      console.log(this.bird);
       // this.bird.body.gravity.y = 1000; 
        this.bird.anchor.setTo(0, 0);
       this.front_layer.add(this.bird);
        
        // Not 'this.score', but just 'score'
        score = 0; 
        var style = { font: "30px Arial", fill: "#008000" };
        this.label_score = this.game.add.text(20, 20, score, style); 
        this.label_score.setText(this.score);
        this.jump_sound = this.game.add.audio('jump');
        

        var startPoint = {};      
        game.input.onDown.add(function(pointer) {
            startPoint.x = game.input.x;
            startPoint.y = game.input.y;
            console.log( " pointer " + startPoint.x +" / "+startPoint.y + " bird " + this.bird.x +" / "+ this.bird.y );
             if (this.currentMoveType == this.moveTypes.LEFT) {
                if(startPoint.y > this.bird.y) {
                  this.moveTypeDown();   
                }else if(startPoint.y < this.bird.y){
                   this.moveTypeUp();    
                }      
             }else if (this.currentMoveType == this.moveTypes.RIGHT) {
                if(startPoint.y > this.bird.y) {
                  this.moveTypeDown();   
                }else if(startPoint.y < this.bird.y){
                   this.moveTypeUp();    
                }
                 
             } else if (this.currentMoveType == this.moveTypes.UP) {
                if(startPoint.x > this.bird.x) {
                  this.moveTypeRight();   
                }else if(startPoint.x < this.bird.x){
                   this.moveTypeLeft();    
                }
                 
             } else if (this.currentMoveType == this.moveTypes.DOWN) {
                if(startPoint.x > this.bird.x) {
                  this.moveTypeRight();   
                }else if(startPoint.x < this.bird.x){
                   this.moveTypeLeft();    
                }
                 
             }else {
               this.currentMoveType = this.moveTypes.UP;   
             }
             
        }, this);
        
        this.levelCompleted = false;
        
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
              this.backgroundTiles[index] = {tile: this.pipe , hasNumber : false, visted:false, value:-1}; 
              index++;
                 this.back_layer.add(this.pipe); 
//              var style = { font: "30px Arial", fill: "#ffff00" };
//                var no = this.game.add.text( x, y, index-1, style)    
            } 
        }
        
    },
    
    assignNumber: function () {
       
        var count = 0;
        var valueOfTile =0;
        
        do {
             var random = Math.floor(Math.random() * (this.backgroundTiles.length)); 
            //console.log ( "random "+random +" lenght "+ this.backgroundTiles.length +" has num "+this.backgroundTiles[random].hasNumber)
            if(! this.backgroundTiles[random].hasNumber && !this.isNearestTileHasNumber(random)) {
                var style = { font: "30px Arial", fill: "#ff0000" };
                valueOfTile = this.nextValueShouldBe+count;
                var no = this.game.add.text( this.backgroundTiles[random].tile.x+10, this.backgroundTiles[random].tile.y+10, valueOfTile, style)
                this.backgroundTiles[random].hasNumber = true; 
                 this.backgroundTiles[random].value = valueOfTile; 
                count++;
            }
            
        }while (count < this.totalNumbersInAlevel);
        
        this.countOfValues = valueOfTile;

    },
    
   isNearestTileHasNumber : function( index ) {
        
        if(index < this.countx || this.backgroundTiles.length - index < this.countx || index% this.countx == 0 || index% this.countx == this.countx-1 ) {
           return true;   
        }
        return ( this.isThisIndexHasNumber(index-1)|| this.isThisIndexHasNumber(index+1) ||
                this.isThisIndexHasNumber(index- this.county) || this.isThisIndexHasNumber(index+ this.county)||
                this.isThisIndexHasNumber(index- this.county-1) || this.isThisIndexHasNumber(index+ this.county -1) ||
               this.isThisIndexHasNumber(index- this.county +1) || this.isThisIndexHasNumber(index+ this.county+1))
    },
    
    isThisIndexHasNumber : function (index) {
       
        if (index >=0 && index < this.backgroundTiles.length &&  this.backgroundTiles[index].hasNumber)   {
            return true;
        }
        else return false;
    },
    
    startPlayerAutoMove : function () {
       if( !this.moveStarted ) {
//           game.time.events.add(this.autoMoveInterval, this.movePlayerWithInterval, this);
           this.autoMoveEvent = game.time.events.loop(this.autoMoveInterval, this.movePlayerWithInterval, this);
           this.moveStarted = true;
       }
        
    },
    
    movePlayerWithInterval : function () {
        
        /// check the direction call that function 
        if(this.currentMoveType == this.moveTypes.LEFT)
            this.moveLeft();
        else if(this.currentMoveType == this.moveTypes.RIGHT)
            this.moveRight();
        else if(this.currentMoveType == this.moveTypes.UP)
            this.moveUp();
        else if(this.currentMoveType == this.moveTypes.DOWN)
            this.moveDown();
        
    },
    moveTypeLeft : function () {
        this.currentMoveType = this.moveTypes.LEFT;
        this.startPlayerAutoMove();        
    },
    
    moveTypeRight : function () {
        this.currentMoveType = this.moveTypes.RIGHT;
        this.startPlayerAutoMove();        
    },

    moveTypeUp : function () {
        this.currentMoveType = this.moveTypes.UP;
        this.startPlayerAutoMove();        
    },

    moveTypeDown : function () {
        this.currentMoveType = this.moveTypes.DOWN;
        this.startPlayerAutoMove();        
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
//        if (this.bird.alive == false)
//            return; 
        
//        this.bird.body.velocity.y = -350;
//        this.game.add.tween(this.bird).to({angle: -20}, 100).start();
//        this.jump_sound.play();
    },
    
    restart_game: function() {
        
        this.game.time.events.remove(this.timer);

        // This time we go back to the 'menu' state
        this.game.state.start('menu');
     
        
        

        var prevHighScore = localStorage.getItem('highScore');
        var currentScore = this.score;
        if(prevHighScore == null || prevHighScore < currentScore) {
          localStorage.setItem('highScore', currentScore);
          prevHighScore = currentScore;
        }

        this.autoMoveInterval = 600;
        this.moveStarted = false;
        game.time.events.remove(this.autoMoveEvent);
        this.label_score.setText( this.score); 
        this.countOfValues = 6;
       // this.restart_game(); 
        var style = { font: "20px Arial", fill: "#ffffff" };
        this.game.add.text(20, 40, "high score: " + prevHighScore, style);  
        this.game.add.text(20, 70, "Current score: " + currentScore, style);  
        this.game.add.text(20, 100, "Game over, press 'space' to play again", style);  
        console.log("wrong number connected");
        
           this.resetValues();
    },  
    
    resetValues : function () {
        this.backgroundTiles =  [];
        this.titleSize = 50;
        this.indexOfPlayer = 0;
        this.countX = 0;
        this.countY = 0;
        this.connectedValue= 0;
        this.nextValueShouldBe = 1;  
        this.score = 0;
    },
    
    moveLeft: function() {
        
      if(this.levelCompleted )
          return;
        
      /// code to move left, when pressed key A
       // this.game.add.tween(this.bird).to({position:0}, 0).start();
    
       var nextIndexWouldBe = this.indexOfPlayer-this.county;
        console.log("Player index " + this.indexOfPlayer + " next "+nextIndexWouldBe);
       if(nextIndexWouldBe >= 0 && nextIndexWouldBe < this.backgroundTiles.length && !this.backgroundTiles[nextIndexWouldBe].visted ) {
           if (this.bird.alive == false)
                return; 
            this.bird.x -= this.titleSize;
           // this.jump_sound.play();
            this.indexOfPlayer = nextIndexWouldBe;
            this.backgroundTiles[this.indexOfPlayer].visted = true;
             var vistedsprite = this.game.add.sprite(this.backgroundTiles[nextIndexWouldBe].tile.x, this.backgroundTiles[nextIndexWouldBe].tile.y, 'pipe_visited');
             this.connectValues();
             this.mid_layer.add(vistedsprite); 
         
       }else {
         this.restart_game();   
          console.log("Going back to already covered tile!");
       }
        this.curretMoveType = this.moveTypes.LEFT;
        this.startPlayerAutoMove();
    },
    moveRight: function() {
          if(this.levelCompleted )
          return;
      /// code to move left, when pressed key d
       var nextIndexWouldBe = this.indexOfPlayer+this.county;
       if(nextIndexWouldBe >= 0 && nextIndexWouldBe < this.backgroundTiles.length && !this.backgroundTiles[nextIndexWouldBe].visted ) {
           if (this.bird.alive == false)
                return; 
            this.bird.x += this.titleSize;
          //  this.jump_sound.play();
              this.indexOfPlayer = nextIndexWouldBe;
             this.backgroundTiles[this.indexOfPlayer].visted = true;
          vistedsprite = this.game.add.sprite(this.backgroundTiles[nextIndexWouldBe].tile.x, this.backgroundTiles[nextIndexWouldBe].tile.y, 'pipe_visited');
             this.connectValues();
           this.mid_layer.add(vistedsprite); 
       }else {
         this.restart_game();   
          console.log("Going back to already covered tile!");
       }
    },
    moveUp: function() {
          if(this.levelCompleted )
          return;
        var nextIndexWouldBe = this.indexOfPlayer-1;
       if( nextIndexWouldBe >= 0 && nextIndexWouldBe < this.backgroundTiles.length && ! this.backgroundTiles[nextIndexWouldBe].visted ) {
             if (this.bird.alive == false)
                return; 
          /// code to move left, when pressed key w
            this.bird.y -= this.titleSize;
          //  this.jump_sound.play();
              this.indexOfPlayer = nextIndexWouldBe;
             this.backgroundTiles[this.indexOfPlayer].visted = true;
            vistedsprite = this.game.add.sprite(this.backgroundTiles[nextIndexWouldBe].tile.x, this.backgroundTiles[nextIndexWouldBe].tile.y, 'pipe_visited');
             this.connectValues();
           this.mid_layer.add(vistedsprite); 
       }else {
         this.restart_game();   
          console.log("Going back to already covered tile!");
       }
        
    },
    moveDown: function() {
          if(this.levelCompleted )
          return;
         var nextIndexWouldBe = this.indexOfPlayer+1;
       if(nextIndexWouldBe >= 0 && nextIndexWouldBe < this.backgroundTiles.length && !this.backgroundTiles[nextIndexWouldBe].visted ) {
             if (this.bird.alive == false)
                return; 
          /// code to move left, when pressed key s
            this.bird.y += this.titleSize;
           // this.jump_sound.play();
             this.indexOfPlayer = nextIndexWouldBe;
             this.backgroundTiles[this.indexOfPlayer].visted = true;
            vistedsprite = this.game.add.sprite(this.backgroundTiles[nextIndexWouldBe].tile.x, this.backgroundTiles[nextIndexWouldBe].tile.y, 'pipe_visited');
            this.connectValues();
           this.mid_layer.add(vistedsprite); 
      }else {
         this.restart_game();   
          console.log("Going back to already covered tile!");
       }
        
    },
    
    connectValues : function () {
        
        if(this.backgroundTiles[this.indexOfPlayer].hasNumber) {
            console.log ("Tile value "+this.backgroundTiles[this.indexOfPlayer].value + " this.nextValueShouldBe "+ this.nextValueShouldBe);
             if(this.backgroundTiles[this.indexOfPlayer].value == this.nextValueShouldBe) {
               this.connectedValue = this.nextValueShouldBe;
               this.nextValueShouldBe++;
               this.score++;
               this.label_score.setText( this.score); //  this.game.add.text(20, 20, this.connectedValue, style); 
               if(this.connectedValue == this.countOfValues) {
                //  this.restart_game(); 
                   this.game.state.start('menu');
                  var style = { font: "20px Arial", fill: "#ffffff" };
                  this.game.add.text(20, 100, "Wow you did it, try next!", style);  
                 // this.countOfValues++;
                  this.backgroundTiles =  [];
                  this.titleSize = 50;
                  this.indexOfPlayer = 0;
             
                  this.moveStarted = false;
                  game.time.events.remove(this.autoMoveEvent);
                  this.autoMoveInterval -= 20;
                   
                  this.levelCompleted = true;
               }
             }else {
//               var prevHighScore = localStorage.getItem('highScore');
//               var currentScore = this.score;
//               if(prevHighScore && prevHighScore < currentScore) {
//                  localStorage.setItem('highScore', this.score);
//                  prevHighScore = this.score;
//               }
//               this.score = 0;
//               this.autoMoveInterval -= 600;
//               this.moveStarted = false;
//               game.time.events.remove(this.autoMoveEvent);
//               this.label_score.setText( this.score); 
//               this.countOfValues = 6;
               this.restart_game(); 
//               var style = { font: "20px Arial", fill: "#ffffff" };
//               this.game.add.text(20, 40, "high score: " + prevHighScore, style);  
//               this.game.add.text(20, 70, "Current score: " + currentScore, style);  
//               this.game.add.text(20, 100, "Game over, press 'space' to play again", style);  
//               console.log("wrong number connected");
                   this.levelCompleted = true;
             }
        }
    }
    
    
};