/**
 * Express app bootstrap:
 * - Loads env config (dotenv) for local/dev parity with production
 * - Connects to MongoDB
 * - Registers security + parsing middleware
 * - Mounts routes (public first, then protected)
 * - Centralizes error handling (Celebrate -> custom error handler)
 */

const express = require("express");

// Connect to MongoDB (defaults to local DB via utils/config.js if env vars aren't provided)
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { errors } = require("celebrate");
const helmet = require("helmet");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const limiter = require("./middlewares/limiter");
const { DATABASE } = require("./utils/config");

const app = express();
const { PORT = 3002 } = process.env;

mongoose
  .connect(DATABASE)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(helmet());

// Mount main router (handles both public auth routes and protected API routes)
app.use("/", mainRouter);
app.use(errorLogger);

// Converts Celebrate/Joi validation errors into consistent HTTP 400 responses
app.use(errors());

// Final error handler: normalizes error shape + prevents leaking internal stack traces to clients
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
