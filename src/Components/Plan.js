import React, { useContext } from "react";
import AuthContext from "../Store/auth-context";
import classes from './Plan.module.css';

const Plan = props => {
    const ctx = useContext(AuthContext);

    const clickHandler = () => {
        ctx.selectPlan(props.plan);
    };

    let classList;

    if (ctx.plan) {
        classList = `${classes.plan} ${ctx.plan.name === props.plan.name ? classes.selected : ''}`;
    } else {
        classList = classes.plan;
    };

    return (
        <div onClick={clickHandler} className={classList}>
            <img src={props.plan.image} alt={props.plan.alt} />
            <div className={classes['plan-description']}>
                <h3>{props.plan.name}</h3>
                <p>{props.plan.price}</p>
                <h5>{props.plan.discount}</h5>
            </div>
        </div>
    );
};

export default Plan;
