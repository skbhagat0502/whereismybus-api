import express from "express";
import app from "./src/app.js";
import routesInit from "./routes.js";
import connectDB from "./src/db/db.js";
connectDB(process.env.MONGO_URI);
routesInit(app);
app.use(express.json());
