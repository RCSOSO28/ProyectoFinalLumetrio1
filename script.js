let students = [];
let alumno = {};
let studentsId = 1;
let indexAux;
let contador = 0;
let validacionAux;

function addStudent() {
  closeAddStudent();
  closeListStudents();
  document.getElementById("form").style.display = "block";
  document.getElementById("buttonAddStudent").style.display = "block";
  document.getElementById("listStudents").style.display = "none";
  document.getElementById("buttonUpdateStudent").style.display = "none";
}

function listStudents() {
  closeAddStudent();
  closeListStudents();
  document.getElementById("listStudents").style.display = "block";
  document.getElementById("form").style.display = "none";
  renderDataInTable(students);
}

function renderDataInTable(students) {
  let sortedStudents = {};
  if (document.getElementById("optionSelect").value === "Student ID DESC") {
    sortedStudents = students.sort(
      (student1, student2) => (student1.studentId < student2.studentId) ? 1 : (student1.studentId > student2.studentId) ? -1 : 0);
      data(sortedStudents);
  } else if (document.getElementById("optionSelect").value === "Student ID ASC"){
    sortedStudents = students.sort(
      (student1, student2) => (student1.studentId < student2.studentId) ? -1 : (student1.studentId > student2.studentId) ? 1 : 0);
      data(sortedStudents);
  }
}

function updateStudentForm() {
  closeAddStudent();
  let index = students.findIndex(
    (student) => student.id == document.getElementById("studentIdUpdate").value
  );
  if (students[index] !== undefined) {
    document.getElementById("studentId").value = students[index].studentId;
    document.getElementById("name").value = students[index].name;
    document.getElementById("lastName").value = students[index].lastName;
    document.getElementById("score").value = students[index].score;
    document.getElementById("form").style.display = "block";
    document.getElementById("listStudents").style.display = "none";
    document.getElementById("buttonAddStudent").style.display = "none";
    document.getElementById("buttonUpdateStudent").style.display = "block";
    indexAux = index;
  } else {
    alert("The student with that id doesn't exist");
    document.getElementById("studentIdUpdate").value = "";
  }
}

function closeAddStudent() {
  document.getElementById("form").style.display = "none";
  document.getElementById("studentId").value = "";
  document.getElementById("name").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("score").value = "";
}

function closeListStudents() {
  document.getElementById("form").style.display = "none";
  document.getElementById("studentIdUpdate").value = "";
  document.getElementById("optionOrder");
}
function addStudentForm() {
  validacionAux = validarData();
  if (!validacionAux) {
    return;
  }
  let index = students.findIndex(
    (student) => student.studentId == document.getElementById("studentId").value
  );

  if (
    students[index] === undefined ||
    students[index].studentId !== document.getElementById("studentId").value
  ) {
    if (document.getElementById("score").value > 4.96) {
      document.getElementById("score").value = 5;
    }
    let student = {
      id: studentsId++,
      studentId: document.getElementById("studentId").value,
      name: document.getElementById("name").value.toUpperCase(),
      lastName: document.getElementById("lastName").value.toUpperCase(),
      score: document.getElementById("score").value,
    };
    students.push(student);
    closeAddStudent();
    listStudents();
  } else {
    alert("The student with this document is already registered");
  }
}

function updateStudent() {
  validacionAux = validarData();
  if (!validacionAux) {
    return;
  }
  if (document.getElementById("score").value > 4.96) {
    document.getElementById("score").value = 5;
  }
  students[indexAux].studentId = document.getElementById("studentId").value;
  students[indexAux].name = document.getElementById("name").value.toUpperCase();
  students[indexAux].lastName = document
    .getElementById("lastName")
    .value.toUpperCase();
  students[indexAux].score = document.getElementById("score").value;
  closeAddStudent();
  listStudents();
}

function deleteStudentList() {
  let index = students.findIndex(
    (student) => student.id == document.getElementById("studentIdUpdate").value
  );
  if (students[index] !== undefined) {
    students.splice(index, 1);
    listStudents();
  } else {
    alert("The student with that id doesn't exist");
    document.getElementById("studentIdUpdate").value = "";
  }
}

function validarData() {
  if (document.getElementById("studentId").value === "") {
    alert("The studentId value must not be null");
    return false;
  } else if (document.getElementById("name").value === "") {
    alert("The name value must not be null");
    return false;
  } else if (document.getElementById("lastName").value === "") {
    alert("The last name value must not be null");
    return false;
  } else if (
    document.getElementById("score").value < 0.0 ||
    document.getElementById("score").value > 5.0 ||
    document.getElementById("score").value === ""
  ) {
    alert("The score value must be between 0.0 and 5.0");
    return false;
  }
  return true;
}

function sortBy() {
  renderDataInTable(students);
}

function data(sortedStudents){
  let mytable = document.getElementById("bodyTableStudents");
  mytable.innerHTML = "";
  sortedStudents.forEach((student) => {
    let newRow = document.createElement("tr");
    Object.values(student).forEach((value) => {
      let cell = document.createElement("td");
      cell.innerText = value;
      newRow.appendChild(cell);
    });
    mytable.appendChild(newRow);
  });
}
