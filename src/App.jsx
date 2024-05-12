import { useState } from 'react'
import './App.css'
import keyArray from './assets/keys.json'

function App() {
  const [answer, setAnswer] = useState("")
  const [expression, setExpression] = useState("0")
  const operators = ["+","/","*","-"]
  const et = expression.trim();
  
  const buttonPress = (symbol) => {
    if (symbol == "clear"){
      setAnswer("");
      setExpression("0");
    }
    else if (isOperator(symbol)){
      setExpression(et + " " + symbol + " ");
    }
    else if (symbol == "=") {
      calculate();
    }
    else if (symbol == "0") {
      if (expression.charAt(0) != "0"){
        setExpression(expression + symbol)
      }
    }
    else if (symbol == "."){
      //obtaining last number: split expressions by operators into an array > pop last element
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) {return;}
      console.log("lastNumber is", lastNumber);
      
      if (lastNumber?.includes(".")) {return;}

      setExpression(expression + symbol);
    }
    else {
      //if expression == 0: remove it using slice(0) and concentanate symbol
      if (expression.charAt(0) == "0") {
        setExpression(expression.slice(1) + symbol);
      }
      else {
        setExpression(expression + symbol);
      }
    }
  }

  const isOperator = (symbol) => {
    return operators.includes(symbol);
  }


  const calculate = () => {
    //if last string is operator: do nothing
    if (isOperator(et.charAt(et.length-1))){return;}
    //if more than 1 operator consecutive in a row: use last operator
    const parts = et.split(" ");
    const newParts = [];
    //start iterating from back of expression
    for (let i = parts.length; i >= 0; i--) {
      if (["*","/","+"].includes(parts[i]) && isOperator(parts[i-1])){
        //add last operator
        newParts.unshift(parts[i]);
        //bring iterable foward to skip all operators in front
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])){
          k--;
        }
        i = k + 1;
      }
      else {newParts.unshift(parts[i]);}
    }

    const newExpression = newParts.join("");
    //handling the situation where user wants to operate using previous answer 
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression));
    }
    //handling case if user wants to start new operation: setAnswer + reset Expression
    else {
      setAnswer(eval(newExpression));
    }
    setExpression("");
  };

  return (
    <div id="background">
      <div className="calculator">
        <div id="display" style={{ textAlign: "right", marginRight: "20px" }}>
          <div id="answer">{answer}</div>
          <div id="expression" style={{ marginTop: "15px"}}>{expression}</div>
        </div>
        <div className="keypad">
          {keyArray.map((key) =><button key={key.id} id={key.id} onClick={() => buttonPress(key.text)}>{key.text}</button>)}
          <button id="decimal" onClick={() => buttonPress(".")}>.</button>
          <button id="clear" onClick={() => buttonPress("clear")}>AC</button>
          <button id="add" onClick={() => buttonPress("+")}>+</button>
          <button id="subtract" onClick={() => buttonPress("-")}>-</button>
          <button id="multiply" onClick={() => buttonPress("*")}>x</button>
          <button id="divide" onClick={() => buttonPress("/")}>/</button>
          <button id="equals" onClick={() => buttonPress("=")}>=</button>
        </div>
      </div>
    </div>
  )
}

export default App
