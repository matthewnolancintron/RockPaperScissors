function computerPlay() {
    //randomly return either rock or paper or scisors
    // use console.log to make sure the function is working
    // as expected
    let choices = ['rock', 'paper', 'scissors'];
    let choice = Math.floor(Math.random()* choices.length);
    // console.log(choice); (for testing the random index)
    return choices[choice];
}

// console.log(computerPlay()); testing the computerPlay function


/*
function that play single round of the game
input: takes to inputs the playerselection and computerSelection
output: a string that declares the winner of the round:
    example: "You Lose! Paper beats Rock"

    make your function's playerSelection parameter case-insensitive
    so users can input rock ROCK rocK or any other variation

    return the output not just console.log()
 */

 function playRound(playerSelection,computerSelection){
    //ignore usercase by putting to lower case
    let playersMove = playerSelection.toLowerCase();

    // check values of player and pc
    console.log(`the player's move is ${playersMove}`);
    console.log(`the computer's move is ${computerSelection}`);

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


function game(){
    let playerScore = 0;
    let computerScore = 0;
    let result;
    // play 5 rounds and keep track of the score
    for(let i = 0; i < 5; i++){
        //console.log(i); check number of itterations
        result = playRound(prompt(),computerPlay());
        console.log(result);

        console.log(result.includes("win"));

        if(result.includes("win")){
            playerScore++;
            console.log(`Player score: ${playerScore}`);
        } else if (result.includes("lose")){
            computerScore++;
            console.log(`Computer score: ${computerScore}`);
        }
    }

    // report the winner based on the score
    if(playerScore > computerScore){
        return "you win";
    } else if (playerScore < computerScore) {
        return "you lose";
    } else {
        return "game is a tie";
    }

}
console.log(game());