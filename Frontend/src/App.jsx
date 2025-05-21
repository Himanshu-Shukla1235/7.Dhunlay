import { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/AuthenticateUser/authUser"; // Import the ProtectedRoute component
import Loader from "./components/Loding/loadingC1";
import LoadingP from "./components/Loding/loadingP";
const Home = lazy(() => import("./pages/HomeP/home_in_P"));
const Dashboard = lazy(() => import("./pages/Dashboard/dashBoard"));
const Analytics = lazy(() => import("./pages/Analytics/analytics"));

const Login = lazy(() => import("./pages/LoginInPage/loginP"));
const Register = lazy(() => import("./pages/LoginInPage/regesterP"));
const Meta = lazy(() => import("./components/MetaDataForm/MusicUploadForm"));
const OurPlans = lazy(() => import("./pages/OurPlans/ourPlans"));
const LandinP = lazy(() => import("./pages/Landing_page/landing_page"));

const About = lazy(() => import("./pages/About/about"));
const Features = lazy(() => import("./pages/Features/featuresP"));

import LoadingC2 from "./components/Loding/loadingC2";

// import Card from "./components/Cards/cardsC1";

const ReleasesP = lazy(() => import("./pages/Releases/releasesP"));
const FeaturesArtist = lazy(() =>
  import("./pages/FeaturesArtist/featuresArtist")
);
const FeaturesLabel = lazy(() => import("./pages/FeaturesLabel/featuresLabel"));
import GetSpotifyArtists from "./pages/Analytics/All datas/spotify/getUser";

// import Card from "./components/Cards/cardsC1";

import Palette from "./components/colorPalette/colPalette";
import TestPage from "./components/test";
import ReleaseUserForm from "./components/ReleasesElements/ReleaseFormC1";
// import GetSpotifyProfile from "./pages/Analytics/All datas/spotify/getMyProfile";
// import SpotifySearch from "./pages/Analytics/All datas/spotify/search/searchArtist";
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
        console.log(data);

        if (!response.ok) {
          console.error(
            "Error fetching user:",
            data.message || "Unknown error"
          );
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
            if (window.location.pathname === "/ourPlans") {
              navigate(`/ourPlans/${data._id}`);
            }
            if (window.location.pathname === "/features/features_artist") {
              navigate(`/features_artist/${data._id}`);
            }

            if (window.location.pathname === "/features/features_label") {
              navigate(`/features_label/${data._id}`);
            }
            if (window.location.pathname === "/features") {
              navigate(`/features/${data._id}`);
            }
            if (window.location.pathname === "/release") {
              navigate(`/release/${data._id}`);
            }
            if (window.location.pathname === "/releases") {
              navigate(`/releases/${data._id}`);
            }
            //for public routes
            if (window.location.pathname === "/login" && data._id != null) {
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
  }, [navigate]);
  if (loading) {
    return (
      <div>
        {" "}
        <LoadingP></LoadingP>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="Loading">
          <Loader></Loader>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<LandinP></LandinP>}></Route>
        {/* This is about page */}
        <Route path="/about/:id" element={<About />} />

        {/* Protected Routes: Home & Meta */}
        <Route element={<ProtectedRoute isAuthenticated={!!user} />}>
          <Route path="/home/:id" element={<Home />} />
          <Route path="/meta/:id" element={<Meta />} />
          <Route path="/" element={<Home />}>
            <Route path="dashboard/:id" element={<Dashboard />} />
            <Route path="analytics/:id" element={<Analytics />} />
            <Route path="ourPlans/:id" element={<OurPlans />} />
            <Route path="features_artist/:id" element={<FeaturesArtist />} />
            <Route path="features_label/:id" element={<FeaturesLabel />} />{" "}
            <Route path="features/:id" element={<Features />} />{" "}
            <Route
              path="/releases/:id"
              element={<ReleasesP></ReleasesP>}
            ></Route>
            {/* <Route path="analytics" element={<Analytics />} /> */}
          </Route>
          <Route
            path="/release/:id"
            element={<ReleaseUserForm></ReleaseUserForm>}
          ></Route>
        </Route>

        {/* Public Routes */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* <Route path="/spotify/artist" element={<GetSpotifyArtists />} />
        <Route path="/spotify/profile" element={<GetSpotifyProfile />} />
        <Route path="/spotify/search" element={<SpotifySearch />} /> */}

        {/* this is testing  */}
        <Route path="/test" element={<TestPage />} />

        {/* Color palette */}
        <Route path="/palette" element={<Palette />} />

        {/* Catch-all 404 Page */}
        <Route path="*" element={<div></div>} />
      </Routes>
    </Suspense>
  );
}

export default App;
