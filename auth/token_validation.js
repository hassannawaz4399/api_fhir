const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { response } = require("express");
const router = require("express").Router();
const client = new OAuth2Client(
  "519520513395-etlaufg41jdkat8ovkoevlrutvep3792.apps.googleusercontent.com"
);


module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      jwt.verify(token, "qwe1234", (err, decoded) => {
        if (err) {
          return res.json({
            success: 0,
            message: "Invalid token...",
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: 0,
        message: "Access denied, Not autorised",
      });
    }
  },
  googleLogin: (body,req, res, next) => {
     const { tokenId } = req.body;
    console.log(tokenId);
    client
      .verifyIdToken({idToken:
        tokenId,
        audience:
          "519520513395-etlaufg41jdkat8ovkoevlrutvep3792.apps.googleusercontent.com",
      })
      .then((response) => {
        console.log(response);
        const { email_verified, name, email } = response.payload;
        console.log(response.payload);
      });
  },
};


