import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { login } from '../store/actions/user.actions'

export function Login() {

    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ username: '', password: '' })

    async function onLogin(ev = null) {
        if (ev) ev.preventDefault()

        if (!credentials.username) return
        await login(credentials)
        navigate('/')
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    return (
        <div className="login">
            <div className="login-container">
                <div className="login-content">
                    <h1>Login</h1>
                    <form className="login-form" onSubmit={onLogin}>

                        <span>Email or username</span>
                        <input
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                        />

                        <span>Password</span>
                        <input
                            name="password"
                            type="password"
                            value={credentials.password}
                            onChange={handleChange}
                        />

                        <button className="btn-green">Log in</button>

                    </form>
                </div>
            </div>

            <footer>
                <span className="encore-text encore-text-marginal" data-encore-id="text">This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> apply.</span>
            </footer>

        </div>
    )
}