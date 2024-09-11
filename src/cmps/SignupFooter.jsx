import { useNavigate } from 'react-router-dom'

export function SignupFooter() {

    const navigate = useNavigate()

    return (
        <div className="signup-footer">
            <div>
                <p>Preview of Sprintify</p>
                <p>Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.</p>
            </div>
            <button className="btn-white-big" onClick={() => navigate('/signup')}>Sign up free</button>
        </div>
    )
}