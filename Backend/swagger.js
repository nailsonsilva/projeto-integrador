import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "./routes/authRoutes.js",
  "./routes/movementRoutes.js",
  "./routes/productRoutes.js",
];

swaggerAutogen(outputFile, endpointsFiles);
