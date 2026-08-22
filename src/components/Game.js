import React from "react";
import Board from "./Board";
import Players from "./Players";
import { endpoint } from "../Constants";

class Game extends React.Component {
  constructor(props) {
    super(props);
    // 'checking' until the first request to the rules service comes back
    this.state = { serverStatus: "checking" };
  }

  setServerStatus = (serverStatus) => {
    this.setState({ serverStatus });
  };

  render() {
    const { serverStatus } = this.state;
    return (
      <div className="chess">
        {serverStatus === "offline" && (
          <p className="notice">
            The chess back-end isn't reachable right now, so moves won't be validated.
            It runs at <code>{endpoint}</code> — start the Python service locally and
            reload to play.
          </p>
        )}
        <div className="chess__layout">
          <div className="chess__board">
            <Board onServerStatus={this.setServerStatus} />
          </div>
          <aside className="chess__panel">
            <Players onServerStatus={this.setServerStatus} />
          </aside>
        </div>
      </div>
    );
  }
}

export default Game;
