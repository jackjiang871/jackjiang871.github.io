import React from "react";
import { endpoint, initialBoard, initialPossibleMoves } from "../Constants";
import Square from "./Square";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: initialBoard,
      firstClick: null,
      isWhitesMove: true,
      possibleMoves: initialPossibleMoves,
      error: null,
    };
  }

  reportStatus(status) {
    if (this.props.onServerStatus) this.props.onServerStatus(status);
  }

  async setNextBoard(r1, c1, r2, c2, board, isWhitesMove) {
    let content;
    try {
      const rawResponse = await fetch(endpoint + "/update-board", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          r1: r1,
          c1: c1,
          r2: r2,
          c2: c2,
          board: board,
          turn: isWhitesMove ? 0 : 1,
        }),
      });
      if (!rawResponse.ok) throw new Error("HTTP " + rawResponse.status);
      content = await rawResponse.json();
    } catch (e) {
      this.reportStatus("offline");
      this.setState({ error: "Couldn't reach the rules service — move not applied." });
      return;
    }

    this.reportStatus("online");
    this.setState({ error: null });

    if (
      JSON.stringify(this.state.board) === JSON.stringify(content["next_board"])
    ) {
      // invalid move
      return;
    }
    // valid move
    var newPossibleMoves = {};
    for (const move of content["possible_moves"]) {
      if (!([move[2], move[3]].toString() in newPossibleMoves)) {
        newPossibleMoves[[move[2], move[3]]] = [];
      }
      newPossibleMoves[[move[2], move[3]]].push([[move[0], move[1]]]);
    }
    this.setState({
      isWhitesMove: !isWhitesMove,
      board: content["next_board"],
      possibleMoves: newPossibleMoves,
    });
  }

  handleClick(i, j) {
    // first click
    if (!this.state.firstClick) {
      this.setState({ firstClick: [i, j] });
    }
    // second click - submit move and reset first click
    else {
      if (this.isTargetOfSelection(i, j)) {
        this.setNextBoard(
          this.state.firstClick[0],
          this.state.firstClick[1],
          i,
          j,
          this.state.board,
          this.state.isWhitesMove
        );
        this.setState({ firstClick: null });
      } else {
        this.setState({ firstClick: [i, j] });
      }
    }
  }

  // is (i, j) reachable by the piece currently selected?
  isTargetOfSelection(i, j) {
    const moves = this.state.possibleMoves[[i, j]];
    if (this.state.firstClick === null || moves === undefined) return false;
    return (
      JSON.stringify(moves).indexOf(JSON.stringify(this.state.firstClick)) !== -1
    );
  }

  renderSquare(piece, i, j) {
    const selected =
      this.state.firstClick !== null &&
      this.state.firstClick[0] === i &&
      this.state.firstClick[1] === j;
    const target = this.isTargetOfSelection(i, j);
    const shade = (i + j) % 2 === 0 ? "light" : "dark";

    return (
      <Square
        key={j}
        value={piece}
        className={
          "square square--" +
          shade +
          (selected ? " is-selected" : "") +
          (target ? " is-target" : "")
        }
        label={FILES[j] + (8 - i)}
        onClick={() => this.handleClick(i, j)}
      />
    );
  }

  render() {
    return (
      <div className="board-wrap">
        <div className="board">
          {this.state.board.map((row, i) => (
            <div className="board-row" key={i}>
              <span className="board__rank">{8 - i}</span>
              {row.map((piece, j) => this.renderSquare(piece, i, j))}
            </div>
          ))}
          <div className="board-row board-row--files">
            <span className="board__rank" />
            {FILES.map((f) => (
              <span className="board__file" key={f}>
                {f}
              </span>
            ))}
          </div>
        </div>
        <p className="board__status">
          <span className={"dot dot--" + (this.state.isWhitesMove ? "white" : "black")} />
          {this.state.isWhitesMove ? "White" : "Black"} to move
        </p>
        {this.state.error && <p className="board__error">{this.state.error}</p>}
      </div>
    );
  }
}

export default Board;
