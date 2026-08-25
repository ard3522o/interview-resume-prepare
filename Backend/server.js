// server.js
require("dotenv").config()
const dns = require("dns")
dns.setServers(["1.1.1.1", "8.8.8.8"])

const app = require("./src/app")
const connectToDB = require("./src/config/database.js")



connectToDB()
  .then(async () => {
    console.log("Database connected.")

    // 1. Capture the response
    

    // 3. Start the server
    const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
  })
  .catch((err) => {
    console.error("Error during startup:", err)
  })