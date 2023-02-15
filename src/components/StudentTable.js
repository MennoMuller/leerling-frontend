import React from "react";

const StudentTable = (props) => {
  function deleteStudent(id) {
    fetch(`http://localhost:8080/api/student/${id}`, {
      method: "DELETE"
    });
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Grade</th>
          <th>School</th>
          <th>Courses</th>
          <th>Contact</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {props.students.length ? (
          props.students
            .sort((a, b) =>
              a.name > b.name ? 1 : b.name > a.name ? -1 : 0
            )
            .map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.grade}</td>
                <td>{student.school.name}</td>
                <td>
                  <table>
                    <tbody>
                      {student.courses
                        .sort((a, b) =>
                          a.name > b.name
                            ? 1
                            : b.name > a.name
                            ? -1
                            : 0
                        )
                        .map((course) => (
                          <tr key={course.id}>
                            <td>{course.name}</td>
                            <td>{course.credits}</td>
                            <td>
                              <button
                                onClick={() =>
                                  props.unenrol(
                                    student.id,
                                    course.id
                                  )
                                }
                                className="text-red-400"
                              >
                                x
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </td>
                <td>
                  {student.contactperson
                    ? student.contactperson.name
                    : ""}
                </td>
                <td>
                  {student.contactperson
                    ? student.contactperson.phone_number
                    : ""}
                </td>
                <td>
                  <button
                    onClick={() =>
                      deleteStudent(student.id)
                    }
                    className="text-red-400"
                  >
                    x
                  </button>
                </td>
              </tr>
            ))
        ) : (
          <tr>
            <td colSpan={5}>No results found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default StudentTable;
