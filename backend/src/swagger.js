import fs from "fs"
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config();
const PORT=process.env.PORT;

const options = {
  definition: {
    openapi: "3.0.0", // version
    info: {
      title: "we-collab API",
      version: "1.0.0",
      description: "API documentation for we-collab system",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`, // your local dev server
      },
    ],
  },
  // Path to the APIs for auto-generation
  apis: ["./src/routes/*.js"], // adjust path if needed
};

export const swaggerSpec = swaggerJsdoc(options);
export { swaggerUi };


