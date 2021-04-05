import React, { Component } from "react";

class CreateMeme extends Component {
        constructor() {
            super();
            this.state = {
                currentImage: "",
                memeImages: [],
                userText: "",
                createdMemes: []
            };
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

        openImage = (e) => {
            this.setState({currentImage: e.target});
        }

        render() {
            return (
            <div className="meme-generator">
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
                        <a key={image.id} href="Add-Caption">
                            <img
                                id={image.id}
                                src={image.url}
                                alt={image.name}
                                style={{
                                    width: 120,
                                    cursor: "pointer",
                                    height: 120
                                }}/>
                        </a>))}
                </div>
            </div>
            );
        }
}

export default CreateMeme;
