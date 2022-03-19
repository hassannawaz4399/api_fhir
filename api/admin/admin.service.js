const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      "insert into admin(username, email, mobile, password) values(?, ?, ?, ?)",
      [data.username, data.email, data.mobile, data.password],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
 
  getAdmins: (callBack) => {
    pool.query(
      `select id, username, email, mobile from admin`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getAdminById: (id, callBack) => {
    pool.query(
      `select id, username, email, mobile from admin where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateAdmin: (id, data, callBack) => {
    pool.query(
      `update admin set username = ?, email = ?, mobile = ?, password = ? where id = ?`,
      [data.username, data.email, data.mobile, data.password, id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteAdmin: (id, callBack) => {
    pool.query(
      `delete from admin where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getAdminByEmail: (email, callBack) => {

    pool.query(
      `select * from admin where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  forgetpassword: (email, callBack) => {
    pool.query(
        `select * from admin where email = ?`, [email],
        (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results[0]);
        }
    );
},
UpdatePassword: (data, callBack) => {
    pool.query(
        `update admin set password = ? where id = ?`, [data.password, data.email],
        (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results[0]);
        }
    );
},
};
