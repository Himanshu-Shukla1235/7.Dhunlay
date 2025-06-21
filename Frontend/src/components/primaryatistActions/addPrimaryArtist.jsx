import React, { useState, useRef, useEffect } from "react";
import "./addPrimaryArtist.css";
import { useUser } from "../../pages/User/UserData";

const UpsertPrimaryArtistForm = () => {
  const [artistName, setArtistName] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [alreadyExists, setAlreadyExists] = useState(false); // ✅

  const { userData } = useUser();
  const backendAppUrl = import.meta.env.VITE_API_URL;

  if (!userData || !userData._id) {
    return <div className="artist-loading">Loading your user profile...</div>;
  }
  const responseRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (responseRef.current && !responseRef.current.contains(event.target)) {
        setResponseData(null);
        setAlreadyExists(false);
      }
    };

    if (responseData) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [responseData]);

  const user_Id = userData._id;

  const upsertPrimaryArtist = async (userId, artistName) => {
    try {
      const response = await fetch(`${backendAppUrl}/api/addPrimaryArtist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId, artistName }),
      });

      const data = await response.json();

      if (response.ok) {
        setAlreadyExists(data.alreadyExists); // ✅ store flag
        return data.data;
      } else {
        console.error("❌ Failed to upsert artist:", data.message);
        return null;
      }
    } catch (error) {
      console.error("❌ Error hitting upsert endpoint:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!artistName) return;

    setLoading(true);
    const result = await upsertPrimaryArtist(user_Id, artistName);
    setResponseData(result);
    setLoading(false);
  };

  return (
    <div className="artist-form-container">
      <h2 className="artist-form-title">Add / Upsert Primary Artist</h2>
      <form onSubmit={handleSubmit} className="artist-form">
        <input
          type="text"
          placeholder=" Artist name"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          className="artist-input"
        />
        <button type="submit" disabled={loading} className="artist-button">
          {loading ? "Saving..." : "Save Artist"}
        </button>
      </form>

      {responseData && (
        <div className="artist-response" ref={responseRef}>
          {" "}
          {/* ✅ attach the ref here */}
          {alreadyExists ? (
            <h4 className="artist-exists">
              ✅ Primary artist already exists.
              <p style={{ color: "black", fontWeight: "600" }}>
                {responseData.primaryArtistName}
              </p>
            </h4>
          ) : (
            <h4 className="artist-created">
              🎉 New primary artist  added. :{" "}
              
                {responseData.primaryArtistName}
           
             
            </h4>
          )}
        </div>
      )}
    </div>
  );
};

export default UpsertPrimaryArtistForm;
