import React, { useEffect } from "react";
import { AdminHeader } from "./AdminHeader";
import Loader from "./Loader";
import axios from "axios";
import { Props } from "../App";
import { Link } from "react-router-dom";

export const Admin: React.FC<Props> = ({ goods, isLoading, getGoods }) => {
  const deleteGood = async (id: number) => {
    await axios.delete(`/api/products/${id}`);
    if (getGoods) {
      await getGoods();
    }
    alert("Товар был успешно удален");
  };

  const [test, setTest] = useS;

  return (
    <div>
      <AdminHeader />
      <div className="container">
        <div className="row">
          {isLoading
            ? Array(8)
                .fill(1)
                .map((item, index) => {
                  return (
                    <div
                      className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6"
                      key={index}
                    >
                      <Loader />
                    </div>
                  );
                })
            : goods.map((item) => {
                const { id, img, title, price } = item;
                return (
                  <div
                    className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6"
                    key={id}
                  >
                    <div className="card mt-2" style={{ width: 18 + "rem" }}>
                      <img src={img} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h4 className="card-title">{title}</h4>
                        <h5 className="card-price">{price + "₸"}</h5>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteGood(id)}
                        >
                          Удалить товар
                        </button>
                        <Link
                          to={`/admin/edit/${id}`}
                          className="btn btn-primary"
                        >
                          Изменить
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};
