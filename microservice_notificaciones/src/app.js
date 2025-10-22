import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mailRoutes from "./routes/mailRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/notificaciones", mailRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Microservicio escuchando en puerto ${PORT}`);
});
