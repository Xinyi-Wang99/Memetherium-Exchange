import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Menu, Header, Icon, Modal } from "semantic-ui-react";
import {imagething} from "../pages/MyZombieInventory.js";
import UploadMeme from "./UploadMeme";
const IPFS = require('ipfs-api')
const ipfs = new IPFS({host: 'ipfs.infura.io', port:5001, protocol:'https'})

export default class TopBar extends Component {

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
                        <UploadMeme state = {this.props.state}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="red" onClick={this.handleClose} inverted>
                            <Icon name="cancel" /> Close
                        </Button>
                    </Modal.Actions>
                </Modal>

                <Menu style={{ marginTop: "10px", backgroundColor: "Salmon" }}>
                    <Menu.Item>
                            <Button primary>Create Meme</Button>
                    </Menu.Item>
                    <Menu.Item>
                            <Button primary>My Memes</Button>
                    </Menu.Item>
                    <Menu.Item>
                            <Button primary>Explore</Button>
                    </Menu.Item>
                    <Menu.Item>
                        <Button primary onClick={(event)=> this.openImage(event)}>Upload Meme</Button>
                    </Menu.Item>
                    <Menu.Item position="right">
                            <Header size="large"> The Great Memetherium Exchange </Header>
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

