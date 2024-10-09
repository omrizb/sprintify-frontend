import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { logout } from '../store/actions/user.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { PopUp } from './PopUp.jsx'
import { DropDownMenu } from './Menus/DropDownMenu.jsx'


export function ProfileButton() {

    const navigate = useNavigate()
    const user = useSelector((storeState) => storeState.userModule.user)

    const [showUserMenu, setShowUserMenu] = useState(false)
    const userMenuBtnRef = useRef(null)

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg('Logout successfully')
            navigate('/')
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot logout')
        }
    }

    async function onLogout() {
        await logout()
        navigate('/')
    }

    const userMenuItems = [
        {
            type: 'list-item',
            name: 'Logout',
            onClick: onLogout,
        }
    ]

    return (

        <div className="profile-button">
            {user
                ?
                <div className="profile btn-global-nav-gray">
                    <button
                        ref={userMenuBtnRef}
                        className="profile-btn"
                        onClick={() => setShowUserMenu(true)}
                    >
                        {user.username[0].toUpperCase()}
                    </button>
                    {showUserMenu && <PopUp btnRef={userMenuBtnRef} onClosePopUp={() => setShowUserMenu(false)} >
                        <DropDownMenu listItems={userMenuItems} />
                    </PopUp>}
                </div>
                : <div className="login-signup">
                    <button className="btn-dark-big" onClick={() => navigate('/signup')}>Sign up</button>
                    <button className="btn-white-big" onClick={() => navigate('/login')}>Login</button>
                </div>
            }
        </div>

    )
}