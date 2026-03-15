import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.routes.js";
import emailRoutes from "../BackEnd/Nodemailer/routes/email.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/productos", productsRouter);
app.use('/email', emailRoutes)

app.listen(3000, () => {
  console.log("API corriendo en http://localhost:3000");
});
