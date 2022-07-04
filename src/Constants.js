// 'https://python-chess-app.herokuapp.com'
// 'http://127.0.0.1:5000'
export const endpoint = "https://python-chess-app.herokuapp.com";
export const initialBoard = [
  ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
  ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
  ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
];

export const initialPossibleMoves = {
  "5,0": [
    [6, 0],
    [7, 1],
  ],
  "4,0": [[6, 0]],
  "5,1": [[6, 1]],
  "4,1": [[6, 1]],
  "5,2": [
    [6, 2],
    [7, 1],
  ],
  "4,2": [[6, 2]],
  "5,3": [[6, 3]],
  "4,3": [[6, 3]],
  "5,4": [[6, 4]],
  "4,4": [[6, 4]],
  "5,5": [
    [6, 5],
    [7, 6],
  ],
  "4,5": [[6, 5]],
  "5,6": [[6, 6]],
  "4,6": [[6, 6]],
  "5,7": [
    [6, 7],
    [7, 6],
  ],
  "4,7": [[6, 7]],
};
