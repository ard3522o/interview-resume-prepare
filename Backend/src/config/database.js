const mongoose = require("mongoose");

const connectToDB = () => {
  // The 'return' keyword is REQUIRED so server.js can use .then()
  return mongoose.connect(process.env.MONGO_URI)
    .then((conn) => {
      console.log("Connected to db");
      return conn; // Pass the connection down the chain
    })
    .catch((error) => {
      console.error("Database connection failed:", error);
      throw error; // Let server.js handle the error if needed
    });
};

module.exports = connectToDB;