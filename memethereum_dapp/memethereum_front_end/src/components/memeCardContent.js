import React, { Component } from "react";
import { Card } from "semantic-ui-react";
const IPFS = require('ipfs-api')
const ipfs = new IPFS({host: 'ipfs.infura.io', port:5001, protocol:'https'})

export default class ZombieCardContent extends Component {
    truncate = (text, startChars, endChars) => {
        if (text.length > 12) {
            var start = text.substring(0, startChars);
            var end = text.substring(text.length - endChars, text.length);
            return start + "..." + end;
        }
        return text;
    };

    render() {
        return (
            <Card.Content>
                <img
                    src = {`https://ipfs.io/ipfs/${this.props.meme.memeHash}`}
                    alt = "Meme"
                    width = "270"
                    height= "180"/>
                <Card.Header>
                    Meme ID: <b>{this.props.meme.memeId}</b> <br /> Name :{" "}
                    <b>{this.props.meme.memeName}</b>
                </Card.Header>
                <Card.Description>
                    Caption:{this.props.meme.memeCaption}<br />
                    Ready Time: {this.props.meme.memeReadyTime} <br />
                    Owner: {this.truncate(this.props.meme.memeOwner,12,12)}
                </Card.Description>
            </Card.Content>
        );
    }
}
