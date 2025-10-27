import express from "express";
import cors from "cors";
import studentRoutes from './modules/user/students.routes';

const app = express();

app.use(express.json());

app.use(cors({ origin: "https://bun-crud-students.vercel.app/" }));

app.use('/v1/students', studentRoutes);

app.get("/", (req, res) => {
  res.send("I LOVE MUDROCK");
});


export default app;