import { SvgIcon } from "../cmps/SvgIcon.jsx"
import { Link } from 'react-router-dom';
// Use <Link> for internal navigation within your app.
// Use <a> for external links and anchor links within the same page

export function Footer() {
    return (

        <footer className="footer">
            <div className="footer-top">
                <div className="footer-columns">
                    <div className="footer-column">
                        <h3 className="footer-heading">Company</h3>
                        <ul className="footer-links">
                            <li className="footer-link"><Link to="/about">About</Link></li>
                            <li className="footer-link"><Link to="/jobs">Jobs</Link></li>
                            <li className="footer-link"><Link to="/for-the-record">For the Record</Link></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3 className="footer-heading">Communities</h3>
                        <ul className="footer-links">
                            <li className="footer-link"><Link to="/for-artists">For Artists</Link></li>
                            <li className="footer-link"><Link to="/developers">Developers</Link></li>
                            <li className="footer-link"><Link to="/advertising">Advertising</Link></li>
                            <li className="footer-link"><Link to="/investors">Investors</Link></li>
                            <li className="footer-link"><Link to="/vendors">Vendors</Link></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3 className="footer-heading">Useful Links</h3>
                        <ul className="footer-links">
                            <li className="footer-link"><Link to="/support">Support</Link></li>
                            <li className="footer-link"><a href="#" onClick={(e) => e.preventDefault()}>Free Mobile App</a></li>
                            <li className="footer-link"><Link to="/plans">Sprintify Plans</Link></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3 className="footer-heading">Sprintify Plans</h3>
                        <ul className="footer-links">
                            <li className="footer-link"><Link to="/premium-individual">Premium Individual</Link></li>
                            <li className="footer-link"><Link to="/premium-duo">Premium Duo</Link></li>
                            <li className="footer-link"><Link to="/premium-family">Premium Family</Link></li>
                            <li className="footer-link"><Link to="/premium-student">Premium Student</Link></li>
                            <li className="footer-link"><Link to="/sprintify-free">Sprintify Free</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-social">
                    <ul className="footer-social-links">
                        <a className="instagram icon btn-social" href="#"/*"https://instagram.com/spotify*/ onClick={(e) => e.preventDefault()}><SvgIcon iconName={"instagram"} /></a>
                        <a className="twitter icon btn-social" href="#"/*"https://twitter.com/spotify"*/ onClick={(e) => e.preventDefault()}><SvgIcon iconName={"twitter"} /></a>
                        <a className="facebook icon btn-social" href="#" /*"https://www.facebook.com/Spotify"*/ onClick={(e) => e.preventDefault()}><SvgIcon iconName={"facebook"} /></a>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-legal-links-container">
                    <a className="footer-legal-links" href="#" onClick={(e) => e.preventDefault()}>Legal</a>
                    <a className="footer-legal-links" href="#" onClick={(e) => e.preventDefault()}>Safety & Privacy Center</a>
                    <a className="footer-legal-links" href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
                    <a className="footer-legal-links" href="#" onClick={(e) => e.preventDefault()}>Cookies</a>
                    <a className="footer-legal-links" href="#" onClick={(e) => e.preventDefault()}>About Ads</a>
                    <a className="footer-legal-links" href="#" onClick={(e) => e.preventDefault()}>Accessibility</a>
                </div>
                <div className="footer-copyright">
                    <p>© 2024 Sprintify AB</p>
                </div>
            </div>
        </footer>
    )
}

