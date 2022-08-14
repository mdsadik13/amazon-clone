import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { useStateValue } from './StateProvider';
import {  useElements, useStripe,CardElement } from "@stripe/react-stripe-js";
import { Card } from '@mui/material';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from './firebase';



const Payment = () => {
      const [{ basket, user }, dispatch] = useStateValue();
      const navigate=useNavigate();
      
      const stripe = useStripe();
      const elements = useElements();
      
      const [succeeded, setSucceeded] = useState(false);
      const [processing, setProcessing] = useState("");
      const [error, setError] = useState(null);
      const [disabled, setDisabled] = useState(true);
      const [clientSecret, setClientSecret] = useState(true);

      useEffect(()=>{
            // generate the special stripe secret which allows us to charge a customer
            const getClientSecret = async()=>{
                  const response = await axios({
                        method: 'post',
                        //Stripe expects the total in a currencies sub units
                        url:`/payments/create?total=${getBasketTotal(basket) * 100}`
                      });
                      setClientSecret(response.data.clientSecret)
            }
            getClientSecret();
      },[basket])
      
      console.log("The secret is >>>>>", clientSecret);
      const handleSubmit=async (event)=>{
            //do all the fancy stripe
            event.preventDefault();
            setProcessing(true);

            const payload = await stripe.confirmCardPayment(clientSecret, {
                  payment_method: {
                       card: elements.getElement(CardElement) 
                  }
            }).then(({paymentIntent})=>{
                  // paymentIntent = payment confirmation
                  db
                  .collection('users')
                  .doc(user?.uid)
                  .collection('orders')
                  .doc(paymentIntent.id)
                  .set({
                        basket: basket,
                        amount: paymentIntent.amount,
                        created: paymentIntent.created
                  })

                  setSucceeded(true);
                  setError(null)
                  setProcessing(false)
                  dispatch({
                        type:'EMPTY_BASKET'
                        })

                  navigate("/orders",{replace:true})
                  
            })
            // const payload=await stripe 
      }

      const handleChange= event =>{
            //Listem for the changes in the cardElement
            //Display any error as the customer types their card details
            setDisabled(event.empty);
            setError(event.error ? event.error.message : "");
      }

  return (
      
      <div className='payment'>
      <div className='payment__container'>
      <h1>
                    Checkout (
                        <Link to="/checkout">{basket?.length} items</Link>
                        )
                </h1>
            {/* Payment section -delivery address */}
            <div className='payment__section'>
                  <div className='payment__title'>
                  <h3>Delivery Address</h3>
                  </div>
                  <div className='payment__address'>
                     <p>{user?.email}</p>
                     <p>H8 NIT SILCHAR</p>
                     <p>Silchar Assam</p>
                  </div>
            </div>
            {/* Payment section -Review items */}
            <div className='payment__section'>
                  <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                  </div>
                  <div className='payment__items'>
                  {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                  </div>
            </div>
            {/* Payment section -Payment Methos*/}
            <div className='payment__section'>
                  <div className='payment__title'>
                        <h3>Payment Method</h3>
                  </div>  
                  <div className='payment__details'>
                        {/* Stripe Method */}
                        <form onSubmit={handleSubmit}>
                              <CardElement onChange={handleChange}/>

                              <div className='payment__priceContainer'>
                              <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    />
                                    <button disabled={processing||disabled||succeeded}>
                                          <span>{processing? <p>Processing</p> : "Buy Now"}</span>
                                    </button>
                              </div>

                              {error &&<div>{error}</div>}
                        </form>
                  </div>
            </div>
      </div>
    </div>
    
  )
}

export default Payment
