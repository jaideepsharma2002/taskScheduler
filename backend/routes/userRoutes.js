const express = require("express");

const {registerUser, loginUser, currentUser, checkEmail} = require("../controllers/userController");
const validateToken = require("../middleware/validatetokenhandler");

const router = express.Router();


router.post("/register", registerUser);
// router.post("/:email", checkEmail);
router.post("/login", loginUser);
router.get("/current", validateToken,currentUser);


module.exports = router;