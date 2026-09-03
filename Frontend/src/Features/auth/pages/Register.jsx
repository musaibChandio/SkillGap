import React ,{ useState }  from 'react'
import { useNavigate , Link } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
 

function Register() {

    const { loading , handleRegister  } = useAuth()
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")



   const handleSubmit = async(e) => {
    e.preventDefault()
    // Handle registration logic here
    await handleRegister({username, email, password})
    navigate('/login')
  }

  if(loading){
    return (<main><h1>loading...</h1></main>)
  }

  return (
    <div>
      <main>
      <div className='form-container'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <div className="input-group">
            <label htmlFor="username">Username</label>
            <input 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text" name="username" placeholder='Enter your username' />
          </div>
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
