import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Menu, Header } from "semantic-ui-react";
import UploadMeme from "./UploadMeme";

// This renders the topbar on the webpage as well as the lines listing address and zombie count.

export default  class TopBar extends Component {

    constructor(props) {
        super(props)
        this.handleCreateMeme = this.handleCreateMeme.bind(this)
    }
    handleCreateMeme(){
        console.log("createMeme")
        return(
            <div>
                <UploadMeme/>
            </div>
        )

    }

    render() {
    return (
      <div>
        <Menu style={{ marginTop: "10px", backgroundColor: "Salmon" }}>
          <Menu.Item>
                  // <Button primary onClick = {this.handleCreateMeme}>
                  //     Create Meme
                  // </Button>
              <UploadMeme state = {this.props.state}/>
          </Menu.Item>
          
          <Menu.Item>
                  <Button primary>Upload Memes</Button>
          </Menu.Item>

          <Menu.Item>
                  <Button primary>My Memes</Button>
          </Menu.Item>

          <Menu.Item>
                  <Button primary>Explore</Button>
          </Menu.Item>

          <Menu.Item position="right">
              <Header size="large"> The Great Memetherium Exchange </Header>
          </Menu.Item>
        </Menu>
        <div className="center">
          <h2>Create and Trade! The possibilities are endless!</h2>
        </div>
        Your account address: {this.props.state.userAddress}
        <br />
        You own {this.props.state.userSupply} meme(s) out of a total of approximately {this.props.state.totalSupply}.
        <hr />
      </div>
    );
  }
}

