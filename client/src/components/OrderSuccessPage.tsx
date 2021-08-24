import React from 'react'
import { Link } from 'react-router-dom'

export const OrderSuccessPage = () => {
    return (
        <div className="container">
            <div className="success mt-5 d-flex justify-content-center">
                <img className="success-img" src="https://free-png.ru/wp-content/uploads/2021/07/free-png.ru-2-700x688.png" alt="success"/>
            </div>
            <div className="success-message d-flex justify-content-center mt-5">
                <h3>Заказ успешно оформлен!</h3>
            </div>
            <div className="success-btn d-flex justify-content-center mt-5">
                <Link to="/" className='btn btn-outline-success'>На главное меню</Link>
            </div>
        </div>
    )
}