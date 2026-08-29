import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import Navbar from '../../shared/components/Navbar'

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")

    const {loading,handleRegister} = useAuth()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            await handleRegister({username,email,password})
            navigate("/dashboard")
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.")
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
                        <h1>Create your account</h1>
                        <p>Start preparing for your dream role today</p>
                    </div>
                    <form onSubmit={handleSubmit}>

                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input
                                onChange={(e) => { setUsername(e.target.value) }}
                                type="text" id="username" name='username' placeholder='Enter username' />
                        </div>
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

                        {error && <div className='form-error'>{error}</div>}
                        <button className='button primary-button' >Create Account</button>

                    </form>

                    <p>Already have an account? <Link to={"/login"} >Log in</Link> </p>
                </div>
            </main>
        </>
    )
}

export default Register