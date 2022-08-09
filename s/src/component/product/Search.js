import "./Search.css";
import React, { useState, Fragment } from "react";

const Search = ({ searchHandle }) => {
  const [keyword, setKeyword] = useState("");

  return (
    <Fragment>
      <form
        className="searchBox"
        onSubmit={(e) => {
          searchHandle(keyword);
        }}
      >
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
