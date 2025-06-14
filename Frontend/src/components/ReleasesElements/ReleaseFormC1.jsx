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
import VideoPageC2 from "../show video/videoC2";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import ArticleIcon from "@mui/icons-material/Article";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import { useUser } from "../../pages/User/UserData";
import CircularProgress from "@mui/material/CircularProgress";
import { blackA } from "@radix-ui/colors";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { FileUpload } from "@mui/icons-material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useNavigate } from "react-router-dom";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

import {
  PrimaryArtistsProvider,
  usePrimaryArtists,
} from "../../components/primaryatistActions/getTotalPrimaryArtist";
import PrimaryArtistSelector2 from "../../components/Selector/selectorC2";
import UpsertPrimaryArtistForm from "../../components/primaryatistActions/addPrimaryArtist";
import { useParams } from "react-router-dom";
//!_________________________________________________ FUNCITON : ReleaseUserForm __________________________________
// datas
const ReleaseUserForm = () => {
  return (
    <PrimaryArtistsProvider>
      <ReleaseUserFormD />
    </PrimaryArtistsProvider>
  );
};
const ReleaseUserFormD = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [uploadUrl, setUploadedUrl] = useState(null);
  const backendAppUrl = import.meta.env.VITE_API_URL;

  const { userData } = useUser();
  const userId = String(userData?._id || "");

  console.log("frontend--", userId);
  //*--------------- GLOBAL FORM DATA STATE (data to be posted to the server)--------------------
  const [formDataPost, setFormDataPost] = useState({
    // Step 1
    releaseType: "",
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
    songFile: [""],
    coverArt: "",
    // Step 3
    releaseDate: null,
    isrc: "",
    upc: "",
    explicitContent: "no",
    distributionPlatform: [],
    //
    userId: userId,
    songUrl: [""],
    coverArtUrl: null,
  });

  useEffect(() => {
    if (userId) {
      setFormDataPost((prev) => ({
        ...prev,
        userId: userId,
      }));
    }
  }, [userId]);

  const [loader, setloader] = useState(false);

  //*--------------- FILE UPLOAD TO CLOUDINARRY -------------------------------
  const handleUploadCloudCover = async (file, type) => {
    // if (!file) {
    //   alert(Please select a ${type} file first!);
    //   return;
    // }
    setloader(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Himanshu" || "Himanshu");
    formData.append("chunk_size", 6000000); // 6MB chunk size for large files

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dysuiz4wn/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (type === "image") {
        formDataPost.coverArt = String(data.secure_url);
        formDataPost.coverArtUrl = String(data.secure_url);
        console.log("this is image url :", formDataPost.coverArt);
      } else {
        formDataPost.songFile = `${data.secure_url}`;
        formDataPost.songUrl = `${data.secure_url}`;
        console.log("this is song url :", formDataPost.songFile);
      }

      return data.secure_url;
    } catch (error) {
      console.error(`❌ Upload failed for ${type}:`, error);
    }
    setloader(false);
  };
  const handleUploadCloud = async (file, type) => {
    setloader(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Himanshu");
    formData.append("chunk_size", 6000000); // 6MB

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dysuiz4wn/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      setloader(false);
      return data.secure_url;
    } catch (error) {
      console.error(`❌ Upload failed for ${type}:`, error);
      setloader(false);
      return null;
    }
  };

  // UPLOAD N SONGS
  const handleUploadAllSongs = async () => {
    setloader(true);

    // make sure we actually have File objects
    const filesToUpload = formDataPost.songFile.filter(
      (f) => f instanceof File
    );
    const uploadedUrls = [];

    for (let file of filesToUpload) {
      const url = await handleUploadCloud(file, "wav"); // your existing helper
      if (url) uploadedUrls.push(url);
    }

    // update state immutably
    setFormDataPost((prev) => ({
      ...prev,
      songUrls: uploadedUrls,
    }));

    console.log("✅ Uploaded song URLs:", uploadedUrls);
    setloader(false);
    return uploadedUrls;
  };

  //*-----------------------------------  subscription check funtion----------------

  const fetchSubscription = async () => {
    const name = "perRelease";

    try {
      const res = await fetch(
        `${backendAppUrl}/api/getUserSub/${userId}/${name}`
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch subscription");
      }

      return data.data; // array of subscriptions
    } catch (error) {
      console.error("❌ Subscription fetch error:", error.message);
      return null;
    }
  };
  const navigate = useNavigate();
  //*--------------------------SUBMIT DATA TO SERVER -----------------------
  const handleSubmit = async () => {
    // validateFormDataPost();

    formDataPost.songFile = await handleUploadAllSongs(
      formDataPost.songFile,
      "wav"
    );
    formDataPost.coverArt = await handleUploadCloudCover(
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
        alert(`Please Subscribe a valid plan to continue  `);

        // After the alert, navigate
        navigate("/ourPlans"); // or the correct route in your frontend
        return;
      }

      const data = await response.json();
      if (data.success) {
        console.log("✅ Song uploaded successfully:", data);
        // Reset form data after successful submission
        setFormDataPost({
          releaseType: "",
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
          songFile: [""],
          coverArt: "",
          releaseDate: "",
          isrc: "",
          upc: "",
          explicitContent: "no",
          distributionPlatform: [],
        });
        alert("Process Completed!");
        navigate("/releases")
      } else {
        console.error("❌ Error uploading song:", data.message);
        alert(" Error uploading song:");
      }
    } catch (error) {
      console.error(" Network error:", error.message);
      alert("❌ Error uploading song:");
    }
  };

  //*------------------------ Step 1 Component: Song Details-----------------------

  // Main Page
  const Step1D = () => {
    return (
      <PrimaryArtistsProvider>
        <Step1 />
      </PrimaryArtistsProvider>
    );
  };
  const Step1 = ({ setFormDataPost, onNext }) => {
    const [selectedArtists, setSelectedArtists] = useState([]);
    const { artists, loading } = usePrimaryArtists();
    const navigate = useNavigate();

    const [localData, setLocalData] = useState({
      releaseType: "Single",
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

    useEffect(() => {
      console.log("Selected Artists:", selectedArtists);

      setLocalData((prevData) => ({
        ...prevData,
        primaryArtists: selectedArtists,
      }));
    }, [selectedArtists]);

    // Extract artist names as an array of strings (not objects)
    const artistNames = artists.map((a) => a.primaryArtistName);

    const checkRequired = () => {
      if (localData.songName == "") {
        alert("songName Required");
      } else if (localData.primaryArtists == [""]) {
        alert("primaryArtists Required");
      } else if (localData.releaseType == "") {
        alert("releaseType Required");
      } else {
        setActiveStep(activeStep + 1);
      }
    };

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
      checkRequired();
      if (onNext) onNext();
    };
    //    useEffect(() => {

    // }, [handleNextClick]);
    const references = [
      { que: "What is the name of the song?" },
      { que: "Who is the main artist or band?" },
      { que: "List any featured artists (if any)." },
      { que: "What genre does this song belong to?" },
      {
        que: "Do you own the rights to this song and have permission to distribute it?",
      },
      { que: "Would you like to set a release date or publish immediately?" },
    ];

    return (
      <div className="step-1-prev-main">
        <div className="step-1-prev-main-sec1">
          <div className="step-1-prev-main-sec11">
            <VideoPageC2 vid_src=""></VideoPageC2>
            <h4 style={{ opacity: "1" }}>
              <SlowMotionVideoIcon
                sx={{ color: "whitesmoke", fontSize: "1.3vw" }}
              ></SlowMotionVideoIcon>
              <span style={{ color: "#00EEFF" }}>DEMO VIDEO :</span> How to fill
              the release form {" >>>"}
            </h4>
          </div>
          <div className="step-1-prev-main-sec12">
            <h4>
              <ArticleIcon
                sx={{ fontSize: "1.3vw", color: "#00eeff" }}
              ></ArticleIcon>
              References
            </h4>
            <div className="step-1-prev-main-sec12-refrences">
              {references.map((item, index) => (
                <p key={index} style={{}}>
                  {index + 1}. {item.que}
                  <FileOpenIcon
                    sx={{ fontSize: "1.3vw", cursor: "pointer" }}
                    onClick={() =>
                      (window.location.href = "https://example.com")
                    }
                  ></FileOpenIcon>
                </p>
              ))}
            </div>
          </div>
        </div>{" "}
        <div className="step1-main">
          {/* <h2
            style={{
              color: "#00eeff",
              fontFamily: "sans-serif",
              fontWeight: "lighter",
            }}
          >
            Enter Song Details
          </h2> */}
          {/* Song Title */}
          <select
            className="ReleaseForm-releaseType"
            value={localData.releaseType || formDataPost.releaseType}
            onChange={(e) => handleChange("releaseType", e.target.value)}
            style={{}}
          >
            <option className="ReleaseForm-releaseType-option" value="Single">
              Single
            </option>
            <option className="ReleaseForm-releaseType-option" value="EP">
              EP
            </option>
            <option className="ReleaseForm-releaseType-option" value="Album">
              Album
            </option>
          </select>
          <br></br>
          <div className="ReleaseForm-primaryartistinput">
            <PrimaryArtistSelector2
              artistNames={artistNames} // Pass the artist names (strings)
              selectedArtists={selectedArtists}
              onChange={setSelectedArtists}
            />
            <p>
              {" "}
              If primary artist not exist please add / upsert{" "}
              <AddCircleIcon
                style={{ cursor: "pointer", color: "#00EEFF" }}
                onClick={() => navigate("/releases")}
              ></AddCircleIcon>
            </p>
            <div></div>
          </div>{" "}
          <label className="step1-label"></label>
          <br /> <br></br>
          <InputC1
            placeholder="* Enter the Title"
            value={localData.songName || formDataPost.songName}
            onChange={(e) => handleChange("songName", e.target.value)}
          ></InputC1>
          {/* Dynamic Fields */}
          {[
            { label: "Enter Featuring Artist", field: "featuringArtists" },
            { label: "Enter Author", field: "authors" },
            { label: "Enter Composer", field: "composers" },
            { label: "Enter Music Producer", field: "musicProducers" },
            { label: "Enter Music Director", field: "musicDirectors" },
          ].map(({ label, field }) => (
            <div key={field}>
              <label className="step1-label">{label}(s):</label>
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
                    placeholder={` ${label} Name`}
                    value={value}
                    required={true}
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
          Lyrics File Upload
          <input
            type="file"
            accept=".txt,.doc,.pdf"
            id="upload-lyrics"
            style={{ display: "none" }}
            onChange={handleLyricsUpload}
          />
          {/* <label htmlFor="upload-lyrics">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
              color="primary"
            >
              Upload Lyrics File
            </Button>
          </label> */}
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
                // setActiveStep(activeStep + 1);
              }}
            />
          ) : (
            <button onClick={() => alert("Process Completed!")}>Finish</button>
          )}
        </div>
      </div>
    );
  };

  // Step 2 Component: Upload Song & Cover Art
  const Step2 = () => {
    const [songFiles, setSongFiles] = useState([]); // array to hold all uploaded songs
    const [currentSongFile, setCurrentSongFile] = useState(null); // single selected file before adding

    const [coverFile, setCoverFile] = useState(null);
    const [loading, setLoading] = useState("a");
    const [loading1, setLoading1] = useState("a");

    // File size & resolution constraints
    const MAX_SONG_SIZE_MB = 100;
    const MAX_COVER_SIZE_MB = 2;
    const MIN_COVER_RESOLUTION = { width: 1440, height: 1440 };
    const MAX_COVER_RESOLUTION = { width: 3000, height: 3000 };

    const handleSongUpload = (file) => {
      if (!file) {
        alert("Please select a song file first.");
        return;
      }

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

      setCurrentSongFile(file); // temporarily store the selected file
    };
    const handleAddSong = () => {
      if (formDataPost.releaseType == "Single" && songFiles.length == 1) {
        alert("ReleaseType is : single , no more than one song selected");
      } else if (currentSongFile) {
        setSongFiles((prev) => [...prev, currentSongFile]);
        setCurrentSongFile(null); // clear for next
      } else {
        alert("Please select a valid song file before adding.");
      }
    };

    const handleCoverUpload = (file) => {
      if (!file) {
        setLoading1("a");
        alert(" Please upload a coverArt first.");
        return;
      }

      const fileSizeMB = file.size / (1024 * 1024);
      if (
        !file.name.toLowerCase().endsWith(".jpeg") &&
        !file.name.toLowerCase().endsWith(".jpg")
      ) {
        alert("Invalid format! Please upload a .jpeg file.");
        setLoading1("a");
        return;
      }
      if (fileSizeMB > MAX_COVER_SIZE_MB) {
        alert(
          `Cover image is too large! Max allowed size is ${MAX_COVER_SIZE_MB}MB.`
        );
        setLoading1("a");
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
          setLoading1("a");
          return;
        }
        setCoverFile(file);

        URL.revokeObjectURL(objectURL);
      };
    };

    const handleNextClick = () => {
      if (songFiles.length === 0) {
        alert("Please add at least one song.");
        return;
      }

      if (!coverFile) {
        alert("Cover art is required.");
        return;
      }

      setFormDataPost((prev) => ({
        ...prev,
        songFile: songFiles, // array
        coverArt: coverFile,
      }));

      setActiveStep(activeStep + 1);
    };

    return (
      <div className="step2-main">
        {/* <h2
          style={{
            color: "#00eeff",
            fontFamily: "sans-serif",
            fontWeight: "lighter",
          }}
        >
          Upload Song File
        </h2> */}
        <div className="step2-main1">
          <div className="step-2-main1-left">
            <h3>Song Upload</h3>
            <p>
              Upload your song in .wav format only. Maximum file size allowed:
              50MB (or whatever your MAX_SONG_SIZE_MB is).
            </p>
          </div>
          <div className="step-2-main1-right">
            <label className="file-upload">
              <input
                type="file"
                accept="audio/wav"
                onChange={(e) => handleSongUpload(e.target.files[0])}
              />
            </label>{" "}
            {currentSongFile && (
              <div style={{ color: "white", marginTop: "0.5rem" }}>
                Selected: {currentSongFile.name}
                <button onClick={handleAddSong} style={{ marginLeft: "1rem" }}>
                  Add Track
                </button>
              </div>
            )}
            {/* Display the uploaded song file name */}
            {/* {songFiles.length > 0 && (
              <div style={{ marginTop: "0.5rem", color: "white" }}>
                <h4>Added Tracks:</h4>
                <ul>
                  {songFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )} */}
            {/* <button
              className="step-2-main1-right-button1"
              onClick={async () => {
                try {
                  setLoading("b");
                  handleSongUpload(songFile);
                  const result = await handleUploadCloud(songFile, "wav");
                  setLoading("c");
                  console.log("song-Upload success:", result);
                } catch (error) {
                  console.error("song-Upload failed:", error);
                }
              }}
            >
              {loading == "a" ? (
                <p style={{ color: "black" }}>Submit</p>
              ) : loading == "b" ? (
                <p>
                  <CircularProgress></CircularProgress>
                </p>
              ) : (
                <p style={{ color: "black" }}>Submitted</p>
              )}
            </button>  */}
          </div>
          <div className="ReleaseForm-step2-main1-reviwTracs">
            {" "}
            <h4 style={{ color: "#00eeffd4" }}>Added Tracks:</h4>
            {songFiles.length > 0 && (
              <div style={{ marginTop: "0.5rem" }}>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {songFiles.map((file, index) => (
                    <li
                      key={index}
                      style={{
                        color: "white",
                        background: "#1e1e1e",
                        marginBottom: "0.5rem",
                        padding: "0.5rem 1rem",
                        borderRadius: "8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        {file.name} ({(file.size / (1024 * 1024)).toFixed(2)}{" "}
                        MB)
                      </div>
                      <button
                        onClick={() => {
                          const updated = [...songFiles];
                          updated.splice(index, 1);
                          setSongFiles(updated);
                        }}
                        style={{
                          background: "red",
                          color: "white",
                          border: "none",
                          padding: "0.3rem 0.7rem",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}{" "}
          </div>

          {/* //----------------------------- */}
        </div>
        <div className="step2-main2" style={{ marginTop: "1rem" }}>
          <div className="step2-main2-left">
            <h3>Cover Art Upload</h3>
            <p>
              Upload your cover art in .jpg or .jpeg format. Resolution must be
              between 1400×1400px and 3000×3000px, and file size should not
              exceed 10MB (or whatever your MAX_COVER_SIZE_MB is).
            </p>
          </div>
          <div className="step2-main2-right">
            <label
              className="file-upload"
              style={{
                display: "block",

                border: "4px dotted white",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                cursor: "pointer",
                borderRadius: "12px",
                opacity: "0.5",
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleCoverUpload(e.target.files[0])}
              />
            </label>
            {/* Display the uploaded cover file name */}
            {coverFile && (
              <div
                className="uploaded-file-name"
                style={{
                  marginTop: "0.5rem",
                  color: "white",
                  height: "5vh",
                  fontFamily: "sans-serif",
                }}
              >
                {coverFile.name}
              </div>
            )}
            {/* <button
              className="step-2-main1-right-button1"
              onClick={async () => {
                try {
                  setLoading1("b");
                  handleCoverUpload(coverFile);
                  const result = await handleUploadCloud(coverFile, "image");
                  setLoading1("c");
                  console.log("Cover-Upload success:", result);
                } catch (error) {
                  console.error("cover-Upload failed:", error);
                }
              }}
            >
              {loading1 == "a" ? (
                <p style={{ color: "black" }}>Submit</p>
              ) : loading1 == "b" ? (
                <p>
                  <CircularProgress></CircularProgress>
                </p>
              ) : (
                <p style={{ color: "black" }}>Submitted</p>
              )}
            </button> */}
          </div>
        </div>
        <div>
          {/* {activeStep > 0 && (
            <ButtonC1
              content={"Back"}
              onClick={() => setActiveStep(activeStep - 1)}
            />
          )} */}
          <ButtonC1
            content={"Next"}
            onClick={() => {
              handleNextClick();
              // setActiveStep(activeStep + 1);
            }}
          />
        </div>
      </div>
    );
  };

  // Step 3 Component: Additional Details
  const Step3 = () => {
    const [localData, setLocalData] = useState({
      releaseDate: "",
      isrc: formDataPost.isrc,
      upc: formDataPost.upc,
      explicitContent: formDataPost.explicitContent,
      distributionPlatform: formDataPost.distributionPlatform,
    });
    const check = () => {
      if (localData.releaseDate == "") {
        alert("Release Date is required");
        return;
      } else {
        setActiveStep(activeStep + 1);
      }
    };
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
      check();
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
            * Enter Release Date
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
        {/* <Typography variant="body1" color="#bbb">
          Select Distribution Platforms
        </Typography>
        <br />
        <Selector
          options={platforms}
          value={localData.distributionPlatform}
          onChange={(value) => handleChange("distributionPlatform", value)}
        />
        <br /> */}
        <div className="step-3-next-button">
          {/* {activeStep > 0 && (
            <ButtonC1
              content={"Back"}
              onClick={() => setActiveStep(activeStep - 1)}
            />
          )} */}
          {activeStep < stepContent.length - 1 ? (
            <ButtonC1
              content={"Next"}
              onClick={() => {
                handleNextClick();
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
      <div className="step-4-main" style={{ color: "white", padding: "1rem" }}>
        <h2>
          Review Your <span style={{ color: "white" }}>Submission</span>{" "}
        </h2>
        <div className="step-4-main-label">
          <h4>Release Type:</h4> <span>{formDataPost.releaseType || "NA"}</span>
        </div>
        <div className="step-4-main-label">
          <h4>Song Name:</h4> <span>{formDataPost.songName || "NA"}</span>
        </div>

        <div className="step-4-main-label">
          <h4>Primary Artists:</h4>
          <span>
            {formDataPost.primaryArtists?.length
              ? formDataPost.primaryArtists.join(", ")
              : "NA"}
          </span>
        </div>

        <div className="step-4-main-label">
          <h4>Featuring Artists:</h4>
          <span>
            {formDataPost.featuringArtists?.length
              ? formDataPost.featuringArtists.join(", ")
              : "NA"}
          </span>
        </div>

        <div className="step-4-main-label">
          <h4>Authors:</h4>
          <span>
            {formDataPost.authors?.length
              ? formDataPost.authors.join(", ")
              : "NA"}
          </span>
        </div>

        <div className="step-4-main-label">
          <h4>Composers:</h4>
          <span>
            {formDataPost.composers?.length
              ? formDataPost.composers.join(", ")
              : "NA"}
          </span>
        </div>

        <div className="step-4-main-label">
          <h4>Music Producers:</h4>
          <span>
            {formDataPost.musicProducers?.length
              ? formDataPost.musicProducers.join(", ")
              : "NA"}
          </span>
        </div>

        <div className="step-4-main-label">
          <h4>Music Directors:</h4>
          <span>
            {formDataPost.musicDirectors?.length
              ? formDataPost.musicDirectors.join(", ")
              : "NA"}
          </span>
        </div>

        <div className="step-4-main-label">
          <h4>Lyrics:</h4>
          <span>{formDataPost.lyrics || "NA"}</span>
        </div>

        {/* <div className="step-4-main-label">
          <h4>Lyrics File:</h4>
          <span>
            {formDataPost.lyricsFile ? formDataPost.lyricsFile.name : "NA"}
          </span>
        </div> */}

        <div className="step-4-main-label">
          <h4>Label Name:</h4>
          <span>{formDataPost.labelName || "NA"}</span>
        </div>

        <div className="step-4-main-label">
          <h4>Song File:</h4>
          <span>
            {formDataPost.songFile.length > 0
              ? formDataPost.songFile.map((file, index) => (
                  <span key={index}>
                    {file.name || file}{" "}
                    {/* file.name for File objects, file for URLs */}
                    {index !== formDataPost.songFile.length - 1 && ", "}
                  </span>
                ))
              : "NA"}
          </span>
        </div>

        <div className="step-4-main-label">
          <h4>Cover Art:</h4>
          <span>
            {formDataPost.coverArt
              ? formDataPost.coverArt.name || formDataPost.coverArt
              : "NA"}
          </span>
        </div>

        <div className="step-4-main-label">
          <h4>Release Date:</h4>
          <span>
            {formDataPost.releaseDate
              ? formDataPost.releaseDate.toString()
              : "NA"}
          </span>
        </div>

        <div className="step-4-main-label">
          <h4>ISRC:</h4>
          <span>{formDataPost.isrc || "NA"}</span>
        </div>

        <div className="step-4-main-label">
          <h4>UPC:</h4>
          <span>{formDataPost.upc || "NA"}</span>
        </div>

        <div className="step-4-main-label">
          <h4>Explicit Content:</h4>
          <span>{formDataPost.explicitContent || "NA"}</span>
        </div>

        {/* <div className="step-4-main-label">
          <h4>Distribution Platforms:</h4>
          <span>
            {formDataPost.distributionPlatform?.length
              ? formDataPost.distributionPlatform.join(", ")
              : "NA"}
          </span>
        </div> */}

        <div className="step-4-main-button-finish">
          {/* {activeStep > 0 && (
        <ButtonC1
          content={"Back"}
          onClick={() => setActiveStep(activeStep - 1)}
        />
      )} */}

          <button
            className="finish-button"
            onClick={() => {
              handleSubmit();
            }}
          >
            {loader == true ? (
              <p>
                <CircularProgress></CircularProgress>
              </p>
            ) : (
              <p style={{ color: "black" }}>Submit</p>
            )}
          </button>
        </div>
        {loader == true ? (
          <p className="ReleaseForm-main-finalsubmit-massage">Submitting your release, please wait... 🎶</p>
        ) : (
          <p style={{ color: "black" }}></p>
        )}
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
