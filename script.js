// DEBUG: confirm script loads and element selection


function checkBoard(boardState,n){
    for(let i=0;i < n; i++){
        for(let j=0; j < n; j++){
            if(boardState[i][j]!=null){
                if(boardState[i][j]==boardState[i][j+1] && boardState[i][j+1]==boardState[i][j+2]){
                    const winner = boardState[i][j];
                    winnerDeclare.textContent=`Player ${boardState[i][j]} wins!`;
                    setTimeout(() => {resetButton.click();}, 1000);
                    return;
                }
                else if(boardState[i][j]==boardState[i+1][j] && boardState[i+1][j]==boardState[i+2][j]){
                    const winner = boardState[i][j];
                    winnerDeclare.textContent=`Player ${boardState[i][j]} wins!`;
                    setTimeout(() => {resetButton.click();}, 1000);
                    return;
                }
                else if(boardState[i][j]==boardState[i+1][j+1] && boardState[i+1][j+1]==boardState[i+2][j+2]){
                    const winner = boardState[i][j];
                    winnerDeclare.textContent=`Player ${boardState[i][j]} wins!`;
                    setTimeout(() => {resetButton.click();}, 1000);
                    return;
                }
                else if(boardState[i][j]==boardState[i+1][j-1] && boardState[i+1][j-1]==boardState[i+2][j-2]){
                    const winner = boardState[i][j];
                    winnerDeclare.textContent=`Player ${boardState[i][j]} wins!`;
                    setTimeout(() => {resetButton.click();}, 1000);
                    return;
                }
            }
        }

    }
}

let player = 'X';

const n = 3; // change this to any size (3, 4, 5, 10...)
const boardState = Array.from({ length: n }, () =>
  Array(n).fill(null)
);

const board = document.getElementById("board");
const cells = Array.from({ length: n }, () =>
  Array(n).fill(null)
);
// tell CSS grid how many rows & columns
board.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
board.style.gridTemplateRows = `repeat(${n}, 1fr)`;
let currentPlayer = document.getElementById("player");

for (let i = 0; i < n; i++) {
    for(let j=0; j < n;  j++){
        const cell = document.createElement("button");
        cell.classList.add("btn");
        cell.textContent = ""; // later: X or O
        cell.addEventListener("click", () => {
            cell.classList.add("clicked");
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
            checkBoard(boardState,n);
        });
        board.appendChild(cell);
        cells[i][j]=cell;
}}
const winnerDeclare = document.getElementById("winner");
const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () => {
    winnerDeclare.textContent=""
    for(let i=0; i<n; i++){
        for(let j=0; j<n; j++){
            cells[i][j].textContent="";
            boardState[i][j]=null;
            cells[i][j].classList.remove("clicked");
            player="X";
            currentPlayer.textContent=`To play: ${player}`;
        }
    }
});

