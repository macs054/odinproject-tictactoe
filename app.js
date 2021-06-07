const gameBoard = (() => {
    const boardArray = [];

    const writeInBoard = (playerInput, boardPosition) => {
        if (!boardArray[boardPosition]) {
            boardArray[boardPosition] = playerInput;
        }
    }

    const getBoard = () => boardArray;

    const clearBoardArray = () => {
        boardArray.length = 0;
    }

    const clearBoardDOM = (board) => {
        const squares = document.querySelector(board).children;
        const squaresArr = Array.from(squares);
        squaresArr.forEach(item => item.textContent = "");
    }

    return { writeInBoard, getBoard, clearBoardArray, clearBoardDOM }
})();

const player = (name, input) => {
    return { name, input }
}

const gameState = (() => {
    const players = [];
    let currentlyPlaying = "";
    let winner = ""; 

    const initGame = (player1Name, player2Name) => {
        players.push(player(player1Name, "X")); // player 1 is X, for now
        players.push(player(player2Name, "O")); // player 2 is O, for now
        currentlyPlaying = players[0]; // player1 is always first
    }

    const getCurrentPlayer = () => currentlyPlaying;

    const switchPlayer = () => {
        if (currentlyPlaying === players[0]) {
            currentlyPlaying = players[1];
        } else {
            currentlyPlaying = players[0];
        }
    }

    const checkThreeInARow = (a, b, c) => {
        if (!!a || !!b || !!c) {
            return a == b && a == c;
        }
    }
    
    const checkWinCondition = () => {
        if (checkThreeInARow(gameBoard.getBoard()[0], gameBoard.getBoard()[1], gameBoard.getBoard()[2]) ||
            checkThreeInARow(gameBoard.getBoard()[0], gameBoard.getBoard()[4], gameBoard.getBoard()[8]) ||
            checkThreeInARow(gameBoard.getBoard()[0], gameBoard.getBoard()[3], gameBoard.getBoard()[6]) ||
            checkThreeInARow(gameBoard.getBoard()[3], gameBoard.getBoard()[4], gameBoard.getBoard()[5]) ||
            checkThreeInARow(gameBoard.getBoard()[6], gameBoard.getBoard()[7], gameBoard.getBoard()[8]) ||
            checkThreeInARow(gameBoard.getBoard()[6], gameBoard.getBoard()[4], gameBoard.getBoard()[2]) ||
            checkThreeInARow(gameBoard.getBoard()[1], gameBoard.getBoard()[4], gameBoard.getBoard()[7]) ||
            checkThreeInARow(gameBoard.getBoard()[2], gameBoard.getBoard()[5], gameBoard.getBoard()[8])) {
            winner = currentlyPlaying;
            //console.log(`${winner.input} wins!`);
        } else if (checkIfFullBoard()) {
            winner = "None";
            //console.log("Draw!"); // Draw condition for now is to check if board is full without having a winner
        }
    }

    const resetGame = (board) => {
        gameBoard.clearBoardArray();
        gameBoard.clearBoardDOM(board);
        winner = "";
        currentlyPlaying = players[0];
    }

    const getWinner = () => winner;

    const checkIfFullBoard = () => {
        if(gameBoard.getBoard().length === 9) {
            for(let i = 0; i < gameBoard.getBoard().length; i++) {
                if (gameBoard.getBoard()[i] == undefined) return false;
            }
            return true;
        }  
    }
    
    return { 
        getCurrentPlayer, 
        initGame, 
        switchPlayer,
        checkWinCondition,
        resetGame,
        getWinner,
    }
})();

onload = () => {
    gameState.initGame("Player 1", "Player 2");
    const displayText = document.querySelector(".text-panel");

    const setPlayerText = () => {
        displayText.textContent = `${gameState.getCurrentPlayer().name}'s (${gameState.getCurrentPlayer().input}) turn.`
    }

    const setWinnerText = () => {
        displayText.textContent = `${gameState.getCurrentPlayer().name} (${gameState.getCurrentPlayer().input}) Wins!`
    }

    const setDrawText = () => {
        displayText.textContent = `Draw!`
    }

    const disableBoard = () => {
        document.querySelectorAll(".btn").forEach(btn => {
            btn.style.pointerEvents = "none";
        });
    }
    
    const enableBoard = () => {
        document.querySelectorAll(".btn").forEach(btn => {
            btn.style.pointerEvents = "auto";
        });
    }

    setPlayerText();
    
    document.querySelectorAll(".btn").forEach(btn => {
        btn.addEventListener("click", () => {
            if(btn.textContent === "") {
                const input = gameState.getCurrentPlayer().input;
                btn.textContent = input;
                gameBoard.writeInBoard(input, btn.id);
                gameState.checkWinCondition();
                if(gameState.getWinner()) {
                    disableBoard();
                    document.querySelector(".reset").textContent = "New Game";
                    gameState.getWinner() === "None" ? displayText.textContent = `Draw!` : setWinnerText();
                } else {
                    gameState.switchPlayer();
                    setPlayerText();
                }
            } else {
                console.log("occupied");
            }
        })
    });

    document.querySelector(".reset").addEventListener("click", () => {
        gameState.resetGame(".game-board");
        setPlayerText();
        enableBoard();
        document.querySelector(".reset").textContent = "Reset";
    });  
}

// TODO
// read other win condition solutions