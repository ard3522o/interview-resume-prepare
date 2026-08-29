import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import Navbar from '../../shared/components/Navbar'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await handleLogin({email,password})
            navigate('/dashboard')
        } catch (err) {
            // Error is already logged in useAuth, nothing extra needed here
        }
    }

    if(loading){
        return (<main className='auth-loading'><h1>Loading...</h1></main>)
    }


    return (
        <>
            <Navbar />
            <main>
                <div className="form-container">
                    <div className="form-header">
                        <h1>Welcome back</h1>
                        <p>Sign in to continue your interview prep</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                onChange={(e) => { setEmail(e.target.value) }}
                                type="email" id="email" name='email' placeholder='Enter email address' />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                onChange={(e) => { setPassword(e.target.value) }}
                                type="password" id="password" name='password' placeholder='Enter password' />
                        </div>
                        <button className='button primary-button' >Login</button>
                    </form>
                    <p>Don't have an account? <Link to={"/register"} >Create one</Link> </p>
                </div>
            </main>
        </>
    )
}

export default Login