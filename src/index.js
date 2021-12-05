var fs = require("fs");
const files = "students.json";
const express = require("express");
const app = express();
var ids = 0;
let date = new Date();
let date1 = new Date();

app.get("/", (req, res) => {
  res.send("start page");
});

app.get("/students", (req, res) => {
  const studs = fs.readFileSync(files, "utf8");
  const students = JSON.parse(studs);
  res.send(students);
});

app.post("/prov", (req, res) => {
  let studs = fs.readFileSync(files, "utf8");
  let student = req.body;
  let stud = {
    id: ids++,
    firstname: req.query.firstname,
    lastName: req.query.lastName,
    group: req.query.group,
    createdAt: date.toLocaleString(),
    updatedAt: date.toLocaleString()
  };
  let students = JSON.parse(studs);
  students.push(stud);
  studs = JSON.stringify(students);
  fs.writeFileSync(files, studs);
  res.json({ message: "Students array changed(create)" });
  console.log(`createdAt : ${date.toISOString()}`);
});

app.get("/students/:id", (req, res) => {
  const { id } = req.params;
  const studs = fs.readFileSync(files, "utf8");
  const students = JSON.parse(studs);
  const foundStudent = students.find((student) => student.id === id);
  res.send(foundStudent);
});

app.delete("/students/:id", (req, res) => {
  let studs = fs.readFileSync(files, "utf8");
  let students = JSON.parse(studs);
  students = students.filter((student) => student.id !== req.params.id);
  studs = JSON.stringify(students);
  fs.writeFileSync(files, studs);
  res.json({ message: "Students array changed(delete)" });
});

app.put("/students/:id", (req, res) => {
  let studs = fs.readFileSync(files, "utf8");
  const students = JSON.parse(studs);
  const student = students.find((student) => student.id === req.params.id);
  student.firstName = req.body.firstName;
  student.lastName = req.body.lastName;
  student.group = req.body.group;
  student.updatedAt = date1.toISOString();
  studs = JSON.stringify(students);
  fs.writeFileSync(files, studs);
  res.json({ message: "Students array changed(update)" });
  console.log(`updatedAt : ${date1.toISOString()}`);
});

app.listen(8080); //the server object listens on port 8080
