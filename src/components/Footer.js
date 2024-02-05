// Footer.js
import React from 'react';

import Grid from '@mui/material/Grid';
import colors from "../colors";
import logo from "../images/logo.png";


const Footer = () => {
    return (
            <Grid container rowSpacing={1} columnSpacing={{ xs: 12, sm: 4 }}
                  sx={{marginTop: 'calc(10% + 60px)',
                        width: '100%',
                        bottom: 0,
                        backgroundColor: colors.menuBarBackground,
                        paddingTop : 0}}>
                <Grid item xs={12} sm={3}>
                    <img src={logo} alt="My Travel" style={{ maxWidth: '100%', height: 'auto', marginLeft: '10px' }}/>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <br/>
                    <h2>Our Services</h2>
                    <h5>
                        <p>Seat Reservation</p>
                        <p>Online Payment</p>
                        <p>Transport Management</p>
                        <p>Report Generation</p>
                        <p>Customer Feedbacks</p>
                    </h5>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <br/>
                    <h2>About Us</h2>
                    <h5>
                        <p>Our Story</p>
                        <p>Benefits</p>
                        <p>Team</p>
                        <p>Careers</p>
                    </h5>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <br/>
                    <h2>Contact Us</h2>
                    <h5>
                        <p>Apex pvt Ltd, Union Place, Colombo</p>
                        <p>94-11-2329358</p>
                    </h5>
                </Grid>
            </Grid>

    );
};

export default Footer;
