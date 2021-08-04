import React from 'react';
import Typography from '@material-ui/core/Typography';
import "./css/Footer.css";
import { Link } from 'react-router-dom';
// Footer Component to render on every page
export default function Footer() {
    return (
        <div className="footer">
            <div className="footer-basic">
                <footer>
                    <center>
                        <p className="copyright">
                            <Typography>© {new Date().getFullYear()} PROGRAMMERS PTY LTD | <Link to={{ pathname: "https://github.com/patchangg/Recipe-Web-App" }} target="_blank">Recipe Manager App</Link> | <Link to="/TOS">Terms of Service</Link> | <Link to="/PrivacyPolicy">Privacy</Link></Typography>
                        </p>
                    </center>
                </footer>
            </div>
        </div>
    );
}