var giocatrici = [
    { "name": "Assy", "points": 0 },
    { "name": "Bau", "points": 0 },
    { "name": "Enza", "points": 0 },
    { "name": "Filo", "points": 0 },
    { "name": "Lory", "points": 0 },
    { "name": "Luana", "points": 0 },
    { "name": "Manu", "points": 0 },
    { "name": "Monia", "points": 0 },
    { "name": "Pamela", "points": 0 },
    { "name": "Sonia", "points": 0 }
];

function setDate() {
    var dateElement = document.querySelector(".date");
    var today = new Date();

    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();

    day = (day < 10) ? '0' + day : day;
    month = (month < 10) ? '0' + month : month;

    var formattedDate = day + '/' + month + '/' + year;

    dateElement.innerHTML = "Data: " + formattedDate;
}

setDate();

// Function to create a player element
function createPlayer(player, index) {
    // Create elements
    var playerDiv = document.createElement("div");
    playerDiv.className = "player";

    var decreaseButton = document.createElement("button");
    decreaseButton.textContent = " - ";
    decreaseButton.addEventListener("click", function () {
        updatePoints(index, -1);
    });

    var nameDiv = document.createElement("div");
    nameDiv.className = "name";
    nameDiv.textContent = player.name;

    var pointsDiv = document.createElement("div");
    pointsDiv.className = "points";
    pointsDiv.textContent = player.points;

    var increaseButton = document.createElement("button");
    increaseButton.textContent = " + ";
    increaseButton.addEventListener("click", function () {
        updatePoints(index, 1);
    });

    // Append elements to playerDiv
    playerDiv.appendChild(decreaseButton);
    playerDiv.appendChild(nameDiv);
    playerDiv.appendChild(pointsDiv);
    playerDiv.appendChild(increaseButton);

    // Function to update points
    function updatePoints(playerIndex, value) {
        giocatrici[playerIndex].points += value;
        pointsDiv.textContent = giocatrici[playerIndex].points;
    }

    return playerDiv;
}

// Get the container element where you want to append the player
var container = document.querySelector("body"); // Replace "container" with the actual ID or class of the container element

// Create players and append them to the container
giocatrici.forEach(function (player, index) {
    var playerElement = createPlayer(player, index);
    container.appendChild(playerElement);
});

// Function to generate PDF
function generatePDF() {
    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF({
        orientation: 'l',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts: true
    });

    // Add content to PDF
    pdf.text(document.querySelector(".date").innerText, 20, 20);
    pdf.text("Avversario: " + document.querySelector(".opp").value, 20, 30);
    pdf.text("Titolo: Difese", 20, 40);

    var yPosition = 50;

    giocatrici.forEach(function (player) {
        pdf.text(player.name + ": " + player.points, 20, yPosition);
        yPosition += 10;
    });
    // Save the PDF
    pdf.save(document.querySelector(".opp").value + "-difese-" + document.querySelector(".date").innerHTML.substring(6) + ".pdf");
}