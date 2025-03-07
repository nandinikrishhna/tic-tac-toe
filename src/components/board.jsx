import { useState } from "react";
import Square from "./square";

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]  // Diagonals
];

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(squares);

  function handleClick(index) {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  }

  return (
    <div className="game-container">
      <h1>Tic-Tac-Toe</h1>
      <p>{winner ? (winner === "It's a Tie!" ? winner : `Winner: ${winner}`) : `Next Player: ${isXNext ? "X" : "O"}`}</p>

      <div className="board">
        {squares.map((value, index) => (
          <Square key={index} value={value} onClick={() => handleClick(index)} />
        ))}
      </div>

      {winner && <p className="win-message">🎉 {winner} Wins! 🎉</p>}

      <button className="reset-btn" onClick={resetGame}>Reset Game</button>
    </div>
  );
}

function calculateWinner(squares) {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // Return the winner (X or O)
      }
    }
    return squares.includes(null) ? null : "It's a Tie! Both"; // Change tie message
  }  

export default Board;



