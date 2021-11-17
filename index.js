let deck={}; //skapar en variabel för att spara vårat deck i
let previousCard = 0;
let newCard = 0;
let arraywithCards = [] //skapar en array med kortet som ska jämföras

const card = document.getElementById("card");
const lowerButton = document.getElementById("lower");
const higherButton = document.getElementById("higher");
const drawCardButton = document.getElementById("drawCard");
const output = document.getElementById("output");
const sameCardbutton = document.getElementById("sameCard");

async function getDeck(){ 
    const res = await fetch(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1" );
    const data = await res.json();
    deck = data; // assignar data till vårat deck så att vi kan använda variabeln senare
    
}

getDeck(); // Anropar funktionen direkt 

async function drawFirstCard() {
  const res = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
  const data = await res.json();
  image.setAttribute("src", data.cards[0].image);
  previousCard = convertRoyals(data.cards[0].value);
  
  return previousCard;
}

async function drawnewCard() {
  const res = await fetch(
      `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
  const data = await res.json();
  image.setAttribute("src", data.cards[0].image);
  newCard = data.cards[0].value;
  newCard = convertRoyals(newCard);
  return newCard;
  }

drawCardButton.addEventListener("click", async() => {
  const firstCard = await drawFirstCard();
  arraywithCards.push(firstCard);
  drawCardButton.disabled = true;
});


lowerButton.addEventListener("click", async() => {
  await lower();
});

higherButton.addEventListener("click", async() => {
  await higher();
});

sameCardbutton.addEventListener("click", async() =>{
  await sameCard();
});

async function lower() {
  const currentCard = await drawnewCard(); // drar ett kort
  arraywithCards.push(currentCard); // lägger till kortet

  if (arraywithCards[0] > arraywithCards[1]) { //jämför första kortet med det andra
    output.textContent = "correct, it's lower"  
  } else if (arraywithCards[0] === arraywithCards[1]){
    output.textContent = "sorry it was the same card"
  } else {
    output.textContent = "sorry it was higher"
  }
arraywithCards.shift(); //tar bort det första kortet
}


async function higher() {
  const currentCard = await drawnewCard(); // drar ett kort
  arraywithCards.push(currentCard); // lägger till kortet

  if (arraywithCards[0] < arraywithCards[1]) { //jämför första kortet med det andra
    output.textContent = "correct, it's higher"  
  } else if (arraywithCards[0] === arraywithCards[1]){
    output.textContent = "sorry it was the same card"
  } else {
    output.textContent = "sorry it was lower"
  }
arraywithCards.shift(); //tar bort det första kortet
}

async function sameCard() {
  const currentCard = await drawnewCard(); // drar ett kort
  arraywithCards.push(currentCard);

  if (arraywithCards[0] === arraywithCards[1]) {
    output.textContent = "Correct, it was the same card"
  } else if (arraywithCards[0] < arraywithCards[1]){
    output.textContent = "Sorry it was higher"
  } else {
    output.textContent = "sorry it was lower"
  }
  arraywithCards.shift(); //tar bort det första kortet
}

// Kollar om det är mellan 2 och 10 i strängar
async function convertRoyals(card) {
  switch (card) {
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "10":
          return parseInt(card);

      case 'ACE':
          card = 14
          break
      case 'KING':
          card = 13
          break
      case 'QUEEN':
          card = 12
          break
      case 'JACK':
          card = 11
          break
      default:
          console.log("Somethings Wrong");
          break;
  }
  return card
}



