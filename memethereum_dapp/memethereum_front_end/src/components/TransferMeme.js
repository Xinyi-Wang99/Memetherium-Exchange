import React, { Component } from "react";
import {Input} from 'reactstrap';
const IPFS = require('ipfs-api')
const ipfs = new IPFS({host: 'ipfs.infura.io', port:5001, protocol:'https'})
export default class TransferMeme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            caption:"",
            buffer: [],
            memeID: null,
            modalOpen: false,
            value: "",
            message: "",
            loading: false,
            errorMessage: "",
        }
       // this.captureFile = this.captureFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChangeAddr = this.handleChangeAddr.bind(this)
        this.handleChangeID = this.handleChangeID.bind(this)
    }

    handleOpen = () => this.setState({modalOpen: true});
    handleClose = () => this.setState({modalOpen: false});

    // captureFile(event) {
    //     event.preventDefault()
    //     const file = event.target.files[0]
    //     const reader = new window.FileReader()
    //     reader.readAsArrayBuffer(file)  //converting the file into an array
    //     reader.onloadend = () => {
    //         this.setState({buffer: Buffer(reader.result)})
    //     }
    //     console.log("buffer " ,this.state.buffer)
    // }

    onSubmit = async event => {
        event.preventDefault()
        try{
            //console.log("ipfsHash", this.state.ipfsHash)
            // console.log("name ", this.state.name)
            // console.log("caption ", this.state.caption)
            console.log("memeID", this.state.memeID)
            console.log("value: ", this.state.value)
            console.log("MemeInfo", this.props.state.MEME)
            const testMeme =  await this.props.state.MEME.getMemesByOwner(this.props.state.userAddress)[0]
            await this.props.state.MEME.transferFrom(this.props.state.userAddress, this.state.value, this.state.memeID)
            console.log("finish create MEME", this.props.userAddress)
            const number = await this.props.state.MEME.balanceOf(this.props.state.userAddress)
            console.log("number", number)
            //console.log('this is from IPFS', this.state.ipfsHash)
        }catch(err){
            console.log(err)
        }
    }

    handleChangeAddr = (event) => {
        this.setState({[event.target.name]: event.target.value});
        console.log("value: ", this.state.value)
    }

    handleChangeID = (event) => {
        this.setState({[event.target.name]: event.target.value});

        // ipfs.files.add(this.state.buffer, (error, result) => {
        //     if(error){
        //         console.error(error)
        //         return
        //     }
        //     this.setState({ipfsHash : result[0].hash})
        // });
        console.log("memeID", this.state.memeID)
    }


    render() {
        return (
            <main className="container">
                <img src ={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt =""/>
                <form onSubmit = {this.onSubmit}>
                    <Input type="text" name="value" style = {{marginBottom: 10}} value={this.name} placeholder="Address To Transfer To" onChange={(e) => {
                        this.handleChangeAddr(e)
                    }}/>
                    <Input type="text" name="memeID" value={this.name} placeholder="Enter Meme ID" onChange={(e) => {
                        this.handleChangeID(e)
                    }}/>
                    <input type="submit" />
                </form>
            </main>
        );
    }
}

