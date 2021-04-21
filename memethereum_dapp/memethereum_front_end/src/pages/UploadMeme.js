import React, { Component } from "react";
import getMemeCount from "../utils/getMemeCount";
import { connect } from "react-redux";

import { Button, Header, Icon, Modal, Form, Message } from "semantic-ui-react";
const IPFS = require('ipfs-api')
const ipfs = new IPFS({host: 'ipfs.infura.io', port:5001, protocol:'https'})


function mapStateToProps(state) {
    return {
        MEME: state.MEME,
        userAddress: state.userAddress,
        userMemeCount: state.userMemeCount
  };
}


// Create a new Zombie

class UploadMeme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      caption:"",
      buffer: [],
      ipfsHash: null,
      modalOpen: false,
      value: "",
      message: "",
      loading: false,
      errorMessage: "",
    }
    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleOpen = () => this.setState({modalOpen: true});
  handleClose = () => this.setState({modalOpen: false});

  captureFile(event) {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)  //converting the file into an array
    reader.onloadend = () => {
      this.setState({buffer: Buffer(reader.result)})
    }
  }

  onSubmit = async event => {
    event.preventDefault()
    ipfs.files.add(this.state.buffer, (error, result) => {
      if(error){
        console.error(error)
        return
      }
      this.setState({ipfsHash : result[0].hash})
    });
    try{
      await this.props.MEME._createMeme(this.state.name,this.state.caption,this.state.ipfsHash)
      getMemeCount(this.props.MEME, this.props.userAddress);
    }catch(err){}
    console.log('this is from IPFS', this.props.ipfsHash)

  }

  // onSubmit = async event => {
  //   event.preventDefault();
  //   this.setState({
  //     name:"meme-test",
  //     caption:"458 term project",
  //     loading: true,
  //     errorMessage: "",
  //     message: "waiting for blockchain transcation to complete..."
  //   });
  //   try {
  //     await this.props.MEME._createMeme(this.state.name,this.state.caption,this.state.ipfsHash)
  //     this.setState({
  //       loading: false,
  //       message: "You have uploaded a Meme"
  //     });
  //     getMemeCount(this.props.MEME, this.props.userAddress);
  //   } catch (err) {
  //     this.setState({
  //       loading: false,
  //       errorMessage: err.message,
  //       message: "User rejected transaction or else this account is already in use, please try another name."
  //     });
  //   }
  // };



  render() {
    let createDisabled = (this.props.userMemeCount !== 0);
    return (
        // <Modal
        //     trigger={
        //       <Button primary disabled={createDisabled} onClick={this.handleOpen}>
        //         Upload a new Meme
        //       </Button>
        //     }
        //     open={this.state.modalOpen}
        //     onClose={this.handleClose}
        // >
        //   <Header icon="browser" content="Upload a New Meme"/>
        //   <main className="container">
        //     <img src="`https://ipfs.io/ipfs/${this.state.ipfsHash}`" alt="Meme Image"/>
        //     <Header>Your Meme</Header>
        //     <Form onSubmit={this.onSubmit} error={!this.state.errorMessage}>
        //       <Message error header="Oops!" content={this.state.errorMessage}/>
        //       <input type="file" onChange={this.captureFile}/>
        //       <input type="submit"/>
        //       <hr/>
        //       <h2>{this.state.message}</h2>
        //     </Form>
        //   </main>
        //   <Modal.Actions>
        //     <Button color="red" onClick={this.handleClose} inverted>
        //       <Icon name="cancel"/>
        //       Close
        //     </Button>
        //   </Modal.Actions>
        // </Modal>
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
    );
  }
}

export default connect(mapStateToProps)(UploadMeme);