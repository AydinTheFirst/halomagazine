import express from "express";
import cors from "cors";
import passport from "passport";

import { upload } from "@/helpers/multer";
import { router } from "@/routes/router";

const PORT = 3000;
const app = express();

// Init App
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.any());

app.use(passport.initialize());

app.use(router);

app.listen(3000, () => console.log(`http://localhost:${PORT}`));
