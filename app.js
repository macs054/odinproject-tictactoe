const gameBoard = (() => {
    const boardArray = [];

    const writeInBoard = (playerInput, boardPosition) => {
        if (!boardArray[boardPosition]) {
            boardArray[boardPosition] = playerInput;
        }
    }

    const getBoard = () => boardArray;

    return { writeInBoard, getBoard }
})();

const player = (name, input) => {
    return { name, input }
}

const gameState = (() => {
    const players = [];
    let currentlyPlaying = "";
    let winner = ""; 
    const winCondition = [[0,1,2], [0,4,8], [0,3,6], [3,4,5], [6,7,8], [6,4,2], [1,4,7], [2,5,8]];

    const initGame = (player1Name, player2Name) => {
        players.push(player(player1Name, "X")); // player 1 is X, for now
        players.push(player(player2Name, "O")); // player 2 is O, for now
        currentlyPlaying = players[0]; // player1 is always first
    }

    const getCurrentPlayer = () => currentlyPlaying;
    const getPlayers = () => players;

    const switchPlayer = () => {
        if(currentlyPlaying === players[0]) {
            currentlyPlaying = players[1];
        } else {
            currentlyPlaying = players[0];
        }
    }

    return { 
        getCurrentPlayer, 
        getPlayers, 
        initGame, 
        switchPlayer,
    }
})();

onload = () => {
    gameState.initGame("p1", "p2");

    document.querySelectorAll(".btn").forEach(btn => {
        btn.addEventListener("click", () => {
            if(btn.textContent === "") {
                const input = gameState.getCurrentPlayer().input;
                btn.textContent = input;
                gameBoard.writeInBoard(input, btn.id);
                gameState.switchPlayer();
            } else {
                console.log("occupied");
            }
        })
    });
}
