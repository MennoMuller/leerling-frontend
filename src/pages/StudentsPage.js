import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import StudentTable from "../components/StudentTable";

const StudentsPage = (props) => {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState(0);
  const [school, setSchool] = useState(0);
  const [student, setStudent] = useState(0);
  const [contactName, setContactName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function addStudent(name, grade, school) {
    if (school === 0) {
      alert("Please select a school");
      return;
    }
    let newStudent = JSON.stringify({
      name: name,
      grade: grade
    });
    console.log(newStudent + " " + school);
    fetch("http://localhost:8080/api/student/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: newStudent
    })
      .then((response) => response.json())
      .then((student) =>
        fetch(
          `http://localhost:8080/api/school/${school}/student/${student.id}`,
          { method: "PUT" }
        )
      );
  }

  function addContact(student, contactName, phoneNumber) {
    const newContact = JSON.stringify({
      name: contactName,
      phone_number: phoneNumber
    });
    fetch(
      `http://localhost:8080/api/student/${student}/contact`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: newContact
      }
    );
  }

  function search(searchQuery, searchById) {
    console.log(searchQuery + " " + searchById);
    if (searchById) {
      fetch(
        `http://localhost:8080/api/student/${searchQuery}`
      )
        .then((result) => result.json())
        .then((data) => {
          if (data) {
            setSearchResults([data]);
          } else {
            setSearchResults([]);
          }
        });
    } else {
      fetch(
        `http://localhost:8080/api/student/search/${searchQuery}`
      )
        .then((result) => result.json())
        .then((data) => setSearchResults(data));
    }
  }

  const unenrol = (student, course) => {
    fetch(
      `http://localhost:8080/api/student/${student}/course/${course}/unenrol`,
      { method: "PUT" }
    );
  };

  return (
    <div>
      <section id="search" className="m-3 bg-slate-100">
        <SearchBar
          searchFunction={(query, byId) =>
            search(query, byId)
          }
        />
        <StudentTable
          students={searchResults}
          unenrol={unenrol}
        />
      </section>
      <section id="list" className="m-3 bg-slate-100">
        <button
          onClick={props.onClick}
          className="bg-slate-600 p-1 text-white"
        >
          Refresh student list
        </button>
        <StudentTable
          students={props.students}
          unenrol={unenrol}
        />
      </section>
      <section
        id="add-student"
        className="m-3 bg-slate-100"
      >
        <form
          onSubmit={(e) => {
            addStudent(name, grade, school);
            e.preventDefault();
          }}
        >
          <label htmlFor="name">Name</label>
          <input
            value={name}
            type="text"
            id="name"
            name="name"
            className="border border-solid border-black"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <label htmlFor="grade">Grade</label>
          <input
            value={grade}
            type="number"
            name="grade"
            id="grade"
            className="border border-solid border-black"
            onChange={(e) => {
              setGrade(e.target.value);
            }}
          />
          <br />
          <label htmlFor="school">School</label>
          <select
            name="school"
            id="school"
            value={school}
            onChange={(e) => {
              setSchool(e.target.value);
            }}
          >
            <option value={0}>Select school</option>
            {props.schools.map((school) => (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            ))}
          </select>
          <br />
          <input
            type="submit"
            value="Add Student"
            className="bg-slate-600 p-1 text-white"
          />
        </form>
      </section>
      <section
        id="add-contact"
        className="m-3 bg-slate-100"
      >
        <form
          onSubmit={(e) => {
            addContact(student, contactName, phoneNumber);
            e.preventDefault();
          }}
        >
          <label htmlFor="student">Student</label>
          <select
            name="student"
            id="student"
            value={student}
            onChange={(e) => {
              setStudent(e.target.value);
            }}
          >
            <option value="0">Select Student</option>
            {props.students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="contactname">Contact Name</label>
          <input
            type="text"
            name="contactname"
            id="contactname"
            className="border border-solid border-black"
            value={contactName}
            required
            onChange={(e) => {
              setContactName(e.target.value);
            }}
          />
          <br />
          <label htmlFor="phonenr">Phone Number</label>
          <input
            type="tel"
            name="phonenr"
            id="phonenr"
            className="border border-solid border-black"
            value={phoneNumber}
            required
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
          <br />
          <input
            type="submit"
            value="Add Contact"
            className="bg-slate-600 p-1 text-white"
          />
        </form>
      </section>
    </div>
  );
};

export default StudentsPage;
