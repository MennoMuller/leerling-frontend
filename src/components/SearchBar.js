import React, { useState } from "react";

const SearchBar = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchById, setSearchById] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        props.searchFunction(searchQuery, searchById);
        e.preventDefault();
      }}
    >
      <input
        type="search"
        name="query"
        id="query"
        value={searchQuery}
        className="border border-solid border-black"
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      <select
        name="searchtype"
        id="searchtype"
        value={searchById}
        onChange={(e) => {
          setSearchById(e.target.value);
        }}
      >
        <option value={false}>Name</option>
        <option value={true}>Id</option>
      </select>
      <input
        type="submit"
        value="Search"
        className="bg-slate-600 p-1 text-white"
      />
    </form>
  );
};

export default SearchBar;
