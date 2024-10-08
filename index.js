const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
require("./src/db/db");

const app = express();
const router = express.Router();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const http = require("http").Server(app);

dotenv.config({ path: ".env" });
const PORT = process.env.PORT || 8080;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "AI Tools API",
      version: "1.0.0",
      description: "API Documentation for your AI Tools",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`, 
      },
    ],
  },
  apis: ["./src/routes/routes.js"], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Serve the Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Default route
app.get("/", (req, res) => {
  res.send(`<h1>Nothing to show</h1>`);
});

// API routes
app.use("/", require("./src/routes/routes"));
app.use("/.netlify/functions/app", router);

// Start server
http.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(express.static(__dirname + "/public"));
