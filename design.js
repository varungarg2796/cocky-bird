$(function(){

	//making it easy

	var container=$('#container');
	var bird=$('#bird');
	var tube=$('.tube');
	var tube1=$('#tube1');
	var tube2=$('#tube2');
	var score = $('#score');
    var speedSpan = $('#speed');
    var high_score=$('#highscore');
    var restartButton = $('#restartButton');



	var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var tube_initial_position = parseInt(tube.css('right'));
    var tube_initial_height = parseInt(tube.css('height'));
    var bird_left = parseInt(bird.css('left'));
    var bird_height = parseInt(bird.height());
    var speed = 10;


    var go_up = false;
    var scoreUpdated = false;
    var game_over = false;
    var points=0;
    var highscore=0;
    localStorage.setItem("highscore",0);


    // game runs here
    var gameLogic= setInterval(function () {
    	 
    	if (collision(bird, tube1) || collision(bird, tube2) || 
            parseInt(bird.css('top')) <= 0 || 
            parseInt(bird.css('top')) > container_height - bird_height) {

            stop_the_game();

        } else{
        	
    	var tube_current_position=parseInt(tube.css('right'));

    	if(tube_current_position>container_width-75)
    	{
    		var newHeight=parseInt(Math.random()*100);

    		//change tube height(before reseting it);
    		tube_current_position=tube_initial_position;
    		tube1.css('height',tube_initial_height+newHeight);
    		tube2.css('height',tube_initial_height-newHeight);



			//update the score when the poles have passed the bird successfully
            /*if (tube_current_position > container_width - bird_left) {
                if (scoreUpdated === false) {
                    score.text(parseInt(score.text()) + 1);
                    scoreUpdated = true;
                }
            }
            scoreUpdated = false;*/

    		//change speed
    		speed=speed+0.5;
    		speedSpan.text(speed);
    		points=points+1;

    		//add score through local storage
    		if(highscore !== null){
  				 if (points > parseInt(localStorage.getItem("highscore"))) {
      				localStorage.setItem("highscore", points );
      				high_score.text(localStorage.getItem("highscore"));
      			}
				}else{
      					localStorage.setItem("highscore", points );
					}
      		high_score.text(highscore);

    		score.text(points);




    	}
    	tube.css('right',tube_current_position + speed);
    	 if (go_up === false) {
                go_down();
            }
        }

    },30);


    //functions defined here
    
    
    //for keyboard
    $(document).on('keydown', function (e) {
        var key = e.keyCode;
        if (key === 32 && go_up === false && game_over === false) {
            go_up = setInterval(up, 50);
        }
    });

    $(document).on('keyup', function (e) {
        var key = e.keyCode;
        if (key === 32) {
            clearInterval(go_up);
            go_up = false;
        }
    });

    //for touch
     container.mousedown(function(){
     	 if (go_up === false && game_over === false) {
            go_up = setInterval(up, 50);
        }
        
    });

     container.mouseup(function(){
     	 clearInterval(go_up);
            go_up = false;
        });





    function go_down() {
        bird.css('top', parseInt(bird.css('top')) + 5);
    }

    function up() {
        bird.css('top', parseInt(bird.css('top')) - 10);
    }



    function stop_the_game() {
        clearInterval(gameLogic);
        game_over = true;
        restartButton.slideDown();
    }

    restartButton.click(function () {
        location.reload();
    });

    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }

}); //Program terminates here