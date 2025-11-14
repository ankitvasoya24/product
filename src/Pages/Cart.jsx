import React from 'react'
import {Container,Table,Button} from 'react-bootstrap'
import {toast} from 'react-toastify'

const Cart = ({ cart, updateQuantity, removeFromCart }) => {
    const total =  cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
     <Container className="mt-4">
      <h3 className='mb-3'>Shopping Cart</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th style={{width:"100px"}}>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>${item.price}</td>
                  <td>
                    <div className="d-flex justify-content-between align-items-center">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <Button
                      variant="danger" size="sm"
                      onClick={() => {removeFromCart(item.id);
                        toast.info('Item Remove Succesfully')
                      }}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4>Total: ${total.toFixed(2)}</h4>
          <Button variant='success' className='mt-1'
          onClick={() => toast.success('Order Place SuccesFully',{
            position:"top-right",
            autoClose:3000
          })}>
            Place Order
          </Button>
        </>
      )}
    </Container>
  )
}

export default Cart
