/*
    Made by  - Muhammad Ismail

    Github   - https://github.com/ismailfaridi
    Linkedin - https://www.linkedin.com/in/ismailfaridi/
    Website  - https://ismailfaridi.com/
    Email    - contact@ismailfaridi.com
*/

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn")
let winner = document.querySelector("#winner");

let turnO = true; // player: X, O

let count = 0;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO == true) {
            box.innerText = 'O';
            box.style.color = "red";
            count++;
            turnO = false;
        }
        else {
            box.innerText = 'X';
            box.style.color = "blue";
            count++;
            turnO = true;
        }

        box.disabled = true; // disable the button once used
        checkWinner();
    });
});

const disableBoxes = () => {
    for (box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const checkWinner = () => {
    let isWinner = false;

    for (let pattern of winPatterns) {
        // console.log(pattern);
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]);
        // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);

        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if ((pos1val != "") && (pos2val != "") && (pos3val != "")) {
            if ((pos1val === pos2val) && (pos2val === pos3val)) {
                winner.innerText = `Winner is '${pos1val}'`
                winner.style.color = "green";
                winner.style.fontWeight = "700";
                disableBoxes(); // after winner, no more click on boxes

                isWinner = true;
                break;
            }
        }
    }

    if (!isWinner && count == 9) {
        winner.innerText = "Game is Draw";
        winner.style.color = "red";
        winner.style.fontWeight = "700";
        disableBoxes();
    }
}

const resetGame = () => {
    turnO = true;
    winner.innerText = "";
    count = 0;
    enableBoxes();
}

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);