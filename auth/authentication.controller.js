const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { response } = require("express");
const router = require("express").Router();
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const {
  googleLogin,
  CreateGoogleSignUser,
} = require("./authentication.service");
// const client = new OAuth2Client(
//   "519520513395-etlaufg41jdkat8ovkoevlrutvep3792.apps.googleusercontent.com"
// );
const client = new OAuth2Client(
  "521497145495-t0i1tlu2jknt86jg3i805kupoouahtoe.apps.googleusercontent.com"
);

module.exports = {
  googleLogin: (req, res, next) => {
    const { tokenId } = req.body;
    client
      .verifyIdToken({
        idToken: tokenId,
        audience:
          "521497145495-t0i1tlu2jknt86jg3i805kupoouahtoe.apps.googleusercontent.com",
      })
      .then((response) => {
        const { email_verified, name, email } = response.payload;
        const results = googleLogin(email, (err, results) => {
          if (err) {
            return res.status(500).json({
              success: 0,
              message: "Database connection error",
            });
          } else if (!results) {
            const salt = genSaltSync(10);
            password = hashSync("qwe1234", salt);
            CreateGoogleSignUser(response.payload, password, (err, results) => {
              if (err) {
                return res.status(400).json({
                  success: 0,
                  message: "Database connection error",
                });
              } else {
                const jsontoken = sign({ result: results }, "qwe1234", {
                  expiresIn: "24h",
                });
                return res.status(200).json({
                  success: 1,
                  message: "Login successfully",
                  token: jsontoken,
                  data: results,
                });
              }
            });
          } else if (results) {
            const jsontoken = sign({ result: results }, "qwe1234", {
              expiresIn: "24h",
            });
            return res.status(200).json({
              success: 1,
              message: "User already existing",
              data: results,
              token: jsontoken,
            });
          }
        });
        // return res.status(200).json({
        //   success: 1,
        //   message: "Something went wrong",
        // });
        //  console.log(results);
        // return res.json(results);

        //  const result = compareSync(body.password, results.password);
        // if (results) {
        //   results.password = undefined;
        //   const jsontoken = sign({ result: results }, "qwe1234", {
        //     expiresIn: "24h",
        //   });
        //   // console.log(res);
        //   console.log(results);
        //   console.log(jsontoken);
        //   return res.status(200).json({
        //     success: 1,
        //     message: "Login successfully",
        //     token: jsontoken,
        //     data: results,
        //   });
        // } else {
        //   return res.json({
        //     success: 0,
        //     message: "Email or password incorrect",
        //   });
        // }
      });
  },
};
