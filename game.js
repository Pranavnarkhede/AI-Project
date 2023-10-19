var turnAI = false;
var turnUser = false;
var canUserFlip = false;

var scoreUser = 0;
var scoreAI = 0;

var playerFlipsFirst;

var flippedCardsLength = 0;

var numOfFlips = 0;
var onTurnChosenPosition = [];
var onTrunChosenImage = [];
var onTurnPositions = [];
var removedPositions = [];
var removedImages = [];

var flippedCards = {};
var flippedPositions = [];
var flippedImages = [];

var shuffledImages = [];
var shuffledCards = {};

var img1 = "../images/" + theme + "/cards/img1.png";
var img2 = "../images/" + theme + "/cards/img2.png";
var img3 = "../images/" + theme + "/cards/img3.png";
var img4 = "../images/" + theme + "/cards/img4.png";
var img5 = "../images/" + theme + "/cards/img5.png";
var img6 = "../images/" + theme + "/cards/img6.png";
var img7 = "../images/" + theme + "/cards/img7.png";
var img8 = "../images/" + theme + "/cards/img8.png";
var img9 = "../images/" + theme + "/cards/img9.png";
var img10 = "../images/" + theme + "/cards/img10.png";
var img11 = "../images/" + theme + "/cards/img11.png";
var img12 = "../images/" + theme + "/cards/img12.png";
var img13 = "../images/" + theme + "/cards/img13.png";
var img14 = "../images/" + theme + "/cards/img14.png";
var img15 = "../images/" + theme + "/cards/img15.png";

var imgBck = "../images/" + theme + "/icons/back.png";

var imgRmAI = "../images/" + theme + "/icons/empty2.png";
var imgRmUs = "../images/" + theme + "/icons/empty.png";
var imgRm = "../images/" + theme + "/icons/empty.png";

var images = [img1, img1, img2, img2, img3, img3, img4, img4, img5, img5, 
            img6, img6, img7, img7, img8, img8, img9, img9, img10, img10, 
            img11, img11, img12, img12, img13, img13, img14, img14, img15, 
            img15];

var positions = ['pos1', 'pos2', 'pos3', 'pos4', 'pos5', 'pos6', 'pos7',
                'pos8', 'pos9', 'pos10', 'pos11', 'pos12', 'pos13', 'pos14',
                'pos15', 'pos16', 'pos17', 'pos18', 'pos19', 'pos20', 'pos21',
                'pos22', 'pos23', 'pos24', 'pos25', 'pos26', 'pos27', 'pos28',
                'pos29', 'pos30'];

var numOfCards = images.length;

var aiImgPos;
var secondCardPos;
var randNum;
var imageOnTurn;
var posOnTurn;

var autoImgTemp = [];
var autoPosTemp = [];
var autoImgSelection = [];
var autoPosSelection = [];
var autoImgSelectionTemp = [];
var autoPosSelectionTemp = [];
var autoImg1;
var autoImgPos1;
var autoImg2;
var autoImgPos2;

var temRand = [];
while (temRand.length != numOfCards) {
    var n = Math.floor(Math.random() * numOfCards);
    if (!temRand.includes(n)) {
        temRand.push(n);
        shuffledImages.push(images[n]);
    }
}

for (var a = 0; a < numOfCards; a++) {
    shuffledCards[positions[a]] = shuffledImages[a];
}

var gameOverModal = document.getElementById('game_over_modal');
gameOverModal.style.display = "none";

function highlightUser() {
    document.getElementById('turn_user').style.backgroundColor = "#FCFE78";
    document.getElementById('turn_ai').style.backgroundColor = "#42B8C2"; 
}

function highlightAI() {
    document.getElementById('turn_ai').style.backgroundColor = "#FCFE78";
    document.getElementById('turn_user').style.backgroundColor = "#42B8C2";
}

function startingGameModal(playerFlipsFirst) {
    var startGameModal = document.getElementById('start_game_modal');
    if(playerFlipsFirst == "user") {
        highlightUser();
        turnUser = true;
        canUserFlip = true;
        turnAI = false;
    }
    else {
        highlightAI();
        turnUser = false;
        canUserFlip = false;
        turnAI = true;
        setTimeout(AIflips, 600);
    }
    startGameModal.style.display = "none";
}

function userClicksImage(posID) {
    areThereCards();
    if(turnUser && canUserFlip) {
        userFlips(posID);
    }
}

