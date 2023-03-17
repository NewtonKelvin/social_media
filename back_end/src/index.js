const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");

const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

//Nodemailer
const nodemailer = require("nodemailer");
const mailer = require(__dirname + "/../config/nodemailer.json");

const app = express();

//console colors
let colors = {
  close: "\u001b[0m",
  red: "\u001b[1;31m",
  green: "\u001b[1;32m",
  cyan: "\u001b[1;36m",
  yellow: "\u001b[1;33m",
  pink: "\u001b[1;35m",
  purple: "\u001b[1;34m",
  gray: "\u001b[1;30m",
};

//BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use("/v1", routes);

app.use(
  "/v1/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, {
    swaggerOptions: {
      explorer: true,
    },
  })
);

//Port
const PORT = 3001;
app.listen(PORT, () => {
  console.log(
    `${colors.cyan} Server: running on http://192.168.15.81:${PORT}/v1/ \u001b[0m`
  );

  let transporter = nodemailer.createTransport(mailer);

  transporter.verify(function (error, success) {
    if (error) {
      console.error(`${colors.red} Nodemailer: ${error} \u001b[0m`);
    } else {
      console.log(
        `${colors.green} Nodemailer: Server is ready to take our messages \u001b[0m`
      );
    }
  });
});
