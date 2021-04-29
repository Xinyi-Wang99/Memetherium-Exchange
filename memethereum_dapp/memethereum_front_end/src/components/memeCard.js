import React, { Component } from "react";
import { Icon, Card, Header, Modal, Button } from "semantic-ui-react";
import ReactTooltip from "react-tooltip";
import ActionButton from "./ActionButton";
import MemeCardContent from "./memeCardContent";

class ZombieCard extends Component {
    state = {
        modalOpen: false
    };

    modalOpen() {
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

        const TransferMemes= (
            <div>
                Transfer Memes <br /> {" "}
            </div>
        );
        const BuyMemes = (
            <div>
                Buy Memes <br /> {" "}
            </div>
        );
        const SellMemes = (
            <div>
               Sell Memes <br /> {" "}
            </div>
        );

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

                            <ActionButton
                                buttonLabel={TransferMemes}
                                data={this.props}
                            />

                            <ActionButton
                                buttonLabel={BuyMemes}
                                data={this.props}
                            />

                            <ActionButton
                                buttonLabel={TransferMemes}
                                data={this.props}
                            />

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

export default ZombieCard;
