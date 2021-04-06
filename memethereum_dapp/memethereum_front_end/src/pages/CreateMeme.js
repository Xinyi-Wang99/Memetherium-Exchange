import React, { Component } from "react";
import AddCaption from "./AddCaption";
import { Button, Header, Icon, Modal, Form, Message } from "semantic-ui-react";



export default class CreateMeme extends Component {
    constructor(props) {
        super(props);
        this.openImage = this.openImage.bind(this);
        this.state = {
            currentImage: "",
            memeImages: [],
            topText: "",
            bottomText: "",
            createdMemes: [],
            modalOpen: false,
            loading: true
        }
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(output => {
                this.setState({
                    memeImages: output.data.memes
                });
            })
            .catch(err => console.log("Error: " + err));
    }

    handleClose = () => this.setState({ modalOpen: false });

    handleTextChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value, loading: false });
    };

    submitText = e => {
        console.log("HERE " + this.state.topText + " " + this.state.bottomText)
    };

    openImage = e =>{
        console.log(e.target);
        this.setState({
            currentImage: e.target,
            modalOpen: true
        });
    };

    render() {
        return (
            <div className="meme-generator">
                <Modal open={this.state.modalOpen} onClose={this.handleClose}>
                    <Header
                        icon="browser"
                        content="Add a Caption!"
                    />
                    <Modal.Content>
                        <AddCaption
                            currentImage = {this.state.currentImage}
                            topText = {this.state.topText}
                            bottomText = {this.state.bottomText}
                            handleTextChange = {this.handleTextChange}
                            submitText = {this.submitText}
                            loading = {this.state.loading}
                        />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="red" onClick={this.handleClose} inverted>
                            <Icon name="cancel" /> Close
                        </Button>
                    </Modal.Actions>
                </Modal>
                <div id="meme-library-container">
                    <br />
                    <h2 style={{ color: "DarkRed", textAlign: "center" }}>
                        <b>Create A Meme</b>
                    </h2>
                    <p style={{ textAlign: "center" }}>
                        Select a <b>meme template</b> from below to get started.
                        <br />
                    </p>
                    {this.state.memeImages.map(image => (
                        <a key={image.id}>
                            <img
                                id={image.id}
                                src={image.url}
                                alt={image.name}
                                onClick={this.openImage}
                                style={{
                                    width: 120,
                                    cursor: "pointer",
                                    height: 120,
                                    padding: 2
                                }}/>
                        </a>))}
                </div>
            </div>
        );
    }
}
