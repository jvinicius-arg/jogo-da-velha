const moveInputs = document.querySelectorAll(".game__input");
const p1TurnShower = document.querySelector(".p1-info__turn");
const p2TurnShower = document.querySelector(".p2-info__turn");
const overlay = document.querySelector(".overlay");
const p1Score = document.querySelector(".p1-info__score");
const p2Score = document.querySelector(".p2-info__score");
const result = document.querySelector(".__result");
const confetti = document.querySelector(".overlay__confetti");

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
        }
        matchVerifier();
    }); // Troca os turnos e impede uma sobreposição de jogada;
}

function matchVerifier () {
    // Eixo x;
    for (let i = 0; i <= 8; i+=3) {
        if (moveInputs[i].innerHTML == "X" && moveInputs[(i+1)].innerHTML == "X" && moveInputs[(i+2)].innerHTML == "X") {
            xWIN = true;
            exe();
        } else if (moveInputs[i].innerHTML == "O" && moveInputs[(i+1)].innerHTML == "O" && moveInputs[(i+2)].innerHTML == "O") {
            oWIN = true;
            exe();
        } else if (inputsComplete() == true) {
            velha = true;
            exe();
        }
    }

    // Eixo y;
    for (let i = 0; i <= 2; i++) {
        if (moveInputs[i].innerHTML == "X" && moveInputs[(i+3)].innerHTML == "X" && moveInputs[(i+6)].innerHTML == "X") {
            xWIN = true;
            exe();
        } else if (moveInputs[i].innerHTML == "O" && moveInputs[(i+3)].innerHTML == "O" && moveInputs[(i+6)].innerHTML == "O") {
            oWIN = true;
            exe();
        } else if (inputsComplete() == true) {
            velha = true;
            exe();
        }
    }

    // Diagonais;
    if (moveInputs[0].innerHTML == "X" && moveInputs[4].innerHTML == "X" && moveInputs[8].innerHTML == "X") {
        xWIN = true;
        exe();
    } else if (moveInputs[0].innerHTML == "O" && moveInputs[4].innerHTML == "O" && moveInputs[8].innerHTML == "O") {
        oWIN = true;
        exe();
    } else if (moveInputs[2].innerHTML == "X" && moveInputs[4].innerHTML == "X" && moveInputs[6].innerHTML == "X") {
        xWIN = true;
        exe();
    } else if (moveInputs[2].innerHTML == "O" && moveInputs[4].innerHTML == "O" && moveInputs[6].innerHTML == "O") {
        oWIN = true;
        exe();
    } else if (inputsComplete() == true) {
        velha = true;
        exe();
    }

} // Verifica as combinações de linha necessárias para finalizar o jogo;

function getPoints () {
    if (xWIN == true) {
        p1Count++;
        p1Score.innerHTML = p1Count;
        result.innerText = "Vitória de X!";
    } else if (oWIN == true) {
        p2Count++;
        p2Score.innerHTML = p2Count;
        result.innerText = "Vitória de O!";
    } else if (velha == true) {
        result.innerText = "Velha!";
    } // Contabiliza vitórias e cria as mensagens;

    // Reinicia os booleans;
    xWIN = false;
    oWIN = false;
    velha = false;
}

function inputsComplete () {
    let velhaIncidence = 0;
    for (input of moveInputs) {
        if (input.innerText != "") {
            velhaIncidence++;
        }
    } // Testa se todos os inputs foram preenchidos;

    if (velhaIncidence == 9) {
        return true;
    } else {
        return false;
    }
}

function end () {
    confetti.style.display = "block";
    if (velha == true) {
        confetti.style.display = "none";
    } // Se for velha, tira os confetes;

    overlay.style.display = "block";
    let i = 0;
    const interval = setInterval(() => {
        overlay.style.opacity = i/10;
        i++;
        if (i > 10) {
            clearInterval(interval);
        }
    },20); //200ms transition

    const again = document.querySelector(".__again");
    again.addEventListener("click", () => {
        for (input of moveInputs) {
            input.style.backgroundImage = null;
            input.innerHTML = null; // Reinicia o jogo;
        }

        let i = 10;
        const interval = setInterval(() => {
            overlay.style.opacity = i/10;
            i--;
            if (i == 0) {
                clearInterval(interval);
            }
        },20); // Esconde o menu;

        setTimeout(() => {
            overlay.style.display = "none";
        },200);
            
    })
}