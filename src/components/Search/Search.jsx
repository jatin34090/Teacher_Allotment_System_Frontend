import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import "./Search.css";
const Search = ({func}) => {
    const [search, setSearch] = useState("");
  return (
    <div className="bar mb-7 ml-16 xl:ml-0 text-xl">
    <BsSearch />
    <input
      type="text"
      placeholder="search"
      onChange={(e) => func(e.target.value)}
    />
    {/* <FaRegBell /> */}
  </div>
  )
}

export default Search