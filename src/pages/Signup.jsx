import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { showSuccessMsg } from '../services/event-bus.service'
import { stationService } from '../services/station/station.service.remote'
import { login, signup } from '../store/actions/user.actions'
import { addStation } from '../store/actions/station.actions'

export function Signup() {

    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ username: '', password: '', fullName: '' })

    async function onSignup(ev = null) {
        if (ev) ev.preventDefault()

        try {
            const user = await signup(credentials)
            const likedStation = stationService.getLikedSongsStation(user)
            addStation(likedStation)

            if (!credentials.username) return
            await login(credentials)

            navigate('/')
            showSuccessMsg(`Welcome ${user.fullname}`)

        } catch (err) {
            console.log('Error in signup:', err)
        }
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    return (
        <div className="signup login">
            <div className="login-container">
                <div className="login-content">
                    <h1>Sign up</h1>
                    <form className="login-form" onSubmit={onSignup}>

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

                        <span>Full name</span>
                        <input
                            name="fullName"
                            value={credentials.fullName}
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