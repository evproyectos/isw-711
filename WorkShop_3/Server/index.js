require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const mongoString = process.env.DATABASE_URL;
const PORT = process.env.PORT || 3001; // Make port configurable via environment variables

// Middleware for parsing request body and handling CORS
app.use(bodyParser.json());
app.use(cors({
  origin: '*', // Allow all origins, adjust as needed for security
  methods: '*', // Allow all methods
}));

// Database connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the MongoDB database');
  } catch (err) {
    console.error('Failed to connect to the MongoDB database', err);
    process.exit(1); // Exit process with failure
  }
};

connectToDatabase();

const {
  careerPost,
  careerGet,
  careerDelete,
  careerPut
} = require("../Controllers/careerController");


app.get("/api/careers", careerGet);
app.post("/api/careers", careerPost);
app.delete("/api/careers", careerDelete);
app.put("/api/careers",careerPut);



// Start the server
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
