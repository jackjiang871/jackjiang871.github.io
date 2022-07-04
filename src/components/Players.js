import React from "react";
import { endpoint } from "../Constants";
import { getCookie, setCookie } from "../utils/CookieHelper";

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      yourName: "",
      nameInput: "",
    };
  }

  getPlayers = async () => {
    console.log("getting players")
    const rawResponse = await fetch(endpoint + "/get-players", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const content = await rawResponse.json();
    console.log(content["players"]);
    this.setState({ ...this.state, players: content["players"].filter((player) => player !== this.state.yourName) });
    setTimeout(this.getPlayers, 5000);
  }

  async createUser(username) {
    await fetch(endpoint + "/create-user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
      }),
    });
  }

  setUsername = () => {
    console.log(this.state.nameInput);
    this.createUser(this.state.nameInput);
    setCookie("username", this.state.nameInput, 5);
    this.setState({ ...this.state, yourName: getCookie("username") });
  };

  // get the session if it exists, otherwise ask for a name and create a new one
  componentDidMount() {
    this.setState({ ...this.state, yourName: getCookie("username") });

    // get a list of other players on the server
    this.getPlayers();
  }

  nameInputChange = (event) => {
    console.log(event.target.value);
    this.setState({ ...this.state, nameInput: event.target.value });
  };

  render() {
    return (
      <div>
        <label>
          Your Name: 
          {this.state.yourName ? (
            <span>{this.state.yourName}</span>
          ) : (
            <span>
              <input type="text" name="name" onChange={this.nameInputChange} />
              <button onClick={this.setUsername}>submit</button>
            </span>
          )}
        </label>
        {this.state.players.map((player) => {
          return (
          <div> 
            <span>
              {player}
              <button>
              challenge
              </button>
            </span>
          </div>
            );
        })}
      </div>
    );
  }
}

export default Players;
