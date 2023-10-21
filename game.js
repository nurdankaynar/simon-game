let gamePattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
let clickedButtons = [];
let started = true;
let level = 0;

// start the game
addEventListener("keypress", function() {
    if (started) {
       nextSequence();
       $("#level-title").html("LEVEL 0");
       started = false;
    }
   });

//create the sequence
function nextSequence(){ 
    // produce numbers between 0 and 3
    let randomNumber = Math.random();
    randomNumber *= 4;
    randomNumber = Math.floor(randomNumber); 

    //choose a rondom color from the array "buttonColors"
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    //choose the button and flash it 
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);

    level ++;
    $("#level-title").html(`LEVEL ${level}`);
}


// user choices 
$(".btn").click(function () {
    let choosenColor =  $(this).attr("id");
    clickedButtons.push(choosenColor);
    playSound(choosenColor);
    animatePress(choosenColor);
    checkAnswer(clickedButtons.length -1);

})

// check if the user sequence is matched with game pattern
function checkAnswer(order) {
    if(clickedButtons[order] === gamePattern[order]){
        if(clickedButtons.length == gamePattern.length && !started){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        
            clickedButtons = [];
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over")
        setTimeout(function() {
        $("body").removeClass("game-over");
        }, 200);
        restart();
    }
       
}   
    

function restart(){
    $("#level-title").html("Game Over! Press Any Key To Restart!");
    started = true;
    level = 0;
    gamePattern = [];
    clickedButtons = [];
}

// button sounds
function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    
}

// animates of clicks
function animatePress(currentColor){
    $(`#${currentColor}`).addClass("pressed")
    setTimeout(function() {
        $(`#${currentColor}`).removeClass("pressed");
    }, 50);

};





