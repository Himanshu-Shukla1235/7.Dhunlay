import React, { useState } from "react";
import StepperComponent from "./ReleasesElements/stepper/ReleaseFormStepper";
import ReleaseUserForm from "./ReleasesElements/ReleaseFormC1";
import InputC1 from "./Inputs/inputC1";
import "./styles.css";
import ButtonC1 from "./Buttons/buttonC1";

import FileUploaderC1 from "./fileUploaded/fileUploaderC1";


const Test = () => {
  return (
    <>
      <div className="test-main">
      <FileUploaderC1></FileUploaderC1>
      </div>
    </>
  );
};

export default Test;
