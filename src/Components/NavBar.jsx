import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { useState } from "react";
import "./NavBar.css";
import SideBarData from "./SideBarData";

function NavBar({ setCurrentPage }) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="navbar">
      <div onClick={showSidebar} className="menu-bars">
        <FaIcons.FaBars />
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <div onClick={showSidebar} className="menu-bars">
              <AiIcons.AiOutlineClose />
            </div>
          </li>
          {SideBarData.map((item, index) => (
            <li key={index} className={item.cName} id="this">
              <button onClick={() => handlePageChange(item.page)}>
                {item.icon}
                <span>{item.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
