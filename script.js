let p1name=null;
let p2name=null;
let tossWinner = null;
let currentPlayername = null;
let currentPlayer = document.getElementById("player");
let playerChoices = {}
p1NameHolder=document.getElementById("p1place");
p2NameHolder=document.getElementById("p2place");
const whoGoes = document.createElement("p")
const selectForm=document.getElementById("selectSide");


function makeForm(){
    selectForm.appendChild(whoGoes);
    const select = document.createElement("select");
    select.id="XorO";
    select.required=true;
    const options = ["X","O"];
    options.forEach(opt => {
      const option = document.createElement("option");
      option.value = opt.toLowerCase();
      option.textContent = opt;
      select.appendChild(option);
    });
    selectForm.appendChild(select);
    submitChoiceButton = document.createElement("button");
    submitChoiceButton.type = "submit";
    submitChoiceButton.id  = "submitChoice";
    submitChoiceButton.textContent="submit";
    selectForm.appendChild(submitChoiceButton);

    selectForm.addEventListener("submit", function (event1){
      let choice  = select.value;
      console.log(`Choice: ${choice},Winner = ${tossWinner}`);
      if(tossWinner==1){
        if(choice=="o"){
          currentPlayer.textContent = `To play: ${p2name}`;
          currentPlayername=p2name;
          playerChoices[p2name]='X';
          playerChoices[p1name]='O';
        }
        else{
          currentPlayer.textContent = `To play: ${p1name}`;
          currentPlayername=p1name;
          playerChoices[p2name]='O';
          playerChoices[p1name]='X';
        }
      }
      else{
        if(choice=="o"){
          currentPlayer.textContent = `To play: ${p1name}`;
          currentPlayername=p1name;
          playerChoices[p2name]='O';
          playerChoices[p1name]='X';
        }
        else{
          currentPlayer.textContent = `To play: ${p2name}`;
          currentPlayername=p2name;
          playerChoices[p2name]='X';
          playerChoices[p1name]='O';
        }
      }
      event1.preventDefault();
      console.log(choice);
      selectForm.style.display= "none";
      chosen=true;
    });
}

document.getElementById("nameform").addEventListener("submit", function (event){
  if(chosen==true){
    alert("Cannot change names now");
    event.preventDefault();
    return;
  }
  event.preventDefault();
  p1name = document.getElementById("p1name").value;
  p2name = document.getElementById("p2name").value;
  p1NameHolder.textContent=p1name;
  p2NameHolder.textContent=p2name;
  if(completed!=true){
    if(Math.random()>0.5){
      whoGoes.textContent = `${p1name} gets to choose!`;
      tossWinner=1;
      }
    else{
      whoGoes.textContent = `${p2name} gets to choose!`;
      tossWinner=2;
    }
    makeForm();
  }
});


let P1_wins=0;
let P2_wins=0;
let ties=0;
let completed=false;
let start = false;
let chosen=false;

const displayWins1= document.getElementById("P1_wins");
const displayWins2= document.getElementById("P2_wins");
const displayTies = document.getElementById("ties")

function checkBoard(boardState,n,i,j){
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
    if (boardState[x1][y1] === boardState[i][j] &&
      boardState[x2][y2] === boardState[i][j]) {
      if(playerChoices[p1name]==boardState[i][j]){
        P1_wins++;
        displayWins1.textContent=`${P1_wins}`;
        winnerDeclare.textContent = `Player ${p1name} wins!`;
      }
      else{
        P2_wins++;
        displayWins2.textContent=`${P2_wins}`;
        winnerDeclare.textContent = `Player ${p2name} wins!`;
      }
      completed=true;
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

for (let i = 0; i < n; i++) {
    for(let j=0; j < n;  j++){
        const cell = document.createElement("button");
        cell.classList.add("btn");
        cell.textContent = ""; // later: X or O
        cell.addEventListener("click", () => {
            if(chosen==false){
              alert("Choose who will play first.")
              return;
            }
            start=true;
            if(completed==true){
              return;
            }
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
                if(currentPlayername==p1name){
                  currentPlayername=p2name;
                }
                else{
                  currentPlayername=p1name;
                }
                currentPlayer.textContent=`To Play: ${currentPlayername}`;
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
    completed=false;
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
    playerChoices={};
    if(Math.random()>0.5){
      whoGoes.textContent = `${p1name} gets to choose!`;
      tossWinner=1;
      }
    else{
      whoGoes.textContent = `${p2name} gets to choose!`;
      tossWinner=2;
    }
    console.log("completed");
    selectForm.style.display="flex";
});

const resetlbButton = document.getElementById("resetlb");
resetlbButton.addEventListener("click", () => {
  P1_wins=0;
  P2_wins=0;
  ties=0;
  displayTies.textContent="0";
  displayWins2.textContent="0";
  displayWins1.textContent="0";
  chosen=false;
});

