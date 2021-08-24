import React, {useContext, useState} from "react";
import { useCart } from "react-use-cart";
import { Header } from "./Header";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {Redirect, useHistory} from "react-router-dom";
interface Props {
  status: number;
  setStatus: React.Dispatch<React.SetStateAction<number>>;
}
export const Cart: React.FC<Props> = ({status, setStatus}) => {
  // @ts-ignore
  const { userId } = useContext(AuthContext);
  const history = useHistory();
  const {
    items,
    totalItems,
    isEmpty,
    totalUniqueItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();
  const [phone, setPhone] = useState(0);
  if (isEmpty)
    return (
      <>
        <Header />
        <h1 className="text-center">Корзина пустая</h1>
      </>
    );
  console.log(phone)
  const postOrder = async () => {
    axios.post(`/api/orders/order/${userId}`, { items, phone }).then(res => setStatus(res.status));
    history.push("/success");
  };
  return (
    <>
      <Header />
      <section className="py-4 container">
        <div className="row justify-content-center">
          <div className="col-12">
            <h5>
              Корзина ({totalUniqueItems}) всего в корзине: ({totalItems})
            </h5>
            <table className="table table-light table-hover m-0">
              <tbody>
                {items.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <img src={item.img} style={{ height: "6rem" }} />
                      </td>
                      <td>{item.title}</td>
                      <td>{item.price}₸</td>
                      <td>Количество: ({item.quantity})</td>
                      <td>
                        <button
                          className="btn btn-info ms-2"
                          onClick={() =>
                            //@ts-ignore
                            updateItemQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <button
                          className="btn btn-info ms-2"
                          onClick={() =>
                            //@ts-ignore
                            updateItemQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => removeItem(item.id)}
                        >
                          Удалить
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className=" mt-5">
            <h2>Введите номер телефона</h2>
            <input type="text" placeholder="+7701234578" onChange={e => setPhone(parseFloat(e.target.value))}/>
          </div>
          <div className="col-auto ms-auto">
            <h2>Общая стоимость товаров: {cartTotal}₸</h2>
          </div>
          <div className="col-auto">
            <button className="btn btn-danger m-2" onClick={() => emptyCart()}>
              Очистить корзину
            </button>
            <button className="btn btn-primary"
                    disabled={!phone}
                    onClick={() => postOrder()}>
              Оформить заказ
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
