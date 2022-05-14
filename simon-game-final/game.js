var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

$(document).keydown(function(event) {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    // console.log(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function flashColor(currentColor) {
    $("#" + currentColor).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNum = Math.round(Math.random()*3);

    var randomChosenColor = buttonColors[randomNum];

    gamePattern.push(randomChosenColor);

    flashColor(randomChosenColor);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}
