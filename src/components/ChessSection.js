import React from "react";
import Game from "./Game";

export default function ChessSection() {
  return (
    <section className="section" id="chess">
      <div className="section__head">
        <h2 className="section__title">Chess</h2>
        <span className="section__kicker">React front-end · Python back-end</span>
      </div>
      <p className="section__lede">
        A chess app I'm building: the board is React, the rules engine is a Python
        service that validates every move and hands back the legal moves for the next
        turn. Click a piece to see where it can go, then click a highlighted square to
        move it.
      </p>
      <Game />
    </section>
  );
}
