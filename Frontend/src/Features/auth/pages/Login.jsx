import React, { useState } from 'react'
import '../auth.form.scss'
import { Link } from 'react-router' 
import { useAuth } from '../hooks/useAuth.js'


function Login() {

  const { loading , handlelogin  } = useAuth()

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")


  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    handlelogin({email, password})

  }

  if(loading){
    return (<main><h1>loading...</h1></main>)
  }


  return (
    <main>
      <div className='form-container'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email" name="email" placeholder='Enter your email' />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password" name="password" placeholder='Enter your password' />
          </div>
          <button className='button primary-button' type="submit">Login</button>
        </form>
        <p>Dont have an account? <Link to="/register">Register</Link></p>
        
      </div>
    </main>
  )
}

export default Login
