const express = require("express");
const router = express.Router();

const TasksController = require("../controllers/tasks-controller");

router.get("/", TasksController.findAllTasks);
router.get("/:taskCode", TasksController.findTaskByTaskCode);
router.post("/", TasksController.registNewTask);
router.put("/", TasksController.editTask);
router.delete("/", TasksController.removeTask);


module.exports = router;
