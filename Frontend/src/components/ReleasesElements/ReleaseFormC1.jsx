import React, { useState ,useEffect} from "react";
// Import Axios
import StepperComponent from "./stepper/ReleaseFormStepper";
import "./ReleaseFormC1.css";
import InputC1 from "../Inputs/inputC1";
import ButtonC1 from "../Buttons/buttonC1";
import { IconButton, TextField, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FileUploaderC1 from "../fileUploaded/fileUploaderC1";

const ReleaseUserForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  //Data to be posted to the server

  let formDataPost = {};

  //hadling the final submisiion
  const handleSubmit = async () => {
   
    setLoading(true);
    setMessage("");

   const data=formDataPost ;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage(response.data.message);
      alert("Song Submitted Successfully!");
    } catch (error) {
      console.error("Error uploading:", error);
      setMessage("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  // ---------------------------*** Step Components *** --------------------------------

  //step-1-------------------------------------------------------------------------------------
  const Step1 = () => {
    const [songDetails, setSongDetails] = useState({
      songName: "",
      primaryArtists: [""],
      featuringArtists: [""],
      authors: [""],
      composers: [""],
      musicProducers: [""],
      musicDirectors: [""],
      lyrics: "",
      lyricsFile: null,
    });

    // Update formDataPost when songDetails changes
    useEffect(() => {
      formDataPost = { ...songDetails };
    }, [songDetails]);

    // Function to handle text input changes
    const handleChange = (field, value) => {
      setSongDetails((prev) => ({ ...prev, [field]: value }));
    };

    // Function to add a new input field
    const handleAddField = (field) => {
      setSongDetails((prev) => ({
        ...prev,
        [field]: [...prev[field], ""],
      }));
    };

    // Function to remove an input field
    const handleRemoveField = (field, index) => {
      setSongDetails((prev) => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index),
      }));
    };

    const handleLyricsUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        setSongDetails((prev) => ({ ...prev, lyricsFile: file }));
      }
    };

    return (
      <div className="step1-main">
        <h2
          style={{
            color: "#00eeffc3",
            fontFamily: "sans-serif",
            fontWeight: "lighter",
          }}
        >
          Step 1: Enter Song Details
        </h2>

        {/* Song Title */}
        <label className="step1-label-1">Song Name:</label>
        <InputC1
          placeholder="Enter the Title"
          value={songDetails.songName}
          onChange={(e) => handleChange("songName", e.target.value)}
        />
        <br />

        {/* Dynamic Fields with Add/Remove Options */}
        {[
          { label: "Primary Artist", field: "primaryArtists" },
          { label: "Featuring Artist", field: "featuringArtists" },
          { label: "Author", field: "authors" },
          { label: "Composer", field: "composers" },
          { label: "Music Producer", field: "musicProducers" },
          { label: "Music Director", field: "musicDirectors" },
        ].map(({ label, field }) => (
          <div key={field}>
            <label className="step1-label-2">{label}(s):</label>
            {songDetails[field].map((_, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5vw",
                  marginBottom: "1vw",
                }}
              >
                <InputC1
                  placeholder={`Enter ${label} Name`}
                  value={songDetails[field][index]}
                  onChange={(e) => {
                    const newValues = [...songDetails[field]];
                    newValues[index] = e.target.value;
                    handleChange(field, newValues);
                  }}
                />
                {songDetails[field].length > 1 && (
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveField(field, index)}
                  >
                    <RemoveCircleIcon />
                  </IconButton>
                )}
              </div>
            ))}
            <IconButton color="primary" onClick={() => handleAddField(field)}>
              <AddCircleIcon  sx={{color:"grey"}}/>
            </IconButton>
          </div>
        ))}

        {/* Lyrics Section */}
        <label className="step1-label" style={{ color: "white" }}>
          <p sx={{ fontFamily: "sans-serif" }}>Lyrics (if any):</p>
        </label>
        <TextField
          label="Write Lyrics"
          placeholder="Type your lyrics here..."
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={songDetails.lyrics}
          onChange={(e) => handleChange("lyrics", e.target.value)}
          sx={{
            "& .MuiInputBase-input::placeholder": {
              color: "white",
              opacity: 1,
            },
            "& .MuiOutlinedInput-root": {
              color: "white",
              borderColor: "rgba(255, 255, 255, 0.5)",
            },
            "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.5)",
            },
          }}
          style={{ marginBottom: "1vw" }}
        />

        {/* File Input */}
        <input
          type="file"
          accept=".txt,.doc,.pdf"
          id="upload-lyrics"
          style={{ display: "none" }}
          onChange={handleLyricsUpload}
        />

        <label htmlFor="upload-lyrics">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
            color="primary"
          >
            Upload Lyrics File
          </Button>
        </label>
        {songDetails.lyricsFile && (
          <p>Uploaded: {songDetails.lyricsFile.name}</p>
        )}
        <br />
      </div>
    );
  };

  // step-2 --------------------------------------------------------------------------------------------

  const Step2 = () => {
    const [songFile, setSongFile] = useState(null);
    const [coverArt, setCoverArt] = useState(null);

    const handleSongUpload = (event) => {
      const file = event.target.files[0];
    
      if (file) {
        // Validate file type
        const allowedTypes = ["audio/mpeg", "audio/wav", "audio/ogg"];
        if (!allowedTypes.includes(file.type)) {
          alert("Please upload a valid audio file (MP3, WAV, OGG).");
          return;
        }
    
        // Validate file size (e.g., 10MB limit)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
          alert("File size should be less than 10MB.");
          return;
        }
    
        setSongFile(file);
      }
    };
    

    const handleCoverArtUpload = (event) => {
      const file = event.target.files[0];
    
      if (file) {
        // Validate file type (allowing only image formats)
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
          alert("Please upload a valid image file (JPEG, PNG, WEBP).");
          return;
        }
    
        // Validate file size (e.g., max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
          alert("File size should be less than 5MB.");
          return;
        }
    
        setCoverArt(file);
      }
    };
    
  // Update formDataPost when songDetails changes
  useEffect(() => {
    formDataPost = { ...songFile,...coverArt };
  }, [songFile,coverArt]);
    return (
      <div>
        <h2
          style={{
            color: "",
            fontFamily: "sans-serif",
            fontWeight: "lighter",
          }}
        >
          Step 2: Upload Your Song and Cover Art
        </h2>

        {/* Song Upload */}
        <input
          type="file"
          accept="audio/*"
          id="upload-song"
          style={{ display: "none" }}
          onChange={handleSongUpload}
        />
        <label htmlFor="upload-song">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
            color="primary"
          >
            Upload Song
          </Button>
        </label>
        {songFile && <p>Uploaded Song: {songFile.name}</p>}

        <br />

        {/* Cover Art Upload */}
        <input
          type="file"
          accept="image/*"
          id="upload-cover"
          style={{ display: "none" }}
          onChange={handleCoverArtUpload}
        />
        <label htmlFor="upload-cover">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
            color="primary"
          >
            Upload Cover Art
          </Button>
        </label>
        {coverArt && <p>Uploaded Cover Art: {coverArt.name}</p>}
      </div>
    );
  };

  // step-3---------------------------------------------------------------------------------------------
  const Step3 = () => (
    <div>
      <h2
        style={{
          color: "#00EEFF",
          fontFamily: "sans-serif",
          fontWeight: "lighter",
        }}
      >
        Step 3: Select Distribution Platforms
      </h2>
      <label>
        <input type="checkbox" /> Spotify
      </label>
      <br />
      <label>
        <input type="checkbox" /> Apple Music
      </label>
      <br />
      <label>
        <input type="checkbox" /> YouTube Music
      </label>
    </div>
  );

  // step-4
  const Step4 = () => (
    <div>
      <h2
        style={{
          color: "#00EEFF",
          fontFamily: "sans-serif",
          fontWeight: "lighter",
        }}
      >
        Step 4: Finalize & Submit
      </h2>
      <p>Review your details and submit your song for distribution.</p>
    </div>
  );

  // Array of Step Components
  const stepContent = [<Step1 />, <Step2 />, <Step3 />, <Step4 />];

  return (
    <>
      <div className="ReleaseForm-main">
        <StepperComponent activeStep={activeStep} stepContent={stepContent} />

        {/* Navigation Buttons */}
        <div className="stepper-buttons">
          {activeStep > 0 && (
            <ButtonC1
              content={"back"}
              onClick={() => setActiveStep(activeStep - 1)}
            ></ButtonC1>
          )}
          {activeStep < stepContent.length - 1 ? (
            <ButtonC1
              content={"Next"}
              onClick={() => setActiveStep(activeStep + 1)}
            ></ButtonC1>
          ) : (
            <button onClick={() => alert("Process Completed!")}>Finish</button>
          )}
        </div>
      </div>
    </>
  );
};

export default ReleaseUserForm;
