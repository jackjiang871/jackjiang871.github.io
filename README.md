# jackjiang871.github.io

My personal site — bio, resume, and a chess app — deployed to GitHub Pages at
[jackjiang871.github.io](https://jackjiang871.github.io/).

## Layout

```
public/
  face.jpg          profile photo (also used as the favicon / og:image)
src/
  App.js            page shell: nav, hero, resume, chess, footer
  data/resume.js    all resume content — edit here, not in the components
  components/
    Nav.js          sticky nav with scroll-spy
    Hero.js         photo, bio, and outbound links
    Resume.js       renders data/resume.js
    ChessSection.js chess intro + <Game />
    Game.js         board + lobby, tracks whether the back-end is reachable
    Board.js        board state, talks to the rules service
    Square.js       one square
    Players.js      lobby: name cookie + player list polling
```

## Running locally

```sh
npm install
npm start          # http://localhost:3000
```

## Deploying

```sh
npm run deploy     # builds and pushes ./build to the gh-pages branch
```

## Editing content

- **Bio, links, photo** — `src/data/resume.js`, the `profile` object.
- **Resume** — the `education`, `experience`, `research`, and `skills` exports in
  the same file.
- **Colors and spacing** — the custom properties at the top of `src/index.css`.

## The chess back-end

The board is only the front half of the app: a Python service validates each move
and returns the legal moves for the next turn. By default the app calls
`http://127.0.0.1:5000`, so the lobby and move validation only work with that
service running locally — the page shows a notice and stays usable otherwise.

To point at a deployed service instead, set `REACT_APP_CHESS_API` before building:

```sh
REACT_APP_CHESS_API=https://your-chess-api.example.com npm run build
```
