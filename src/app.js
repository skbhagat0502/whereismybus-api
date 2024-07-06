import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).json({
    status: "healty",
    message: "where is my bus api is running well.",
  });
});

app.listen(PORT, () => {
  console.log("\n====================================================\n");
  console.log(`Server is listening on port number ${PORT}`);
  console.log("\n====================================================\n");
});

export default app;
