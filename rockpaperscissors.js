// select a random move for the computer and returns the move selected
function computerPlay() {
    //randomly return either rock or paper or scisors
    let choices = ['rock', 'paper', 'scissors'];
    let choice = Math.floor(Math.random()* choices.length);
    // console.log(choice); (for testing the random index)
    return choices[choice];
}

//prompts user and checks for vaild input responding accordingly
function userPlay() {
    //store player's move to check for validity and re-use where needed.
    let userInput;
    
    // error handling for user input/move

    // keep prompting user input until input is valid or null
    while(userInput != 'rock' && userInput != 'paper' && userInput != "scissors" && userInput != 'game ended'){
        //try to prompt user for input and store to variable
       try {
        userInput = prompt("rock, paper or scissors").toLowerCase();
       } catch(error){
           console.log();
           // user pressed cancel on the prompt
           console.log("prompt has been closed");
           //console.log(`value:${userInput}`);
            // end loop by setting userInput to game ended
            userInput = 'game ended';
            break;
       }
        

    //test user's input for validation
    switch (userInput){        
        // user pressed okay without entering move, input is invalid
        case '':
        // tell user to input move or cancel prompt to end game
        console.log("\ninput one of the following: rock, paper, scissors");
        console.log("press cancle to end the game\n",);
        break;
        
        // input is equal to something other than the three moves,
        // input is invalid, reprompt the user.
        default:
            //console.log(userInput); // check input value.
            if(userInput != 'rock'&& userInput !='paper' && userInput != 'scissors'){
                //reprompt user
                console.log("\ntry entering you move again");
                console.log("input one of the following: rock, paper, scissors");
                console.log("press cancle to end the game\n");
            }
        break;
    }

    }


    // user closed the prompt.
    if (userInput == 'game ended'){
        // return false to trigger conditions in other(parent?) function
        // that will stop the game.
        return false;
    }

    // if the function makes it this far then return the player's move
    return userInput;
}

// play a single round of rock paper scissors
 function playRound(playerSelection,computerSelection){
    
    // if player selection is false then user closed the prompt end
    // and trigger parent function end game condition by returning false 
     if (playerSelection == false){
         return false;
     }

    //ignore usercase by putting to lower case
    let playersMove = playerSelection.toLowerCase();

    //show the round number and increment it by one
    round++;
    console.log(`\nround ${round}`)
    //add decoration for output
    console.log('-------------------------------');
    // outputs the players and computers moves
    console.log(`the player's move is ${playersMove}`);
    console.log(`the computer's move is ${computerSelection}\n`);

    //call function to get the result of the round
    return roundResult(playersMove, computerSelection);
 }

// compute the result and return a message based on the game state.
 function roundResult(playersMove, computerSelection){

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
    // for keeptrack if there is an "early winner"
    let isWinnerYet;

    // iterate through the rounds
    for(let i = 0; i < numberOfRounds; i++){
        //console.log(i); check number of itterations
        result = playRound(userPlay(),computerPlay());

        // user closed the prompt.
        // return false to exit current fuction and
        // trigger condition in parent function
        if(result == false) {
            return false;
        }

        // display the current rounds result
        console.log(`\nThe result of round ${round}:`);
        console.log('-------------------------------');
        console.log(result,'\n');

        //scoring:
        currentRoundsScore(result);
        //end of round # i

        // call best of x rounds to see if there is a winner
        // before the maximum number of rounds has been played
        // store return value into a varible will be boolean
        // use that boolean to trigger condition that can
        // call another function for declaring the winner
        // 
        isWinnerYet = bestOfXrounds(numberOfRounds);

        // if iswinneryet is true then declare the winner
        // if not then final round is to be played
       // handling ending game early:
       // game should be wrapped up in certain way and end abruptly
       // show score and most likely call game result early
       if (isWinnerYet){
            /*
                return a value to game function to get the game result
                any value other than false will do
            */
           return true;
       }


    }
 }

 //current rounds score
 function currentRoundsScore(result){
    console.log("\nScoreboard");
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


 //
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

//orchestrates the function that play the game
function game(rounds){
    let result;
    
    // call play round x number of times:
    result = playXNumberRounds(rounds);

    // user closed/canceled the prompt if result if false
    if (result == false){
        // user close the prompt end the game
        return 'game ended';
    } else {
        //call gameresult to display the games results 
        return gameResult();
    }
    
}

// show the results of the game
function gameResult(){
    console.log("\nThe game's results:")
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
console.log(game(5));