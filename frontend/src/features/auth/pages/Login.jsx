import React,{useState} from 'react'
import "../auth.form.scss"
import {useNavigate,Link} from 'react-router'
import { useAuth } from '../hooks/useAuth'
const Login = () => {

  const{loading,handleLogin} = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  let error = "";
  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const success = await handleLogin({email,password})
    if(success){
      error = "";
      navigate('/');
    } else {
      error = "Login Failed. Please check your credentials and try again.";
      alert(error);
    }
  }

    if(loading){
      return(<main>
        <h1>
        Loading...
        </h1>
      </main>)
    }


  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputgroup">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e)=>setEmail(e.target.value)}
              type="email" id='email' name='email' placeholder='Enter your email' />
          </div>
          <div className="inputgroup">
            <label htmlFor="password">password</label>
            <input 
              onChange={(e)=>setPassword(e.target.value)}
              type="password" id='password' name='password' placeholder='Enter your password' />
          </div>
          <button className='button primary-button'>Login</button>
        </form>
        {/* Error message will be shown as alert, not in DOM */}
        <p>Don't Have an Account? <Link to={'/register'} >Register</Link></p>
      </div>
    </main>
  )
}

export default Login
