import React, { useContext } from "react";
import Button from "./UI/Button";
import AuthContext from "../Store/auth-context";
import classes from './WrapUp.module.css';

const WrapUp = () => {
    const ctx = useContext(AuthContext);
    const planType = ctx.planType;
    const planName = ctx.plan.name;
    const planPrice = ctx.plan.price;
    const addOns = ctx.addOnsSummary;

    const addOnsList = addOns.map(a => {
        return (
            <div className={classes.flex} key={a.key}>
                <p>{a.key}</p>
                <div>{a.price}</div>
            </div>
        );
    });

    const addOnsTotalPrice = addOns.reduce((total, cur) => {
        return total += +cur.price.replace(/[^\d.-]/g, '');
    }, 0);

    const totalPrice = addOnsTotalPrice + +planPrice.replace(/[^\d.-]/g, '')

    const linkClickHandler = event => {
        event.preventDefault();
        ctx.updateStep(2);
    };

    const onGoBackHandler = () => {
        ctx.updateStep(3)
    };

    const onConfirmHandler = () => {
        ctx.updateStep(5);
    };

    return (
        <div className={classes.container}>
            <div className={classes['wrap-up']}>
                <h1>Finishing Up</h1>
                <p>Double-check everything looks OK before confirming</p>
                <div className={classes.summary}>
                    <div className={`${classes.flex} ${classes.plan}`}>
                        <div>
                            <h4>{`${planName} (${ctx.planType})`}</h4>
                            <p><a onClick={linkClickHandler} href="./SelectPlan.js">Change</a></p>
                        </div>
                        <h4>{planPrice}</h4>
                    </div>
                    {addOnsList}
                </div>
                <div className={`${classes.total} ${classes.flex}`}>
                    <p>Total (per {planType === 'monthly' ? 'month' : 'year'})</p>
                    <h4>{planType === 'monthly' ? `+$${totalPrice}/mo` : `$${totalPrice}/yr`}</h4>
                </div>
            </div>
            <div className={classes.actions}>
                <Button title='Go back' className={classes['back-btn']} onClick={onGoBackHandler} />
                <Button title='Confirm' className={classes['confirm-btn']} onClick={onConfirmHandler} />
            </div>
        </div>
    );
};

export default WrapUp;
