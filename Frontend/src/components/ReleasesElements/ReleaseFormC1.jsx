import React, { useState, useEffect } from "react";
import "./ReleaseFormC1.css";
// Material UI & Icons
import {
  IconButton,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  MenuItem,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// Custom Components
import StepperComponent from "./stepper/ReleaseFormStepper";
import InputC1 from "../Inputs/inputC1";
import ButtonC1 from "../Buttons/buttonC1";
import FileUploaderC1 from "../fileUploaded/fileUploaderC1";
import CustomDatePicker from "../Datepicker/datePickerC1";
import Selector from "../selectors/selectC1";

const ReleaseUserForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [uploadUrl, setUploadedUrl] = useState(null);

  // Global form data state (data to be posted to the server)
  const [formDataPost, setFormDataPost] = useState({
    // Step 1
    songName: "",
    primaryArtists: [""],
    featuringArtists: [""],
    authors: [""],
    composers: [""],
    musicProducers: [""],
    musicDirectors: [""],
    C_line: "",
    p_line: "",
    labelName: "",
    lyrics: "",
    lyricsFile: null,
    language: "",
    genere: "",
    // Step 2
    songFile: null,
    coverArt: null,
    // Step 3
    releaseDate: null,
    isrc: "",
    upc: "",
    explicitContent: "no",
    distributionPlatform: [],
  });

  // File upload handler to Cloudinary
  const handleUploadCloud = async (file, type) => {
    if (!file) {
      alert(`Please select a ${type} file first!`);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.CLOUDINARY_UPLOAD_PRESET ||
        process.env.CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("chunk_size", 6000000); // 6MB chunk size for large files

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error(`❌ Upload failed for ${type}:`, error);
    }
  };
  const backendAppUrl = import.meta.env.VITE_API_URL;
  // Submit data to the server
  const handleSubmit = async () => {
    // Upload files before submission
    formDataPost.songFile = await handleUploadCloud(
      formDataPost.songFile,
      "wav"
    );
    formDataPost.coverArt = await handleUploadCloud(
      formDataPost.coverArt,
      "image"
    );
    console.log("cloudinary upload completed ........");

    try {
      // Validate that formDataPost contains meaningful data
      if (
        !formDataPost ||
        Object.values(formDataPost).every(
          (value) =>
            value === "" || (Array.isArray(value) && value.length === 0)
        )
      ) {
        console.error("❌ No valid data to submit");
        return;
      }

      console.log("📤 Submitting Data:", formDataPost);

      const response = await fetch(`${backendAppUrl}/api/metadata/meta`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataPost),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ HTTP Error ${response.status}: ${errorText}`);
        return;
      }

      const data = await response.json();
      if (data.success) {
        console.log("✅ Song uploaded successfully:", data);
        // Reset form data after successful submission
        setFormDataPost({
          songName: "",
          primaryArtists: [""],
          featuringArtists: [""],
          authors: [""],
          composers: [""],
          musicProducers: [""],
          musicDirectors: [""],
          C_line: "",
          p_line: "",
          labelName: "",
          lyrics: "",
          lyricsFile: "",
          language: "",
          genere: "",
          songFile: "",
          coverArt: "",
          releaseDate: "",
          isrc: "",
          upc: "",
          explicitContent: "no",
          distributionPlatform: [],
        });
      } else {
        console.error("❌ Error uploading song:", data.message);
      }
    } catch (error) {
      console.error("❌ Network error:", error.message);
    }
  };

  // Step 1 Component: Song Details
  const Step1 = ({ setFormDataPost, onNext }) => {
    const [localData, setLocalData] = useState({
      songName: "",
      primaryArtists: [""],
      featuringArtists: [""],
      authors: [""],
      composers: [""],
      musicProducers: [""],
      musicDirectors: [""],
      lyrics: "",
      lyricsFile: null,
      labelName: "",
      C_line: "",
      p_line: "", // changed to lowercase for consistency
    });

    const handleChange = (field, value) => {
      setLocalData((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddField = (field) => {
      setLocalData((prev) => ({
        ...prev,
        [field]: [...(prev[field] || []), ""],
      }));
    };

    const handleRemoveField = (field, index) => {
      setLocalData((prev) => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index),
      }));
    };

    const handleLyricsUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        setLocalData((prev) => ({ ...prev, lyricsFile: file }));
      }
    };

    const handleNextClick = () => {
      setFormDataPost((prev) => ({ ...prev, ...localData }));
      if (onNext) onNext();
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
          value={localData.songName || formDataPost.songName}
          onChange={(e) => handleChange("songName", e.target.value)}
        />
        <br />

        {/* Dynamic Fields */}
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
            {localData[field]?.map((value, index) => (
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
                  value={value}
                  onChange={(e) => {
                    const newValues = [...localData[field]];
                    newValues[index] = e.target.value;
                    handleChange(field, newValues);
                  }}
                />
                {localData[field].length > 1 && (
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
              <AddCircleIcon sx={{ color: "grey" }} />
            </IconButton>
          </div>
        ))}

        {/* Lyrics Section */}
        <label className="step1-label" style={{ color: "white" }}>
          <p style={{ fontFamily: "sans-serif" }}>Lyrics (if any):</p>
        </label>
        <TextField
          label="Write Lyrics"
          placeholder="Type your lyrics here..."
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={localData.lyrics || formDataPost.lyrics}
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

        {/* Lyrics File Upload */}
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
        <br />

        {/* Label Name */}
        <p style={{ fontFamily: "sans-serif" }}>Label Name</p>
        <InputC1
          placeholder="Enter the label name"
          value={localData.labelName || formDataPost.labelName}
          onChange={(e) => handleChange("labelName", e.target.value)}
        />
        <br />

        {/* C_line */}
        <p style={{ fontFamily: "sans-serif" }}>C_line</p>
        <InputC1
          placeholder="Enter the C_line"
          value={localData.C_line || formDataPost.C_line}
          onChange={(e) => handleChange("C_line", e.target.value)}
        />
        <br />

        {/* p_line */}
        <p style={{ fontFamily: "sans-serif" }}>P_line</p>
        <InputC1
          placeholder="Enter the P_line"
          value={localData.p_line || formDataPost.p_line}
          onChange={(e) => handleChange("p_line", e.target.value)}
        />
        <br />

        {/* Navigation */}
        {activeStep < stepContent.length - 1 ? (
          <ButtonC1
            content={"Next"}
            onClick={() => {
              handleNextClick();
              setActiveStep(activeStep + 1);
            }}
          />
        ) : (
          <button onClick={() => alert("Process Completed!")}>Finish</button>
        )}
      </div>
    );
  };

  // Step 2 Component: Upload Song & Cover Art
  const Step2 = () => {
    const [songFile, setSongFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);

    // File size & resolution constraints
    const MAX_SONG_SIZE_MB = 1000;
    const MAX_COVER_SIZE_MB = 2;
    const MIN_COVER_RESOLUTION = { width: 1440, height: 1440 };
    const MAX_COVER_RESOLUTION = { width: 3000, height: 3000 };

    const handleSongUpload = (file) => {
      if (!file) return;
      const fileSizeMB = file.size / (1024 * 1024);
      if (!file.name.toLowerCase().endsWith(".wav")) {
        alert("Invalid format! Please upload a .wav file.");
        return;
      }
      if (fileSizeMB > MAX_SONG_SIZE_MB) {
        alert(
          `Song file is too large! Max allowed size is ${MAX_SONG_SIZE_MB}MB.`
        );
        return;
      }
      setSongFile(file);
    };

    const handleCoverUpload = (file) => {
      if (!file) return;
      const fileSizeMB = file.size / (1024 * 1024);
      if (
        !file.name.toLowerCase().endsWith(".jpeg") &&
        !file.name.toLowerCase().endsWith(".jpg")
      ) {
        alert("Invalid format! Please upload a .jpeg file.");
        return;
      }
      if (fileSizeMB > MAX_COVER_SIZE_MB) {
        alert(
          `Cover image is too large! Max allowed size is ${MAX_COVER_SIZE_MB}MB.`
        );
        return;
      }

      const img = new Image();
      const objectURL = URL.createObjectURL(file);
      img.src = objectURL;
      img.onload = () => {
        if (
          img.width < MIN_COVER_RESOLUTION.width ||
          img.height < MIN_COVER_RESOLUTION.height ||
          img.width > MAX_COVER_RESOLUTION.width ||
          img.height > MAX_COVER_RESOLUTION.height
        ) {
          alert(
            `Invalid resolution! Cover image must be between ${MIN_COVER_RESOLUTION.width}x${MIN_COVER_RESOLUTION.height}px and ${MAX_COVER_RESOLUTION.width}x${MAX_COVER_RESOLUTION.height}px.`
          );
          URL.revokeObjectURL(objectURL);
          return;
        }
        setCoverFile(file);
        URL.revokeObjectURL(objectURL);
      };
    };

    const handleNextClick = () => {
      setFormDataPost((prev) => ({
        ...prev,
        songFile: songFile,
        coverArt: coverFile,
      }));
    };

    return (
      <div className="step2-main">
        <h2
          style={{
            color: "#00eeffc3",
            fontFamily: "sans-serif",
            fontWeight: "lighter",
          }}
        >
          Step 2: Upload Song File
        </h2>
        <div className="step2-main1">
          <div className="step-2-main1-left">
            <h3>Song Upload</h3>
          </div>
          <div className="step-2-main1-right">
            <label className="file-upload">
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => handleSongUpload(e.target.files[0])}
              />
              <span className="file-text">Upload Song</span>
            </label>
          </div>
        </div>
        <div className="step2-main2" style={{ marginTop: "1rem" }}>
          <div className="step2-main2-left">
            <h3>Cover Art Upload</h3>
          </div>
          <div className="step2-main2-right">
            <label className="file-upload">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleCoverUpload(e.target.files[0])}
              />
              <span className="file-text">Upload Cover</span>
            </label>
          </div>
        </div>
        <div>
          {activeStep > 0 && (
            <ButtonC1
              content={"Back"}
              onClick={() => setActiveStep(activeStep - 1)}
            />
          )}
          <ButtonC1
            content={"Next"}
            onClick={() => {
              handleNextClick();
              setActiveStep(activeStep + 1);
            }}
          />
        </div>
      </div>
    );
  };

  // Step 3 Component: Additional Details
  const Step3 = () => {
    const [localData, setLocalData] = useState({
      releaseDate: formDataPost.releaseDate,
      isrc: formDataPost.isrc,
      upc: formDataPost.upc,
      explicitContent: formDataPost.explicitContent,
      distributionPlatform: formDataPost.distributionPlatform,
    });

    const handleChange = (field, value) => {
      setLocalData((prev) => ({ ...prev, [field]: value }));
    };

    const platforms = [
      "Spotify",
      "Apple Music",
      "YouTube Music",
      "Amazon Music",
      "Tidal",
      "Deezer",
    ];

    const handleNextClick = () => {
      setFormDataPost((prev) => ({ ...prev, ...localData }));
    };

    return (
      <div className="step-3-main">
        <Typography variant="body1" color="#bbb">
          ISRC (optional)
        </Typography>
        <InputC1
          placeholder="ISRC"
          value={localData.isrc}
          onChange={(e) => handleChange("isrc", e.target.value)}
        />
        <br />
        <Typography variant="body1" color="#bbb">
          UPC (optional)
        </Typography>
        <InputC1
          placeholder="UPC"
          value={localData.upc}
          onChange={(e) => handleChange("upc", e.target.value)}
        />
        <br />
        <br />
        <div className="step3-main-datepicker">
          <Typography variant="body1" color="#bbb">
            Enter Release Date
          </Typography>
          <CustomDatePicker
            value={localData.releaseDate}
            onChange={(date) => handleChange("releaseDate", date)}
          />
        </div>
        <br />
        <br />
        <Typography variant="body1" color="#bbb">
          Explicit Content
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            row
            value={localData.explicitContent}
            onChange={(e) => handleChange("explicitContent", e.target.value)}
          >
            <FormControlLabel
              value="yes"
              control={<Radio sx={{ color: "#bbb" }} />}
              label="Yes"
            />
            <FormControlLabel
              value="no"
              control={<Radio sx={{ color: "#bbb" }} />}
              label="No"
            />
          </RadioGroup>
        </FormControl>
        <br />
        <br />
        <Typography variant="body1" color="#bbb">
          Select Distribution Platforms
        </Typography>
        <br />
        <Selector
          options={platforms}
          value={localData.distributionPlatform}
          onChange={(value) => handleChange("distributionPlatform", value)}
        />
        <br />
        <div>
          {activeStep > 0 && (
            <ButtonC1
              content={"Back"}
              onClick={() => setActiveStep(activeStep - 1)}
            />
          )}
          {activeStep < stepContent.length - 1 ? (
            <ButtonC1
              content={"Next"}
              onClick={() => {
                handleNextClick();
                setActiveStep(activeStep + 1);
              }}
            />
          ) : (
            <button onClick={() => alert("Process Completed!")}>Finish</button>
          )}
        </div>
      </div>
    );
  };

  // Step 4 Component: Review Submission
  const Step4 = () => {
    return (
      <div className="step4-main" style={{ color: "white", padding: "1rem" }}>
        <h2>Review Your Submission</h2>
        <p>
          <strong>Song Name:</strong> {formDataPost.songName || "NA"}
        </p>
        <p>
          <strong>Primary Artists:</strong>{" "}
          {formDataPost.primaryArtists?.length
            ? formDataPost.primaryArtists.join(", ")
            : "NA"}
        </p>
        <p>
          <strong>Featuring Artists:</strong>{" "}
          {formDataPost.featuringArtists?.length
            ? formDataPost.featuringArtists.join(", ")
            : "NA"}
        </p>
        <p>
          <strong>Authors:</strong>{" "}
          {formDataPost.authors?.length
            ? formDataPost.authors.join(", ")
            : "NA"}
        </p>
        <p>
          <strong>Composers:</strong>{" "}
          {formDataPost.composers?.length
            ? formDataPost.composers.join(", ")
            : "NA"}
        </p>
        <p>
          <strong>Music Producers:</strong>{" "}
          {formDataPost.musicProducers?.length
            ? formDataPost.musicProducers.join(", ")
            : "NA"}
        </p>
        <p>
          <strong>Music Directors:</strong>{" "}
          {formDataPost.musicDirectors?.length
            ? formDataPost.musicDirectors.join(", ")
            : "NA"}
        </p>
        <p>
          <strong>Lyrics:</strong> {formDataPost.lyrics || "NA"}
        </p>
        <p>
          <strong>Lyrics File:</strong>{" "}
          {formDataPost.lyricsFile ? formDataPost.lyricsFile.name : "NA"}
        </p>
        <p>
          <strong>Label Name:</strong> {formDataPost.labelName || "NA"}
        </p>
        <p>
          <strong>Song File:</strong>{" "}
          {formDataPost.songFile
            ? formDataPost.songFile.name || formDataPost.songFile
            : "NA"}
        </p>
        <p>
          <strong>Cover Art:</strong>{" "}
          {formDataPost.coverArt
            ? formDataPost.coverArt.name || formDataPost.coverArt
            : "NA"}
        </p>
        <p>
          <strong>Release Date:</strong>{" "}
          {formDataPost.releaseDate
            ? formDataPost.releaseDate.toString()
            : "NA"}
        </p>
        <p>
          <strong>ISRC:</strong> {formDataPost.isrc || "NA"}
        </p>
        <p>
          <strong>UPC:</strong> {formDataPost.upc || "NA"}
        </p>
        <p>
          <strong>Explicit Content:</strong>{" "}
          {formDataPost.explicitContent || "NA"}
        </p>
        <p>
          <strong>Distribution Platforms:</strong>{" "}
          {formDataPost.distributionPlatform?.length
            ? formDataPost.distributionPlatform.join(", ")
            : "NA"}
        </p>
        <div>
          {activeStep > 0 && (
            <ButtonC1
              content={"Back"}
              onClick={() => setActiveStep(activeStep - 1)}
            />
          )}
          <button
            onClick={() => {
              alert("Process Completed!");
              handleSubmit();
            }}
          >
            Finish
          </button>
        </div>
      </div>
    );
  };

  // Array of Step Components
  const stepContent = [
    <Step1 setFormDataPost={setFormDataPost} key="step1" />,
    <Step2 key="step2" />,
    <Step3 key="step3" />,
    <Step4 key="step4" />,
  ];

  return (
    <div className="ReleaseForm-main">
      <StepperComponent activeStep={activeStep} stepContent={stepContent} />
    </div>
  );
};

export default ReleaseUserForm;
