const {
  createAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  login,
  forgetpassword,
  UpdatePassword
} = require("./admin.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", createAdmin);
router.get("/", getAdmins);
router.get("/:id", getAdminById);
router.put("/:id", checkToken, updateAdmin);
router.delete("/:id", checkToken, deleteAdmin);
router.post("/login", login);
router.post("/resetpassword", forgetpassword);
router.post("/updatePassword", UpdatePassword);

module.exports = router;
