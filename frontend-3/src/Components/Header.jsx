import { NavLink } from "react-router-dom"; 

function Header() {
  const activeStyle = ({ isActive }) =>
    isActive ? " text-amber-400" : "";

  return (
    <nav className="flex flex-wrap justify-center md:justify-end text-lg sm:text-2xl md:text-3xl p-4 sm:p-7 bg-gray-400 text-white gap-3 sm:gap-6">
      <NavLink to="/" className={activeStyle}>Home</NavLink>

      <NavLink to="create-emp" className={activeStyle}>CreateEmp</NavLink>

      <NavLink to="list" className={activeStyle}>List Of Employees</NavLink>
    </nav>
  );
}

export default Header;