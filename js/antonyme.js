let selectedPairs = [];
let chosenCards = [];
let foundPairs = 0;
let moves = 0;
let score = 0;

function init() {
    // Falls antonymeData nicht geladen wurde (Sicherheitscheck)
    if (typeof antonymeData === 'undefined') {
        console.error("Daten konnten nicht geladen werden.");
        return;
    }

    const shuffledPool = [...antonymeData].sort(() => 0.5 - Math.random());
    selectedPairs = shuffledPool.slice(0, 9);

    let t = ""; 
    selectedPairs.forEach(p => {
        t += `<tr>
                <td>${p[0]}<br><small style='color:#777'>${p[2]}</small></td>
                <td>${p[1]}<br><small style='color:#777'>${p[3]}</small></td>
              </tr>`;
    });
    document.getElementById("learnTable").innerHTML = t;
}

function spielStarten() {
    document.getElementById("introBox").classList.add("hide");
    document.getElementById("gameBox").classList.remove("hide");

    let deck = [];
    selectedPairs.forEach((p, i) => {
        deck.push({ text: p[0], id: i });
        deck.push({ text: p[1], id: i });
    });

    deck.sort(() => 0.5 - Math.random());

    const area = document.getElementById("gameArea");
    area.innerHTML = "";

    const mid = document.createElement("div");
    mid.id = "ergebnis";
    mid.innerText = "Los geht's!";
    area.appendChild(mid);

    let cardCount = 0;
    for (let i = 1; i <= 20; i++) {
        if (i === 10 || i === 11) continue; 
        const cardData = deck[cardCount];
        const div = document.createElement("div");
        div.className = "card";
        div.innerText = cardData.text;
        div.dataset.pairId = cardData.id;
        div.onclick = function() { selectCard(this); };
        area.appendChild(div);
        cardCount++;
    }
}

function selectCard(el) {
    if (chosenCards.length < 2 && !el.classList.contains("richtig") && !chosenCards.includes(el)) {
        el.className = "chosen";
        chosenCards.push(el);
        if (chosenCards.length === 2) {
            moves++;
            checkMatch();
        }
    }
}

function checkMatch() {
    const [a, b] = chosenCards;
    const msg = document.getElementById("ergebnis");

    if (a.dataset.pairId === b.dataset.pairId) {
        a.className = b.className = "richtig";
        score++;
        foundPairs++;
        msg.innerText = "Richtig!";
        chosenCards = [];
        if (foundPairs === 9) spielEnde();
    } else {
        a.className = b.className = "falsch";
        msg.innerText = "Falsch";
        setTimeout(() => {
            a.className = b.className = "card";
            chosenCards = [];
        }, 600);
    }
    document.getElementById("score").innerText = score;
    document.getElementById("moves").innerText = moves;
}

function spielEnde() {
    document.getElementById("ergebnis").innerText = "Sieg!";
    setTimeout(() => {
        const overlay = document.getElementById("endOverlay");
        overlay.classList.remove("hide");
        document.getElementById("finalStats").innerText = 
            `Sie haben alle Paare in ${moves} Versuchen gefunden.`;
    }, 800);
}

// Initialisierung beim Laden
window.onload = init;