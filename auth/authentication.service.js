const { response } = require("express");
const pool = require("../config/database");

module.exports = {
  googleLogin: (email, callBack) => {
    pool.query(
      `select * from users where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        console.log(results);
        return callBack(null, results[0]);
      }
    );
  },
  CreateGoogleSignUser: (data, password, callBack) => {
    pool.query("SELECT MAX(id) AS max_id FROM users ", (err, row) => {
      if (err) {
        throw err;
      } else {
        setValue(row[0].max_id + 1);
      }
    });

    function setValue(value) {
      const User_id = value;

      pool.query(
        "insert into users(id,first_name,last_name,email,password,google_id,google_token, google_email) values(?,?,?,?,?,?,?,?)",
        [
          User_id,
          data.name,
          data.family_name,
          data.email,
          password,
          data.aud,
          data.jti,
          data.email,
        ],
        (error, results, fields) => {
          if (error) {
            console.log(error);
            return callBack(error);
          }

          return callBack(null, results);
        }
      );
    }
  },
};
// console.log(data +'  data')
// console.log(response +'  response')

// pool.query(`SELECT email form users`,[],
// (error, results, fields)=>{
//     if(error){
//         return callBack(error)
//     }
//     else if (results){
//         return callBack(null,results);
//      }
//      else{
//         pool.query(`Insert into users,`)
//      }
//      }
// );
