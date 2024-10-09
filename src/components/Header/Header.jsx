import { Link, NavLink, useNavigate } from "react-router-dom";
import css from "./Header.module.css";
import clsx from "clsx";
import { FiLogIn } from "react-icons/fi";
import { useState } from "react";
import ModalLogin from "../ModalLogin/ModalLogin.jsx";
import ModalRegister from "../ModalRegister/ModalRegister.jsx";
import { logout } from "../../FireBase/auth.js";
import { useAuth } from "../../utils/AuthContext.jsx";

const NavLinkStyle = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Header() {
  const navigate = useNavigate();
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const { token, updateToken } = useAuth();

  const toggleModalLogin = () => {
    setShowModalLogin(!showModalLogin);
  };
  const toggleModalRegister = () => {
    setShowModalRegister(!showModalRegister);
  };
  const handleLogout = async () => {
    await logout();
    updateToken(null);
    navigate("/");
  };

  return (
    <header className={css.header}>
      <Link to={"/"} className={css.logo}>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="28"
            height="28"
          >
            <path d="M 0,50 A 50,50 0 1,1 100,50 Z" fill="#338AF3" />
            <path d="M 0,50 A 50,50 0 0,0 100,50 Z" fill="#FFDA44" />
          </svg>
        </span>
        LearnLingo
      </Link>
      <nav className={css.nav}>
        <ul className={css.navList}>
          <li className={css.navItem}>
            <NavLink to={"/"} className={NavLinkStyle}>
              Home
            </NavLink>
          </li>
          <li className={css.navItem}>
            <NavLink to={"/teachers"} className={NavLinkStyle}>
              Teachers
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={css.auth}>
        {token ? (
          <button onClick={handleLogout} className={css.registerBtn}>
            Logout
          </button>
        ) : (
          <>
            <button onClick={toggleModalLogin} className={css.loginBtn}>
              <FiLogIn size={20} color={"#F4C550"} />
              <p className={css.loginBtnText}>Log in</p>
            </button>
            <button onClick={toggleModalRegister} className={css.registerBtn}>
              Registration
            </button>
          </>
        )}
      </div>
      {showModalLogin && <ModalLogin toggleModalLogin={toggleModalLogin} />}
      {showModalRegister && (
        <ModalRegister toggleModalRegister={toggleModalRegister} />
      )}
    </header>
  );
}
