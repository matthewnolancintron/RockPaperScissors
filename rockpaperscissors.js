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
     console.log(playerSelection);
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

    /*
    possible states of prompt:
    1:
    When the user enters text in the input field and clicks the OK button,
    text entered in the input field is returned.
    
    2:
    If the user clicks OK without entering any text,
     an empty string is returned.
     
    3:
    If the user clicks the Cancel button,
    this function returns null.
        

    based on the possible states need to handle each state accordingly:
    1:
    in the case of state 1 the text need to be checked if valid
    and if not valide error needs to be sent to the console and
    user reprompted for input with information as to the
    type of information expected or just include that to being with and
    show it again on reprompt

    2:
    reprompt the user for input

    3:
     (might wait to handle this type of error on the updated version with the gui)
     not sure if I want to reprompt the user.
     or
     just display the game has been ended?
    
     */


    
    //error handling for user input/move
    let userInput;
    
    // keep prompting user input until input is valid or null
    while(userInput != 'rock' && userInput != 'paper' && userInput != "scissors" && userInput != 'game ended'){
        // prompt user for input and store to variable
       try {
        userInput = prompt().toLowerCase();
       } catch(error){
           console.log("prompt has been closed");
       }
        

    //test user's input for validation
    switch (userInput){
        // user pressed cancel on the prompt
        case undefined:
        // end game
        // end loop by setting userInput to game ended
        userInput = 'game ended';
        break;
        
        // user pressed okay without entering move, input is invalid
        case '':
        // tell user to input move or cancel prompt to end game
        console.log("input one of the following: rock, paper, scissors");
        console.log("press cancle to end the game");
        break;
        
        // input is equal to something other than the three moves,
        // input is invalid, reprompt the user.
        default:
            console.log(userInput);
            if(userInput != 'rock'&& userInput !='paper' && userInput != 'scissors'){
                //reprompt user
                console.log("try entering you move again");
                console.log("input one of the following: rock, paper, scissors");
                console.log("press cancle to end the game");
            }
        break;
    }

    }


    if (userInput == 'game ended'){
        return false;
    }

    
    //check for user input errors and send fend back then repromts

    for(let i = 0; i < numberOfRounds; i++){
        //console.log(i); check number of itterations

        result = playRound(userInput,computerPlay());
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
    result = playXNumberRounds(5);

    //add spaceing:
    console.log();

    // call gameresult to display the games results
 
    if (result == false){
        return 'game ended';
    } else {
        return gameResult();
    }
    
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