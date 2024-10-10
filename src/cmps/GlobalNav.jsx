import { Link, useLocation, useNavigate } from 'react-router-dom'

import { utilService } from '../services/util.service.js'
import { SearchBox } from './SearchBox.jsx'
import { SvgButton } from './SvgButton.jsx'
import { SvgIcon } from './SvgIcon'
import { ProfileButton } from './ProfileButton.jsx'


export function GlobalNav() {

    const navigate = useNavigate()
    const debouncedNavigate = utilService.debounce(navToResults, 500)
    const location = useLocation()

    const isHome = location.pathname === '/'
    const isBrowse = location.pathname === '/search'
    const isLibrary = location.pathname === '/library'


    function handleChange(ev) {
        var value = ev.target.value
        debouncedNavigate(value)
    }

    function navToResults(value) {
        navigate(`/search/${value}`)
    }

    return (
        <div className="global-nav ">

            <div className="global-nav-left flex-center-center">
                <SvgIcon iconName={"spotify"} />
            </div>
            <div className="global-nav-mid">
                <div className="home-icon">
                    <Link className="nav-icon" to={`/`}>
                        <SvgButton
                            btnClass={isHome ? 'btn-global-nav-white' : 'btn-global-nav-gray'}
                            svgIcon={isHome ? 'homeFull' : 'home'}
                            svgClass="svg-big1"
                            tooltipTxt="Home"
                        />
                        <p className="icon-title">Home</p>
                    </Link>
                </div>

                <div className="search-container">
                    <Link className="nav-icon" to={`/search`}>
                        <SearchBox handleChange={handleChange} isBrowse={isBrowse} />
                    </Link>

                </div>

                <div className="search-icon">
                    <Link className="nav-icon" to={`/search`}>
                        <div className="mobile-search">
                            <SvgButton
                                btnClass={isBrowse ? 'btn-global-nav-white' : 'btn-global-nav-gray'}
                                svgIcon={isBrowse ? 'search' : 'search'}
                                svgClass="svg-big1"
                                tooltipTxt="Search"
                            />
                        </div>
                        <p className="icon-title">Search</p>
                    </Link>
                </div>

                <div className="library-icon">
                    <Link className="nav-icon" to={`/library`}>
                        <SvgButton
                            btnClass={isLibrary ? 'btn-global-nav-white' : 'btn-global-nav-gray'}
                            svgIcon={isLibrary ? 'library' : 'libraryClose'}
                            svgClass="svg-big1"
                            tooltipTxt="My Library"
                        />
                        <p className="icon-title">Your Library</p>
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
                <ProfileButton />
            </div>
        </div>
    )
}