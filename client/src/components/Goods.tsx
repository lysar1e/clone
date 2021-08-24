import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { Props } from "../App";
import { useCart } from "react-use-cart";

export const Goods: React.FC<Props> = ({ goods, isLoading, filter }) => {
  const { addItem } = useCart();
  return (
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
          : filter === "Все"
          ? goods.map((item) => {
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
                        className="btn btn-primary" // @ts-ignore
                        onClick={() => addItem(item)}
                      >
                        В корзину
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          : goods
              .filter((item) => item.type === filter)
              .map((item) => {
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
                          className="btn btn-primary"
                          // @ts-ignore
                          onClick={() => addItem(item)}
                        >
                          В корзину
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
      </div>
    </div>
  );
};
