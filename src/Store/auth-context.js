import React from 'react';

const AuthContext = React.createContext({
    steps: [],
    activeStep: '',
    planType: '',
    availablePlans: '',
    plan: '',
    addon: '',
    selectedAddons: '',
    addOnsSummary: '',
    userInfo: {
        name: '',
        email: '',
        phoneNo: '',
    },
    updateUserInfo: () => { },
    updateStep: () => { },
    toPrevStep: () => { },
    toNextStep: () => { },
    updatePlanType: () => { },
    selectPlan: () => { },
    updateAddons: () => { },
});

export default AuthContext;
