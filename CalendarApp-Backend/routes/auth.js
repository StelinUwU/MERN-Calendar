/* 
    Rutas de usuarios / Auth
    host + api/auth
 */
const { Router } = require("express");
const { check } = require("express-validator");
const { registerUser, loginUser, renewToken } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");
const validateJWT = require("../middlewares/Validate-jwt");
const router = Router();

router.post(
  "/register",
  [
    check("name", "Name is required").notEmpty(),
    check("email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength(
      {
        min: 6,
      },
      validateFields
    ),
  ],
  registerUser
);
router.post(
  "/login",
  [
    check("email").isEmail(),
    check("password", "Password is required").isLength({
      min: 6,
    }),
    validateFields,
  ],
  loginUser
);
router.get("/renew", validateJWT, renewToken);

module.exports = router;
