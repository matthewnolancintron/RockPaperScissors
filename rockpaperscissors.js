//
function computerPlay() {
    //randomly return either rock or paper or scisors
    // use console.log to make sure the function is working
    // as expected
    let choices = ['rock', 'paper', 'scissors'];
    let choice = Math.floor(Math.random()* choices.length);
    // console.log(choice); (for testing the random index)
    return choices[choice];
}

//
 function playRound(playerSelection,computerSelection){
    //ignore usercase by putting to lower case
    let playersMove = playerSelection.toLowerCase();

    //for spacing the output of the rounds
    console.log();

    //show the round number and increment it by one
    round++;
    console.log(`round ${round}`)
    //add decoration for output
    console.log('-------------------------------');
    // outputs the players and computers moves
    console.log(`the player's move is ${playersMove}`);
    console.log(`the computer's move is ${computerSelection}`);
    // add spacing for output
    console.log();

    /*
    win and lose conditions
    paper:
        paper > rock
        paper < scissors
    rock:
        rock > scissors
        rock < paper
    scissors:
        scissors > paper
        scissors < rock
     */

    //call function to get the result of the round
    return roundResult(playersMove, computerSelection);
 }

//
 function roundResult(playersMove, computerSelection){
    // check the result and return it
    if(playersMove == computerSelection){
        return "tie"
    } else if (playersMove == 'paper' && computerSelection == 'rock') {
        return "You win! Paper beats rock";
    } else if (playersMove == 'paper' && computerSelection == 'scissors') {
        return "You lose! Scissors cuts paper";
    } else if (playersMove == 'rock' && computerSelection == 'scissors'){
        return "You win! rock crushes Scissors";
    } else if (playersMove == 'rock' && computerSelection == 'paper'){
        return "You lose! paper beats rock!";
    } else if (playersMove == 'scissors' && computerSelection == 'paper'){
        return "You win! Scissors cuts paper";
    } else if (playersMove == 'scissors' && computerSelection == 'rock'){
        return "You lose! rock crushes Scissors";
    }
 }

 // play round x number of times
 function playXNumberRounds(numberOfRounds){
    //
    for(let i = 0; i < numberOfRounds; i++){
        //console.log(i); check number of itterations
        result = playRound(prompt(),computerPlay());
        // display the current rounds result
        console.log(`The result of round ${round}:`);
        console.log('-------------------------------');
        console.log(result);
        console.log();

        //scoring:
        currentRoundsScore(result);

        //end of round # i    
    }

 }

 //current rounds score
 function currentRoundsScore(result){
    console.log("Scoreboard");
    console.log('-------------------------------');
    // increase score on condition.
    if(result.includes("win")){
        playerScore++;
    } else if (result.includes("lose")){
        computerScore++;
    }
    // dispaly the scores
    console.log(`Player score: ${playerScore}`);
    console.log(`Computer score: ${computerScore}`);
 }

//orchestrates the function that play the game
function game(){
    let result;
    
    // call play round x number of times:
    playXNumberRounds(5);

    //add spaceing:
    console.log();

    // call gameresult to display the games results
    return gameResult();
}

// show the results of the game
function gameResult(){
    console.log("The game's results:")
    console.log('------------------------');
    // report the winner based on the score
    if(playerScore > computerScore){
        return "you win";
    } else if (playerScore < computerScore) {
        return "you lose";
    } else {
        return "game is a tie";
    }
}


// keep track of the round number
let round = 0;

// keep track of score
let playerScore = 0;
let computerScore = 0;

// starts the game by calling the game function.
console.log(game());