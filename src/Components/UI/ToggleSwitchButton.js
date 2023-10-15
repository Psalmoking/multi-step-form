import React, { useContext } from "react";
import AuthContext from "../../Store/auth-context";

import classes from './ToggleSwitchButton.module.css';

const ToggleSwitchButton = () => {
    const ctx = useContext(AuthContext);

    const planType = ctx.planType;

    const toggleSwitchHandler = (event) => {
        ctx.selectPlan();
        if (planType === 'monthly') {
            ctx.updatePlanType('yearly');
        } else if (planType === 'yearly') {
            ctx.updatePlanType('monthly');
        };
    };

    return (
        <div className={classes['toggle-btn']} onClick={toggleSwitchHandler}>
            <div className={`${classes.circle} ${planType === 'yearly' ? classes.active : ''}`}></div>
        </div>
    );
};

export default ToggleSwitchButton;