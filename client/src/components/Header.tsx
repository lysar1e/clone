import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface Props {
  howManyItemsInCart?: number;
}

export const Header: React.FC<Props> = ({howManyItemsInCart}) => {
  // @ts-ignore
  const { isLogin, logout, isAdmin } = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          КупиДевайс
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <Link to="/profile" className="btn btn-outline-success me-2">
            Профиль
          </Link>
          <Link to="/cart" className="btn btn-outline-success me-2">
              Корзина {howManyItemsInCart}
          </Link>
          <form className="d-flex">
            {isAdmin ? (
              <Link to="/admin" className="btn btn-outline-success me-2">
                Админ панель
              </Link>
            ) : null}
            {!isLogin ? (
              <Link to="/login" className="btn btn-outline-success">
                Войти
              </Link>
            ) : (
              <button
                className="btn btn-outline-success"
                onClick={() => logout()}
              >
                Выйти
              </button>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};
