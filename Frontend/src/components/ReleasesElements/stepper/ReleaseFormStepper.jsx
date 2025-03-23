import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";
import "./ReleaseFormStepper.css"; // Import the CSS file

const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];

const StepperComponent = ({ activeStep, stepContent = [], heading }) => {
  return (
    <div className="custom-stepper">
      {/* Stepper Navigation */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step
            key={label}
            className={`custom-step ${
              activeStep === index
                ? "active"
                : activeStep > index
                ? "completed"
                : ""
            }`}
          >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Prevent undefined errors */}
      <div className="step-content">
        {stepContent[activeStep] ? stepContent[activeStep] : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default StepperComponent;
