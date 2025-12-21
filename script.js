let X_wins=0;
let O_wins=0;
let ties=0;
const displayWinsX= document.getElementById("X_wins");
const displayWinsO= document.getElementById("O_wins");
const displayTies = document.getElementById("ties")
function checkBoard(boardState,n,i,j){
    console.log(boardState)
    directions = [[[0,1],[0,2]],[[0,-1],[0,-2]],
                  [[1,0],[2,0]],[[-1,0],[-2,0]],
                  [[1,1],[2,2]],[[-1,-1],[-2,-2]],
                  [[-1,1],[-2,2]],[[1,-1],[2,-2]],
                  [[0,1],[0,-1]],[[1,0],[-1,0]],
                  [[1,1],[-1,-1]],[[1,-1],[-1,1]]
            ]
    for (const [[dx1, dy1], [dx2, dy2]] of directions) {
    const x1 = i + dx1, y1 = j + dy1;
    const x2 = i + dx2, y2 = j + dy2;

    if (
      x1 < 0 || x1 >= n || y1 < 0 || y1 >= n ||
      x2 < 0 || x2 >= n || y2 < 0 || y2 >= n
    ) continue;
    console.log(x1,y1,x2,y2);
    if (
      boardState[x1][y1] === boardState[i][j] &&
      boardState[x2][y2] === boardState[i][j]
    ) {
      if(boardState[i][j]=='X'){
        X_wins++;
        displayWinsX.textContent=`${X_wins}`;
      }
      else{
        O_wins++;
        displayWinsO.textContent=`${O_wins}`;
      }
      winnerDeclare.textContent = `Player ${boardState[i][j]} wins!`;
      setTimeout(() => resetButton.click(), 1000);
      return;
    }
  }
  let flag=0;
  for(let i=0; i<n; i++){
    for(let j=0; j<n; j++){
        if(boardState[i][j]==null){
            flag=1;
        }
    }
  }
  if(flag==0){
    ties++;
      winnerDeclare.textContent = `Its a tie!`;
      displayTies.textContent = `${ties}`;
      setTimeout(() => resetButton.click(), 1000);
      return;
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
                currentPlayer.textContent=`To Play: ${player}`;
            }
            checkBoard(boardState,n,i,j);
        });
        board.appendChild(cell);
        cells[i][j]=cell;
}
}
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

const resetlbButton = document.getElementById("resetlb");
resetlbButton.addEventListener("click", () => {
  X_wins=0;
  O_wins=0;
  ties=0;
  displayTies.textContent="0";
  displayWinsO.textContent="0";
  displayWinsX.textContent="0";
});

