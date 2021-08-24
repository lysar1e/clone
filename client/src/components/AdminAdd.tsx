import React, { useState } from "react";
import { AdminHeader } from "./AdminHeader";
import axios from "axios";

export const AdminAdd = () => {
  const [form, setForm] = useState({
    type: "",
    brand: "",
    title: "",
    img: "",
    price: 0,
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitHandler = () => {
    axios.post("/api/products", { ...form });
  };
  return (
    <div>
      <AdminHeader />
      <div className="container">
        <h1>Страница добавления товаров</h1>
        <form className="mt-5" onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Категория товара
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="type"
              onChange={changeHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Бренд товара
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name="brand"
              onChange={changeHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Название товара
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name="title"
              onChange={changeHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Ссылка на картинку товара
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name="img"
              onChange={changeHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Цена товара
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name="price"
              onChange={changeHandler}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => submitHandler()}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
