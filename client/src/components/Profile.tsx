import React, {useContext, useEffect, useState} from 'react'
import {Header} from "./Header";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import Loader from "./Loader";

interface Profile {
    id: number;
    owner: string;
    status: number;
    phone: number;
    product: ProfileProducts[];
}

interface ProfileProducts {
    id: number;
    img: string;
    type: string;
    brand: string;
    price: string;
    title: string;
    quantity: number;
    itemTotal: number;
}

enum OrderStatus {
    canceled = "Заказ отменен",
    ordered = "Заказ оформлен",
    preparing = "Заказ формируется",
    done = "Заказ отправлен",
}

export const Profile = () => {
    // @ts-ignore
    const { isLogin, userId }: {isLogin: boolean; userId: number} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [profileGoods, setProfileGoods] = useState<Profile[]>([])
    const getProfile = () => {
        axios.get<Profile[]>(`/api/profile/${userId}`).then(({data}) => {
            setProfileGoods(data);
            setIsLoading(false);
        });
    }
    useEffect(() => {
            getProfile();
    }, []);
    if (!isLogin) {
        return (
        <>
            <Header/>
            <div className="container">
                <h1 className="text-center">Не авторизован!</h1>
            </div>
        </>
        )
    }
    const orderStatusObj = {
        1: "Заказ отменен",
        2: "Заказ оформлен",
        3: "Заказ формируется",
        4: "Заказ отправлен",
    }

    return (
        <div>
            <Header/>
            <div className="container">
                <div className="row">
                    <h2>Мои заказы</h2>
                    {
                        isLoading ?
                            Array(8)
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
                            : profileGoods.length ?
                                profileGoods.map(item => {
                                    const {id, phone, product, status } = item;
                                    // @ts-ignore
                                    const orderStatus = orderStatusObj[status];
                                    return (
                                        <div className="card mt-2" style={{width: 35 + 'rem'}} key={id}>
                                            <div className="card-body">
                                                <h2 className="card-title">Номер заказа: {id}</h2>
                                                <h4>Номер телефона: {phone}</h4>
                                                <h5 className="card-price">Состав заказа:</h5>
                                                <ul>
                                                    {
                                                        product.map(({id, title, quantity}) => {
                                                            return (
                                                                <>
                                                                    <li key={id}>{title}; <span className="admin-order-quantity">количество: {quantity}шт.</span></li>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                                <h4>Статус заказа: {orderStatus}</h4>
                                                <h5>Общая сумма заказа: {product.reduce((sum, obj) => obj.itemTotal + sum, 0)}₸</h5>
                                            </div>
                                        </div>
                                    )
                                })
                            : <h1>Ты еще не совершил заказы...</h1>
                    }
                </div>
            </div>
        </div>
    )
}