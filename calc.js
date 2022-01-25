//calculator app
 
class Stack {
    
    // Array is used to implement stack
    constructor()
    {
        this.items = [];
    }
  
    push(element)
    {
        this.items.push(element);
    }


    // pop()
    pop()
    {
        if (this.items.length == 0)
            return "Underflow";
        return this.items.pop();
    }


    // peek()
    peek()
    {
        return this.items[this.items.length - 1];
    }

    // isEmpty()
    isEmpty()
    {
        // return true if stack is empty
        return this.items.length == 0;
    }

    size() {
        return this.items.length;
    }

    printStack()
    {
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i] + " ";
        return str;
    }

}


function getPrecedence(ch) {
    if(ch == "^") {
        return 3;
    } else if(ch == "/" || ch == "*") {
        return 2;
    } else if(ch == "+" || ch == "-") {
        return 1;
    } else return 0;
}

function operation(num1, num2, op) {
    if(op === "+") {
        return num1 + num2;
    } else if(op === "-") {
        return num1 - num2;
    } else if(op === "/") {
        return num1 / num2;
    } else if(op === "*") {
        return num1 * num2;
    } else if(op === "^") {
        return num1 ^ num2;
    }
}

function calculate(s) {
    let n = s.length;
    //console.log(s.length);
    let intStack = new Stack();
    let charStack = new Stack();

    for(let i = 0; i < n; i++) {
        let ch = s.charAt(i);
        if(ch === " " || ch === "+" || ch === "-" || ch === "*" || ch === "/" || ch === "^" || ch === '(' || ch === ")") {
            if(ch == " ") {
                continue;
            }  
            else if(ch === ")") {
                //console.log("hello");
                while(charStack.size() != 0 && charStack.peek() !== '(') {
                    let num2 = intStack.pop();
                    let num1 = intStack.pop();
                    let op = charStack.pop();

                    let res = operation(num1, num2, op);
                    intStack.push(res);

                    
                }
                if(charStack.peek() === '(')
                    charStack.pop();
            } 
            else if((ch !== '(' && ch !== ')' && charStack.peek() !== '(') && charStack.size() > 0 && getPrecedence(charStack.peek()) >= getPrecedence(ch)) {
                while(charStack.size() != 0 && charStack.peek() !== '(' && getPrecedence(charStack.peek()) >= getPrecedence(ch)) {
                    let num2 = intStack.pop();
                    let num1 = intStack.pop();
                    let op = charStack.pop();
                    //console.log(op);
                    let res = operation(num1, num2, op);
                    //console.log(res);
                    intStack.push(res);
                }
                charStack.push(ch);
                //console.log(charStack.peek());
            } else {
                charStack.push(ch);
                //console.log(charStack.peek());
            }
        } else {
            let num = parseInt(ch);

            while(i + 1 < n && (s.charAt(i + 1) >= '0' && s.charAt(i + 1) <= '9')) {
                i++;
                num = num * 10 + parseInt(s.charAt(i));
            }
            
            intStack.push(num);
            //console.log(num);
        }
    }

    // console.log(charStack.printStack());

    if(charStack.size() != 0) {
        while(charStack.size() != 0) {
            
            //console.log(intStack.size());

            let n2 = intStack.pop();
            let n1 = intStack.pop();
            let op = charStack.pop();

            let res = operation(n1, n2, op);
            intStack.push(res);

            if(intStack.size() == 1 && charStack.size() == 0) return intStack.peek();
        }
    }

    return charStack.size() == 0 ? intStack.peek(): "invalid input";
}



// console.log(print());
// console.log(calculate("100 + 20 - 5 / 3"));


function areaOfSquare(side) {
    return side * side;
}

function nthRootOfPrime(num) {
  let prime = 1;
  let count = 0;
  while (count < num)
  {
      prime = prime+1;
      for (var i = 2; i <= prime; i++)
      {
          if (prime % i == 0)
          {
              break;
          }
      }
      if (i == prime)
      {
          count = count+1;
      }
  }
  return prime;
}


function evaluate() {
    let ip = prompt(('Press 1 to evaluate an expression. Press 2 to evaluate area of square. Press 3 to evaluate nth prime'));
    switch(ip) {
        case "1":
            let str = prompt('Input the expression');
            alert(calculate(str));
            break;
        case "2": 
            let num = prompt('Enter side');
            alert(areaOfSquare(num));
            break;
        case "3":
            let prime = prompt('Enter a number');
            alert(nthRootOfPrime(prime));   
            break;
        default:
            alert('Invalid Input');
            break;                        
    }
}

evaluate();