import React from "react";

export class Square extends React.Component {
  render() {
    const pieceMap = {
      "♙e": "♙",
      "♟e": "♟",
      "♚m": "♚",
      "♔m": "♔",
      "♖m": "♖",
      "♜m": "♜",
    };
    var pieceToRender = pieceMap[this.props.value] || this.props.value;

    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}
        style={this.props.style}
      >
        {pieceToRender}
      </button>
    );
  }
}

export default Square;
