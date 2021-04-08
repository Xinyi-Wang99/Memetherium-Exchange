import React, { Component } from "react";
import getZombieCount from "../utils/getZombieCount";
import { connect } from "react-redux";

import { Button, Header, Icon, Modal, Form, Message } from "semantic-ui-react";
const IPFS = require('ipfs-api')
const ipfs = new IPFS({host: 'ipfs.infura.io', port:5001, protocol:'https'})
function mapStateToProps(state) {
    return {
        CZ: state.CZ,
        userAddress: state.userAddress,
        userZombieCount: state.userZombieCount
    };
}


// Create a new Zombie

class CreateZombie extends Component {
  // state = {
  //   modalOpen: false,
  //   value: "",
  //   message: "",
  //   errorMessage: "",
  //   loading: false
  // };

  constructor(props) {
    super(props);
    this.state = {
      buffer: [],
      ipfsHash: null,
      modalOpen: false,
      value: "",
      message: "",
      loading: false,
    }
    this.captureFile= this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  captureFile(event){
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)  //converting the file into an array
    reader.onloadend = () =>{
      this.setState({buffer: Buffer(reader.result )})
    }
  }

  onSubmit(event){
    event.preventDefault()
    ipfs.files.add(this.state.buffer, (error, result) => {
      if(error){
        console.error(error)
        return
      }
      this.setState({ipfsHash : result[0].hash})
    })
    console.log('this is from IPFS', this.props.userAddress)

  }

  // onSubmit = async event => {
  //   event.preventDefault();
  //   this.setState({
  //     loading: true,
  //     errorMessage: "",
  //     message: "waiting for blockchain transaction to complete..."
  //   });
  //   try {
  //     await this.props.CZ.createRandomZombie(this.state.value) // contains the zombie name
  //     this.setState({
  //       loading: false,
  //       message: "You have created a New Zombie"
  //     });
  //     getZombieCount(this.props.CZ, this.props.userAddress);
  //   } catch (err) {
  //     this.setState({
  //       loading: false,
  //       errorMessage: err.message,
  //       message: "User rejected transaction or else this account is already in use, please try another name."
  //     });
  //   }
  // };


  render() {
     let createDisabled = (this.props.userZombieCount !== 0);
      return (
      <Modal
        trigger={
          <Button primary disabled={createDisabled} onClick={this.handleOpen}>
            Upload a new Meme
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Header icon="browser" content="Upload a New Meme" />
        <main className="container">
          <img src="`https://ipfs.io/ipfs/${this.state.ipfsHash}`" alt="Meme Image" /><Header>Your Meme</Header>
          <Form onSubmit={this.onSubmit} error={!this.state.errorMessage}>

            <Message error header="Oops!" content={this.state.errorMessage} />
            <input type="file" onChange = {this.captureFile}/>
            <input type="submit" />
            <hr />
            <h2>{this.state.message}</h2>
          </Form>
        </main>
        <Modal.Actions>
          <Button color="red" onClick={this.handleClose} inverted>
            <Icon name="cancel" /> Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect(mapStateToProps)(CreateZombie);