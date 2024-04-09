import "dotenv/config";

import "@/database";

// Run server
import "@/server";
import { MagazieModel } from "./database/MagazineSchema";

// Handle errors
process.on("unhandledRejection", (reason) => {
  console.log(reason);
});

process.on("uncaughtException", (error) => {
  console.log(error);
});
