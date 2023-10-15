import React, { Fragment, useContext } from 'react';
import AuthContext from './../Store/auth-context';

import classes from './Step.module.css';

const Step = props => {
    const ctx = useContext(AuthContext);

    const classList = `${classes['step-badge']} ${props.badge === ctx.activeStep ? classes['active-step'] : ''}`;

    return (
        <Fragment>
            <div className={classList}>{props.badge}</div>
            <div>
                <p className={classes['step-no']}>{props.stepNo}</p>
                <div className={classes['step-description']}>{props.description}</div>
            </div>
        </Fragment>
    );
};

export default Step;