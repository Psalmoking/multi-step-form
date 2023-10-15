import React, { useContext } from 'react';
import AuthContext from '../Store/auth-context';

import iconThankYou from './../assets/images/icon-thank-you.svg';
import classes from './Finished.module.css';

const Finished = () => {
    const ctx = useContext(AuthContext);
    console.log(ctx);
    return (
        <div className={`${classes.finished} ${classes.container}`}>
            <img src={iconThankYou} alt='Thank you' />
            <h1>Thank you!</h1>
            <p>Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com</p>
        </div>
    );
};

export default Finished;
