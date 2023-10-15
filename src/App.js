import React, { useContext } from "react";

import PersonalInfo from "./Components/PersonalInfo";
import SelectPlan from "./Components/SelectPlan";
import AddOns from "./Components/AddOns";
import WrapUp from "./Components/WrapUp";
import Finished from "./Components/Finished";
import AuthContext from "./Store/auth-context";
import Step from "./Components/Step";

import classes from "./App.module.css";

function App() {
  const ctx = useContext(AuthContext);

  const stepClickHandler = (event) => {
    // const stepClicked = event.target.closest('li');
    // const badge = +stepClicked.firstElementChild.textContent;
    // ctx.updateStep(badge);
  };

  const stepsList = ctx.steps.map((step) => {
    return (
      <li className={classes.step} key={step.stepNo} onClick={stepClickHandler}>
        <Step
          badge={step.badge}
          stepNo={step.stepNo}
          description={step.description}
        />
      </li>
    );
  });

  return (
    <div className={classes.app}>
      <div className={classes.sidebar}>
        <ul>{stepsList}</ul>
      </div>
      {ctx.activeStep === 1 && <PersonalInfo />}
      {ctx.activeStep === 2 && <SelectPlan />}
      {ctx.activeStep === 3 && <AddOns />}
      {ctx.activeStep === 4 && <WrapUp />}
      {ctx.activeStep === 5 && <Finished />}
    </div>
  );
}

export default App;
