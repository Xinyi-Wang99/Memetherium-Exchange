import React, { Component } from "react";
import initBlockchain from "./utils/initBlockchain";
import TopBar from "./components/TopBar";

// import Greeting from "./pages/Greeting";
// import CreateMeme from "./pages/CreateMeme";
import AddCaption from "./pages/AddCaption";
//
// //import Ipfs from './pages/Ipfs';
// // import IPFS.js from "./pages/Ipfs"
//
// import MyZombieInventory from "./pages/MyZombieInventory";
// import ZombieInventory from "./pages/ZombieInventory";
// import AttackZombie from "./pages/AttackZombie";
// import FeedOnKitty from "./pages/FeedOnKitty";
// import ChangeName from "./pages/ChangeName";
// import LevelUp from "./pages/LevelUp";
// import TransferZombie from "./pages/TransferZombie";
// import Ipfs from './pages/Ipfs';


//import store from "./redux/store";

//
//  This is the main application page; routing is handled to render other pages in the application

class App extends Component {
  // define a state variable for important connectivity data to the blockchain
  // this will then be put into the REDUX store for retrieval by other pages

  // **************************************************************************
  //
  // React will call this routine only once when App page loads; do initialization here
  //
  // **************************************************************************

    state = {
        MEME: null,
        userAddress: "",
        signer:"",
        userSupply: 0,
        totalSupply: 0,
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
          })
      } catch (error) {
          // Catch any errors for any of the above operations.
          alert(`Failed to load provider, signer, or contract. Check console for details.`);
          console.log(error);
      }
      let userSupply= await this.state.MEME.balanceOf(this.state.userAddress);
      console.log("this is userSupply" ,userSupply);
    };






  // **************************************************************************
  //
  // main render routine for App component;
  //      contains route info to navigate between pages
  //
  // **************************************************************************

  render() {
      console.log("state", this.state);
      return (
        <div>
            <TopBar state = {this.state}/>
        </div>
      //<Provider store={store}>
      //   <HashRouter>
      //     <Container>
      //       <TopBar state={this.state} />
      //       <div>
      //         {/* Create Meme & Add Caption Pages*/}
      //         <Route exact path="/" component={CreateMeme}/>
      //         {/*<Route exact path="/Add-Caption" component={AddCaption}/>*/}
      //         <Route exact path="/uploadMeme">
      //             <Ipfs userAddress ={this.state.userAddress}/>
      //         </Route>
      //           <Route exact path="/myZombieInventory" component={MyZombieInventory}/>
      //         <Route exact path="/ZombieInventory" component={ZombieInventory}/>
      //
      //         {/* routes used in zombie action modal */}
      //         <Route exact path="/AttackZombie" component={AttackZombie} />
      //         <Route exact path="/FeedOnKitty" component={FeedOnKitty} />
      //         <Route exact path="/ChangeName" component={ChangeName} />
      //         <Route exact path="/LevelUp" component={LevelUp} />
      //         <Route exact path="/TransferZombie" component={TransferZombie} />
      //       </div>
      //     </Container>
      //   </HashRouter>
      //</Provider>
    );
  }
}

export default App;
