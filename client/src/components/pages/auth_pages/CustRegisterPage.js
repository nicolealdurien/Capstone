// can change any/all class names for CSS...just placeholder stuff
import '../../css/AllRegisterPages.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const CustRegisterPage = ({history}) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [usaState, setUsaState] = useState('')
    const [zip, setZip] = useState('')
    const [error, setError] = useState('')


    const registerHandler = async (e) => {
        e.preventDefault()

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        if(password !== confirmPassword) {
            setPassword('')
            setConfirmPassword('')
            setTimeout(() => {
                setError('')
            }, 5000)
            return setError('Passwords do not match')
        }

        try {
            const { data } = await axios.post('/auth/customer-register', {username, email, password, street, city, usaState, zip}, config)

            localStorage.setItem('customerToken', data.token)
            localStorage.setItem('customerEmail', email)

            history.push('/')
        } catch (error) {
            setError(error.response.data.error)
            setTimeout(() => {
                setError('')
            }, 5000)
        }
    }

    

   
    return (
        <div className = 'register-screen'>
            <form onSubmit={registerHandler} className = 'register-screen__form'>
                <h3 className = 'register-screen__title'>Register</h3>
                {error && <span className='error-message'>{error}</span>}
                <div className = 'form-group'>
                    <input type='text' required id='name' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className = 'form-group'>
                    <input type='email' required id='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className = 'form-group'>
                    <input type='password' required id='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className = 'form-group'>
                    <input type='password' required id='confirmpassword' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
                <div className = 'form-group'>
                    <input type='text' required id='street' placeholder='Street Address' value={street} onChange={(e) => setStreet(e.target.value)}/>
                </div>
                <div className = 'form-group'>
                    <input type='text' required id='city' placeholder='City' value={city} onChange={(e) => setCity(e.target.value)}/>
                </div>
                <div className = 'form-group'>
                    <input type='text' required id='usaState' placeholder='State' value={usaState} onChange={(e) => setUsaState(e.target.value)}/>
                </div>
                <div className = 'form-group'>
                    <input type='text' required id='zip' placeholder='Zip' value={zip} onChange={(e) => setZip(e.target.value)}/>
                </div>
               
                <button type = 'submit' className = 'regbutton'>Register</button>
               
                <br/>
                <span className='register-screen__subtext'>Already have an account? <Link to='/auth/customer-login' className="guestloginlink">Log In</Link></span>
            </form><br/>
            <div className = 'guestlogin'>Want to check us out a bit more before sharing your address? <Link to = '/guest-login' className="guestloginlink">Login As Guest</Link>
            </div>
        </div>
    )
}

export default CustRegisterPage