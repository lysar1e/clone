import React, {useEffect, useState} from 'react'
import {AdminHeader} from "./AdminHeader";
import axios from "axios";
interface Orders {
    id: number;
    owner: string;
    phone: number;
    product: Product[];
    status: number;
}

interface Product {
    brand: string;
    id: number;
    img: string
    itemTotal: number;
    price: string;
    quantity: number;
    title: string;
    type: string;
}
enum OrderStatus {
    canceled = 1,
    ordered,
    preparing,
    done,
}
export const AdminOrders = () => {
    const [orders, setOrders] = useState<Orders[]>([]);
    const getOrders = () => {
        axios.get<Orders[]>("/api/orders").then((res) => {
            const {data} = res;
            setOrders(data);
        });
    }
    useEffect(() => {
        getOrders();
    }, []);

    const updateOrderStatus = async (id: number, status: number) => {
        console.log(status)
        await axios.put(`/api/orders/update/${id}`, status);
        getOrders();
    }

    return (
        <div>
            <AdminHeader/>
            <div className="container mt-5">
                <div className="row">
                {
                    orders.map(item => {
                        const {id, phone, product} = item;
                        return (
                            <div className="card mt-2" style={{width: 35 + 'rem'}} key={id}>
                                <div className="card-body">
                                    <h2 className="card-title">Номер заказа: {id}</h2>
                                    <h4>Номер телефона: {phone}</h4>
                                    <h5 className="card-price">Состав заказа:</h5>
                                    <ul>
                                        {
                                            product.map(item => {
                                                return (
                                                    <>
                                                    <li key={item.id}>{item.title}; <span className="admin-order-quantity">количество: {item.quantity}шт.</span></li>
                                                    </>
                                                )
                                            })
                                        }
                                    </ul>
                                    <h5>Общая сумма заказа: {product.reduce((sum, obj) => obj.itemTotal + sum, 0)}₸</h5>
                                    {
                                        item.status === OrderStatus.ordered ?
                                            <>
                                        <button className="btn btn-danger" onClick={() => updateOrderStatus(id, OrderStatus.canceled)}>Отменить</button>
                                        <button className="btn btn-success" onClick={() => updateOrderStatus(id, OrderStatus.preparing)}>Формировать заказ</button>
                                            </>
                                        :  <button className="btn btn-danger" onClick={() => updateOrderStatus(id, OrderStatus.done)}>Завершить заказ</button>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            </div>
        </div>
    )
}