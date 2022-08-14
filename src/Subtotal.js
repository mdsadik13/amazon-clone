import React from 'react'
import "./Subtotal.css"
import CurrencyFormat from  "react-currency-format"
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useNavigate } from 'react-router-dom';
const Subtotal = () => {
  const navigate=useNavigate();
  const [{basket},dispatch] = useStateValue();
  return (
    <div className='subtotal'>
      {/* Below code does not worked  */}
      {/* <CurrencyFormat
      decimalScale={2}
      value={0}
      displayType={"text"}
      prefix={"£"}
      renederText={(value)=>(
        <div>
        <p>
          Subtotal (0  items):<strong>0</strong>
        </p>
        <small className='subtotal__gift'>
          <input type="checkbox"/>
          This order contains a gift
        </small>
        </div>
        
      )}
      /> */}
      <CurrencyFormat
       value={getBasketTotal(basket)} 
       decimalScale={2}
       displayType={'text'} 
       thousandSeparator={true} 
       prefix={'$'} 
       renderText={(value) => 
       <div>
       <p>
          Subtotal ({basket.length} items):<strong>{value}</strong>
        </p>
        <small className='subtotal__gift'>
          <input type="checkbox"/>
          This order contains a gift
        </small>
       </div>} 
       />
      <button onClick={e=>navigate("/payment",{replace:true})}>Procced to checkout</button>
    </div>
  )
}

export default Subtotal
