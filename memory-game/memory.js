const cards = [
  'ciri', 'geralt', 'jaskier', 'jaskier',
  'iorweth', 'triss', 'geralt', 'yen',
  'ciri', 'triss', 'yen', 'iorweth'
];

for (let i = 0; i < cards.length; i++) {
  const c = document.getElementById(`c${i}`);
  c.addEventListener('click', () => revealCard(i));
}

let oneVisible = false;
let turnCounter = 0;
let visibleNumber;
let lock = false;
let pairsLeft = cards.length/2;

function revealCard(number) {
  const card = document.querySelector(`#c${number}`);
  if(window.getComputedStyle(card).getPropertyValue('opacity') !== '0' 
  && !lock
  && number !== visibleNumber) {
    lock = true;
    const picture = `url(img/${cards[number]}.png)`;  //'url(img/' + cards[number] + '.png)';
    card.setAttribute('style', `background-image: ${picture};`);
    card.classList.add('revealed');
  
    if(!oneVisible) {
      oneVisible = true;
      visibleNumber = number;
      lock = false;
    } else {
      if(cards[visibleNumber] === cards[number]) {
        setTimeout(() => hideTwoCards(number, visibleNumber), 750);
      } else {
        setTimeout(() => restoreTwoCards(number, visibleNumber), 1000);
      }
      turnCounter++;
      document.querySelector('#turns-count').innerHTML = turnCounter;
      oneVisible = false;
    }
  }
}

function hideTwoCards(numberOne, numberTwo) {
  document.querySelector(`#c${numberOne}`).setAttribute('style','opacity: 0');
  document.querySelector(`#c${numberTwo}`).setAttribute('style','opacity: 0');
  lock = false;
  pairsLeft--;
  if(pairsLeft === 0) {
    document.querySelector('.board')
      .innerHTML = `<h2 class="winner">You have won in:<br>${turnCounter} turns</h2>`;
  }
}

function restoreTwoCards(numberOne, numberTwo) {
  const cardOne = document.querySelector(`#c${numberOne}`);
  const cardTwo = document.querySelector(`#c${numberTwo}`);
  cardOne.setAttribute('style', 'background-image: karta.png;');
  cardOne.classList.remove('revealed');
  cardTwo.setAttribute('style', 'background-image: karta.png;');
  cardTwo.classList.remove('revealed');
  lock = false;
}