// const buttonArr = ["7","8","9","/","4","5","6","*","1","2","3","-",".","0","=","+"];
const container = document.getElementById("calc");

function createButtonGrid(size = 4) {
    const buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '.', '0', '=', '+'];
  
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-group'); // Container for all buttons
  
    for (let i = 0; i < buttons.length; i++) {
      const button = document.createElement('button');
      button.classList.add('opButtons');
      button.textContent = buttons[i];
      buttonContainer.appendChild(button);
    }
  
    container.appendChild(buttonContainer);
  }


createButtonGrid(4);
