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
equals();

function createNumListeners(){
    let num = "num";
    for (let i = 0; i <= 9; i++){
        console.log(i.toString());
        const numVal = document.getElementById(num + i.toString());
        numVal.addEventListener("click", () =>{
            if (opSelected){
                opSelected = !opSelected;
                document.getElementById(currentOperator).style.opacity = "1.0";
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


function createOPListeners(){
    const opArray = ["+", "-", "x", "/"];
    for (let i = 0; i < opArray.length; i++){
        const opElem = document.getElementById(opArray[i]);
        opElem.addEventListener("click", () => {
            if (opSelected){
                resetCurrentOperatorOpacity();
                currentOperator = opArray[i];
                setOperatorOpacity("0.5");

            }
            else{
                currentOperator = operation(opArray[i]);
                opElem.style.opacity = "0.5";
            }
        });
    }
}


function clearListener(){
    document.getElementById("A/C").addEventListener("click", () =>{
        numDisplay = "0";
        updateDisplay("0");
        reset();
    })
}

function updateDisplay(newVal){
    if (numDisplay.length <= 13){
        numDisplay = (numDisplay === "0") ? newVal : numDisplay + newVal;
        viewText.innerHTML = numDisplay;
        console.log(numDisplay)
    }
}

function operation(op){
    opSelected = true;
    val1 = parseInt(numDisplay);
    numDisplay = "0";
    console.log(val1)
    return op;
}

function equals(){
    document.getElementById("=").addEventListener("click", () =>{
        val2 = parseInt(numDisplay);
        console.log(val1 + " " + val2)
        switch (currentOperator){
            case "+":
                let sum = val1 + val2;
                numDisplay = sum;
                viewText.innerHTML = numDisplay;
                break;
            case "-":
                let diff = val1 - val2;
                numDisplay = diff;
                viewText.innerHTML = numDisplay;
                break;
            case "x":
                let prod = val1 * val2;
                numDisplay = prod;
                viewText.innerHTML = numDisplay;
                break;
            case "/":
                let quot = val1 / val2;
                numDisplay = quot;
                viewText.innerHTML = numDisplay;
                break;
        }
        reset();
    })
}

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

