import { NavLink } from "react-router-dom";
function Navbar() {
  const activeStyle = "text-blue-500 border-b-2 border-blue-500";

  return (
    <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light shadow">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg">
          <NavLink
            to='/'>
            Hotel App
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Crear Reservación
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/reservationsList"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Reservaciones
          </NavLink>
        </li>
      </ul>
      <ul className="flex items-center gap-3">
        <li className='text-black font-bold'>hotelreservas@hotelapp.com</li>
        <li>
          <NavLink
            to="/sign-in"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Signing
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
export { Navbar };
