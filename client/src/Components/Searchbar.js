import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";

const Searchbar = ({ searchOpen, setSearchOpen, setQuary }) => {

  const searchUser = (e) =>{
    setQuary(e.target.value)
  }

  const handleChange = (e) => {
    setSearchOpen((prev) => !prev);
     setQuary("");
  };

  return (
    <>
      {searchOpen ? (
        <>
          <div className="input-group flex w-full justify-between overflow-hidden">
            <div className=" relative">
              <BiSearch
                className="icon absolute top-6 left-1"
                size={20}
              />
            </div>
            <input
              className="w-3/4 pl-9 px-5 py-5 focus:outline-none"
              id="searchInput"
              placeholder="Search..."
              onChange={(e) => searchUser(e)}
            />
            <div className="flex items-center p-2 cursor-pointer ">
              <RxCross1 className="icon" onClick={handleChange} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="search-icon p-2 rounded-full flex justify-center items-center cursor-pointer">
            <BiSearch className="icon" onClick={(e)=>handleChange(e)} />
          </div>
        </>
      )}
    </>
  );
};

export default Searchbar;


