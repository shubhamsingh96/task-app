import React, { Fragment, useState } from "react";
import "../scss/header.scss";
import { FilterType } from "./App";
import filterIcon from "../images/filter.svg";

interface HeaderProps {
  filterState: FilterType;
  setFilterState: (value: FilterType) => void;
}

const Header: React.FC<HeaderProps> = ({ filterState, setFilterState }) => {
  const [isBackdropVisible, setIsBackdropVisible] = useState(false);

  const handleFilterToggle = () => {
    setFilterState({ ...filterState, isOpen: !filterState.isOpen });
    setIsBackdropVisible(!isBackdropVisible);
  };

  const handleCloseFilterPopup = () => {
    setFilterState({ ...filterState, isOpen: false });
    setIsBackdropVisible(false);
  };

  const handleSelectFilterType = (type: "ALL" | "ACTIVE" | "COMPLETED") => {
    setFilterState({ isOpen: false, type });
    setIsBackdropVisible(false);
  };

  return (
    <Fragment>
      <header className="header">
        <p className="header-title">Todo List App</p>
        <div className="filter">
          <p onClick={handleFilterToggle}>
            <span>{filterState.type}</span>
            <img src={filterIcon} />
          </p>
          {filterState.isOpen && (
            <ul className="filter-list">
              <li onClick={() => handleSelectFilterType("ACTIVE")}>Active</li>
              <li onClick={() => handleSelectFilterType("COMPLETED")}>
                Completed
              </li>
              <li onClick={() => handleSelectFilterType("ALL")}>All</li>
            </ul>
          )}
        </div>
      </header>
      {isBackdropVisible && (
        <div className="custom-backdrop" onClick={handleCloseFilterPopup} />
      )}
    </Fragment>
  );
};

export default Header;
