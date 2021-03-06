const express = require("express")
const routes = require("./routes")
const cors = require("cors")
const bodyParser = require("body-parser")

const swaggerUI = require("swagger-ui-express")
const swaggerDocument = require('./swagger.json');

//Nodemailer
const nodemailer = require('nodemailer')
const mailer = require(__dirname + '/../config/nodemailer.json');

const app = express()

//BodyParser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())
app.use('/v1', routes)

app.use(
  "/v1/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, {
    swaggerOptions: {
      explorer: true
    }
  })
)

//Port
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server: running on http://192.168.15.81:${PORT}/v1/`)

  let transporter = nodemailer.createTransport(mailer);

  transporter.verify(function (error, success) {
    if (error) {
      console.log(`Nodemailer: ${error}`);
    } else {
      console.log("Nodemailer: Server is ready to take our messages");
    }
  });

})
