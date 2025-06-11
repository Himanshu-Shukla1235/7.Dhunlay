import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "../../pages/User/UserData"; // adjust path as needed

const UserSongsContext = createContext(null);

// Context Provider
export const UserSongsProvider = ({ children }) => {
  
  const [userSongsData, setUserSongsData] = useState([]);
  const backendAppUrl = import.meta.env.VITE_API_URL;
  const { userData } = useUser(); // pulls from user context
  const userId = userData?._id; // safely access userId
  

  useEffect(() => {
    if (!userId) return;

    const fetchUserSongs = async () => {
      console.log("Fetching songs for user:", userId);
      try {
        const response = await fetch(
          `${backendAppUrl}/api/getAllSongsByUser?userId=${userId}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();
        console.log("🎵 Songs uploaded by user:", result);

        if (result.success) {
          setUserSongsData(result);
        } else {
          console.warn("⚠️ Failed to fetch user songs:", result.message);
        }
      } catch (error) {
        console.error("❌ Error fetching user songs:", error);
      }
    };

    fetchUserSongs();
  }, [userId, backendAppUrl]);

  return (
    <UserSongsContext.Provider value={{ userSongsData, setUserSongsData }}>
      {children}
    </UserSongsContext.Provider>
  );
};

// Custom Hook
export const useUserSongs = () => {
  const context = useContext(UserSongsContext);
  if (!context) {
    throw new Error("useUserSongs must be used within a UserSongsProvider");
  }
  return context;
};
