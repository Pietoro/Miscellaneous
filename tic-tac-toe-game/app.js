const PLAYER1 = 'o';
const PLAYER2 = 'x';
let round = 1;
let board = [
  ['','',''],
  ['','',''],
  ['','','']
];

const combinations = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

const boxes = [...document.querySelectorAll('.box')];
boxes.forEach(box => box.addEventListener('click',pick));

let lock = false;

const btn = document.querySelector('.btn-new-game');
btn.addEventListener('click', newGame);

function pick(event) {
  //console.log(event);
  if(lock) return;
  // const{row,column} = event.target.dataset;
  const dataset = event.target.dataset;
  const row = dataset.row;
  const column = dataset.column;
  const turn = ((round % 2 === 0) ? PLAYER2 : PLAYER1);
  if(board[row][column] !== '') return;
  event.target.classList.add(turn);
  board[row][column] = turn;
  const c = check();
  //console.log(check());
  if (c) {
    lock = true;
    document.querySelector('.winner').innerHTML = c;
  }
  round++;
}

function check() {
  /*let total = [];
  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    total = total.concat(row);
  }
  const result = total;*/
  let winner = null;
  const result = board.reduce((total,row) => total.concat(row), []);
  let moves = {
    'o': [],
    'x': []
  };
  result.forEach((field,index) => moves[field] ? moves[field].push(index) : null);
  combinations.forEach(combination => {
    if(combination.every(number => moves[PLAYER1].includes(number))) {
      winner = 'Winner: \u25EF';
    }
    if(combination.every(number => moves[PLAYER2].includes(number))) {
      winner = 'Winner: \u2715';
    }
  });
  return winner;
}

function newGame() {
  lock = false;
  round = 1;
  boxes.forEach(box => box.classList.remove('o', 'x'));
  document.querySelector('.winner').innerHTML = '';
  board = [
    ['','',''],
    ['','',''],
    ['','','']
  ];
}

