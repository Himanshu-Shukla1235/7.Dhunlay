import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "../../pages/User/UserData";

const PrimaryArtistsContext = createContext();

export const usePrimaryArtists = () => useContext(PrimaryArtistsContext);

export const PrimaryArtistsProvider = ({ children }) => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useUser();
  const backendAppUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchArtists = async () => {
      if (!userData || !userData._id) return;

      try {
        const response = await fetch(
          `${backendAppUrl}/api/getAllPrimaryArtists?userId=${userData._id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (response.ok) {
          setArtists(data.data);
        } else {
          console.error("❌ Failed to fetch artists:", data.message);
        }
      } catch (error) {
        console.error("❌ Error fetching artists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [backendAppUrl, userData]);

  return (
    <PrimaryArtistsContext.Provider value={{ artists, loading }}>
      {children}
    </PrimaryArtistsContext.Provider>
  );
};

export default PrimaryArtistsProvider;
