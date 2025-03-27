import { useState } from "react";

const FileUploader = () => {
  const [imageFile, setImageFile] = useState(null);
  const [musicFile, setMusicFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingMusic, setUploadingMusic] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [musicUrl, setMusicUrl] = useState("");

  // Handle file selection
  const handleFileChange = (event, type) => {
    if (type === "image") {
      setImageFile(event.target.files[0]);
    } else if (type === "music") {
      setMusicFile(event.target.files[0]);
    }
  };

  // Upload function
  const handleUpload = async (file, type) => {
    if (!file) {
      alert(`Please select a ${type} file first!`);
      return;
    }

    if (type === "image") {
      setUploadingImage(true);
    } else {
      setUploadingMusic(true);
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", type === "image" ? "Himanshu" : "Himanshu"); // ✅ Use separate presets
    formData.append("chunk_size", 6000000); // ✅ Set chunk size (6MB for large files)

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dysuiz4wn/upload", // ✅ Correct endpoint for both image & music
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (type === "image") {
        setImageUrl(data.secure_url);
        console.log("✅ Image Uploaded:", data.secure_url);
      } else {
        setMusicUrl(data.secure_url);
        console.log("✅ Music Uploaded:", data.secure_url);
      }
    } catch (error) {
      console.error(`❌ Upload failed for ${type}:`, error);
    } finally {
      if (type === "image") {
        setUploadingImage(false);
      } else {
        setUploadingMusic(false);
      }
    }
  };

  return (
    <div>
      <h2>📷 Upload Image</h2>
      <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "image")} />
      <button onClick={() => handleUpload(imageFile, "image")} disabled={uploadingImage}>
        {uploadingImage ? "Uploading..." : "Upload Image"}
      </button>
      {imageUrl && (
        <div>
          <p>✅ Uploaded Image:</p>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            {imageUrl}
          </a>
        </div>
      )}

      <h2>🎵 Upload Music</h2>
      <input type="file" accept="audio/*" onChange={(e) => handleFileChange(e, "music")} />
      <button onClick={() => handleUpload(musicFile, "music")} disabled={uploadingMusic}>
        {uploadingMusic ? "Uploading..." : "Upload Music"}
      </button>
      {musicUrl && (
        <div>
          <p>✅ Uploaded Music:</p>
          <a href={musicUrl} target="_blank" rel="noopener noreferrer">
            {musicUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
