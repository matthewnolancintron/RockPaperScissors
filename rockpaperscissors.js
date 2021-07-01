/*
    UI improvments and additions:

    01: feature: play gain button
    add a play again button to allow the game to be reinitiallized
    at the end of a game allowing the player to play the game multiple times

    02: history section and clean round up output
    on each subsequent round clear up previous rounds output from the screen
    and place it into a aside element or details element and place out of the center
    in a collapsed or compact form called history or round history or game history or
    previous rounds

    03: restart game button
    allows player to restart game before the game ends
    */

// select a random move for the computer and returns the move selected
function computerPlay() {
    //randomly return either rock or paper or scisors
    let choices = ['rock', 'paper', 'scissors'];
    let choice = Math.floor(Math.random()* choices.length);
    // console.log(choice); (for testing the random index)
    return choices[choice];
}

// play a single round of rock paper scissors
 function playRound(playerSelection,computerSelection){

    if(isGameEnded){
        // current game's winner and lose has been declared
        // exit the function and don't play anymore rounds.
        return 0;
    } else {
        // game is still not over yet play the round

        //ignore usercase by putting to lower case
        let playersMove = playerSelection.toLowerCase();

        let currentRoundSection = document.createElement('section');

        //show the round number and increment it by one
        round++;
        let roundNumberHeader = document.createElement('h1');
        roundNumberHeader.innerText = (`Round ${round}`);

        let playerMoveMessage = document.createElement('p');
        playerMoveMessage.innerText = `The player's move is ${playersMove}.`;
    
        let computerMoveMessage = document.createElement('p');
        computerMoveMessage.innerText = `The computer's move is ${computerSelection}.`;

        //round results
        let roundResultSection = document.createElement('section');

        let roundResultHeader = document.createElement('h2');
        roundResultHeader.innerText = `Round ${round} result`

        //call function to get the result of the round
        let roundResultMessage = document.createElement('p');
        roundResultMessage.innerText = roundResult(playersMove, computerSelection);

        //
        roundResultSection.appendChild(roundResultHeader);
        roundResultSection.appendChild(roundResultMessage);

        // call currentRoundScore to handle dom changes for round score.
        let scoreBoard = currentRoundsScore(roundResult(playersMove, computerSelection));
   
        resultsDiv.appendChild(roundNumberHeader);
        resultsDiv.appendChild(playerMoveMessage);
        resultsDiv.appendChild(computerMoveMessage);
        resultsDiv.appendChild(roundResultSection);
        resultsDiv.appendChild(scoreBoard);
       
        //check if there is a winner
        if(bestOfXrounds(5)){
            //display the game's results
            let gameResultSection = gameResult();
            resultsDiv.appendChild(gameResultSection);
        }

        return roundResult(playersMove, computerSelection);
    }

 }

// compute the result and return a message based on the game state.
 function roundResult(playersMove, computerSelection){
    if(playersMove == computerSelection){
        return `round ${round} ends in a tie`
    } else if (playersMove == 'paper' && computerSelection == 'rock') {
        return `You win round ${round}, paper beats rock.`;
    } else if (playersMove == 'paper' && computerSelection == 'scissors') {
        return `You lose round ${round}, scissors cuts paper.`;
    } else if (playersMove == 'rock' && computerSelection == 'scissors'){
        return `You win round ${round}, rock crushes scissors`;
    } else if (playersMove == 'rock' && computerSelection == 'paper'){
        return `You lose round ${round}, paper beats rock.`;
    } else if (playersMove == 'scissors' && computerSelection == 'paper'){
        return `You win round ${round}, scissors cuts paper.`;
    } else if (playersMove == 'scissors' && computerSelection == 'rock'){
        return `You lose round ${round}, rock crushes scissors`;
    }
 }

 //current rounds score
 function currentRoundsScore(result){
    let scoreBoard = document.createElement('section');

    let scoreHeader = document.createElement('h1');
    scoreHeader.innerText = `ScoreBoard as of round ${round}`;
    // increase score on condition.
    if(result.includes("win")){
        playerScore++;
    } else if (result.includes("lose")){
        computerScore++;
    }

    let playerScoreMessage = document.createElement('p');
    playerScoreMessage.innerText = `Player score: ${playerScore}`; 
    
    let computerScoreMessage = document.createElement('p');
    computerScoreMessage.innerText = `Computer score: ${computerScore}`;

    scoreBoard.appendChild(scoreHeader);
    scoreBoard.appendChild(playerScoreMessage);
    scoreBoard.appendChild(computerScoreMessage);

    return scoreBoard;
    }


 //check if there is a winner before the max number of rounds are played
 function bestOfXrounds(numberOfRounds){
        /*
        "algorithm" to tell when player is delcared early:
        In odd number of round games, the maximum of n rounds
        can be played until someone wins half of the (rounds plus 1)."
        first side to score (n+1) / 2

        for even number of round games the maxium of n rounds can be played
        until someone wins more than half of the rounds 
        first side to score ((n/2) + 1)
        
        check if a side has won more rounds than other can possibly win
        
        In of number round games:
        best of x is first to win (x+1)/2
        best of 5 is first to win 3...
        
        o = win
        x = lose
        r:1,2,3,4,5
        
        a: by round 3 we know p1 is the winner,
            since the maxium number of wins player 2 could make is
            only 2 and play 1 already has more wins than that.

            so if a side wins the first three rounds in a row than
            the game ends early

            (don't need to run the last two rounds)
        {
        p1: o,o,o,x,x
        p2: x,x,x,o,o
        }
        */

         /*
         Implement the algorithm for best of x rounds:
        2: Use the player and score and computer score to keep track
            of the win lose ratio.

        if the win lose ratio reaches a certain percent
        end the game even if the final round has not been reached

        once a player reaches score of (n+1/2), n being number of rounds
        the game ends early, call function to end game and declare
        the winner.
          */

          if(playerScore == (numberOfRounds+1)/2 || computerScore == (numberOfRounds+1)/2){
            // there is an early winner return true.
            return true;
          } else {
              // let the games continue...
              return false;
          }

 }


// show the results of the game
function gameResult(){
    let gameResultSection = document.createElement('section');

    let gameResultHeader = document.createElement('h1');
    gameResultHeader.innerText = "The game's results";
    
    let gameResultMessage = document.createElement('p');
    // report the winner based on the score
    if(playerScore > computerScore){
        gameResultMessage.innerText = "You win!";
    } else if (playerScore < computerScore) {
        gameResultMessage.innerText = "you lose!";
    } else {
        gameResultMessage.innerText = "game is a tie!";
    }

    gameResultSection.appendChild(gameResultHeader);
    gameResultSection.appendChild(gameResultMessage);

    isGameEnded = true;

    return gameResultSection;
}


// keep track of the round number
let round = 0;

// keep track of score
let playerScore = 0;
let computerScore = 0;

//check if the current game has eneded
let isGameEnded = false;

const selectionButtons = document.querySelectorAll('.playerSelection');

selectionButtons.forEach(element => {
    element.addEventListener('click', () => {
        playRound(element.textContent, computerPlay());
    });
});

const resultsDiv = document.querySelector('#results');
