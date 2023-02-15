import React, { useState } from "react";

const CoursesPage = (props) => {
  const [name, setName] = useState("");
  const [credits, setCredits] = useState(0);
  const [course, setCourse] = useState(0);
  const [student, setStudent] = useState(0);

  function addCourse(name, credits) {
    let newCourse = JSON.stringify({
      name: name,
      credits: credits
    });
    console.log(newCourse);
    fetch("http://localhost:8080/api/course/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: newCourse
    });
  }

  function enrolStudent(student, course) {
    fetch(
      `http://localhost:8080/api/student/${student}/course/${course}`,
      { method: "PUT" }
    );
  }

  return (
    <div>
      <button
        onClick={props.onClick}
        className="bg-slate-600 p-1 text-white"
      >
        Refresh course list
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Credits</th>
          </tr>
        </thead>
        <tbody>
          {props.courses
            .sort((a, b) =>
              a.name > b.name ? 1 : b.name > a.name ? -1 : 0
            )
            .map((course) => (
              <tr key={course.id}>
                <td>{course.name}</td>
                <td>{course.credits}</td>
                <td>
                  <button
                    onClick={() =>
                      props.deleteCourse(course.id)
                    }
                    className="text-red-400"
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>{" "}
      <br />
      <form
        onSubmit={(e) => {
          addCourse(name, credits);
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
        <label htmlFor="credits">Credits</label>
        <input
          value={credits}
          type="number"
          name="credits"
          id="credits"
          className="border border-solid border-black"
          onChange={(e) => {
            setCredits(e.target.value);
          }}
        />
        <br />
        <input
          type="submit"
          value="Add Course"
          className="bg-slate-600 p-1 text-white"
        />
      </form>
      <form
        onSubmit={(e) => {
          enrolStudent(student, course);
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
        <label htmlFor="course">Course</label>
        <select
          name="course"
          id="course"
          value={course}
          onChange={(e) => {
            setCourse(e.target.value);
          }}
        >
          <option value="0">Select Course</option>
          {props.courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
        <br />
        <input
          type="submit"
          value="Enrol"
          className="bg-slate-600 p-1 text-white"
        />
      </form>
    </div>
  );
};

export default CoursesPage;
