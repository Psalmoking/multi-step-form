import React, { Fragment } from 'react';

import classes from './Button.module.css';


const Button = props => {
    return (
        <Fragment>
            <button className={`${classes.button} ${props.className}`} onClick={props.onClick}>{props.title}</button>
        </Fragment>
    );
};

export default Button;