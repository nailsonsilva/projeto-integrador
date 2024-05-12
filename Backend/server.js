import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cookieParser from "cookie-parser";
import "express-async-errors";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./swaggerConfig.js";

// middlewares
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

// routers
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import movementRouter from "./routes/movementRoutes.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(cors(corsOptions));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/movements", movementRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI); // conecta ao banco de dados
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`); // se funcionar, essa linha deve aparecer nos logs
    });
  } catch (error) {
    console.log(error);
  }
};

start(); // invoca a funcao para iniciar o servidor
