import express from "express";
import cors from "cors";
import { verifyToken } from "./middleware/auth.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// protected route
app.get("/secureData", verifyToken, (req, res) => {
  res.json({
    message: "This is protected data",
    user: req.user, //decoded token info
  });
});

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
