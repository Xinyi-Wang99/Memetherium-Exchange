import React, { Component } from "react";
import initBlockchain from "./utils/initBlockchain";
import TopBar from "./components/TopBar";
import CreateMeme from "./pages/CreateMeme";
import AddCaption from "./pages/AddCaption";

import { Container } from "semantic-ui-react";

//  This is the main application page; routing is handled to render other pages in the application

class App extends Component {
  // define a state variable for important connectivity data to the blockchain
  // this will then be put into the REDUX store for retrieval by other pages

  // **************************************************************************
  // React will call this routine only once when App page loads; do initialization here
  // **************************************************************************

    state = {
        MEME: null,
        userAddress: "",
        signer:"",
        userMemeCount: 0,
        totalMemeCount: 0
    }

    //this is trying to connect with blocChain, it only did one time at the beginning of the project
    componentDidMount = async () => {
      try {
          const memeInfo = await initBlockchain();
          console.log("this is memeInfo" ,memeInfo);
          this.setState({
              MEME: memeInfo.MEME,
              signer: memeInfo.signer,
              userAddress: memeInfo.userAddress,
              userMemeCount: memeInfo.userMemeCount,
              totalMemeCount: memeInfo.totalMemeCount
          })
      } catch (error) {
          // Catch any errors for any of the above operations.
          alert(`Failed to load provider, signer, or contract. Check console for details.`);
          console.log(error);
      }
      // let userSupply= await this.state.MEME.balanceOf(this.state.userAddress);
      // console.log("this is userSupply" ,userSupply);
    };

  // **************************************************************************
  // main render routine for App component;
  //      contains route info to navigate between pages
  // **************************************************************************

  render() {
      console.log("state", this.state);
      return (
        <Container>
          <div>
            <TopBar state = {this.state}/>
            <CreateMeme state = {this.props.state}/>
          </div>
        </Container>
    );
  }
}

export default App;
