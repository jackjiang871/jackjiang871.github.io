import React from "react";
import { endpoint } from "../Constants";
import { getCookie, setCookie } from "../utils/CookieHelper";

const POLL_ONLINE_MS = 5000;
const POLL_OFFLINE_MS = 20000;

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      yourName: "",
      nameInput: "",
      online: null,
    };
    this.pollTimer = null;
    this.mounted = false;
  }

  reportStatus(status) {
    if (this.props.onServerStatus) this.props.onServerStatus(status);
  }

  getPlayers = async () => {
    let content;
    try {
      const rawResponse = await fetch(endpoint + "/get-players", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!rawResponse.ok) throw new Error("HTTP " + rawResponse.status);
      content = await rawResponse.json();
    } catch (e) {
      if (!this.mounted) return;
      this.reportStatus("offline");
      this.setState({ online: false, players: [] });
      this.pollTimer = setTimeout(this.getPlayers, POLL_OFFLINE_MS);
      return;
    }

    if (!this.mounted) return;
    this.reportStatus("online");
    this.setState({
      online: true,
      players: (content["players"] || []).filter(
        (player) => player !== this.state.yourName
      ),
    });
    this.pollTimer = setTimeout(this.getPlayers, POLL_ONLINE_MS);
  };

  async createUser(username) {
    try {
      await fetch(endpoint + "/create-user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username }),
      });
    } catch (e) {
      this.reportStatus("offline");
    }
  }

  setUsername = () => {
    const name = this.state.nameInput.trim();
    if (!name) return;
    this.createUser(name);
    setCookie("username", name, 5);
    this.setState({ yourName: getCookie("username"), nameInput: "" });
  };

  onNameKeyDown = (event) => {
    if (event.key === "Enter") this.setUsername();
  };

  // get the session if it exists, otherwise ask for a name and create a new one
  componentDidMount() {
    this.mounted = true;
    this.setState({ yourName: getCookie("username") });
    // get a list of other players on the server
    this.getPlayers();
  }

  componentWillUnmount() {
    this.mounted = false;
    if (this.pollTimer) clearTimeout(this.pollTimer);
  }

  nameInputChange = (event) => {
    this.setState({ nameInput: event.target.value });
  };

  render() {
    const { yourName, players, online } = this.state;
    return (
      <div className="players">
        <h3 className="players__title">Lobby</h3>

        <div className="players__you">
          <span className="players__label">You</span>
          {yourName ? (
            <span className="players__name">{yourName}</span>
          ) : (
            <div className="players__form">
              <input
                className="input"
                type="text"
                name="name"
                placeholder="pick a name"
                value={this.state.nameInput}
                onChange={this.nameInputChange}
                onKeyDown={this.onNameKeyDown}
              />
              <button className="btn btn--small" onClick={this.setUsername}>
                Join
              </button>
            </div>
          )}
        </div>

        <div className="players__list">
          {players.length === 0 ? (
            <p className="players__empty">
              {online === false
                ? "Lobby unavailable — back-end offline."
                : "No one else is here right now."}
            </p>
          ) : (
            players.map((player) => (
              <div className="players__row" key={player}>
                <span className="players__name">{player}</span>
                <button className="btn btn--small" type="button">
                  Challenge
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default Players;
