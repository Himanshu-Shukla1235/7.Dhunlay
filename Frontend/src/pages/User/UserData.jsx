import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const backendAppUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${backendAppUrl}/api/userData/me`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (response.ok) {
          setUserData(data);
        } else {
          console.error(
            "📺 Error fetching user:",
            data.message || "Unknown error"
          );
          setUserData(null);
        }
      } catch (error) {
        console.error("📺 Network error:", error);
        setUserData(null);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easy context consumption
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Default export (optional, if you prefer named exports only, you can remove this)
export default UserContext;
