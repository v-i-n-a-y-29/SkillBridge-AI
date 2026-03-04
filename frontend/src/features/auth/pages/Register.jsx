import React from 'react'
import {useNavigate,Link} from 'react-router'

const Register = () => {

  const navigate = useNavigate()

  const handleSubmit = (e)=>{
      e.preventDefault();
    }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>

          <div className="inputgroup">
            <label htmlFor="email">Username</label>
            <input type="text" id='username' name='username' placeholder='Enter Username' />
          </div>

          <div className="inputgroup">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' name='email' placeholder='Enter your email' />
          </div>

          <div className="inputgroup">
            <label htmlFor="password">password</label>
            <input type="password" id='password' name='password' placeholder='Enter your password' />
          </div>

          <button className='button primary-button'>Register</button>

        </form>

        <p>Already have an account? <Link to={'/login'} >Login</Link></p>
      </div>
    </main>
  )
}

export default Register
