import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export const RegisterPage = () => {
  const [regErrMessage, setRegErrMessage] = useState("");
  const history = useHistory();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const registerHandler = async () => {
    try {
      await axios
        .post(
          "/api/auth/register",
          { ...form },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          history.replace("/login");
        })
        .catch((err) => {
          setRegErrMessage(err.response.data.message);
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <h3>Авторизация</h3>
      <div className="container login-form">
        <h4>Регистрация</h4>
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
          {regErrMessage ? (
            <div className="alert alert-danger" role="alert">
              {regErrMessage}
            </div>
          ) : null}
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => registerHandler()}
          >
            Submit
          </button>
          <Link to="/login" className="btn btn-outline-dark btn-not-acc">
            Уже есть аккаунт ?
          </Link>
        </form>
      </div>
    </>
  );
};
