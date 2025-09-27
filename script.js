// Get references
const studentForm = document.getElementById('studentForm');
const studentTableBody = document.querySelector('#studentTable tbody');

// Load students from localStorage
let students = JSON.parse(localStorage.getItem('students')) || [];

// Function to display students
function displayStudents() {
  studentTableBody.innerHTML = "";
  students.forEach((student, index) => {
    let row = `
      <tr>
        <td>${student.name}</td>
        <td>${student.studentId}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td class="actions">
          <button onclick="editStudent(${index})">Edit</button>
          <button onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
    studentTableBody.innerHTML += row;
  });
}

// Add Student
studentForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const studentId = document.getElementById('studentId').value.trim();
  const email = document.getElementById('email').value.trim();
  const contact = document.getElementById('contact').value.trim();

  // Validation
  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nameRegex.test(name)) {
    alert("Name must contain only letters.");
    return;
  }
  if (isNaN(studentId) || studentId === "") {
    alert("Student ID must be a number.");
    return;
  }
  if (!emailRegex.test(email)) {
    alert("Invalid email address.");
    return;
  }
  if (isNaN(contact) || contact.length < 10) {
    alert("Contact number must be at least 10 digits.");
    return;
  }

  // Save student
  students.push({ name, studentId, email, contact });
  localStorage.setItem('students', JSON.stringify(students));

  // Reset form
  studentForm.reset();
  displayStudents();
});

// Edit Student
function editStudent(index) {
  const student = students[index];
  document.getElementById('name').value = student.name;
  document.getElementById('studentId').value = student.studentId;
  document.getElementById('email').value = student.email;
  document.getElementById('contact').value = student.contact;

  students.splice(index, 1);
  localStorage.setItem('students', JSON.stringify(students));
  displayStudents();
}

// Delete Student
function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
  }
}

// Initial display
displayStudents();
