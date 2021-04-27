import React, { Component } from "react";
import {Input} from 'reactstrap';
const IPFS = require('ipfs-api')
const ipfs = new IPFS({host: 'ipfs.infura.io', port:5001, protocol:'https'})
export default class UploadMeme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            caption:"",
            buffer: [],
            ipfsHash: "",
            modalOpen: false,
            value: "",
            message: "",
            loading: false,
            errorMessage: "",
        }
        this.captureFile = this.captureFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeCaption = this.handleChangeCaption.bind(this)
    }

    handleOpen = () => this.setState({modalOpen: true});
    handleClose = () => this.setState({modalOpen: false});

    captureFile(event) {
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)  //converting the file into an array
        reader.onloadend = () => {
            this.setState({buffer: Buffer(reader.result)})
        }
        console.log("buffer " ,this.state.buffer)
    }

    onSubmit = async event => {
        event.preventDefault()
        try{
            console.log("ipfsHash", this.state.ipfsHash)
            console.log("name ", this.state.name)
            console.log("caption ", this.state.caption)
            console.log("MemeInfo", this.props.state.MEME)
            await this.props.state.MEME.createMeme(this.state.name, this.state.caption, this.state.ipfsHash)
            console.log("finish create MEME", this.props.userAddress)
            const number = await this.props.state.MEME.balanceOf(this.props.state.userAddress)
            console.log("number", number)
            const ownerHas = await this.props.state.MEME.getMemesByOwner(this.props.state.userAddress)
            console.log("Owner has: ", ownerHas)
            const newZombieOwner = await this.props.state.MEME.ownerOf(ownerHas[1])
            console.log("should be owner addr ", newZombieOwner)
            console.log('this is from IPFS', this.state.ipfsHash)
        }catch(err){
            console.log(err)
        }
    }

    handleChangeName = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleChangeCaption = (event) => {
        this.setState({[event.target.name]: event.target.value});
        ipfs.files.add(this.state.buffer, (error, result) => {
            if(error){
                console.error(error)
                return
            }
            this.setState({ipfsHash : result[0].hash})
        });
        console.log("ipfsHash", this.state.ipfsHash)
    }


    render() {
        return (
                <main className="container">
                    <img src ={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt =""/>
                    <form onSubmit = {this.onSubmit}>
                        <input type="file" onChange = {this.captureFile}/>
                        <Input type="text" name="name" style = {{marginBottom: 10}} value={this.name} placeholder="Enter Meme Name" onChange={(e) => {
                            this.handleChangeName(e)
                        }}/>
                        <Input type="text" name="caption" value={this.capttion} placeholder="Enter Meme Caption" onChange={(e) => {
                            this.handleChangeCaption(e)
                        }}/>
                        <input type="submit" />
                    </form>
                </main>
        );
    }
}

