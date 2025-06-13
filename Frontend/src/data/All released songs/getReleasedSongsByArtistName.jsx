import { createContext, useContext, useState, useEffect } from "react";

const ReleasedSongsContext = createContext(null);

export const ReleasedSongsProvider = ({ artistNames, children }) => {
  const [songs, setSongs] = useState([]);
  const backendAppUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!artistNames || artistNames.length === 0) return;

    const fetchReleasedSongs = async () => {
      try {
        const query = artistNames
          .map((name) => `artistNames[]=${encodeURIComponent(name)}`)
          .join("&");

        const response = await fetch(
          `${backendAppUrl}/api/releasedSongsData?${query}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();
        console.log("resulting song data:",result);

        if (result.success) {
          setSongs(result.data);
        } else {
          console.warn("⚠️ Failed to fetch released songs:", result.message);
        }
      } catch (error) {
        console.error("❌ Error fetching released songs:", error);
      }
    };

    fetchReleasedSongs();
  }, [artistNames, backendAppUrl]);

  return (
    <ReleasedSongsContext.Provider value={{ songs, setSongs }}>
      {children}
    </ReleasedSongsContext.Provider>
  );
};

export const useReleasedSongs = () => {
  const context = useContext(ReleasedSongsContext);
  if (!context) {
    throw new Error("useReleasedSongs must be used within a ReleasedSongsProvider");
  }
  return context;
};
