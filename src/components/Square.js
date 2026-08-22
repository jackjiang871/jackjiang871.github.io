import React from "react";

// the back-end tags pieces that still have castling / en-passant rights
// with a trailing character; strip it before rendering
const pieceMap = {
  "♙e": "♙",
  "♟e": "♟",
  "♚m": "♚",
  "♔m": "♔",
  "♖m": "♖",
  "♜m": "♜",
};

export class Square extends React.Component {
  render() {
    const pieceToRender = pieceMap[this.props.value] || this.props.value;
    const isEmpty = !pieceToRender || pieceToRender.trim() === "";

    return (
      <button
        className={this.props.className || "square"}
        onClick={() => this.props.onClick()}
        aria-label={this.props.label}
        type="button"
      >
        <span className="square__piece">{isEmpty ? "" : pieceToRender}</span>
      </button>
    );
  }
}

export default Square;
