require("dotenv").config();
require("express-async-errors");
require("colors");
const express = require("express");
const cors = require("cors");
const http = require("http");
const compression = require("compression");
const helmet = require("helmet");
const cookieParser = require("cookie-parser"); // Required for cookies

const app = express();
const server = http.createServer(app);

//..... Import paths
const connectDB = require("./Database/connect");
const errorHandlerMiddleware = require("./Middlewares/errorMiddleware");
const authMiddleware = require("./Middlewares/authenticationM");
const authRouter = require("./Routes/authR");
const MetaData = require("./Routes/MetaDataR");
const upsertPrimaryArtist = require("./Routes/PrimaryAtistR");
const getAllPrimaryArtists = require("./Routes/PrimaryAtistR");
const subPlansR = require("./Routes/subPlansR");
const userSubPlansR = require("./Routes/UserSubsR");
const userData = require("./Routes/UserDataR");
const getReleaseData = require("./Routes/MetaDataR");
const SubPay = require("./Routes/transactionR");

const authenticateUser = require("./Middlewares/authenticationM");
const passport = require("passport");
const googleAuthMidd = require("./Middlewares/passportGoogle");
const googleAuthRoute = require("./Routes/googleAuth");

const PORT = process.env.PORT || 3000;

//__________________________________________ Middlewares _________________________________________________
// cors allowence
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://dhunlay.com",
      "http://www.dhunlay.com",
      "http://localhost:5000",
    ], // ✅ Allow multiple origins
    credentials: true, // ✅ Allow cookies/tokens
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//-------------------------
// app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // Ensure cookies can be parsed

//  Apply auth middleware before routes if authentication is required
// app.use(authenticateUser)
//..... Routes
app.use(passport.initialize()); // important for passport to work
app.use("/api", subPlansR);
app.use("/api/auth", authRouter);
app.use("/", googleAuthRoute);
// app.use(authMiddleware);
app.use("/api/metadata", MetaData);
app.use("/api", getReleaseData);
app.use("/api", upsertPrimaryArtist);
app.use("/api", getAllPrimaryArtists);
app.use("/api", userSubPlansR);
app.use("/api/userData", userData);
app.use("/api", SubPay);
app.use("/api", authRouter);

//-------------------------
// At bottom of your server file
const path = require("path");
app.use(express.static(path.join(__dirname, "../Frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist", "index.html"));
});
//..... Error Middleware (moved after routes)
// app.use(errorHandlerMiddleware);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

//__________________________________________ Start The server ___________________________________________
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    server.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}...`.bgBlue);
    });

    // Graceful shutdown
    process.on("SIGTERM", async () => {
      console.log("Shutting down gracefully...");
      server.close(() => {
        console.log("HTTP server closed");
      });
      await disconnectDB(); // Add this in your Database/connect.js
      process.exit(0);
    });
  } catch (error) {
    console.log(error.message.red);
    process.exit(1);
  }
};

start();
