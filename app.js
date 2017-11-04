/* LOGIC */

var score = 0;
var playerChoice;

var readable = {
  '0': 'Rock',
  '2': 'Paper',
  '4': 'Scissors',
  '1': 'Spock',
  '3': 'Lizard'
};


function getComuterChoice(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'http://localhost:1234/computer_choice', false ); // false for synchronous request
    xmlHttp.send( null );
    console.log(xmlHttp.responseText)
    return xmlHttp.responseText;
}

var computerChoice = {
  init: function() {
    this.store = getComuterChoice();
    this.text = readable[this.store];
  },
  store: '',
  text: ''
}

var chooseWinner = function(player, cpu) {

  if(player === cpu) {
    return 'The game is tied. Try again?';
  }
  if((cpu + 1) % 5 == player || (cpu + 2) % 5 == player) {
    score++;
    return "You won!";
  } else {
    score--;
    return 'You lost :(';
  }
}

/* UI */
var paragraph = document.querySelector('p')

var assignClick = function(tag, val) {
  tag.addEventListener('click', function() {
    playerChoice = parseInt(val);
    computerChoice.init();

    paragraph.innerText = 'You chose: ' + readable[val] + ',   ';
    paragraph.innerText += 'The computer chose: ' + computerChoice.text + '\n';
    paragraph.innerText += chooseWinner(playerChoice, computerChoice.store);
    paragraph.innerText += '  Score: ' + score;
  })
}

var images = {
  tags: document.getElementsByTagName('img'),
  init: function() {
    for(var step = 1; step < this.tags.length; step++){
      assignClick(this.tags[step], this.tags[step].id);
    }
  }
}

images.init();
