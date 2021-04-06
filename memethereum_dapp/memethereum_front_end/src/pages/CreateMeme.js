import React, { Component } from "react";
import AddCaption from "./AddCaption";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

export default class CreateMeme extends Component {
    constructor(props) {
        super(props);
        this.openImage = this.openImage.bind(this);
        this.state = {
            currentImage: "",
            currentImageBase64: null,
            index: -1,
            memeImages: [],
            topText: "",
            bottomText: "",
            createdMemes: [],
            modalOpen: false,
            loading: true,
            topY: "10%",
            topX: "50%",
            bottomX: "50%",
            bottomY: "90%"
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

    openImage = (e, i) =>{
        this.setState({
            currentImage: e.target,
            modalOpen: true,
            index: i
        });
    };

    convertSvgToImage = () => {
        const svg = this.svgRef;
        let svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        canvas.setAttribute("id", "canvas");
        const svgSize = svg.getBoundingClientRect();
        canvas.width = svgSize.width;
        canvas.height = svgSize.height;
        const img = document.createElement("img");
        img.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))));
        img.onload = function() {
            canvas.getContext("2d").drawImage(img, 0, 0);
            const canvasdata = canvas.toDataURL("image/png");
            const a = document.createElement("a");
            a.download = "meme.png";
            a.href = canvasdata;
            document.body.appendChild(a);
            a.click();
        };
    }



    render() {
        var newWidth = 600;
        const textStyle = {
            fontFamily: "Impact",
            fontSize: "50px",
            textTransform: "uppercase",
            fill: "#FFF",
            stroke: "#000",
            userSelect: "none"
        }
        return (
            <div className="meme-generator">
                <Modal open={this.state.modalOpen} onClose={this.handleClose}>
                    <Header
                        icon="browser"
                        content="Add a Caption!"
                    />
                    <Modal.Content>
                        {(this.state.memeImages[this.state.index] && this.state.currentImage) ?
                            <svg
                                width={newWidth}
                                id="svg_ref"
                                height={newWidth / (this.state.memeImages[this.state.index].width/this.state.memeImages[this.state.index].height)}
                                ref={el => { this.svgRef = el }}
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink">
                                <image
                                    ref={el => { this.imageRef = el }}
                                    // xlinkHref= {this.getBase64Image(this.state.memeImages[this.state.index].url)}
                                    xlinkHref={this.state.memeImages[this.state.index].url}
                                    height={newWidth / (this.state.memeImages[this.state.index].width/this.state.memeImages[this.state.index].height)}
                                    width={newWidth}
                                />
                                <text
                                    style={textStyle}
                                    x={this.state.topX}
                                    y={this.state.topY}
                                    dominantBaseline="middle"
                                    textAnchor="middle">
                                    {this.state.topText}
                                </text>
                                <text
                                    style={textStyle}
                                    dominantBaseline="middle"
                                    textAnchor="middle"
                                    x={this.state.bottomX}
                                    y={this.state.bottomY}>
                                    {this.state.bottomText}
                                </text>
                            </svg> : ""}

                        <AddCaption
                            currentImage = {this.state.currentImage}
                            topText = {this.state.topText}
                            bottomText = {this.state.bottomText}
                            handleTextChange = {this.handleTextChange}
                            submitText = {this.submitText}
                            loading = {this.state.loading}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="red" onClick={this.handleClose} inverted>
                            <Icon name="cancel" /> Close
                        </Button>
                        <Button color="green" onClick={this.convertSvgToImage} inverted>
                            Download Meme
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
                    {this.state.memeImages.map((image, index) => (
                        <a key={image.id}>
                            <img
                                id={image.id}
                                src={image.url}
                                alt={image.name}
                                onClick={(event) => this.openImage(event,index)}
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
