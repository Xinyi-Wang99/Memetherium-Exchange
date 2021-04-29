import React, { Component } from "react";
import {Card, Grid, Input, Segment, Pagination,} from "semantic-ui-react";
import MemeCard from "./memeCard";

export default class MemeInventory extends Component {
    state = {
        memeTable: [],
        activePage: 1,
        totalPages: Math.ceil(this.props.state.totalMemeCount / 9)
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
    }

    makeMemeCards = async () => {
        console.log("Meme Explore", this.props.state.MEME)
        let memeList = [];
        let memeOwner = [];
        await this.setState({ memeTable: [] }); // clear screen while waiting for data
        for (
            let i = this.state.activePage * 9 - 9;
            i < this.state.activePage * 9;
            i++
        ) {
            try {
                let metaData = await this.props.state.MEME.memes(i);
                console.log("metadata", metaData)
                memeList.push(metaData);
                let myOwner = await this.props.state.MEME.memeToOwner(i);
                memeOwner.push(myOwner);
            } catch (err) {
                break;
            }
        }

        // create a set of zombie cards in the state table
        let memeTable = [];
        for (let id = 0; id < memeList.length; id++) {
            let myDate = new Date(memeList[id].readyTime * 1000).toLocaleString();
            console.log("currently meme", memeList[id])
            memeTable.push(
                <MemeCard
                    key={id}
                    memeId={id.toString()}
                    memeName={memeList[id].name}
                    memeCaption={memeList[id].caption}
                    memeHash={memeList[id].ipfsHash}
                    memeReadyTime={myDate}
                    memeOwner={memeOwner[id]}
                    myOwner={this.props.state.userAddress === memeOwner[id]}
                />
            );
        }
        this.setState({ memeTable });
    };

    render() {
        return (
            <div>
                <hr />
                <h2> Complete Meme Inventory </h2>
                The memes you own have a yellow background; clicking anywhere on a
                yellow card will bring up a list of actions you can perform.
                <hr />
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
                <div>
                    <Card.Group>{this.state.memeTable}</Card.Group>
                </div>
            </div>
        );
    }
}

