import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cookieParser from "cookie-parser";
import "express-async-errors";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger_output.json" assert { type: "json" };

// middlewares
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

// routers
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import movementRouter from "./routes/movementRoutes.js";
import fileUpload from "express-fileupload";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(cookieParser(process.env.JWT_SECRET));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(authRouter);
app.use(productRouter);
app.use(movementRouter);

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

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
