import React from "react";
import "./Game.css";

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.rows = HEIGHT / CELL_SIZE;
    this.cols = WIDTH / CELL_SIZE;
    this.board = this.makeEmptyBoard();
    this.boardRef = React.createRef();

    this.state = {
      cells: [],
      interval: 100,
      isRunning: false,
    };
  }

  runGame = () => {
    this.setState({ isRunning: true }, () => {
      this.runIteration();
    });
  };

  stopGame = () => {
    this.setState({ isRunning: false });
    if (this.timeoutHandler) {
      window.clearTimeout(this.timeoutHandler);
      this.timeoutHandler = null;
    }
  };

  runIteration = () => {
    console.log("Running iteration");
    let newBoard = this.makeEmptyBoard();

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let numNeighbors = this.calculateNeighbors(this.board, x, y);

        if (this.board[y][x]) {
          if (numNeighbors === 2 || numNeighbors === 3) {
            newBoard[y][x] = true;
          } else {
            newBoard[y][x] = false;
          }
        } else {
          if (!this.board[y][x] && numNeighbors === 3) {
            newBoard[y][x] = true;
          }
        }
      }
    }

    this.board = newBoard;
    this.setState({ cells: this.makeCells() });

    if (this.state.isRunning) {
      this.timeoutHandler = window.setTimeout(() => {
        this.runIteration();
      }, this.state.interval);
    }
  };

  calculateNeighbors(board, x, y) {
    let neighbors = 0;
    const dirs = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
    ];
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      let y1 = y + dir[0];
      let x1 = x + dir[1];

      if (
        x1 >= 0 &&
        x1 < this.cols &&
        y1 >= 0 &&
        y1 < this.rows &&
        board[y1][x1]
      ) {
        neighbors++;
      }
    }

    return neighbors;
  }

  makeEmptyBoard() {
    return Array.from({ length: this.rows }, () =>
      Array(this.cols).fill(false)
    );
  }

  makeCells() {
    let cells = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.board[y][x]) {
          cells.push({ x, y });
        }
      }
    }
    return cells;
  }

  getElementOffset() {
    const rect = this.boardRef.current.getBoundingClientRect();
    return {
      x: rect.left + window.pageXOffset,
      y: rect.top + window.pageYOffset,
    };
  }

  handleClick = (event) => {
    const elemOffset = this.getElementOffset();
    const offsetX = event.clientX - elemOffset.x;
    const offsetY = event.clientY - elemOffset.y;
    const x = Math.floor(offsetX / CELL_SIZE);
    const y = Math.floor(offsetY / CELL_SIZE);

    if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
      this.board[y][x] = !this.board[y][x];
      this.setState({ cells: this.makeCells() });
    }
  };

  handleIntervalChange = (event) => {
    this.setState({ interval: Number(event.target.value) });
  };

  render() {
    return (
      <div>
        <div
          className="Board"
          style={{
            width: WIDTH,
            height: HEIGHT,
            backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
          }}
          onClick={this.handleClick}
          ref={this.boardRef}>
          {this.state.cells.map((cell) => (
            <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`} />
          ))}
        </div>
        <div className="controls">
          Update every
          <input
            type="number"
            value={this.state.interval}
            onChange={this.handleIntervalChange}
          />{" "}
          msec
          {this.state.isRunning ? (
            <button className="button" onClick={this.stopGame}>
              Stop
            </button>
          ) : (
            <button className="button" onClick={this.runGame}>
              Run
            </button>
          )}
        </div>
      </div>
    );
  }
}

// Cell Component
class Cell extends React.Component {
  render() {
    const { x, y } = this.props;
    return (
      <div
        className="Cell"
        style={{
          left: `${CELL_SIZE * x + 1}px`,
          top: `${CELL_SIZE * y + 1}px`,
          width: `${CELL_SIZE - 1}px`,
          height: `${CELL_SIZE - 1}px`,
        }}></div>
    );
  }
}

export default Game;
