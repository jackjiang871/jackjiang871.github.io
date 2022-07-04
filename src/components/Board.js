import React from "react";
import { endpoint, initialBoard, initialPossibleMoves } from "../Constants";
import Square from "./Square";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: initialBoard,
      firstClick: null,
      isWhitesMove: true,
      possibleMoves: initialPossibleMoves,
    };
  }

  async setNextBoard(r1, c1, r2, c2, board, isWhitesMove) {
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
    const content = await rawResponse.json();

    console.log(this.state.board);
    console.log(content["next_board"]);
    console.log(content["possible_moves"]);

    if (
      JSON.stringify(this.state.board) === JSON.stringify(content["next_board"])
    ) {
      // invalid move
      return;
    }
    // valid move
    this.setState({ isWhitesMove: isWhitesMove ? false : true });
    this.setState({ board: content["next_board"] });
    var newPossibleMoves = {};
    for (const move of content["possible_moves"]) {
      if (!([move[2], move[3]].toString() in newPossibleMoves)) {
        newPossibleMoves[[move[2], move[3]]] = [];
      }
      newPossibleMoves[[move[2], move[3]]].push([[move[0], move[1]]]);
    }
    this.setState({ possibleMoves: newPossibleMoves });
    console.log("possible_moves:", content["possible_moves"]);
  }

  handleClick(i, j) {
    // first click
    if (!this.state.firstClick) {
      this.setState({ firstClick: [i, j] });
      // show possible moves for this first click
      this.render();
    }
    // second click - submit move and reset first click
    else {
      if (
        [i, j] in this.state.possibleMoves &&
        JSON.stringify(this.state.possibleMoves[[i, j]]).indexOf(
          JSON.stringify(this.state.firstClick)
        ) !== -1
      ) {
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

  renderSquare(piece, i, j) {
    var moves = this.state.possibleMoves[[i, j]];
    if (
      this.state.firstClick !== null &&
      moves !== undefined &&
      JSON.stringify(this.state.possibleMoves[[i, j]]).indexOf(
        JSON.stringify(this.state.firstClick)
      ) !== -1
    ) {
      return (
        <Square
          value={piece}
          style={{ background: "#fff2f2" }}
          onClick={() => this.handleClick(i, j)}
        />
      );
    }
    return (
      <Square
        value={piece}
        style={{ background: "#fff" }}
        onClick={() => this.handleClick(i, j)}
      />
    );
  }

  render() {
    return (
      <div>
        {this.state.board.map((row, i) => {
          return (
            <div className="board-row">
              {row.map((piece, j) => {
                return this.renderSquare(piece, i, j);
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Board