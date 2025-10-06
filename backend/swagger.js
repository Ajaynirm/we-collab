import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0", // version
    info: {
      title: "My Express API",
      version: "1.0.0",
      description: "API documentation for my Express app",
    },
    servers: [
      {
        url: "http://localhost:5000", // your local dev server
      },
    ],
  },
  // Path to the APIs for auto-generation
  apis: ["./routes/*.js"], // adjust path if needed
};

export const swaggerSpec = swaggerJsdoc(options);
export { swaggerUi };

