import React, { useState } from "react";

import "./addPrimArtist.css"; // Optional CSS for styling the page
import UpsertPrimaryArtistForm from "../../components/primaryatistActions/addPrimaryArtist";

const AddPrimaryArtistPage = () => {


 

 

  return (
    <div className="addPrimArtist">
      <h2>Add Primary Artists</h2>

   
<UpsertPrimaryArtistForm></UpsertPrimaryArtistForm>
    </div>
  );
};

export default AddPrimaryArtistPage;
