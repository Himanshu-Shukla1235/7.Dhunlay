import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/AuthenticateUser/authUser"; // Import the ProtectedRoute component

const Home = lazy(() => import("./pages/HomeP/home_in_P"));
const Login = lazy(() => import("./pages/LoginInPage/loginP"));
const Register = lazy(() => import("./pages/LoginInPage/regesterP"));
const Meta = lazy(() => import("./components/MetaDataForm/Form"));

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

function MainApp() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/userData/me", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
          console.error(
            "Error fetching user:",
            data.message || "Unknown error"
          );
          setUser(null);
        } else {
          setUser(data);

          //  Dynamic navigations
          //1.
          if (
            window.location.pathname === "/home" ||
            window.location.pathname === "/home"
          ) {
            navigate(`/home/${data._id}`);
          }
          //2.
          if (
            window.location.pathname === "/meta"
           
          ) {
            navigate(`/meta/${data._id}`);
          }
        }
      } catch (error) {
        console.error("Network error while fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="Loading">Checking authentication...</div>;
  }

  return (
    <Suspense fallback={<div className="Loading">Loading...</div>}>
      <Routes>
        {/* Protected Routes: Home & Meta */}
        <Route element={<ProtectedRoute isAuthenticated={!!user} />}>
          <Route path="/home/:id" element={<Home />} />
          <Route path="/meta/:id" element={<Meta />} />
        </Route>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Catch-all 404 Page */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Suspense>
  );
}

export default App;
