let firstOperand = 0;
let secondOperand = 0;
let operator = '';
let finalResult = 0;
let screen = document.querySelector('.screen');

function calcEngine(number1, number2, oprt){
    let returnResult = 0;
    switch (oprt){
        case "+":
            return parseInt(number1) + parseInt(number2); 
        case "-":
            returnResult = parseInt(number1) - parseInt(number2);
            break; 
        case "÷":
            returnResult = parseInt(number1) / parseInt(number2);
            break; 
        case "×":
            returnResult = parseInt(number1) * parseInt(number2);
            break; 
    }
    return returnResult;
}

document.querySelector('.calc-buttons').addEventListener('click', function(event){
        if (event.target.tagName !== "BUTTON" ) return;

        let pushedKey = event.target.innerText;
        switch (pushedKey){
            case "←":
                console.log(screen.innerText.substring(0,screen.innerText.length-1));
                screen.innerText = screen.innerText.substring(0,screen.innerText.length-1);
                break;
            case "+":
            case "-":
            case "÷":
            case "×":
                operator = pushedKey;
                firstOperand = screen.innerText;
                screen.innerText = 0;
                //console.log(`This is Op1 ${firstOperand}`);
                break;
            case "=":
                secondOperand = screen.innerText;
                finalResult = calcEngine(firstOperand, secondOperand, operator);
                screen.innerText = finalResult;
                break;
            case "C":
                screen.innerText = "0";
                break;
            default:
                // a number 0-9 is pushed
                //console.log(pushedKey);
                //remove the existing default 0 from the screen text
                if (screen.innerText === "0"){
                    screen.innerText = "";
                }
                screen.innerText += pushedKey;
        }  
        
});