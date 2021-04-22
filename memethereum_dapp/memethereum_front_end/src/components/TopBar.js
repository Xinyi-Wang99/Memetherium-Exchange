import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Button } from "semantic-ui-react";

import { Menu, Header, Icon, Modal } from "semantic-ui-react";

import {imagething} from "../pages/MyZombieInventory.js";

const IPFS = require('ipfs-api')
const ipfs = new IPFS({host: 'ipfs.infura.io', port:5001, protocol:'https'})

function mapStateToProps(state) {
  return {
    userAddress: state.userAddress,
    userZombieCount: state.userZombieCount,
    totalZombieCount: state.totalZombieCount
  };
}

// This renders the topbar on the webpage as well as the lines listing address and zombie count.

class TopBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      modalOpen: false,
      topY: "10%",
      topX: "50%",
      bottomX: "50%",
      bottomY: "90%"
    }
    this.captureFile= this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleClose = () => this.setState({ modalOpen: false, bottomText: "", topText: "", loading: true});

  openImage = (e) =>{
    this.setState({
        modalOpen: true,
        isLoaded: true
    });
  };

  
  captureFile(event){
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)  //converting the file into an array
    reader.onloadend = () =>{
        this.setState({buffer: Buffer(reader.result )})
    }
  }

  getLocation() {
    return this.state.ipfsHash;
  }

  onSubmit(event){
    event.preventDefault()
    ipfs.files.add(this.state.buffer, (error, result) => {
        if(error){
            console.error(error)
            return
        }
        this.setState({ipfsHash : result[0].hash})
        // image_location = this.state.ipfsHash;
        imagething.image_location = this.state.ipfsHash;
    })
    console.log('this is from IPFS', this.props.userAddress)
    console.log("image variable:", this.state.ipfsHash)

  }


  render() {
    return (
      <div>

        <Modal open={this.state.modalOpen} onClose={this.handleClose}>
          <Header
            icon="browser"
            content="Upload Meme"
          />
          <Modal.Content>
            <div>
              <main className="container">
                <h2>Your Meme</h2>
                <p> This image is stored on IPFS & The Ethereum Blockchain!</p>
                <img src ={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt =""/>
                <h2>Upload Meme</h2>
                <form onSubmit = {this.onSubmit}>
                  <input type="file" onChange = {this.captureFile}/>
                  <input type="submit" />
                </form>
              </main>
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={this.handleClose} inverted>
              <Icon name="cancel" /> Close
            </Button>
          </Modal.Actions>
        </Modal>

        <Menu style={{ marginTop: "10px", backgroundColor: "Salmon" }}>
          <Menu.Item>
              <Link to={{ pathname: "/" }}>
                  <Button primary>Create Meme</Button>
              </Link>
          </Menu.Item>
          
          <Menu.Item>
              <Link to={{ pathname: "/uploadMeme" }}>
                  <Button primary>Upload Memes</Button>
              </Link>
          </Menu.Item>

          <Menu.Item>
              <Link to={{ pathname: "/myZombieInventory" }}>
                  <Button primary>My Memes</Button>
              </Link>
          </Menu.Item>

          <Menu.Item>
              <Link to={{ pathname: "/ZombieInventory" }}>
                  <Button primary>Explore</Button>
              </Link>
          </Menu.Item>

          <Menu.Item>
            <Button primary onClick={(event)=> this.openImage(event)}>Test Button</Button>
          </Menu.Item>

          <Menu.Item position="right">
            <Link to={{ pathname: "/" }}>
              <Header size="large"> The Great Memetherium Exchange </Header>
            </Link>
          </Menu.Item>
        </Menu>
        <div className="center">
          <h2>Create and Trade! The possibilities are endless!</h2>
        </div>
        Your account address: {this.props.userAddress}
        <br />
        You own {this.props.userZombieCount} meme(s) out of a total of approximately {this.props.totalZombieCount}.
        <hr />
      </div>
    );
  }
}

export default connect(mapStateToProps)(TopBar);
