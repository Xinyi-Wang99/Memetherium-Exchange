import React, {Component} from "react";
import {Butotn, Header, Icon, Modal} from "semantic-ui-react";

export default class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <hr />
                    This page shows memes owned by other creators.
                <hr />
                <main className="container">
                    {/* This is where we need to fetch the memes from the blockchain */}
                </main>
            </div>
        )
    }
}