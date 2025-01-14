//___________________________________________ Modules _______________________________________________
require("dotenv").config();
require("express-async-errors");
require("colors");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app); // Create an HTTP server

const compression = require("compression");
const helmet = require("helmet");
const Joi = require("joi");

//..... requires paths
const connectDB = require("./Database/connect");
const errorHandlerMiddleware = require("./Middlewares/errorMiddleware.js");

//__________________________________________________Defined Variables_______________________________
const PORT = process.env.port || 3000;

//__________________________________________ Middlewares _________________________________________________
//.....General Middlewares
app.use(helmet());
app.use(compression());
app.use(express.json()); // Parse JSON bodies

//.....Error Middleware
app.use(errorHandlerMiddleware);

//.....Routes

//__________________________________________ Start The server ___________________________________________
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);

    // Use the server instance to listen for incoming connections
    server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`.bgBlue);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
