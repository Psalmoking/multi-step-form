import React, { useState } from "react";
import AuthContext from "./auth-context";
import iconArcade from './../assets/images/icon-arcade.svg';
import iconAdvanced from './../assets/images/icon-advanced.svg';
import iconPro from './../assets/images/icon-pro.svg';

const AuthContextProvider = (props) => {
    const steps = [
        { badge: 1, stepNo: "STEP 1", description: 'YOUR INFO' },
        { badge: 2, stepNo: 'STEP 2', description: 'SELECT PLAN' },
        { badge: 3, stepNo: 'STEP 3', description: 'ADD-ONS' },
        { badge: 4, stepNo: 'STEP 4', description: 'SUMMARY' },
    ];

    const monthlyPlans = [
        { name: 'Arcade', price: '$9/mo', alt: 'arcade', discount: '', image: iconArcade, selected: false },
        { name: 'Advanced', price: '$12/mo', alt: 'advanced', discount: '', image: iconAdvanced, selected: false },
        { name: 'Pro', price: '$15/mo', alt: 'pro', discount: '', image: iconPro, selected: false },
    ];

    const yearlyPlans = [
        { ...monthlyPlans[0], price: '$90/yr', discount: '2 months free' },
        { ...monthlyPlans[1], price: '$120/yr', discount: '2 months free' },
        { ...monthlyPlans[2], price: '$150/yr', discount: '2 months free' },
    ];

    const monthlyAddon = {
        'Online service': '+$1/mo',
        'Larger storage': '+$2/mo',
        'Customizable profile': '+$2/mo',
    };

    const yearlyAddon = {
        'Online service': '+$10/yr',
        'Larger storage': '+$20/yr',
        'Customizable profile': '+$20/yr',
    };

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        phoneNo: '',
    });

    const updateUserInfo = (info) => {
        setUserInfo(info);
    };

    const [activeStep, setActiveStep] = useState(1);
    const [planType, setPlanType] = useState('monthly');
    const [plan, setPlan] = useState({ name: 'Arcade', price: '$9/mo', alt: 'arcade', discount: '', image: iconArcade, selected: false });
    const [selectedAddons, setSelectedAddons] = useState({
        'Online service': true,
        'Larger storage': true,
        'Customizable profile': false,
    });

    const availablePlans = planType === 'monthly' ? monthlyPlans : yearlyPlans;

    const addon = planType === 'monthly' ? monthlyAddon : yearlyAddon;


    const stepChangeHandler = (step) => {
        setActiveStep(step);
    };

    const prevStepHandler = () => {
        setActiveStep(curStep => curStep - 1);
    };

    const nextStepHandler = () => {
        setActiveStep(curStep => curStep + 1);
    };

    const updatePlanType = (planType) => {
        setPlanType(planType);
    };

    const selectPlan = (plan) => {
        setPlan(plan);
    };

    const updateAddons = (addon, value) => {
        selectedAddons[addon] = value;
        setSelectedAddons(prevAddons => {
            return {
                ...prevAddons,
                [addon]: value,
            };
        });
    };

    const addOnsSummaryKeys = Object.entries(selectedAddons)
        .filter(key => key[1] === true)
        .map(key => key[0]);

    const addOnsSummary = addOnsSummaryKeys.map(key => {
        return {
            key: [key],
            price: addon[key],
        };
    });

    return (
        <AuthContext.Provider value={{
            activeStep: activeStep,
            steps: steps,
            planType: planType,
            availablePlans: availablePlans,
            addon: addon,
            plan: plan,
            selectedAddons: selectedAddons,
            addOnsSummary: addOnsSummary,
            userInfo: userInfo,
            updateUserInfo: updateUserInfo,
            updateStep: stepChangeHandler,
            toPrevStep: prevStepHandler,
            toNextStep: nextStepHandler,
            updatePlanType: updatePlanType,
            selectPlan: selectPlan,
            updateAddons: updateAddons,
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;