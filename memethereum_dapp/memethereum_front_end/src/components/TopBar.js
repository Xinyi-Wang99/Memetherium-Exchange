import React, { Component } from "react";
import { Link } from "react-router-redux";

import { Button } from "semantic-ui-react";
import { Menu, Header, Icon, Modal } from "semantic-ui-react";
import {imagething} from "../pages/MyZombieInventory.js";

import UploadMeme from "./UploadMeme";
import TransferMeme from "./TransferMeme";
import CreateMeme from "../pages/CreateMeme";
import MyMemes from "../pages/MyMemes";
import Explore from "../pages/Explore";
// import MyZombieInventory from "../pages/MyZombieInventory";

const IPFS = require('ipfs-api')
const ipfs = new IPFS({host: 'ipfs.infura.io', port:5001, protocol:'https'})


export default class TopBar extends Component {

    constructor(props) {
        super(props);
        this.state = {

            isLoadedMyMemes: false,
            modalOpenMyMemes: false,

            isLoadedExplore: false,
            modalOpenExplore: false,

            isLoadedUpload: false,
            modalOpenUpload: false,

            isLoadedTransfer: false,
            modalOpenTransfer: false,

            topY: "10%",
            topX: "50%",
            bottomX: "50%",
            bottomY: "90%",

            userMemeCount: null
        }
        this.captureFile= this.captureFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //this.getUserCount().then();

    }

    handleClose = () => this.setState({
        modalOpenMyMemes: false,
        modalOpenExplore: false,
        modalOpenUpload: false,
        modalOpenTransfer: false,

         bottomText: "",
         topText: "",
         loading: true
    });

    openImageMyMemes = (e) => {
        this.setState({
            modalOpenMyMemes: true,
            isLoadedMyMemes: true
        });
    }

    openImageExplore = (e) => {
        this.setState({
            modalOpenExplore: true,
            isLoadedExplore: true
        });
    }

    openImageUpload = (e) =>{
        this.setState({
            modalOpenUpload: true,
            isLoadedUpload: true
        });
    };

    openImageTransfer = (e) =>{
        this.setState({
            isLoadedTransfer: true,
            modalOpenTransfer: true
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

    async getUserCount() {
        const _userMemeCount = await this.props.state.MEME.balanceOf(this.props.state.userAddress)
        this.setState({userMemeCount: _userMemeCount});
    }
    render() {

        return (
            <div>
                <Modal open={this.state.modalOpenMyMemes} onClose={this.handleClose}>
                    <Header
                        icon="browser"
                        content="My Memes"
                    />
                    <Modal.Content>
                        <MyMemes state = {this.props.state}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="red" onClick={this.handleClose} inverted>
                            <Icon name="cancel" /> Close
                        </Button>
                    </Modal.Actions>
                </Modal>

                <Modal open={this.state.modalOpenExplore} onClose={this.handleClose}>
                    <Header
                        icon="browser"
                        content="Explore"
                    />
                    <Modal.Content>
                        <Explore state = {this.props.state}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="red" onClick={this.handleClose} inverted>
                            <Icon name="cancel" /> Close
                        </Button>
                    </Modal.Actions>
                </Modal>

                <Modal open={this.state.modalOpenUpload} onClose={this.handleClose}>
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

                <Modal open={this.state.modalOpenTransfer} onClose={this.handleClose}>
                    <Header
                        icon="browser"
                        content="Transfer Meme"
                    />
                    <Modal.Content>
                        <TransferMeme state = {this.props.state}/>
                    </Modal.Content>

                    <Modal.Actions>
                        <Button color="red" onClick={this.handleClose} inverted>
                            <Icon name="cancel" /> Close
                        </Button>
                    </Modal.Actions>
                </Modal>

                <Menu style={{ marginTop: "10px", backgroundColor: "Salmon" }}>
                    <Menu.Item>
                            <Button primary onClick={(event) => this.openImageMyMemes(event)}>My Memes</Button>
                    </Menu.Item>

                    <Menu.Item>
                            <Button primary onClick={(event) => this.openImageExplore(event)}>Explore</Button>
                    </Menu.Item>

                    <Menu.Item>
                        <Button primary onClick={(event)=> this.openImageUpload(event)}>Upload Meme</Button>
                    </Menu.Item>

                    <Menu.Item>
                        <Button primary onClick={(event)=> this.openImageTransfer(event)}>Transfer Meme</Button>
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
                You own {this.props.userZombieCount} meme(s) out of a total of approximately {this.props.totalZombieCount}.
                <hr />
            </div>
        );
    }

}