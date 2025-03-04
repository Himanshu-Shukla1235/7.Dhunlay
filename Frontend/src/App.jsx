import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/AuthenticateUser/authUser"; // Import the ProtectedRoute component
import Loader from "./components/Loding/loadingC1";
import LoadingP from "./components/Loding/loadingP";
const Home = lazy(() => import("./pages/HomeP/home_in_P"));
import Dashboard from "./pages/Dashboard/dashBoard";
import Analytics from "./pages/Analytics/analytics";
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
          console.error("Error fetching user:", data.message || "Unknown error");
          setUser(null);
        } else {
          setUser(data);

          // Introduce a delay of 1.5 seconds before navigation
          setTimeout(() => {
            if (window.location.pathname === "/home") {
              navigate(`/home/${data._id}`);
            }
            if (window.location.pathname === "/meta") {
              navigate(`/meta/${data._id}`);
            }
            if (window.location.pathname === "/analytics") {
              navigate(`/analytics/${data._id}`);
            }
            if (window.location.pathname === "/dashboard") {
              navigate(`/dashboard/${data._id}`);
            }
          }, 100);
        }
      } catch (error) {
        console.error("📺(app.jsx) Network error while fetching user:", error);
        setUser(null);
      } finally {
        // Ensure the loader is shown for at least 1.5 seconds
        setTimeout(() => {
          setLoading(false);
        }, 100);
      }
    };

    fetchUserData();
  }, []);
  if (loading) {
    return <div className="Loading"> <LoadingP></LoadingP></div>;
  }

  return (
    <Suspense fallback={<div className="Loading"><Loader></Loader></div>}>
      <Routes>
      
        {/* Protected Routes: Home & Meta */}
        <Route element={<ProtectedRoute isAuthenticated={!!user} />}>
        
          <Route path="/home/:id" element={<Home />} />
          <Route path="/meta/:id" element={<Meta />} />
          <Route path="/" element={<Home />}>
          <Route path="dashboard/:id" element={<Dashboard />} />
          <Route path="analytics/:id" element={<Analytics />} />
          {/* <Route path="analytics" element={<Analytics />} /> */}
        </Route>
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
