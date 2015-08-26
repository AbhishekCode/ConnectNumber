var play_state = {

    // No more preload, since it is already done in the 'load' state

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
        d_key.onDown.add(this.moveUp, this); 
        
        space_key.onDown.add(this.jump, this); 
        
        game.input.onDown.add(this.jump, this);
        
        /// here write fucking code to create gameRoom 
        
		//var touch_key = this.game.input.touch.addKey(Phaser.mouse.touch);
        //space_key.onDown.add(this.jump, this); 
		//touch_key.onDown.add(this.jump, this);

//        this.pipes = game.add.group();
//        this.pipes.createMultiple(20, 'pipe');  
//        this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);           
        var x = game.world.width/2, y = game.world.height/2;
        this.bird = this.game.add.sprite(x, y, 'bird');
       // this.bird.body.gravity.y = 1000; 
        this.bird.anchor.setTo(0.5, 0.5);
        
        // Not 'this.score', but just 'score'
        score = 0; 
        var style = { font: "30px Arial", fill: "#ffffff" };
        this.label_score = this.game.add.text(20, 20, "0", style); 

        this.jump_sound = this.game.add.audio('jump');
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
       if (this.bird.alive == false)
            return; 
        this.bird.x -=10;
        this.jump_sound.play();
    },
    moveRight: function() {
      /// code to move left, when pressed key d
       if (this.bird.alive == false)
            return; 
        this.bird.x +=10;
        this.jump_sound.play();
    },
    moveUp: function() {
         if (this.bird.alive == false)
            return; 
      /// code to move left, when pressed key w
        this.bird.y -=10;
        this.jump_sound.play();
    },
    moveDown: function() {
         if (this.bird.alive == false)
            return; 
      /// code to move left, when pressed key s
        this.bird.y +=10;
        this.jump_sound.play();
    },
    
    
};