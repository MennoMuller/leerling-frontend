import { useEffect, useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import CoursesPage from "./pages/CoursesPage";
import SchoolsPage from "./pages/SchoolsPage";
import StudentsPage from "./pages/StudentsPage";

function App() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [schools, setSchools] = useState([]);

  async function getAllStudents() {
    const response = await fetch(
      "http://localhost:8080/api/student/all"
    );
    const data = await response.json();
    setStudents(data);
  }

  async function getAllCourses() {
    const response = await fetch(
      "http://localhost:8080/api/course/all"
    );
    const data = await response.json();
    setCourses(data);
  }

  async function getAllSchools() {
    const response = await fetch(
      "http://localhost:8080/api/school/all"
    );
    const data = await response.json();
    setSchools(data);
  }

  useEffect(() => {
    getAllStudents();
    getAllCourses();
    getAllSchools();
  }, []);

  const deleteCourse = (id) => {
    fetch(`http://localhost:8080/api/course/${id}`, {
      method: "DELETE"
    });
  };

  return (
    <div>
      <header className=" bg-slate-400">
        <nav>
          <ul className="flex flex-row gap-2 sm:flex-col">
            <li>
              <NavLink
                to="/"
                className="flex flex-row items-center gap-2 rounded p-2 text-lg text-black hover:opacity-80 dark:text-white"
              >
                <span className="hidden sm:inline">
                  Home
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/students"
                className="flex flex-row items-center gap-2 rounded p-2 text-lg text-black hover:opacity-80 dark:text-white"
              >
                <span className="hidden sm:inline">
                  Students
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/courses"
                className="flex flex-row items-center gap-2 rounded p-2 text-lg text-black hover:opacity-80 dark:text-white"
              >
                <span className="hidden sm:inline">
                  Courses
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/schools"
                className="flex flex-row items-center gap-2 rounded p-2 text-lg text-black hover:opacity-80 dark:text-white"
              >
                <span className="hidden sm:inline">
                  Schools
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route
            path="/students"
            element={
              <StudentsPage
                students={students}
                schools={schools}
                onClick={() => getAllStudents()}
                deleteCourse={deleteCourse}
              />
            }
          />
          <Route
            path="/courses"
            element={
              <CoursesPage
                students={students}
                courses={courses}
                onClick={() => getAllCourses()}
                deleteCourse={deleteCourse}
              />
            }
          />
          <Route
            path="/schools"
            element={
              <SchoolsPage
                schools={schools}
                onClick={() => getAllSchools()}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
