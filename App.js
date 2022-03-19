require("dotenv").config();

var https = require('https');
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
// app.use(coockieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cookieParser = require("cookie-parser");
const pool = require("./config/database");
// google auth
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID ="519520513395-etlaufg41jdkat8ovkoevlrutvep3792.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);
var fs = require('fs');
// var https_options = {

//   key: fs.readFileSync("./certificate/private.key"),

//   cert: fs.readFileSync("./certificate/certificate.crt"),

  // ca: [

  //         fs.readFileSync('path/to/CA_root.crt'),

  //         fs.readFileSync('path/to/ca_bundle_certificate.crt')

  //      ]
//};


const adminRouter = require("./api/admin/admin.router");
const LoginRouter = require("./auth/authentication.router");

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/uploads", express.static("uploads"));
app.use("/api/admin", adminRouter);
app.use("/api/login", LoginRouter);

app.listen(5000, () => {
  console.log("server up and running..on 5000");
});

