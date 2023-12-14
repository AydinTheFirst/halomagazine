import "dotenv/config";
import "./helpers/mongodb.js";
// Run server
import "./server";

// Handle errors
process.on("unhandledRejection", (reason, promise) => {
  console.log(reason);
});
