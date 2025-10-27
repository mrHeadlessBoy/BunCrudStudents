import express from "express";
import studentRoutes from './modules/user/students.routes';

const app = express();
app.use(express.json());


app.use('/v1/students', studentRoutes);

app.get("/", (req, res) => {
  res.send("I LOVE MUDROCK");
});


export default app;