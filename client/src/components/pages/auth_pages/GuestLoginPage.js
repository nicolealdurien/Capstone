// can change any/all class names for CSS...just placeholder stuff
import '../../css/AllLoginPages.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const GuestLoginPage = ({history}) => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')


    const guestLoginHandler = async (e) => {
        e.preventDefault()

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const { data } = await axios.post('/auth/customerLogin', {
                email: 'donotdelete@thisistheguestlogin.com', 
                password: '123456' 
            }, config)

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

    const guestAdminLoginHandler = async (e) => {
        e.preventDefault()

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const { data } = await axios.post('/auth/adminLogin', {
                email: 'guest@admin.com', 
                password: 'guestadmin' 
            }, config)

            localStorage.setItem('adminToken', data.token)
            localStorage.setItem('adminEmail', email)
            
            history.push('/admin/product-manage')
        } catch (error) {
            setError(error.response.data.error)
            setTimeout(() => {
                setError('')
            }, 5000)
        }
    }

    const guestStaffLoginHandler = async (e) => {
        e.preventDefault()

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const { data } = await axios.post('/auth/staffLogin', {
                email: 'guest@staff.com', 
                password: 'gueststaff' 
            }, config)

            localStorage.setItem('staffToken', data.token)
            localStorage.setItem('staffEmail', email)
            
            history.push('/staffHome')
        } catch (error) {
            setError(error.response.data.error)
            setTimeout(() => {
                setError('')
            }, 5000)
        }
    }


    return (
        <div className = 'login-screen'>
            <div className = 'guest-login-container'>
                <form className = 'register-screen__form' onSubmit={guestLoginHandler}>
                    <h3 className = 'login-screen__title'>Guest Login</h3>
                    {error && <span className='error-message'>{error}</span>}
                    <button type = 'submit' className = 'guest-login-btn' style = {{backgroundColor: '#860286', padding: '8px', color: 'white'}}>Login As Guest</button><br/>
                    <span className='login-screen__subtext'>Want to make an account instead? <Link to='/auth/customer-register' style={{color: '#860286'}}>Register</Link></span>
                </form>
                <br/>
                <form className = 'register-screen__form' onSubmit={guestAdminLoginHandler}>
                    <h3 className = 'login-screen__title'>Guest Admin Login</h3>
                    {error && <span className='error-message'>{error}</span>}
                    <button type = 'submit' className = 'guest-login-btn' style = {{backgroundColor: '#860286', padding: '8px', color: 'white'}} >Login As Guest Admin</button>
                </form>
                <br/>
                <form className = 'register-screen__form' onSubmit={guestStaffLoginHandler}>
                    <h3 className = 'login-screen__title'>Guest Staff Login</h3>
                    {error && <span className='error-message'>{error}</span>}
                    <button type = 'submit' className = 'guest-login-btn' style = {{backgroundColor: '#860286', padding: '8px', color: 'white'}}>Login As Guest Staff</button>
                </form>
            </div>
        </div>
    )
}

export default GuestLoginPage