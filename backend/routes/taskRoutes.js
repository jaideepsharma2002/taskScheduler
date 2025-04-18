const express = require("express");

const {createTask,getAllTask,editTask,deleteTask} = require("../controllers/taskController");
const validateToken = require("../middleware/validatetokenhandler")

const router = express.Router();

router.post("/createtask",validateToken,createTask);
router.get("/gettask",validateToken,getAllTask);
router.put("/:id",validateToken,editTask);
router.delete("/:id",validateToken,deleteTask);

module.exports = router;
