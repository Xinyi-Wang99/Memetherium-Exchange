import React, {Component} from "react";

import {imagething} from "./MyZombieInventory.js";

const IPFS = require('ipfs-api')
const ipfs = new IPFS({host: 'ipfs.infura.io', port:5001, protocol:'https'})

export default class Ipfs extends Component{

    constructor(props) {
        super(props);
        this.state = {
            buffer: [],
            ipfsHash:null
        }

        this.captureFile= this.captureFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    captureFile(event){
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)  //converting the file into an array
        reader.onloadend = () =>{
            this.setState({buffer: Buffer(reader.result )})
        }
    }

    getLocation() {
        return this.state.ipfsHash;
    }

    onSubmit(event){
        event.preventDefault()
        ipfs.files.add(this.state.buffer, (error, result) => {
            if(error){
                console.error(error)
                return
            }
            this.setState({ipfsHash : result[0].hash})
            // image_location = this.state.ipfsHash;
            imagething.image_location = this.state.ipfsHash;
        })
        console.log('this is from IPFS', this.props.userAddress)
        console.log("image variable:", this.state.ipfsHash)

    }


    render() {
        return(
            <div>
                <main className="container">
                    <h2>Your Meme</h2>
                    <p> This image is stored on IPFS & The Ethereum Blockchain!</p>
                    <img src ={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt =""/>
                    <h2>Upload Meme</h2>
                    <form onSubmit = {this.onSubmit}>
                        <input type="file" onChange = {this.captureFile}/>
                        <input type="submit" />
                    </form>
                </main>
            </div>
        );
    }

}


