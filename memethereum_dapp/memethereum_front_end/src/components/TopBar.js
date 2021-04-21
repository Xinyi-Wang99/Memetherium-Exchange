import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Button } from "semantic-ui-react";


import { Menu, Header } from "semantic-ui-react";

function mapStateToProps(state) {
  return {
    userAddress: state.userAddress,
    userMemeCount: state.userMemeCount,
    totalMemeCount: state.totalMemeCount,
      MEME: state.MEME,
  };
}

// This renders the topbar on the webpage as well as the lines listing address and zombie count.

class TopBar extends Component {
  render() {
    return (
      <div>
        <Menu style={{ marginTop: "10px", backgroundColor: "Salmon" }}>
          <Menu.Item>
              <Link to={{ pathname: "/uploadMeme" }}>
                  <Button primary>Upload Memes</Button>
              </Link>
          </Menu.Item>

          <Menu.Item>
            <Link to={{ pathname: "/myZombieInventory" }}>
              <Button primary>Show My Zombies</Button>
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link to={{ pathname: "/ZombieInventory" }}>
              <Button primary>Show All Zombies</Button>
            </Link>
          </Menu.Item>

          <Menu.Item position="right">
            <Link to={{ pathname: "/" }}>
              <Header size="large">CryptoZombies at CSU!!! </Header>
            </Link>
          </Menu.Item>
        </Menu>
        <div className="center">
          <h2>The most awesome zombies in the whole wide universe!</h2>
        </div>
        Your account address: {this.props.userAddress}
        <br />
        You own {this.props.MEME} meme(s) out of a total of approximately {this.props.totalMemeCount}.
        <hr />
      </div>
    );
  }
}

export default connect(mapStateToProps)(TopBar);
