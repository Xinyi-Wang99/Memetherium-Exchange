import React, { Component } from "react";
import { Card, Grid, Input, Segment, Pagination } from "semantic-ui-react";
import MemeCard from "./memeCard";

export default class MyZombieInventory extends Component {
    state = {
        memeTable: [],
        activePage: 1,
       // totalPages: Math.ceil(this.props.state.userZombieCount / 9)
        totalPages:1,
    };

    componentDidMount = async () => {
        await this.makeMemeCards();
    };

    onChange = async (e, pageInfo) => {
        await this.setState({ activePage: pageInfo.activePage });
        this.makeMemeCards();
    };

    handleInputChange = async (e, { value }) => {
        await this.setState({ activePage: value });
        this.makeMemeCards();
    };

    makeMemeCards = async () => {
        console.log("my memes", this.props.state)
        const myMemes = await this.props.state.MEME.getMemesByOwner(this.props.state.userAddress);
        let memeTable = [];
        for (
            var i = this.state.activePage * 9 - 9;
            i < this.state.activePage * 9;
            i++
        ) {
            try {
                let id = myMemes[i];
                let meme = await this.props.state.MEME.memes(id);
                console.log("meme",meme)
                let myDate = new Date(meme.readyTime * 1000).toLocaleString();
                memeTable.push(
                    <MemeCard
                        key={id}
                        memeId={id.toString()}
                        memeName={meme.name}
                        memeCaption={meme.caption}
                        memeHash={meme.ipfsHash}
                        memeReadyTime={myDate}
                        memeOwner={this.props.state.userAddress}
                        myOwner={true}
                    />
                );
            } catch {
                break;
            }
        }
        this.setState({ memeTable });
    };

    render() {
        return (
            <div>
                <h2> Your Meme Inventory </h2>
                <Grid columns={2} verticalAlign="middle">
                    <Grid.Column>
                        <Segment secondary>
                            <div>activePage: {this.state.activePage}</div>
                            <Input
                                min={1}
                                max={this.state.totalPages}
                                onChange={this.handleInputChange}
                                type="range"
                                value={this.state.activePage}
                            />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Pagination
                            activePage={this.state.activePage}
                            onPageChange={this.onChange}
                            totalPages={this.state.totalPages}
                        />
                    </Grid.Column>
                </Grid>
                <br /> <br />
                <Card.Group> {this.state.memeTable} </Card.Group>
            </div>
        );
    }
}
