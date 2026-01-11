let numDisplay = "0";
const viewText = document.getElementById("view-text-id");
viewText.innerHTML = numDisplay;

let val1 = 0;
let val2 = 0;
let opSelected = false;
let currentOperator = "none"

createNumListeners();
clearListener();
createOPListeners();
createEquals();


/**
 * Creates the event listeners for the number buttons
 * @returns {void}
 */
function createNumListeners(){
    let num = "num";
    for (let i = 0; i <= 9; i++){;
        const numVal = document.getElementById(num + i.toString());
        numVal.addEventListener("click", () =>{
            if (opSelected){
                opSelected = !opSelected;
                // document.getElementById(currentOperator).style.opacity = "1.0";
            }
            updateDisplay(i.toString());
        })
        document.addEventListener("keydown", (e) => {
            if(e.key === i.toString()){
                updateDisplay(i.toString());
            }
        })
    }
}


/**
 * Creates the event listeners for the operator buttons
 * @returns {void}
 */
function createOPListeners(){
    const opArray = ["+", "-", "x", "/"];
    for (let i = 0; i < opArray.length; i++){
        const opElem = document.getElementById(opArray[i]);
        opElem.addEventListener("click", () => {
            if (opSelected){
                // resetCurrentOperatorOpacity();
                currentOperator = opArray[i];
                // setOperatorOpacity("0.5");

            }
            else{
                currentOperator = operation(opArray[i]);
                // opElem.style.opacity = "0.5";
            }
        });
        document.addEventListener("keydown", (e) =>{
            if(e.key === opArray[i]){
                if (opSelected){
                    resetCurrentOperatorOpacity();
                    currentOperator = opArray[i];
                    setOperatorOpacity("0.5");

                }
                else{
                    currentOperator = operation(opArray[i]);
                    opElem.style.opacity = "0.5";
                }
            }
        })
    }
}



/** 
 * Creates an event listener for the clear button that updates the display to "0" and resets the logic upon click
 */
function clearListener(){
    document.getElementById("A/C").addEventListener("click", () =>{
        numDisplay = "0";
        updateDisplay("0");
        reset();
    })
}

/**
 * Updates the display with 'newVal.' If the newVal is 0, set the display to 0, otherwise concatenate numDisplay with the newVal
 * @param {String} newVal - The string value of the number to be added to the display
 * @returns {void}
 */
function updateDisplay(newVal){
    if (numDisplay.length <= 13){
        numDisplay = (numDisplay === "0") ? newVal : numDisplay + newVal;
        viewText.innerHTML = numDisplay;
        console.log("numDisplay: " + numDisplay)
    }
}


/**
 * Parses numDisplay as the first operand and returns the String of the operation taken in 
 * @param {String} op String value for the operation to be carried out
 * @returns {String} 
 */
function operation(op){
    opSelected = true;
    val1 = parseInt(numDisplay);
    numDisplay = "0";
    console.log("val1: "+ val1)
    return op;
}

/**
 * Creates the event listener for the equals button
 * @returns {void}
 */
function createEquals(){
    document.getElementById("=").addEventListener("click", () =>{
        equalsLogic();
    })
    document.addEventListener("keydown", (e) => {
        if (e.key === "=" || e.key === "Enter"){
            equalsLogic();
        }
    })
}


/** 
 * The equals logic used to perform arithmetic on two values
 * @returns {void}
 */
function equalsLogic(){
    val2 = parseInt(numDisplay);
    let ans = 0;
    console.log("val2: " + val2)
    switch (currentOperator){
        case "+":
            let sum = val1 + val2;
            numDisplay = sum;
            viewText.innerHTML = numDisplay;
            ans = sum;
            break;
        case "-":
            let diff = val1 - val2;
            numDisplay = diff;
            viewText.innerHTML = numDisplay;
            ans = diff;
            break;
        case "x":
            let prod = val1 * val2;
            numDisplay = prod;
            viewText.innerHTML = numDisplay;
            ans = prod
            break;
        case "/":
            let quot = val1 / val2;
            numDisplay = quot;
            viewText.innerHTML = numDisplay;
            ans = quot
            break;
        }
        console.log("ans: " + ans)
    reset();
}



/** 
 * Reset logic for the calculator
 * @returns {void}
 */
function reset(){
    val1 = 0;
    val2 = 0;
    opSelected = false;
    updateDisplay("0");
    if (currentOperator != "none"){
        resetCurrentOperatorOpacity();
    }
    currentOperator = "none";
    
}

function resetCurrentOperatorOpacity(){
    document.getElementById(currentOperator).style.opacity = "1.0";
}

function setOperatorOpacity(opacity){
    document.getElementById(currentOperator).style.opacity = opacity;
}

