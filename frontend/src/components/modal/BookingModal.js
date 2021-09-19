import React from 'react'
import { Component } from "react";
import { Button, Col,Modal } from 'react-bootstrap'
import DepositForm from '../forms/DepositForm'

function BookingModal(props) {
  // console.log(props)
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Booking
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <DepositForm
            createBooking={props.createBooking}
          />
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default BookingModal;
