import React, { Component } from 'react'
import { Button, Col,Container, Dropdown, DropdownButton,  Form, ToggleButton, ToggleButtonGroup, Row} from 'react-bootstrap'
// import tokenLogo from '../static/token-logo.png'
// import ethLogo from '../static/eth-logo.png'
// import usdcLogo from '../static/usdc-logo.png'
// import Token from './Token'



class DepositForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeframeOptions:["","January","February","March","April","May","June","July","August", "September","October","November","December"],
      outputTimeframe: "Month",
      tokenBalance:'0',
    }
    this.handleTimeframeSelect = this.handleTimeframeSelect.bind(this)
  }


  handleTimeframeSelect(key){
    const selectedOption = this.state.timeframeOptions[key];

    this.setState({
        outputTimeframe: selectedOption
    })
  }


  render() {
    return (
      <Form className="mb-3" onSubmit={(event) => {
          event.preventDefault()
          console.log(this.state)
          this.props.createBooking(this.state.startDate.toString(), this.state.endDate.toString(),this.state.camperId.toString(), this.state.customerName, this.state.price)
        }}>
        <Col>
          <Row>
            <div>
              <label className="float-left" style={{color: 'black',marginTop:'20px'}}><b>Booking </b></label>
            </div>
          </Row>
          <Row>
            <div>

            </div>
          </Row>

        </Col>

        <label className="float-left" style={{color: 'black',marginTop:'10px'}}><b>Customer Name</b></label>
        <div className="input-group mb-0">
          <input
            type="text"
            onChange={(event) => {
              const customerName = this.input0.value
              this.setState({
                customerName: customerName
              })
            }}
            ref={(input) => { this.input0 = input }}
            className="form-control form-control-lg"
            placeholder="Mario Rossi"
            required />
        </div>
        <label className="float-left" style={{color: 'black',marginTop:'10px'}}><b>Start Date</b></label>
        <div className="input-group mb-1">
          <input
            type="number"
            onChange={(event) => {
              const startDate = this.input1.value
              this.setState({
                startDate: startDate
              })
            }}
            ref={(input) => { this.input1 = input }}
            className="form-control form-control-lg"
            placeholder="10"
            required />
          <div className="input-group-append">
            <DropdownButton align="end" id="dropdown-basic-button" size="lg" title={this.state.outputTimeframe} onSelect={this.handleTimeframeSelect}  >
              <Dropdown.Item eventKey="1">January</Dropdown.Item>
              <Dropdown.Item eventKey="2">February</Dropdown.Item>
              <Dropdown.Item eventKey="3">March</Dropdown.Item>
              <Dropdown.Item eventKey="4">April</Dropdown.Item>
              <Dropdown.Item eventKey="5">May</Dropdown.Item>
              <Dropdown.Item eventKey="6">June</Dropdown.Item>
              <Dropdown.Item eventKey="7">July</Dropdown.Item>
              <Dropdown.Item eventKey="8">August</Dropdown.Item>
              <Dropdown.Item eventKey="9">September</Dropdown.Item>
              <Dropdown.Item eventKey="10">October</Dropdown.Item>
              <Dropdown.Item eventKey="11">November</Dropdown.Item>
              <Dropdown.Item eventKey="12">December</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>

        <label className="float-left" style={{color: 'black',marginTop:'10px'}}><b>End Date</b></label>
        <div className="input-group mb-2">
          <input
            type="number"
            onChange={(event) => {
              const endDate = this.input2.value
              let price = (this.input2.value - this.input1.value) * 0.01
              if (price< 0){ price = 0}
              this.setState({
                endDate: endDate,
                price: price
              })
            }}
            ref={(input) => { this.input2 = input }}
            className="form-control form-control-lg"
            placeholder="17"
            required />
          <div className="input-group-append">
            <DropdownButton align="end" id="dropdown-basic-button" size="lg" title={this.state.outputTimeframe} onSelect={this.handleTimeframeSelect}  >
            <Dropdown.Item eventKey="1">January</Dropdown.Item>
            <Dropdown.Item eventKey="2">February</Dropdown.Item>
            <Dropdown.Item eventKey="3">March</Dropdown.Item>
            <Dropdown.Item eventKey="4">April</Dropdown.Item>
            <Dropdown.Item eventKey="5">May</Dropdown.Item>
            <Dropdown.Item eventKey="6">June</Dropdown.Item>
            <Dropdown.Item eventKey="7">July</Dropdown.Item>
            <Dropdown.Item eventKey="8">August</Dropdown.Item>
            <Dropdown.Item eventKey="9">September</Dropdown.Item>
            <Dropdown.Item eventKey="10">October</Dropdown.Item>
            <Dropdown.Item eventKey="11">November</Dropdown.Item>
            <Dropdown.Item eventKey="12">December</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>

        <label className="float-left" style={{color: 'black',marginTop:'10px'}}><b>Camper Id Number</b></label>
        <div className="input-group mb-1">
          <input
            type="number"
            onChange={(event) => {
              const camperId = this.input3.value
              this.setState({
                camperId: camperId
              })
            }}
            ref={(input) => { this.input3 = input }}
            className="form-control form-control-lg"
            placeholder="1"
            required />
        </div>

        <label className="float-left" style={{color: 'black',marginTop:'10px'}}><b>Price</b></label>
        <div className="input-group mb-1">
          <input
            type="number"
            className="form-control form-control-lg"
            placeholder={this.state.price}
            disabled />
          <div className="input-group-append">
            <div className="input-group-text">
              &nbsp;&nbsp;&nbsp; WETH
            </div>
          </div>
        </div>

         <Row className="show-grid">
             <Col xs={1} md={4}></Col>
             <Col xs={4} md={4}>
                <Button type="submit" style={{marginTop: '10px',width:'12rem'}}>PAY AND BOOK</Button>
             </Col>
             <Col xs={1} md={4}></Col>
         </Row>

      </Form>
    );
  }
}

export default DepositForm;
