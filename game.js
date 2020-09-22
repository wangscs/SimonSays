var buttonColors = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];

var gameStart = false;
var level = 0;

// Initialize the game, flags and changes h1 tag to start the game
$(document).keypress(function(){
    while(gameStart == false){
        $("h1").text("Level " + level);
        nextSequence()
        gameStart = true;
    }
});

// records when user clicks a button and pushes it to the array
// userClickedPattern.
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
    
});

// Function used to start next level by adding to the gamePattern
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.round(Math.random()*3);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound(randomChosenColor);
}

// Play sound file
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Animate button to flash gray
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 200);
}

// Takes in the index of the user's last clicked and checks userClickedPattern
// with the gamePattern
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        // console.log("success");

        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        // console.log("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver();
        $("h1").text("Game Over, Press Any Key to Restart");
    }
}

function startOver(){
    level = 0;
    gameStart = false;
    gamePattern = [];
}