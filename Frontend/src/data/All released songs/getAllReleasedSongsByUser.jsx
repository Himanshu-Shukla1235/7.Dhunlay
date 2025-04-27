import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "../../pages/User/UserData";

const UserSongsContext = createContext(null);

export const UserSongsProvider = ({ children }) => {
  const [userSongs, setUserSongs] = useState([]);
  const backendAppUrl = import.meta.env.VITE_API_URL;
  const { userData } = useUser();
  const userId = userData._id;
  useEffect(() => {
    if (!userId) return; // ⬅️ important: don't fetch if no userId

    const fetchUserSongs = async () => {
        console.log("working",userid);
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
        console.log(result);

        if (result.success) {
          setUserSongs(result.data);
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
    <UserSongsContext.Provider value={{ userSongs, setUserSongs }}>
      {children}
    </UserSongsContext.Provider>
  );
};

export const useUserSongs = () => {
  const context = useContext(UserSongsContext);
  if (!context) {
    throw new Error("useUserSongs must be used within a UserSongsProvider");
  }
  return context;
};
