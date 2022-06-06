let p1Count = 0;
let p2Count = 0;

const xIMG = "./assets/images/x.svg";
const oIMG = "./assets/images/o.svg";
let turn = xIMG;
let backTurn = "X";

async function exe () {
    await end();
    getPoints();
} // Executa as funções;

const changeTurn = () => {
    if (turn == xIMG) {
        turn = oIMG; 
        backTurn = "O";
    } else {
        turn = xIMG; // Imagem do turno;
        backTurn = "X"; // Facilitador de execução;
    }
}

// Verifica quem ganhou;
let xWIN = false;
let oWIN = false;
let velha = false;