import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { SvgButton } from "./SvgButton.jsx"
import { SvgIcon } from './SvgIcon'
import { utilService } from '../services/util.service.js'
import { SearchBox } from './SearchBox.jsx'
import { logout } from '../store/actions/user.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { LoginSignup } from './LoginSignup.jsx'


export function GlobalNav() {


    const user = useSelector((storeState) => storeState.userModule.loggedinUser)
    const navigate = useNavigate()
    const debouncedNavigate = utilService.debounce(navToResults, 500)
    const location = useLocation()
    const isHome = location.pathname === '/'
    const isBrowse = location.pathname === '/search'

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

    function handleChange(ev) {
        var value = ev.target.value
        debouncedNavigate(value)
    }

    function navToResults(value) {
        navigate(`/search/${value}`)
    }

    return (
        <div className="global-nav flex-center-space-between">

            <div className="global-nav-left flex-center-center">
                <SvgIcon iconName={"spotify"} />
            </div>
            <div className="global-nav-mid">
                <div className="homeIcon">
                    <Link to={`/`}>
                        <SvgButton
                            btnClass={isHome ? 'btn-global-nav-white' : 'btn-global-nav-gray'}
                            svgIcon={isHome ? 'homeFull' : 'home'}
                            svgClass="svg-big1"
                            tooltipTxt="Home"
                        />
                    </Link>
                </div>
                <div className="search-container">
                    <Link to={`/search`}>
                        <SearchBox handleChange={handleChange} isBrowse={isBrowse} />
                    </Link>
                </div>
            </div>
            <div className="global-nav-right">
                <div className="installApp">
                    <SvgButton
                        btnClass="btn-installApp-nav smaller-margin"
                        svgIcon='installApp'
                        svgClass="svg-small1"
                        tooltipTxt={"What's New"}
                    />
                    <span>Install App</span>
                </div>

                <SvgButton
                    btnClass="btn-search-nav"
                    svgIcon='bell'
                    svgClass="svg-small1"
                    tooltipTxt={"What's New"}
                />

                <div className="btn-global-nav-gray">
                    <button className="profile-btn">D</button>
                </div>
                {!user && (
                    <section className="user-info">
                        <LoginSignup />
                    </section>
                )}
            </div>
        </div>
    )
}