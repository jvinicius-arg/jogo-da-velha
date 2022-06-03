const moveInputs = document.querySelectorAll(".game__input");
const p1TurnShower = document.querySelector(".p1-info__turn");
const p2TurnShower = document.querySelector(".p2-info__turn");
const overlay = document.querySelector(".finish-overlay");

const xIMG = "./assets/images/x.svg";
const oIMG = "./assets/images/o.svg";
let turn = xIMG;
let backTurn = "X";

const changeTurn = () => {
    if (turn == xIMG) {
        turn = oIMG;
        backTurn = "O";
    } else {
        turn = xIMG;
        backTurn = "X";
    }
}

for (input of moveInputs) {
    input.addEventListener("click", function () {
        if (!this.style.backgroundImage) {
            this.style.backgroundImage = 
            `url(${turn})`;
            this.innerHTML = backTurn;
            changeTurn();
            if (backTurn == "X") {
                p1TurnShower.classList.add("p-turn--enabled");
                p2TurnShower.classList.remove("p-turn--enabled");
            } else {
                p2TurnShower.classList.add("p-turn--enabled");
                p1TurnShower.classList.remove("p-turn--enabled");
            }
        } else {
            alert("Jogada inválida.");
        }
        matchVerifier();
    });
}

// Fim de jogo;

function matchVerifier () {
    // Eixo x;
    for (let i = 0; i <= 8; i+=3) {
        if (moveInputs[i].innerHTML == "X" && moveInputs[(i+1)].innerHTML == "X" && moveInputs[(i+2)].innerHTML == "X") {
            end();
        } else if (moveInputs[i].innerHTML == "O" && moveInputs[(i+1)].innerHTML == "O" && moveInputs[(i+2)].innerHTML == "O") {
            end();
        } 
    }

    // Eixo y;
    for (let i = 0; i <= 2; i++) {
        if (moveInputs[i].innerHTML == "X" && moveInputs[(i+3)].innerHTML == "X" && moveInputs[(i+6)].innerHTML == "X") {
            end();
        } else if (moveInputs[i].innerHTML == "O" && moveInputs[(i+3)].innerHTML == "O" && moveInputs[(i+6)].innerHTML == "O") {
            end();
        } 
    }

    // Diagonais;
    if (moveInputs[0].innerHTML == "X" && moveInputs[4].innerHTML == "X" && moveInputs[8].innerHTML == "X") {
        end();
    } else if (moveInputs[0].innerHTML == "O" && moveInputs[4].innerHTML == "O" && moveInputs[8].innerHTML == "O") {
        end();
    } else if (moveInputs[2].innerHTML == "X" && moveInputs[4].innerHTML == "X" && moveInputs[6].innerHTML == "X") {
        end();
    } else if (moveInputs[2].innerHTML == "O" && moveInputs[4].innerHTML == "O" && moveInputs[6].innerHTML == "O") {
        end();
    }
}

function end () {
    overlay.style.display = "block";
    alert("Fim de jogo");
}