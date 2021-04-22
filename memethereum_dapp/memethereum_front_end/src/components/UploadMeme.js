import React, { Component } from "react";
const IPFS = require('ipfs-api')
const ipfs = new IPFS({host: 'ipfs.infura.io', port:5001, protocol:'https'})
export default class UploadMeme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"lalala",
            caption:"hihi",
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
    }

    onSubmit = async event => {
        event.preventDefault()
        ipfs.files.add(this.state.buffer, (error, result) => {
            if(error){
                console.error(error)
                return
            }
            this.setState({ipfsHash : result[0].hash})
            console.log("ipfsHash", this.state.ipfsHash)
            console.log("result" , result)
        });
        try{
            await this.props.state.MEME.createMeme(this.state.name, this.state.caption, this.state.ipfsHash)
            console.log("finish create MEME", this.props.userAddress)
            const number = await this.props.state.MEME.balanceOf(this.props.state.userAddress)
            console.log("number", number)
            console.log('this is from IPFS', this.state.ipfsHash)
        }catch(err){
            console.log(err)
        }
    }


    render() {
        return (
                <main className="container">
                    <img src ={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt =""/>
                    <h2>Upload Meme</h2>
                    <form onSubmit = {this.onSubmit}>
                        <input type="file" onChange = {this.captureFile}/>
                        <input type="submit" />
                    </form>
                </main>
        );
    }
}

