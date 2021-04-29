import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Menu, Header, Icon, Modal } from "semantic-ui-react";

import UploadMeme from "./UploadMeme";
import MyMemes from "./MyMemes";
import Explore from "../pages/Explore";

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

            topY: "10%",
            topX: "50%",
            bottomX: "50%",
            bottomY: "90%"
        }

    }

    handleClose = () => this.setState({
        modalOpenMyMemes: false,
        modalOpenExplore: false,
        modalOpenUpload: false,

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


    render() {
        return (
            <div>
                <Modal open={this.state.modalOpenMyMemes} onClose={this.handleClose}>
                    <Header icon="browser" content="My Memes"/>
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
                    <Header icon="browser" content="Explore"/>
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
                    <Header icon="browser" content="Upload Meme"/>
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
                            <Button primary onClick={(event) => this.openImageMyMemes(event)}>My Memes</Button>
                    </Menu.Item>

                    <Menu.Item>
                            <Button primary onClick={(event) => this.openImageExplore(event)}>Explore</Button>
                    </Menu.Item>

                    <Menu.Item>
                        <Button primary onClick={(event)=> this.openImageUpload(event)}>Upload Meme</Button>
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