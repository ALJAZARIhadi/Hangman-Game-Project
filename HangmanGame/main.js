//Letters
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
 
// Get Array From Letters
let letterArray = Array.from(letters);
console.log(letterArray); //Checek

// Select Letter container
let lettersContainer = document.querySelector(".letters");

// Generate Lettersw
letterArray.forEach(letter => {

    //Create Span
    let Span = document.createElement("span")
    
    // Create Letter Text Node
    let theLetter = document.createTextNode(letter);
    
    //Append The Letter To span
    Span.appendChild(theLetter);

    //Add Class On Span
    Span.className = "letter-box";

    //Append Span To The Letters Container
    lettersContainer.appendChild(Span)
});

//Object Of Words + Categories
const words ={
    programing:["PHP","Javascript","Go" ,"scale" ,"Python","mysql","r" ,"fortran"],
    movies:["Prestige","Inception","Parasite" ,"Interstellar","Whiplash","Memento","Coco" ,"Up"],
    people:["Albert Enistein","Hitchcock","Alexander" ,"Cleopatra","Mahatma Ghandi"],
    countries:["Syria","Palestine","Yemen" ,"Eygpt","Bagrain","Qatar"]
}

//Get Random Propert 
let allKeys = Object.keys(words);
// Random Number Depend on Keys Lenght
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
//Category
let randomPropName = allKeys[randomPropNumber];
//Category Words
let randomPrpValue = words[randomPropName];
//Random Number Depend on Words
let randomValueNumber =Math.floor(Math.random() * randomPrpValue.length);
//The Chosen Word
let randomValueValue = randomPrpValue[randomValueNumber];

//Set Category Info
document.querySelector(".container .game-info .category span").innerHTML = randomPropName  ;

//Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

//Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

//Create Spans Depend On Words
lettersAndSpace.forEach(letter  =>{

    //Create Empty Span
    let emptySpan = document.createElement("span");

    //If Letter Is Space
    if(letter === ' '){

        //Add Class To The Span
        emptySpan.className ='with-space';

    }   

    //Append Span To The Letters Guess Container
    lettersGuessContainer.appendChild(emptySpan);
});

// select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");



//Handle Clicking On Letters
document.addEventListener("click",(e) => {

    // Set The chose status
    let theStatus = false;

    if(e.target.className === 'letter-box'){

        e.target.classList.add("clicked");
        
        //Get Clicked Letter
        let theClickedLetter = e.target.innerHTML;
        
        //The chosen word
        let theChosenWord = Array.from(randomValueValue.toLowerCase());
 
        theChosenWord.forEach((wordLetter,wordIndex) => {

            //If The Clicked Letter Equal To One Of The Chosen Word Letters
            if(theClickedLetter.toLowerCase() == wordLetter.toLowerCase())
                {
                    //Set Status To True
                    theStatus = true;
                    //Loop On All Guess Spans
                    guessSpans.forEach((span,spanIndex) => {

                        //If Span Index Equal Word Index
                        if(wordIndex === spanIndex)
                        {
                            span.innerHTML = theClickedLetter;
                        }
                });
            }    
    });
    //Outside Loop
    
    // If letter is wrong
    if(theStatus !== true){
        //Increase The Wrong Attempts
        wrongAttempts++;
        //Add Class To The Draw Element
        theDraw.classList.add(`wrong-${wrongAttempts}`);
        
        //Play Fail Sound
        document.getElementById("fail").play();  
        
        if(wrongAttempts === 8){
            endGame();
            lettersContainer.classList.add("finished");
        }

    }else{
        //Play Success Sound
        document.getElementById("success").play();
        checkWin();
    }
    }
});

// End Game Function
function endGame(){
    // Create Popup Div
    let popupDiv = document.createElement("div");
    // Create Text
    let popupText = document.createTextNode(` `);
    // Append Text To Popup Div
    popupDiv.innerHTML = `
      <div style="text-align:center">
        Game Over — The word is: <strong>${randomValueValue}</strong>
        <div style="margin-top:36px">
          <button id="play-again">Play Again</button>
        </div>
      </div>
    `;
    popupDiv.appendChild(popupText);
    // Add Class On Popup Div
    popupDiv.className = 'popup';
    // Append Popup Div To Body
    document.body.appendChild(popupDiv);
}


//Play Again Function
document.addEventListener("click",(e) => {
    if(e.target.id == 'play-again'){
        //Reload Page
        window.location.reload();
    } 
});
//Success Congratulations And show how many mistake did he did and Give him His level 
function success(){
    let popupDiv = document.createElement("div");
    let popupText = document.createTextNode(` `);
    popupDiv.innerHTML = `
      <div style="text-align:center">
        Congratulations! You guessed the word: <strong>${randomValueValue}</strong><br>
        Wrong Attempts: <strong>${wrongAttempts}</strong><br>
        Level: <strong>${wrongAttempts <= 2 ? 'Expert' : wrongAttempts <= 5 ? 'Intermediate' : 'Beginner'}</strong>
        <div style="margin-top:36px">
            <button id="play-again">Play Again</button>
        </div>
        </div>
    `;
    popupDiv.appendChild(popupText);
    popupDiv.className = 'popup';
    document.body.appendChild(popupDiv);
}
// Check Win Function
function checkWin(){
    let correctGuesses = 0;
    guessSpans.forEach(span => {
        if(span.innerHTML !== ''){
            correctGuesses++;
        }
    });
    if(correctGuesses === lettersAndSpace.length){
        success();
        lettersContainer.classList.add("finished");
    }   
}
