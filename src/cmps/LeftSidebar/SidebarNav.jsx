import { NavLink } from 'react-router-dom'

import { GoHomeFill } from 'react-icons/go'
import { FaSpotify } from 'react-icons/fa'
import { BiSearch } from 'react-icons/bi'
import { BiSolidSearch } from 'react-icons/bi'


export function SidebarNav() {
    return (
        <div className="sidebar-nav">
            <ul>
                <li><NavLink to="/" target="_blank" className="logo-link"><FaSpotify />Spotify</NavLink></li>
                <li><NavLink to="/"><GoHomeFill />Home</NavLink></li>
                <li>
                    <NavLink to="/search">
                        {({ isActive }) => (
                            <>
                                {isActive ? <BiSolidSearch /> : <BiSearch />}
                                Search
                            </>
                        )}
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}