import { useEffect, useState } from "react";
import Square from "./Square";

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(
    [...new Array(3)].map(() => [...new Array(3)].fill(null))
  );

  function handleClick(row, col) {
    if (calculateWinner(squares) || squares[row][col]) {
      console.log(
        `Calculated winner ${calculateWinner(squares)} or square ${
          squares[row][col]
        } is full`
      );
      return;
    }
    console.log("Setting square");

    const nextSquares = squares.slice();
    nextSquares[row][col] = xIsNext ? "X" : "O";
    setSquares([...nextSquares]);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function calculateWinner(squares) {
    // Returns 'X' if player X wins
    // Returns 'O' if player O wins
    // Returns null if the game has not ended (or there is a tie?)
    const emptyGrid = squares.every((row) =>
      row.every((space) => space === null)
    );
    const fullGrid = squares.every((row) =>
      row.every((space) => space !== null)
    );

    if (emptyGrid) {
      // Return false if the game has not ended
      return null;
    }
    if (fullGrid) {
      //tie game
      return null;
    }
    return (
      horizontalCheck(squares) ||
      diagonalCheck(squares) ||
      verticalCheck(squares)
    );
  }

  function horizontalCheck(squares) {
    for (let row of squares) {
      if (row[0] !== null && row.every((space) => space === row[0][0])) {
        return row[0];
      }
    }
    return null;
  }

  function diagonalCheck(squares) {
    if (
      squares[0][0] !== null &&
      squares[0][0] === squares[1][1] &&
      squares[0][0] === squares[2][2]
    ) {
      return squares[0][0];
    } else if (
      squares[0][2] !== null &&
      squares[0][2] === squares[1][1] &&
      squares[0][2] === squares[2][0]
    ) {
      return squares[0][2];
    }
    return null;
  }

  function verticalCheck(squares) {
    let winningLetter;
    for (let h = 0; h < squares.length; h++) {
      winningLetter = squares[0][h];
      let count = 0;
      for (let v = 1; v < squares[0].length; v++) {
        if (winningLetter === squares[v][h] && squares[v][h] !== null) {
          count++;
          if (count === 2) {
            return winningLetter;
          }
        }
      }
    }
    return null;
  }

  return (
    <>
      <div className="status">{status}</div>
      {squares.map((row, rowNum) => (
        <div className="board-row">
          {row.map((square, colNum) => (
            <Square
              value={square}
              onSquareClick={() => handleClick(rowNum, colNum)}
            />
          ))}
        </div>
      ))}
    </>
  );
}
