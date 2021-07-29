import Typography from '@material-ui/core/Typography';
import "./css/Footer.css";
import React from 'react';

export default function Footer() {
    return (
        <div className="footer">
            <div class="footer-basic">
                <footer>
                    <center>
                        <p class="copyright">
                            <Typography>© 2021 PROGRAMMERS PTY LTD | All Rights Reserved | Terms of Service | Privacy</Typography>
                        </p>
                    </center>
                </footer>
            </div>
        </div>
    );
}