function userFlips(posID) {
    if (!onTurnPositions.includes(posID) && 
        !removedPositions.includes(posID)) {
        var userImgPos = document.getElementById(posID);
        onTurnPositions.push(posID);
        flippedCards[posID] = userImgPos;
        onTrunChosenImage.push(shuffledCards[posID]);
        flippedPositions.push(posID);
        flippedImages.push(shuffledCards[posID]);
        AIAutoMemory(posID, shuffledCards[posID]);
        userImgPos.src = shuffledCards[posID]; 
        onTurnChosenPosition[numOfFlips] = userImgPos;
        numOfFlips += 1;
        if (numOfFlips == 2) {
            canUserFlip = false;
            setTimeout(highlightAI, 1000);
            checkForPairs('user');
        }
    }   
}

function AIflips() {
    flippedCardsLength = Object.keys(flippedCards).length;
    if (autoPosSelection.length != 0) {
        autoSelection();
    }
    else {
        randomOrByMemory();
    }
}

function autoSelection() {
    if (!removedPositions.includes(autoPosSelection[0]) && 
        !removedPositions.includes(autoPosSelection[1])) {
            var n = autoPosSelection.length - 1;
            var autoImgPos1 = document.getElementById(autoPosSelection[n]);
            onTurnPositions.push(autoPosSelection[n]);
            flippedCards[autoPosSelection[n]] = autoImgPos1;
            onTrunChosenImage.push(shuffledCards[autoPosSelection[n]]);
            flippedPositions.push(autoPosSelection[n]);
            flippedImages.push(shuffledCards[autoPosSelection[n]]);
            autoImgPos1.src = shuffledCards[autoPosSelection[n]];
            onTurnChosenPosition[0] = autoImgPos1;
            var autoImgPos2 = document.getElementById(autoPosSelection[n-1]);
            onTurnPositions.push(autoPosSelection[n-1]);
            flippedCards[autoPosSelection[n-1]] = autoImgPos2;
            onTrunChosenImage.push(shuffledCards[autoPosSelection[n-1]]);
            flippedPositions.push(autoPosSelection[n-1]);
            flippedImages.push(shuffledCards[autoPosSelection[n-1]]);
            autoImgPos2.src = shuffledCards[autoPosSelection[n-1]];
            onTurnChosenPosition[1] = autoImgPos2;
            checkForPairs('ai');
    }
}

function AIAutoMemory(pos, img) {
    if (!autoImgTemp.includes(img) && 
        !removedPositions.includes(pos)) {
        autoImgTemp.push(img);
        autoPosTemp.push(pos);
    }
    else if (autoImgTemp.includes(img) && !autoPosTemp.includes(pos) && 
        !removedPositions.includes(pos)) {
        autoImg1 = autoImgTemp.indexOf(img);
        autoImgPos1 = autoPosTemp[autoImg1];
        autoImg2 = img;
        autoImgPos2 = pos;
        autoImgSelection.push(autoImg1); 
        autoPosSelection.push(autoImgPos1);
        autoImgSelection.push(img);
        autoPosSelection.push(pos);
        autoImgTemp.push(img);
        autoPosTemp.push(pos);
    }
}

function randomOrByMemory() {
    var findRandomCard1 = true;
    var findingCard2 = true;
    var findRandomCard2 = true;

    flippedCardsLength = Object.keys(flippedCards).length;

    while(findRandomCard1 == true) {
        randNum = Math.floor(Math.random() * numOfCards);
        if (!onTurnPositions.includes(positions[randNum]) &&
            !removedPositions.includes(positions[randNum])) {
            if (flippedPositions.includes(positions[randNum])) {
                if (flippedCardsLength >= numOfCards) {
                    findRandomCard1 = false; 
                    getImage();
                    flippedCardsLength = Object.keys(flippedCards).length;
                    imageOnTurn = shuffledCards[positions[randNum]];
                    posOnTurn = positions[randNum];
                }
                else {
                    findRandomCard1 == true;
                }
            }
            else {
                findRandomCard1 = false; 
                getImage();
                flippedCardsLength = Object.keys(flippedCards).length;
                imageOnTurn = shuffledCards[positions[randNum]];
                posOnTurn = positions[randNum];
            }
        }
    }

    if (findingCard2 == true) {
        for (var i = 0; i < flippedCardsLength; i++) {
            if (imageOnTurn == flippedImages[i] 
                && posOnTurn != flippedPositions[i]) {
                secondCardPos = flippedPositions[i];
                aiImgPos = flippedImages[i];
                aiImgPos = document.getElementById(secondCardPos);
                onTurnPositions.push(secondCardPos);
                flippedCards[secondCardPos] = aiImgPos;
                onTrunChosenImage.push(shuffledCards[secondCardPos]);
                AIAutoMemory(secondCardPos, shuffledCards[secondCardPos]);
                aiImgPos.src = shuffledCards[secondCardPos];
                onTurnChosenPosition[numOfFlips] = aiImgPos;
                numOfFlips += 1;
                findingCard2 = false;
                break;
            }
        }
    }

    if (findingCard2 == true) {
        while(findRandomCard2) {
            randNum = Math.floor(Math.random() * numOfCards);
            if (!onTurnPositions.includes(positions[randNum]) &&
            !removedPositions.includes(positions[randNum])) {
                if (flippedPositions.includes(positions[randNum])) {
                    if (flippedCardsLength >= numOfCards) {
                        findRandomCard2 = false;
                        getImage();
                    }
                    else {
                        findRandomCard2 == true;
                    }
                } 
                else {
                    findRandomCard2 = false;
                    getImage();
                }
            }
        }
    }
    setTimeout(highlightUser, 1000);
    checkForPairs('ai');
}

