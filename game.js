let player = {
    money: 100,
    orbPos: 0,
    deck: [],
    hand: []
};

let cards = [
    {name: "Move Forward 1", type: "movement", value: 1},
    {name: "Move Forward 2", type: "movement", value: 2},
    {name: "Steal Coin", type: "special", value: 5},
    {name: "Buy Card", type: "buy", value: 10}
];

// Fill player deck
player.deck = [...cards, ...cards]; // Simple starter deck

function drawHand() {
    player.hand = [];
    for (let i = 0; i < 5; i++) {
        if (player.deck.length === 0) break;
        let idx = Math.floor(Math.random() * player.deck.length);
        player.hand.push(player.deck.splice(idx, 1)[0]);
    }
    renderHand();
}

function renderHand() {
    const handDiv = document.getElementById("hand");
    handDiv.innerHTML = "";
    player.hand.forEach((card, index) => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.textContent = card.name;
        cardDiv.onclick = () => playCard(index);
        handDiv.appendChild(cardDiv);
    });
}

function playCard(index) {
    const card = player.hand[index];
    if (card.type === "movement") {
        player.orbPos += card.value;
        log(`Orb moves forward ${card.value} spaces!`);
    } else if (card.type === "special") {
        player.money += card.value;
        log(`Special card! Money +$${card.value}`);
    } else if (card.type === "buy") {
        player.money -= card.value;
        log(`Bought a new card for $${card.value}`);
    }
    player.hand.splice(index, 1);
    updateBoard();
    renderHand();
}

function updateBoard() {
    document.getElementById("board").textContent = `Orb Position: ${player.orbPos}`;
    document.getElementById("money").textContent = `Money: $${player.money}`;
}

function log(message) {
    const logDiv = document.getElementById("log");
    logDiv.innerHTML += message + "<br>";
    logDiv.scrollTop = logDiv.scrollHeight;
}

// Start game
drawHand();
updateBoard();
