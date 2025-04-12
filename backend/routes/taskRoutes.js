const express = require("express");

const {createTask,getAllTask} = require("../controllers/taskController");
const validateToken = require("../middleware/validatetokenhandler")

const router = express.Router();

router.post("/createtask",validateToken,createTask);
router.get("/gettask",validateToken,getAllTask);

module.exports = router;
