import React, { useContext } from "react";
import Plan from "./Plan";
import ToggleSwitchButton from "./UI/ToggleSwitchButton";
import Button from "./UI/Button";
import AuthContext from "../Store/auth-context";
import classes from './SelectPlan.module.css';

const SelectPlan = props => {
    const ctx = useContext(AuthContext);

    const planType = ctx.planType

    const plan = ctx.availablePlans;

    const planList = plan.map(plan => {
        return (
            <Plan
                key={plan.alt}
                plan={plan}
            />
        );
    });

    const toMonthlyHandler = () => {
        ctx.updatePlanType('monthly');
    };

    const toYearlyHandler = () => {
        ctx.updatePlanType('yearly');
    };

    const onGoBackHandler = () => {
        ctx.updateStep(1);
    };

    const planSubmitHandler = () => {
        if (ctx.plan) {
            ctx.updateStep(3)
        };
    };

    return (
        <div className={classes.container}>
            <div className={classes['select-plan']}>
                <h1>Select your plan</h1>
                <p>You have the option of monthly or yearly billing</p>
                <form onSubmit={planSubmitHandler}>
                    <div className={classes['plan-list']}>
                        {planList}
                    </div>
                    <div className={classes.switch}>
                        <div className={planType === 'monthly' ? classes.active : ''} onClick={toMonthlyHandler}>Monthly</div>
                        <div><ToggleSwitchButton /></div>
                        <div className={planType === 'yearly' ? classes.active : ''} onClick={toYearlyHandler}>Yearly</div>
                    </div>
                </form>
            </div>
            <div className={classes.actions}>
                <Button title='Go back' className={classes['back-btn']} onClick={onGoBackHandler} />
                <Button title='Next step' className={classes['next-btn']} onClick={planSubmitHandler} />
            </div>
        </div>
    );
};

export default SelectPlan;