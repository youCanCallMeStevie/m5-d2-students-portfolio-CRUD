

const express = require("express");
const router = express.Router();
// router.get("/") router.post("/:id") can create the whole collection with this router & can organise all of our "things" with this router
const fs = require("fs"); //core module
const path = require("path"); //core module
const uniqid = require("uniqid"); //third party module, it has to be installed. this will produce unique ids for us


//1. router.get("/")
router.get("/", (req, res) => {
  const studentsFilePath = path.join(__dirname, "students.json");
  const fileAsABuffer = fs.readFileSync(studentsFilePath);
  const fileAsAString = fileAsABuffer.toString();
  const studentsArray = JSON.parse(fileAsAString);
  res.send(studentsArray);
});

//2.
router.get("/:id", (req, res) => {
  const studentsFilePath = path.join(__dirname, "students.json");
  const fileAsABuffer = fs.readFileSync(studentsFilePath);
  const fileAsAString = fileAsABuffer.toString();
  const studentsArray = JSON.parse(fileAsAString);
  const idComingFromRequest = req.params.id;
  const student = studentsArray.filter(
    student => student.ID === idComingFromRequest
  );

  res.send(student);
});

//3.
router.post("/", (req, res) => {
  const studentsFilePath = path.join(__dirname, "students.json");
  const fileAsABuffer = fs.readFileSync(studentsFilePath);
  const fileAsAString = fileAsABuffer.toString();
  const studentsArray = JSON.parse(fileAsAString);

  const newStudent = req.body;
  newStudent.ID = uniqid();
  studentsArray.push(newStudent);
  fs.writeFileSync(studentsFilePath, JSON.stringify(studentsArray));
  res.status(201).send({ id: newStudent.ID });
});

//4.  modify a single user
router.put("/:id", (req, res) => {
  const studentsFilePath = path.join(__dirname, "students.json");
  const fileAsABuffer = fs.readFileSync(studentsFilePath);
  const fileAsAString = fileAsABuffer.toString();
  const studentsArray = JSON.parse(fileAsAString);
  const newStudentsArray = studentsArray.filter(
    student => student.ID !== req.params.id
  );

  const modifiedStudent = req.body;
  modifiedStudent.ID = req.params.id;
  newStudentsArray.push(modifiedStudent);

  fs.writeFileSync(usersFilePath, JSON.stringify(usersArray));

  res.send(usersArray);
});

//5.  delete a single user
router.delete("/:id", (req, res) => {
  const studentsFilePath = path.join(__dirname, "students.json");
  const fileAsABuffer = fs.readFileSync(studentsFilePath);
  const fileAsAString = fileAsABuffer.toString();
  const studentsArray = JSON.parse(fileAsAString);
  const newStudentsArray = studentsArray.filter(
    student => student.ID !== req.params.id
  );

  fs.writeFileSync(studentsFilePath, JSON.stringify(newStudentsArray));

  res.status(204).send();
});

module.exports = router;
