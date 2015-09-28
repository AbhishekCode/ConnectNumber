
var load_state = {  
    preload: function() { 
        this.game.stage.backgroundColor = '#71c5cf';
        this.game.load.image('bird', 'assets/owl.png');  
        this.game.load.image('pipe', 'assets/pipe.png');  
        this.game.load.image('pipe_visited', 'assets/pipe_visited.png');  
        this.game.load.image('pipe_next', 'assets/next_pipe.png');  
        this.game.load.image('apple', 'assets/Apple.png');  
        this.game.load.audio('jump', 'assets/jump.wav');
    },

    create: function() {
        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('menu');
    }
};