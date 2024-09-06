import { Link, useLocation, useNavigate } from 'react-router-dom'

import { SvgButton } from "./SvgButton.jsx"
import { SvgIcon } from './SvgIcon'
import { utilService } from '../services/util.service.js'


export function GlobalNav() {

    const navigate = useNavigate()
    const debouncedNavigate = utilService.debounce(navToResults, 1500)
    const location = useLocation()
    const isHome = location.pathname === '/'
    const isbrowse = location.pathname === '/search'

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
                        <div className="text-container">
                            <div>
                                <SvgButton
                                    btnClass="btn-search-nav"
                                    svgIcon="search"
                                    svgClass="svg-big1"
                                    tooltipTxt="Search"
                                />
                            </div>
                            <input
                                type="text"
                                name="txt"
                                placeholder="What do you want to play?"
                                onChange={handleChange}
                                required
                            />
                            <div className="flex-center-center">
                                <div className="border-element">
                                </div>
                            </div>
                            <div>
                                <SvgButton
                                    btnClass="btn-search-nav"
                                    svgIcon={isbrowse ? 'browseFull' : 'browse'}
                                    svgClass="svg-big1"
                                    tooltipTxt="Browse"
                                />
                            </div>
                        </div>
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
            </div>
        </div>
    )
}