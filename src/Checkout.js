import React from 'react'
import "./Checkout.css"
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider'
import Subtotal from './Subtotal'

const Checkout = () => {
  const [{basket,user},dispatch] =useStateValue();
  return (
    <div className='checkout'>
      <div className='checkout__left'>
        <img
        className='checkout__ad' src="https://2syt8l41furv2dqan6123ah0-wpengine.netdna-ssl.com/wp-content/uploads/2013/08/amazon-banner.png"
        />
      <div>
            <h3>Hellow {user?.email}</h3>
            <h2 className='checkout__title'>
            Your Shopping Basket
            </h2>
            {basket.map(item=>(
              <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
              />
            ))}
            {/* CheckoutProduct */}
            {/* CheckoutProduct */}
            {/* CheckoutProduct */}
        
      </div>
      </div>
      <div className='checkout__right'>
            
            <Subtotal/>
      </div>
      
    </div>
  )
}

export default Checkout
