import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const equals = (a, b) =>
  a.length === b.length &&
  a.every((v, i) => v === b[i]);

class Square extends React.Component {

  render() {
    return (
      <button 
        className="square" 
        onClick={() => this.props.onClick() }
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
        ['♟', '♟', '♟', '♟', '♟' ,'♟' ,'♟' ,'♟'],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
        ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
      ],
      firstClick: null,
      isWhitesMove: true
    }
  }

  async setNextBoard(r1, c1, r2, c2, board, isWhitesMove) {
    const rawResponse = await fetch('https://python-chess-app.herokuapp.com/update-board', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            "r1" : r1,
            "c1" : c1,
            "r2" : r2,
            "c2" : c2,
            "board" : board,
            "turn": isWhitesMove? 0 : 1
          }
        )
      });
    const content = await rawResponse.json();

    console.log(this.state.board)
    console.log(content["next_board"])
    
    if (JSON.stringify(this.state.board) === JSON.stringify(content["next_board"])) {
      // invalid move
      return
    }
    // valid move
    this.setState({isWhitesMove: isWhitesMove ? false : true})
    this.setState({board: content["next_board"]})
    }

  handleClick(i, j) {
    // first click
    if (!this.state.firstClick) {
      this.setState({firstClick: [i,j]});
    } 
    // second click - submit move and reset first click
    else {
      this.setNextBoard(this.state.firstClick[0], this.state.firstClick[1], i, j, this.state.board, this.state.isWhitesMove);
      this.setState({firstClick: null});
    }
  }

  renderSquare(piece, i, j) {
    return (
      <Square 
        value={piece}
        onClick={() => this.handleClick(i, j)}
      />
    );
  }

  render() {
    return (
      <div>
        {
          this.state.board.map((row, i) => {
            return <div className='board-row'>
              {
                row.map((piece, j) => {
                  return this.renderSquare(piece, i, j)
                })
              }
            </div>
          })
        }
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleClick(i) {
    this.setState({})
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board 
          />
        </div>
        <div className="game-info">
          <div>{ /* */ }</div>
          <ol>{ /* */ }</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
  