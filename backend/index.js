import express from "express";
import cors from "cors";
//import { verifyToken } from "./middleware/auth";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// protected route
app.get("/secureData", (req, res) => {
  res.json({
    message: "Hello from Express backend!",
    user: req.user, //decoded token info
  });
});

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
