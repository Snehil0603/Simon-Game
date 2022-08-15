var gamePattern=[];
var level=0;
var started = false;
var userClickedPattern=[];
var buttonColours=["red", "blue", "green", "yellow"];

function nextSequence(){
    userClickedPattern=[];
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
    
    level++;
    $("#level-title").text("Level " + level);
}

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})


function playsound(name){
    var audio = new Audio('sounds/'+name +'.mp3');
    audio.play();
}
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}
$(document).keypress(function(){
    if(!started){
    nextSequence();
    $("#level-title").text("Level " + level);
    started=true;
    }
});

function  checkAnswer(currentLevel){
   if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
       console.log("success!!");
    if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
        }, 1000);
        
    }  
   }
   else {
       console.log("wrong!!");
  playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    }
}

function startOver(){
    level=0;
     gamePattern=[];
     started=false;
}
