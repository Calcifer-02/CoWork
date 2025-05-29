import express from "express";
import cors from "cors";
import draftsRouter from "./routes/drafts";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
   cors({
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
   })
);
app.use(express.json());

app.use("/api/drafts", draftsRouter);

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
