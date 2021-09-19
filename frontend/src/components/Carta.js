import React from 'react'
import { Component } from "react";
import { Button, Card } from 'react-bootstrap'


const Carta = ({ card,data, handler}) => {
// card get card data, data get selection data, handler handle selection diff based on floor or player cards

    return (
      <Card border="dark" className="my-4 p-3 rounded text-center" style={{ background: 'linear-gradient(45deg,#FFB64D,#ffcb80)' ,width: '12rem', borderRadius: '0'}}>

        <Card.Img src={card.image} variant='top' />


        <Card.Body>

        <Card.Title as='div'>
            <strong> {card.name} </strong>
        </Card.Title>

          <Card.Text as='div'>
            <div className='my-3'>
            </div>
          </Card.Text>

        </Card.Body>

        <Card.Body>

        {{data}.data.loadLendPage ? (
          <>
          {{data}.data.depositedIdxList.includes(card.idx) ? (
            <>

              <div className="ml-auto">
                  <Button variant="dark" style={{width:'6rem',marginTop:'30px'}} onClick={() => {handler(card)}}>Redeem</Button>
              </div>
            </>
          ):(
            <>
            {card.isLoaned ? (
              <div className="ml-auto">
                  <Button variant="dark" style={{width:'6rem'}} onClick={() => {handler(card)}}>Return</Button>
              </div> ) :(
              <div className="ml-auto">
                  <Button variant="dark" style={{width:'6rem'}} onClick={() => {handler(card)}}>Lend</Button>
              </div>
              )}
            </>
          )}
          </>
        ):null}

        {{data}.data.loadBorrowPage ? (
          <>
            <div className="ml-auto">
                <Button variant="dark" style={{width:'6rem',marginTop:'30px'}} onClick={() => {handler(card)}}>Borrow</Button>
            </div>
          </>
        ):null}

        </Card.Body>


      </Card>
    )
  }

export default Carta;
