var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level=0;

function nextSequence() {
    // userClickedPattern = []; -- Enhanced code
    var randomNumber = Math.floor(Math.random() * 3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    ++level;
    $("#level-title").text("Level "+ level);
}

$(".btn").on("click", function (e) {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
   
    playSound(userChosenColor);
    // checkAnswer(userClickedPattern.length-1); -- Enhanced code
    for(var i=0;i<userClickedPattern.length;i++){
        if(gamePattern[i]==userClickedPattern[i]){
            if(gamePattern.length == (i+1)){
                setTimeout(function(){
                    userClickedPattern=[];
                    nextSequence();
                },500);
                break;
            }
        }else{
            gameEnd();
            break
        }
    }
    
});

//Enhanced code - Instead of applying for loop for each button click you can just check the current answer 

// function checkAnswer(currentLevel) {
//     if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
//       if (userClickedPattern.length === gamePattern.length){
//         setTimeout(function () {
//           nextSequence();
//         }, 1000);
//       }
//     } else {
//       playSound("wrong");
//       $("body").addClass("game-over");
//       $("#level-title").text("Game Over, Press Any Key to Restart");

//       setTimeout(function () {
//         $("body").removeClass("game-over");
//       }, 200);

//       startOver();
//     }
// }

function playSound(name) {
    $("#" + name).fadeOut().fadeIn();
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function gameEnd(){
    playSound("wrong");
    
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200)
    $("#level-title").text("Game Over, Press Any Key to Restart");
    userClickedPattern=[];
    gamePattern=[];
    level = 0;
}

$(document).on("keydown",function(e){
    if(level==0){
       
        nextSequence();
    }
});