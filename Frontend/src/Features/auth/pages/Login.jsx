import React from 'react'
import '../auth.form.scss'

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
  }

  return (
    <main>
      <div className='form-container'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder='Enter your email' />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder='Enter your password' />
          </div>
          <button className='button primary-button' type="submit">Login</button>
        </form>
      </div>
    </main>
  )
}

export default Login
