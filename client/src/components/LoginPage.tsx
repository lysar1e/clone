import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export const LoginPage = () => {
  const [errMessage, setErrMessage] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();

  // @ts-ignore
  const { login } = useContext(AuthContext);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = async () => {
    try {
      await axios
        .post(
          "/api/auth/login",
          { ...form },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data.isAdmin);
          login(
            response.data.token,
            response.data.userId,
            response.data.isAdmin
          );
          history.push("/");
        })
        .catch((err) => {
          setErrMessage(err.response.data.message);
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <h3>Авторизация</h3>
      <div className="container login-form">
        <h4>Логин</h4>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={changeHandler}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={changeHandler}
            />
          </div>
          {errMessage ? (
            <div className="alert alert-danger" role="alert">
              {errMessage}
            </div>
          ) : null}
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => loginHandler()}
          >
            Submit
          </button>
          <Link to="/register" className="btn btn-outline-dark btn-not-acc">
            Нет аккаунта ?
          </Link>
        </form>
      </div>
    </>
  );
};
