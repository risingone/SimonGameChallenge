let buttonColours = ["red","blue","green","yellow"];
let gamePattern = [];
let userClickedPattern = [];
let toggle = false;
let level=0;

document.addEventListener("keydown", function(event){
    if(toggle===false){
        toggle=true;
        // console.log(event.key);
        $("#level-title").html("Level " + level);
        nextSequence();
    }
});

$(".btn").click(function(){
    let userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    callAudio(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    } else{
        callAudio("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart")
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").html("Level "+level);
    let randomNumber=Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // console.log(gamePattern);
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    callAudio(randomChosenColour);
}


function animatePress(currentColour){
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100)
}

function callAudio(choosenCol){
    let newSnd = new Audio("sounds/"+choosenCol+".mp3");
    newSnd.play();
}


function startOver(){
    toggle = false;
    gamePattern=[];
    level=0;
}

// let audioELement = new Audio(`sounds/${randomChosenColour}.mp3`)
//     audioELement.play();