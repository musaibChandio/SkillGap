import React from 'react'
import { useNavigate , Link } from 'react-router'
 
function Register() {
    const navigate = useNavigate()

   const handleSubmit = (e) => {
    e.preventDefault()
    // Handle registration logic here
  }

  return (
    <div>
      <main>
      <div className='form-container'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder='Enter your username' />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder='Enter your email' />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder='Enter your password' />
          </div>
          <button className='button primary-button' type="submit">Register</button>
        </form>

        {/* <p>Already have an account? <span className='link' onClick={() => navigate('/login')}>Login</span></p> */}

        
        <p>Already have an account? <Link to="/login">Login</Link></p>

      </div>
    </main>    
    </div>
  )
}


export default Register
