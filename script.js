let input = document.getElementById('input');//Input/Output
let number = document.querySelectorAll('.numbers div');//Number buttons
let operator = document.querySelectorAll('.operators div');//Operator buttons
let result = document.getElementById('equals');// Equal Button
let clear = document.getElementById('clear');//Clear button
let resultDisplayed = false; //flag to keep an eye on what output is displayed

//Add click handlers to number buttons
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function (e) {

        //Store current input string and it's last character in variables
        let currentString = input.innerHTML;
        let lastChar = currentString[currentString.length - 1];

        if (resultDisplayed == false) {
            input.innerHTML += e.target.innerHTML;
        } else if (resultDisplayed == true && lastChar == "+" || lastChar == "-" || lastChar == "×" || lastChar == "÷") {
            //if result is currently displayed and user pressed an operator
            //Add to the string for the next operation 
            resultDisplayed = false;
            input.innerHTML += e.target.innerHTML;
        } else {
            //If result is displayed and user pressed a number
            //Clear out the input string and add input to start of the new operation
            resultDisplayed = false;
            input.innerHTML = "";//Reset input field
            input.innerHTML += e.target.innerHTML;
        }
    });
}

//Add click handlers to operator buttons
for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function (e) {
        //store current input string
        let currentString = input.innerHTML;
        let lastChar = currentString[currentString.length - 1];

        //if last character entered is an operator, replace it with currently pressed one
        //(AND OR NOT) == (&&, ||, !)
        if (lastChar == "+" || lastChar == "-" || lastChar == "×" || lastChar == "÷") {
            //Replace old operator with new one
            let newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.innerHTML = newString;
        } else if (currentString.length == 0) {
            //If first thing that user enters is operator, dont do anything
            alert("Enter number first!")
        } else {
            //if everything is correct, just add operator
            input.innerHTML += e.target.innerHTML;
        }
    });
}

//Clear button
clear.addEventListener("click", function () {
    input.innerHTML = ""
})

//Click equal to get result
result.addEventListener("click", function () {
    //string that will be processed
    let inputString = input.innerHTML;
    //Array of inputted numbers
    let numbers = inputString.split(/\+|\-|\×|\÷/g)
    //Array of inputted operators
    //Replace every number from 0 to 9 and dot with empty string
    let operators = inputString.replace(/[0-9]|\./g, "").split("")

    //loop through array and do division and multiplication operations first, then addition and subtraction
    //MULTIPLICATION
    let multiply = operators.indexOf("×")
    while (multiple != -1) {
        //Take positions of 2 numbers around multiply sign, and multiply them together
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1])
        operators.splice(multiply, 1)
        multiply = operators.indexOf("×")
    }
    //DIVISION
    let divide = operators.indexOf("÷")
    while (divide != -1) {
        //Take positions of 2 numbers around multiply sign, and multiply them together
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1])
        operators.splice(divide, 1)
        divide = operators.indexOf("÷")
    }
    //SUBTRACT
    let subtract = operators.indexOf("-")
    while (subtract != -1) {
        //Take positions of 2 numbers around multiply sign, and multiply them together
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1])
        operators.splice(subtract, 1)
        subtract = operators.indexOf("-")
    }
    //ADDITION
    let add = operators.indexOf("+")
    while (add != -1) {
        //Take positions of 2 numbers around multiply sign, and multiply them together
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]))
        operators.splice(add, 1)
        add = operators.indexOf("+")
    }

    //Display result
    input.innerHTML = numbers[0]
    resultDisplayed = true
})
