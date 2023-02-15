import React from "react";

const SchoolsPage = (props) => {
  return (
    <div>
      <button
        onClick={props.onClick}
        className="bg-slate-600 p-1 text-white"
      >
        Refresh school list
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Students</th>
          </tr>
        </thead>
        <tbody>
          {props.schools
            .sort((a, b) =>
              a.name > b.name ? 1 : b.name > a.name ? -1 : 0
            )
            .map((school) => (
              <tr key={school.id}>
                <td>{school.name}</td>
                <td>{school.amount_of_students}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchoolsPage;
