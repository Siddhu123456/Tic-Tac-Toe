import {useState} from 'react'

import Player from './components/Player.jsx'
import GameBoard from './components/GameBoard.jsx'
import Log from './components/Log.jsx'
import GameOver from './components/GameOver.jsx'
import WINNING_COMBINATIONS from './WINNING_COMBINATIONS.js'

const PLAYERS = {
  X : 'Player 1',
  O : 'Player 2'
}

const INITIAL_GAME_BOARD = [[null,null,null],
                        [null,null,null],
                        [null,null,null]];

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(innerArray => [...innerArray])];

  for(const turn of gameTurns){
    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players){
  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol].toUpperCase();
    }
  }

  return winner;
}

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {
  // const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);

  

  let hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){
    // setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns((prevTurns) =>{
      
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{square : {row : rowIndex, col : colIndex}, player : currentPlayer},...prevTurns]

      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, name){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol] : name
      };
    });
  }

  return (
    <main>
      <div id = "game-container">
        <ol id = "players" className = "highlight-player">
          <Player
            initialName = {PLAYERS.X}
            symbol = 'X'
            isActive = {activePlayer === 'X'}
            onChangeName = {handlePlayerNameChange}
          />
          <Player
            initialName = {PLAYERS.O}
            symbol = 'O'
            isActive = {activePlayer === 'O'}
            onChangeName = {handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner = {winner} onRematch = {handleRestart}/>
          )}
        <GameBoard onSelectSquare = {handleSelectSquare} activePlayerSymbol = {activePlayer} board = {gameBoard}/>
      </div>
      <Log turns = {gameTurns}/>
    </main>
  );
}

export default App
