import React, { useContext } from "react";
import Button from "./UI/Button";
import AuthContext from "../Store/auth-context";

import classes from './AddOns.module.css';

const AddOns = () => {
    const ctx = useContext(AuthContext);
    const addon = ctx.addon
    const { selectedAddons } = ctx;

    const checkHandler = (event) => {
        ctx.updateAddons(event.target.value, event.target.checked)
    };

    const onGoBackHandler = () => {
        ctx.updateStep(2);
    };

    const formSubmitHandler = () => {
        ctx.updateStep(4);
    };

    return (
        <div className={classes.container}>
            <div className={classes['add-ons']}>
                <h1>Pick add-ons</h1>
                <p>Add-ons help enhance your gaming experience</p>
                <form className={classes.form} onSubmit={formSubmitHandler}>
                    <div className={`${classes.addon} ${selectedAddons['Online service'] ? classes.selected : ''}`}>
                        <input type='checkbox' name='add-ons' value='Online service' onClick={checkHandler} defaultChecked={selectedAddons['Online service']} />
                        <div>
                            <div className={classes.description}>
                                <h4>Online service</h4>
                                <p>Access to multiplayer games</p>
                            </div>
                            <div className={classes.price}>{addon['Online service']}</div>
                        </div>
                    </div>
                    <div className={`${classes.addon} ${selectedAddons['Larger storage'] ? classes.selected : ''}`}>
                        <input type='checkbox' name='add-ons' value='Larger storage' onClick={checkHandler} defaultChecked={selectedAddons['Larger storage']} />
                        <div>
                            <div className={classes.description}>
                                <h4>Larger storage</h4>
                                <p>Extra 1TB of cloud save</p>
                            </div>
                            <div className={classes.price}>{addon['Larger storage']}</div>
                        </div>
                    </div>
                    <div className={`${classes.addon} ${selectedAddons['Customizable profile'] ? classes.selected : ''}`}>
                        <input type='checkbox' name='add-ons' value='Customizable profile' onClick={checkHandler} defaultChecked={selectedAddons['Customizable profile']} />
                        <div>
                            <div className={classes.description}>
                                <h4>Customizable profile</h4>
                                <p>Custom theme on your profile</p>
                            </div>
                            <div className={classes.price}>{addon['Customizable profile']}</div>
                        </div>
                    </div>
                </form>
            </div>
            <div className={classes.actions}>
                <Button title='Go back' className={classes['back-btn']} onClick={onGoBackHandler} />
                <Button title='Next step' className={classes['next-btn']} onClick={formSubmitHandler} />
            </div>
        </div>
    );
};

export default React.memo(AddOns);
