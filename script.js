// DEBUG: confirm script loads and element selection

const button = document.getElementById("btn");

function checkBoard(boardState,n){
    
}

let player = 'X';

const n = 4; // change this to any size (3, 4, 5, 10...)
const boardState = Array.from({ length: n }, () =>
  Array(n).fill(null)
);

const board = document.getElementById("board");

// tell CSS grid how many rows & columns
board.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
board.style.gridTemplateRows = `repeat(${n}, 1fr)`;

// create n^2 buttons
for (let i = 0; i < n; i++) {
    for(let j=0; j < n;  j++){
        const cell = document.createElement("button");
        cell.classList.add("btn");
        cell.textContent = ""; // later: X or O
        cell.addEventListener("click", () => {
            cell.classList.add("clicked");
            let currentPlayer = document.getElementById("player");
            if (cell.textContent===""){
                cell.textContent=player;
                boardState[i][j]=player;
                if(player==='O'){
                    player='X';
                }
                else{
                    player='O';
                }
                currentPlayer.textContent=`To play: ${player}`;
            }
        });
        board.appendChild(cell);
}}

