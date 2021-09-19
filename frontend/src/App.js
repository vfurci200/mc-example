import React, {Component } from 'react';
import './App.scss';
import Web3 from 'web3';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Container} from 'react-bootstrap'
import HomeScreen from './pages/HomeScreen'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      brownie: '.',
      account:'3',
      loading: true
    }
  }
  async componentWillMount() {
    // await this.loadBrownie()
  }

  handleMetamaskClick = () => {
    this.loadWeb3()
    this.loadBlockchainData()
  }



  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({
      account: accounts[0],
      loading: false
    })
  }

render() {
  return (
    <div className="App">
      <Router>
        <Container>
          <Route path="/" component={HomeScreen} exact/>
        </Container>
      </Router>
    </div>

  );
}
}

export default App;
