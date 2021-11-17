const router = require("express").Router();
const bodyParser = require("body-parser");
const Task = require("../Models/Task");

module.exports = function (database) {
  router.get("/", function (req, res) {
    const tasksData = Task.find();
    tasksData
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).json("Something went wrong");
      });
  });
  router.get("/:task_id", function (req, res) {
    const tasksData = Task.find({ _id: req.params.task_id });
    tasksData
      .then((data) => res.send(data))
      .catch((err) => res.status(500).json({ msg: err }));
  });

  router.post("/", (req, res) => {
    const newTask = new Task({
      done: req.body.done,
      content: req.body.content,
    });
    newTask
      .save()
      .then((data) => res.send(newTask))
      .catch((err) => res.status(500).json({ msg: err }));
  });

  router.patch("/:task_id", (req, res) => {
    const tasksData = Task.findOneAndUpdate(
      { _id: req.params.task_id },
      req.body,
      { new: true, runValidators: true }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => res.status(500).json({ msg: err }));
  });

  router.delete("/:task_id", (req, res) => {
    const task = Task.findOneAndDelete({ _id: req.params.task_id })

      .then((data) => {
        res
          .status(200)
          .json({ msg: `Task: ${req.params.task_id} deleted successfully` });
      })
      .catch((err) => res.status(500).json({ msg: err }));
  });

  return router;
};
