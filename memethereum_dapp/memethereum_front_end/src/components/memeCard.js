import React, { Component } from "react";
import {Icon, Card, Header, Modal, Button, Menu} from "semantic-ui-react";
import ReactTooltip from "react-tooltip";
import ActionButton from "./ActionButton";
import MemeCardContent from "./memeCardContent";

export default class ZombieCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false
        };
        this.transferMemes = this.transferMemes.bind(this)
        this.buyMemes = this.buyMemes.bind(this)
        this.sellMemes = this.sellMemes.bind(this)
        this.modalOpen = this.modalOpen.bind(this)
    }

     transferMemes(event){
        event.preventDefault()
     }

     buyMemes(event){
        event.preventDefault()

     }

     sellMemes(event){
        event.preventDefault()

     }


    modalOpen(){
        this.setState({ modalOpen: true });
    }

    handleClose = () => this.setState({ modalOpen: false });

    truncate = (text, startChars, endChars) => {
        if (text.length > 12) {
            var start = text.substring(0, startChars);
            var end = text.substring(text.length - endChars, text.length);
            return start + "..." + end;
        }
        return text;
    };

    render() {
        // create the JSX depending on whether you own the zombie or not
        if (this.props.myOwner)
            // Owner zombie: render card and tooltip and modal for zombie actions
            return (
                <Card style={{ backgroundColor: "LightYellow" }} raised>
                    <ReactTooltip delayShow={400} />
                    <a
                        href="javascript:;"
                        data-tip="Click on me to view actions for this zombie"
                        onClick={e => this.modalOpen(e)}
                    >
                        <MemeCardContent meme={this.props} />
                    </a>

                    {/* a modal is like an "alert", it's a popup that greys out the lower screen and displays its content on top of everything */}

                    <Modal open={this.state.modalOpen} onClose={this.handleClose}>
                        <Header
                            icon="browser"
                            content="These are the actions you can take with your meme!"
                        />
                        <Modal.Content>
                            <Button primary onClick={(event) => this.transferMemes(event)}>Transfer Meme</Button>
                            <Button primary onClick={(event) => this.sellMemes(event)}>Sell Meme</Button>
                            <Button primary onClick={(event) => this.buyMemes(event)}>Buy Meme</Button>
                        </Modal.Content>

                        <Modal.Actions>
                            <Button color="red" onClick={this.handleClose} inverted>
                                <Icon name="cancel" /> Close
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </Card>
            );
        // someone else's zombie.  just show the card.
        else
            return (
                <Card style={{ backgroundColor: "LavenderBlush" }}>
                    <memeCardContent meme={this.props} />
                </Card>
            );
    }
}

