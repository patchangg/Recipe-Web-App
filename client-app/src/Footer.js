import React from 'react';
import Typography from '@material-ui/core/Typography';
import "./css/Footer.css";

export default function Footer() {
    return (
        <div className="footer">
            <div className="footer-basic">
                <footer>
                    <center>
                        <p className="copyright">
                            <Typography>© 2021 PROGRAMMERS PTY LTD | All Rights Reserved | Terms of Service | Privacy</Typography>
                        </p>
                    </center>
                </footer>
            </div>
        </div>
    );
}