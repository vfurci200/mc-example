import React, {Component } from 'react';
import Web3 from 'web3';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Box, Card, MetaMaskButton, ToastMessage } from "rimble-ui";
import {Button,Col,Container,Row, Flex, Link} from 'react-bootstrap'
import ConnectionBanner from "@rimble/connection-banner";
import BookingModal from '../components/modal/BookingModal'
import IERC20 from '../contracts/IERC20.json'
import MCExample from '../contracts/MCExample.json'

class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      bookingModalShow:false
    }
  }
  async componentWillMount() {
    this.loadWeb3()
    this.loadBlockchainData()
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
    const network = await web3.eth.net.getId()

    // Load WETH
    const wethAddress = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619';
    const wethToken = new web3.eth.Contract(IERC20.abi, wethAddress)

    // Load mcExample
    const mcExample = new web3.eth.Contract(MCExample.abi,'0x790146e3C7671a23f1f4774c3A91606f900E6A6C')

    console.log(network)
    this.setState({
      account: accounts[0],
      network: network,
      loading: false,
      mcExample: mcExample,
      wethToken: wethToken
    })
  }

  async setModalShow(){
    this.setState({
      bookingModalShow: false
    })
  }

  async openBookingForm() {
    this.setState({
      bookingModalShow: true
    })
  }

  createBooking = (startDate, endDate, camperId, customerName, price) => {
      // adjust price to make it compatible with solidity
      price = (price * 10**18).toString();
      // TO DO:adjust startdate to make it compatible with solidity
      // TO DO:adjust enddate to make it compatible with solidity
      this.setState({ loading: true })
      this.state.wethToken.methods.approve(this.state.mcExample._address, price).send({ from: this.state.account }).on('transactionHash', (hash) =>
      {
        this.state.mcExample.methods.createBooking(startDate, endDate,camperId,customerName, price).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.setState({ loading: false })})
      })
  }


render() {
  return (
    <div className="App">
      <Router>
        <Col xs={12}>
          <Button size="lg" onClick={() => this.openBookingForm()} style={{ borderColor: '#ffcb80',background: '#262a2b', marginTop: '20px', marginLeft: '20px'}}>
            BOOK
          </Button>

        </Col>
        <BookingModal
          createBooking={this.createBooking}
          show={this.state.bookingModalShow}
          onHide={() => this.setModalShow(false)}
        />
      </Router>
    </div>

  );
}
}

export default HomeScreen;
