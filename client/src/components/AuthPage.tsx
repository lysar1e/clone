import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import React, { useState, useContext } from "react";

function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [regErrMessage, setRegErrMessage] = useState("");
  const history = useHistory();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // @ts-ignore
  const { login } = useContext(AuthContext);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    setLoading(true);
    try {
      await axios
        .post(
          "/api/auth/registration",
          { ...form },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          setLoading(false);
          history.replace("/profile");
        })
        .catch((err) => {
          setLoading(false);
          setRegErrMessage(err.response.data.message);
          console.log(regErrMessage);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const loginHandler = async () => {
    setLoading(true);
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
          login(response.data.token, response.data.userId);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setErrMessage(err.response.data.message);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Router>
      <Switch>
        <>
          <Route path="/login">
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
                <Link
                  to="/registration"
                  className="btn btn-outline-dark btn-not-acc"
                >
                  Нет аккаунта ?
                </Link>
              </form>
            </div>
          </Route>

          <Route path="/registration">
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
          </Route>
        </>
      </Switch>
    </Router>
  );
}
export default AuthPage;
