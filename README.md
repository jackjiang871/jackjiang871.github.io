# jackjiang871.github.io

My personal site — bio and resume — deployed to GitHub Pages at
[jackjiang871.github.io](https://jackjiang871.github.io/).

## Layout

```
public/
  face.jpg          profile photo (also used as the favicon / og:image)
src/
  App.js            page shell: nav, hero, resume, footer
  data/resume.js    all resume content — edit here, not in the components
  components/
    Nav.js          sticky nav with scroll-spy
    Hero.js         photo, bio, and outbound links
    Resume.js       renders data/resume.js
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

