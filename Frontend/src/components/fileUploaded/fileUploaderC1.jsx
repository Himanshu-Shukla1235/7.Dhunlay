import { useState } from "react";
import "./fileUploaderC1.css";

const FileUploaderC1 = () => {
  const [fileName, setFileName] = useState("No file selected");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("No file selected");
    }
  };

  return (
    <label className="custom-file-upload" htmlFor="file">
      <div className="icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
          <path
            fill=""
            d="M10 1C9.73 1 9.48 1.1 9.29 1.29L3.29 7.29C3.1 7.48 3 7.73 3 8V20C3 21.65 4.34 23 6 23H7C7.55 23 8 22.55 8 22C8 21.45 7.55 21 7 21H6C5.45 21 5 20.55 5 20V9H10C10.55 9 11 8.55 11 8V3H18C18.55 3 19 3.45 19 4V9C19 9.55 19.45 10 20 10C20.55 10 21 9.55 21 9V4C21 2.34 19.65 1 18 1H10ZM9 7H6.41L9 4.41V7ZM14 15.5C14 14.12 15.12 13 16.5 13C17.88 13 19 14.12 19 15.5V16V17H20C21.1 17 22 17.9 22 19C22 20.1 21.1 21 20 21H13C11.9 21 11 20.1 11 19C11 17.9 11.9 17 13 17H14V16V15.5ZM16.5 11C14.14 11 12.2 12.81 12.01 15.12C10.28 15.56 9 17.13 9 19C9 21.21 10.79 23 13 23H20C22.21 23 24 21.21 24 19C24 17.13 22.72 15.56 20.98 15.12C20.79 12.81 18.86 11 16.5 11Z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </div>
      <div className="text">
        <span>
          {fileName === "No file selected" ? "Click to upload image" : fileName}
        </span>
      </div>
      <input
        type="file"
        id="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </label>
  );
};

export default  FileUploaderC1;
