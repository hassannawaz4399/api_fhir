const {
  create,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  getAdminByEmail,
  forgetpassword,
  UpdatePassword
} = require("./admin.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  createAdmin: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);

    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  getAdmins: (req, res) => {
    getAdmins((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "No User not found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getAdminById: (req, res) => {
    const id = req.params.id;
    getAdminById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "User not found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  updateAdmin: (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateAdmin(id, body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Oops something went wrong",
        });
      }
      // if (!results) {
      //     return res.json({
      //         success: 0,
      //         message: 'User not found'
      //     });
      // }
      return res.status(200).json({
        success: 1,
        message: "User updated successfully",
      });
    });
  },
  deleteAdmin: (req, res) => {
    const id = req.params.id;
    deleteAdmin(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      // if (!results) {
      //     return res.json({
      //         success: 0,
      //         message: 'User not found'
      //     });
      // }
      return res.json({
        success: 1,
        data: "User deleted successfully",
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    getAdminByEmail(body.email, (err, results) => {
      console.log(results)
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "User not found",
        });
      }
      const result = compareSync(body.password, results.password);
 
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, "qwe1234", {
          expiresIn: "1h",
        });
 
        return res.json({
          success: 1,
          message: "Login successfully",
          token: jsontoken,
        });
      } else {
        return res.json({
          success: 0,
          message: "Email or password incorrect",
        });
      }
    });
  },
  forgetpassword: (req, res) => {
    const body = req.body;
    console.log(req.body);
    // const salt = genSaltSync(10);
    // body.password = hashSync(body.password, salt);

    forgetpassword(body.email, (err, results) => {
        if (err || !results) {
            console.log(err);
            return res.status(400).json({
                success: 0,
                message: "User with this email does not exists connection error",
            });
        } else {
            var sent = sendEmail(results);

            if (sent != '0') {
                return res.status(200).json({
                    success: 1,
                    message: 'The reset password link has been sent to your email address',
                });
            } else {
                return res.status(200).json({
                    success: 1,
                    message: 'Something goes to wrong. Please try again',
                });
            }

        }
    });

    function sendEmail(results) {

        const jsontoken = sign({ result: results }, "qwe1234", {
            expiresIn: "24h",
        });

        var email = "liaqattop@gmail.com";
        var token = results.jsontoken;

        var mail = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'igensol99@gmail.com', // Your email id
                pass: 'IGen@1713' // Your password
            }
        });

        var mailOptions = {
            from: 'hassannawaz4399@gmail.com',
            // to: email,
            to: 'igensol99@gmail.com',
            subject: 'Reset Password Link - Tutsmake.com',
            html: '<p>You requested for reset password, kindly use this <a href="http://localhost:3000/resetpassword/' +
                email +
                "/" +
                token +
                '">link</a> to reset your password</p>'
        };
        console.log(mail);
        mail.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(1)
            } else {
                console.log(0)
            }
        });
    }


},

UpdatePassword: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    UpdatePassword(body, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database connection error",
            });
        }
        return res.status(200).json({
            success: 1,
            message: "Password Updated successfully",
            data: results,
        });
    });
},
};
