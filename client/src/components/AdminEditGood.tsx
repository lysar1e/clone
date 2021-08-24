import React, { useState } from "react";
import { AdminHeader } from "./AdminHeader";
import axios from "axios";
import { useHistory } from "react-router-dom";
interface Form {
  type: string | null;
  brand: string | null;
  title: string | null;
  img: string | null;
  price: number | null;
}
interface Props {
  getGoods: () => void;
}
export const AdminEditGood: React.FC<Props> = ({ getGoods }) => {
  const id = window.location.pathname.split("/")[3];
  const history = useHistory();
  const [form, setForm] = useState<Form>({
    type: null,
    brand: null,
    title: null,
    img: null,
    price: null,
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const submitHandler = async () => {
    await axios.patch(`/api/products/${id}`, form);
    getGoods();
    history.push("/admin");
  };
  return (
    <div>
      <AdminHeader />
      <div className="container">
        <h1>Страница редактирования товара</h1>
        <h2>Что изменить?</h2>
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
