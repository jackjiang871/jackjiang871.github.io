import React from "react";
import Board from "./Board"
import Players from "./Players"

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="players">
          <Players />
        </div>
      </div>
    );
  }
}

export default Game