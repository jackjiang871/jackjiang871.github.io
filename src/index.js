import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// 'https://python-chess-app.herokuapp.com'
// 'http://127.0.0.1:5000'
const endpoint = 'http://127.0.0.1:5000'

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, minutes) {
  const d = new Date();
  d.setTime(d.getTime() + (minutes*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const equals = (a, b) =>
  a.length === b.length &&
  a.every((v, i) => v === b[i]);

class Square extends React.Component {

  render() {
    const pieceMap = {
      '♙e': '♙',
      '♟e': '♟',
      '♚m': '♚',
      '♔m': '♔',
      '♖m': '♖',
      '♜m': '♜'
    }
    var pieceToRender = pieceMap[this.props.value] || this.props.value

    return (
      <button 
        className="square" 
        onClick={() => this.props.onClick() }
        style={this.props.style}
      >
        { pieceToRender }
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
      isWhitesMove: true,
      possibleMoves: {
        "5,0": [[6,0], [7,1]],
        "4,0": [[6,0]],
        "5,1": [[6,1]],
        "4,1": [[6,1]],
        "5,2": [[6,2], [7,1]],
        "4,2": [[6,2]],
        "5,3": [[6,3]],
        "4,3": [[6,3]],
        "5,4": [[6,4]],
        "4,4": [[6,4]],
        "5,5": [[6,5], [7,6]],
        "4,5": [[6,5]],
        "5,6": [[6,6]],
        "4,6": [[6,6]],
        "5,7": [[6,7], [7,6]],
        "4,7": [[6,7]],
      }
    }
  }

  async setNextBoard(r1, c1, r2, c2, board, isWhitesMove) {
    const rawResponse = await fetch(endpoint + '/update-board', {
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
    console.log(content["possible_moves"])
    
    if (JSON.stringify(this.state.board) === JSON.stringify(content["next_board"])) {
      // invalid move
      return
    }
    // valid move
    this.setState({isWhitesMove: isWhitesMove ? false : true})
    this.setState({board: content["next_board"]})
    var newPossibleMoves = {}
    for (const move of content["possible_moves"]) {
      if (!([move[2], move[3]].toString() in newPossibleMoves)) {
        newPossibleMoves[[move[2], move[3]]] = []
      }
      newPossibleMoves[[move[2], move[3]]].push([[move[0], move[1]]])
    }
    this.setState({possibleMoves: newPossibleMoves})
    console.log("possible_moves:", content["possible_moves"])
  }

  handleClick(i, j) {
    // first click
    if (!this.state.firstClick) {
      this.setState({firstClick: [i,j]});
      // show possible moves for this first click
      this.render()
    } 
    // second click - submit move and reset first click
    else {
      if ([i,j] in this.state.possibleMoves && JSON.stringify(this.state.possibleMoves[[i,j]]).indexOf(JSON.stringify(this.state.firstClick)) !== -1) {
        this.setNextBoard(this.state.firstClick[0], this.state.firstClick[1], i, j, this.state.board, this.state.isWhitesMove);
        this.setState({firstClick: null});
      } else {
        this.setState({firstClick: [i,j]});
      }
    }
  }

  renderSquare(piece, i, j) {
    var moves = this.state.possibleMoves[[i,j]]
    if (this.state.firstClick !== null && moves !== undefined && JSON.stringify(this.state.possibleMoves[[i,j]]).indexOf(JSON.stringify(this.state.firstClick)) !== -1) {
      return (
        <Square 
          value={piece}
          style={{background: '#fff2f2'}}
          onClick={() => this.handleClick(i, j)}
        />
      );
    }
    return (
      <Square 
        value={piece}
        style={{background: '#fff'}}
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

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players : []
    }
  }

  async getPlayers() {
    const rawResponse = await fetch(endpoint + '/get-players', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    const content = await rawResponse.json();
    console.log(content["players"])
    this.setState({players: content["players"]})
    return content["players"]
  }

  async createUser(username) {
    await fetch(endpoint + '/create-user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          "name" : username
        }
      )
    });
  }

  // get the session if it exists, otherwise ask for a name and create a new one
  componentDidMount() {
    var username = getCookie("username")
    while (username == "") {
      username = prompt("whats your name?", "")
      if (username !== "") {
        this.createUser(username)
        setCookie("username", username, 5)
      }
    }

    // get a list of other players on the server
    this.getPlayers()
  }

  render() {
    return (
      <div> {
        this.state.players.map((player) => {
          return <div> {player}</div>
        })
      } </div>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board 
          />
        </div>
        <div className="players">
          <Players/>
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
  