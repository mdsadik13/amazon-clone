import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { auth } from './firebase';
import './login.css'


const Login = () => {
      const navigate = useNavigate();
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

      const signIn =e=>{
            e.preventDefault();//prevent from refresh
            //Firebase login
            auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                navigate('/')
            })
            .catch(error => alert(error.message))


      }    
      const register =e=>{
            e.preventDefault();//prevent from refresh
            //Firebase register
            
            auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // it successfully created a new user with email and password
               
               if (auth) {
                  navigate('/')
              }
            })
            .catch(error => alert(error.message))

      }    


  return (
      
    <div className='login'>
      <Link to="/">
      <img className='login__logo' src="https://pngimg.com/uploads/amazon/amazon_PNG1.png" />
      </Link>
      <div className='login__container'>
            <h1>Sign in</h1>
            <form>
                  <h5>E-mail</h5>
                  <input type="text" value={email} onChange={e=>setEmail(e.target.value)}/>

                  <h5>Password</h5>
                  <input type="password" value={password}
                  onChange={e=>setPassword(e.target.value)} />
                  <button tupe='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
                  <p>
                        By signing-in you agree to Amazon clone Condition of use & sale. please see our privacy Notice, our Cookies Notice and our Interest-Based Ads
                  </p>
                  <button onClick={register}  className='login__registerButton'>Create your amazon Account</button>
            </form>
      </div>

    </div>
  )
}

export default Login
