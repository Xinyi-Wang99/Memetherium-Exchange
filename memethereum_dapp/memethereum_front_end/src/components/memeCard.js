import React, { Component } from "react";
import {Icon, Card, Header, Modal, Button, Menu} from "semantic-ui-react";
import ReactTooltip from "react-tooltip";
import MemeCardContent from "./memeCardContent";
import TransferMeme from "./TransferMeme";
import {Input} from "reactstrap";

export default class ZombieCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            value: null
        };
        this.transferMemes = this.transferMemes.bind(this)
        this.buyMemes = this.buyMemes.bind(this)
        this.modalOpen = this.modalOpen.bind(this)
        this.handleChangeAddr = this.handleChangeAddr.bind(this)
        this.handleChangeID = this.handleChangeID.bind(this)
    }

     transferMemes(event){
        event.preventDefault()
     }
    handleChangeAddr = (event) => {
        this.setState({[event.target.name]: event.target.value});
        console.log("value: ", this.state.value)
    }

    handleChangeID = (event) => {
       // this.setState({[event.target.name]: event.target.value});

        // ipfs.files.add(this.state.buffer, (error, result) => {
        //     if(error){
        //         console.error(error)
        //         return
        //     }
        //     this.setState({ipfsHash : result[0].hash})
        // });
        //console.log("memeID", this.state.memeID)
    }
     async buyMemes(event) {
         event.preventDefault()
         try{
             //console.log("ipfsHash", this.state.ipfsHash)
             // console.log("name ", this.state.name)
             // console.log("caption ", this.state.caption)
             console.log("props: ", this.props.state)
             console.log("value: ", this.state.value)
             console.log("MemeInfo", this.props)
             console.log("memeID", this.props.memeId)
             console.log("meme owner address: ", this.props.memeOwner)
             //const testMeme =  await this.props.MEME.getMemesByOwner(this.props.memeOwner)[0]
             //await this.props.MEME.transferFrom(this.props.memeOwner, this.state.value, this.props.memeId)
             console.log("finish create MEME", this.props.memeOwner)
             //const number = await this.props.state.MEME.balanceOf(this.props.state.userAddress)
             //console.log("number", number)
             //console.log('this is from IPFS', this.state.ipfsHash)
         }catch(err){
             console.log(err)
         }
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
                        {/*<MemeCardContent meme={this.props} />*/}
                    </a>

                    {/* a modal is like an "alert", it's a popup that greys out the lower screen and displays its content on top of everything */}

                    <Modal open={this.state.modalOpen} onClose={this.handleClose}>
                        <Header
                            icon="browser"
                            content="These are the actions you can take with your meme!"
                        />
                        <Modal.Content>
                            <TransferMeme state={this.props}/>
                            {/*<Button primary onClick={(event) => this.buyMemes(event)}>Buy Meme</Button>*/}
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
                // <Card style={{ backgroundColor: "LavenderBlush" }}>
                //     <MemeCardContent meme={this.props} />
                // </Card>

                <Card style={{ backgroundColor: "LavenderBlush" }} raised>
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
                            <TransferMeme state={this.props}/>
                            {/*
                            <main className="container">
                                <img src ={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt =""/>
                                <form onSubmit = {this.onSubmit}>
                                    <Input type="text" name="value" style = {{marginBottom: 10}} value={this.name} placeholder="Address To Transfer To" onChange={(e) => {
                                        this.handleChangeAddr(e)
                                    }}/>
                                    <Input type="text" name="memeID" value={this.name} placeholder="Enter Meme ID" onChange={(e) => {
                                        this.handleChangeID(e)
                                    }}/>
                                </form>
                            </main>
                            <Button primary onClick={(event) => this.buyMemes(event)}>Buy Meme</Button>
                            */}
                        </Modal.Content>

                        <Modal.Actions>
                            <Button color="red" onClick={this.handleClose} inverted>
                                <Icon name="cancel" /> Close
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </Card>
            );
    }
}

