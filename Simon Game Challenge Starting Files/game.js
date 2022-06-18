var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

//Detecting the Click
$(".btn").click(function(event) {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

//Start Game on first Key-Press
$(document).on("keydown", function() {
  if (!started) {
    nextSequence();
    $("h1").text("Level " + level);
    started = true;
  }
});


//Playing Sound
function playSound(name) {
  var sound = new Audio("sounds/" + name + '.mp3');
  sound.play();

}

//Main Function
function nextSequence() {
  userClickedPattern = [];

  //Level Increment
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  //Flash
  $("." + randomChosenColor).fadeOut(100).fadeIn(100);

  //Playing Sound
  playSound(randomChosenColor);

}

//Checking users answers
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        console.log(userClickedPattern);
        nextSequence();
      }, 1000);

    }
  }else{
    var wrong= new Audio("sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
      startOver();
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

  }
}

//User-Click Animation
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100);
}

//Reset Game
function startOver(){
  level= 0;
  gamePattern= [];
  started= false;
}
