//env file
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//packages
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

//swagger
const swaggerOption = require("./app/config/swagger.config");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//routes
const userRoutes = require("./app/routes/user.routes");

const app = express();

//Database Connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DataBase Connected...");
  })
  .catch((err) => {
    console.log(err);
  });

//Configs
var corsOptions = {
  origin: ["https://woc4-darshan-modi.herokuapp.com","http://localhost:3001"],
};

//enable cors
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//parse cookies
app.use(cookieParser());

//public folder
app.use("/public", express.static("./app/public"));

//swagger-jsdoc init
const openApiSpecification = swaggerJsdoc(swaggerOption);

//swagger-ui init
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpecification));

//Routes
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to blog app");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Port Listening on ${PORT}`);
});
