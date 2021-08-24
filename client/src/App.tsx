import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect, useHistory,
} from "react-router-dom";
import { Admin } from "./components/Admin";
import { MainPage } from "./components/MainPage";
import { AdminAdd } from "./components/AdminAdd";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./components/hooks/auth.hook";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import axios from "axios";
import { AdminEditGood } from "./components/AdminEditGood";
import { CartProvider } from "react-use-cart";
import { Cart } from "./components/Cart";
import {AdminOrders} from "./components/AdminOrders";
import {OrderSuccessPage} from "./components/OrderSuccessPage";
import {Profile} from "./components/Profile";

export interface goodsResponse {
  id: number;
  type: string;
  brand: string;
  title: string;
  img: string;
  price: number;
}
export interface Props {
  goods: goodsResponse[];
  isLoading: boolean;
  getGoods?: () => void;
  setFilter?: React.Dispatch<React.SetStateAction<string>>;
  filter?: string;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(0);
  const [filter, setFilter] = useState("Все");
  const { login, logout, token, userId, isReady, isAdmin } = useAuth();
  const isLogin = !!token;
  const [goods, setGoods] = useState<Array<goodsResponse>>([]);
  const getGoods = () => {
    axios.get<goodsResponse[]>("api/products").then((res) => {
      const { data } = res;
      console.log(data);
      setGoods(data);
      setIsLoading(false);
    });
  };
  useEffect(() => {
    getGoods();
  }, []);
  console.log(isLogin)
  return (
    <AuthContext.Provider
      value={{ login, logout, token, userId, isReady, isLogin, isAdmin }}
    >
      <CartProvider>
        <Router>
          <Switch>
            <div className="App">
              <Route
                exact
                path="/"
                render={() => (
                  <MainPage
                    goods={goods}
                    isLoading={isLoading}
                    setFilter={setFilter}
                    filter={filter}
                  />
                )}
              />

                    <Route
                        exact
                        path="/admin"
                        render={() => (
                            <Admin
                                goods={goods}
                                isLoading={isLoading}
                                getGoods={getGoods}
                            />
                        )}
                    />
              <Route path="/admin/add" render={() => <AdminAdd />} />
              <Route path="/login" render={() => <LoginPage />} />
              <Route path="/cart" render={() => <Cart status={status} setStatus={setStatus} />} />
              <Route path="/register" render={() => <RegisterPage />} />
              <Route path="/profile" render={() => <Profile />} />
              <Route path="/admin/orders" render={() => <AdminOrders />} />
              {
                status ?
                    <Route exact path="/success" render={() => <OrderSuccessPage />} />
                    : <Redirect to='/'/>
              }
              <Route
                exact
                path="/admin/edit/:id"
                render={() => <AdminEditGood getGoods={getGoods} />}
              />
            </div>
          </Switch>
        </Router>
      </CartProvider>
    </AuthContext.Provider>
  );
}

export default App;