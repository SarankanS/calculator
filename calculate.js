var operation = null;
var currentOperand = "";
var previousOperand = "";

// BASIC OPERATIONS
function add(a, b){
    return a + b;
}

function subtract(a,b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a,b){
    return a / b;
}


//FUNCTION DOES THE CALCULATIONS
function operate(num1,num2,operator){
    let result;
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    if (isNaN(previousOperand) || isNaN(currentOperand)) return;
    if (operator == "+"){
        result= add(num1,num2);
    }else if (operator == "-"){
        result= subtract(num1,num2);
    }else if (operator == "*"){
        result = multiply(num1, num2);
    }else if (operator == "/"){
        result = divide(num1, num2);
    }else{
        return;
    }
   
   currentOperand = result;
   previousOperand = `${num1} ${operator} ${num2}`
   operation = null;

}

//UPDATES THE DISPLAY
function populateDisplay(){
    const displayText = document.querySelector("#display-text");
    const prevText = document.querySelector(".previous-operand");
    displayText.textContent = currentOperand;
    if (operation !== null){
        prevText.textContent  = `${previousOperand} ${operation}`
    }else{
        prevText.textContent = previousOperand;
    }
    //prevText.textContent = previousOperand;

}

//CLICKING NUMBER BUTTONS
const numberButtons = document.querySelectorAll(".number-btn");
numberButtons.forEach(numberBtn => numberBtn.addEventListener("click", () =>{
    appendNumber(event.target.textContent);
    populateDisplay();
}))

//CLICK OPERATION BUTTONS
const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(operatorBtn => operatorBtn.addEventListener("click", ()=>{
        chooseOperation(operatorBtn.value);
        //console.log(operate(number1,number2,operatorBtn.value));
    
}))

//CLICKING CLEAR BUTTON
const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", clear);

function clear(){
    currentOperand = "";
    previousOperand = "";
    operation = null;
    populateDisplay();
}

function del(){
    currentOperand = currentOperand.slice(0, currentOperand.length-1);
    populateDisplay();

}
const delBtn = document.querySelector(".delete");
delBtn.addEventListener("click", del);

function appendNumber(number){
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
}

function chooseOperation(operator){
    if (currentOperand === "") return;
    if (previousOperand !== ""){
        operate(currentOperand, previousOperand, operation);
    }
    operation = operator;
    previousOperand = currentOperand;
    currentOperand = "";
    populateDisplay();
}


const equalsBtn = document.querySelector(".equal");
equalsBtn.addEventListener("click", button => {
    operate(previousOperand, currentOperand, operation);
    populateDisplay();
})


const signBtn = document.querySelector(".sign");
signBtn.addEventListener("click", ()=>{
    if (currentOperand!== ""){
        currentOperand = (Number(currentOperand) * -1).toString();
        populateDisplay();
    }

})