function getImage() {
    aiImgPos = document.getElementById(positions[randNum]);
    onTurnPositions.push(positions[randNum]);
    flippedCards[positions[randNum]] = aiImgPos;
    flippedPositions.push(positions[randNum]); 
    flippedImages.push(shuffledCards[positions[randNum]]); 
    AIAutoMemory(positions[randNum], shuffledCards[positions[randNum]]); 
    onTrunChosenImage.push(shuffledCards[positions[randNum]]);
    aiImgPos.src = shuffledCards[positions[randNum]]; 
    onTurnChosenPosition[numOfFlips] = aiImgPos;
    numOfFlips += 1;
}

function updateAutoSelection(card1, card2) {
    autoPosSelectionTemp = autoPosSelection;
    autoImgSelectionTemp = autoImgSelection;
    autoPosSelection = [];
    autoImgSelection = [];
    for (var i = 0; i < autoPosSelectionTemp.length; i++) {
        if (autoPosSelectionTemp[i] != card1 
            && autoPosSelectionTemp[i] != card2) {
            autoPosSelection.push(autoPosSelectionTemp[i]);
            autoImgSelection.push(autoImgSelectionTemp[i]);
        }
    }
}

function checkForPairs(player) {
    if (onTrunChosenImage[0] == onTrunChosenImage[1]) {
        updateAutoSelection(onTurnPositions[0], onTurnPositions[1]);
        if (player == 'ai') {
            scoreAI += 1;
            document.getElementById('score_ai').innerHTML = scoreAI;
            turnAI = true; 
            setTimeout(highlightAI, 1000);
            imgRm = imgRmAI;
        }
        if (player == 'user') {
            scoreUser += 1;
            document.getElementById('score_user').innerHTML = scoreUser;
            turnUser = true;
            canUserFlip = false;
            setTimeout(highlightUser, 1000);
            turnAI = false;
            imgRm = imgRmUs;
        }
        removedPositions.push(onTurnPositions[0]);
        removedPositions.push(onTurnPositions[1]);
        setTimeout(removeImage, 1000);
    }
    else {
        turnUser = !turnUser;
        turnAI = !turnAI;
        setTimeout(unflipImage, 1000);
    }
    onTrunChosenImage = [];
}

function removeImage() {
    onTurnPositions = [];
    onTurnChosenPosition[0].src = imgRm;
    onTurnChosenPosition[1].src = imgRm;
    numOfFlips = 0;
    onTurnChosenPosition = [];
    areThereCards();
    if (turnAI) { 
        AIflips();
    }
    else {
        setTimeout(highlightUser, 1000);
        canUserFlip = true;
    }
}

function unflipImage() {
    onTurnPositions = [];
    onTurnChosenPosition[0].src = imgBck;
    onTurnChosenPosition[1].src = imgBck;
    numOfFlips = 0;
    onTurnChosenPosition = [];
    areThereCards();
    if (turnAI) {
        AIflips();
    }
    else {
        setTimeout(highlightUser, 1000);
        canUserFlip = true;
    }
}

function areThereCards() {
    if (removedPositions.length == numOfCards) {
        gameOver();
    }
}

function gameOver() {
    turnUser = false;
    turnAI = false;
    document.getElementById('turn_ai').style.backgroundColor = "#42B8C2";
    document.getElementById('turn_user').style.backgroundColor = "#42B8C2";
    updateGameOverModal();
}

function updateGameOverModal() {
    var winnerMsg;
    var gameOverModal = document.getElementById('end_game_modal');
    gameOverModal.style.display = "block";
    document.getElementById('final_score_ai').innerHTML = scoreAI;
    document.getElementById('final_score_user').innerHTML = scoreUser;
    if (scoreAI > scoreUser){
        winnerMsg = "You Lost!";
    }
    else {
        winnerMsg = "You Won!";
    }
    document.getElementById('end_lettering_txt').innerHTML = winnerMsg;
}
