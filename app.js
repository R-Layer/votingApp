// Import modules
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");

// Import routes
const userRoutes = require("./routes/userRoutes");
const surveyRoutes = require("./routes/surveyRoutes");

const configVars = require("./config/keys");

// Database connection
mongoose
  .connect(
    configVars.MONGODB_URL,
    console.log("Database successfully connected", configVars.MONGODB_URL)
  )
  .catch(err => {
    console.log("Database connection failed. Server will be shutted down");
    process.exit(1);
  });

// Express application object creation.
app = express();

// General middlewares
app.use(bodyParser.json());

// Routes
//app.get('/', (req, res) => res.status(200).json({message: 'top route'}));
app.use("/users", userRoutes);
app.use("/surveys", surveyRoutes);
/* 
// 404 Error handler - If the provided route can't be resolved this
// is the middleware catching the error
app.use((req, res, next) => {
  const error = new Error(req.url + ": page not found");
  error.status = 404;
  next(error);
});

// Final error handler - every unrecognized error will be catched here
app.use((req, res) => {
  res.status(error.status || 500);
  res.json({
    message: error.message
  });
});
 */
// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app;
