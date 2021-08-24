import React from "react";
import { Props } from "../App";

export const Sidebar: React.FC<Props> = ({ goods, setFilter }) => {
  return (
    <div>
      <div className="sidebar-container">
        <div className="sidebar-logo">Категории</div>
        <ul className="sidebar-navigation">
          <li>
            <a href="#" onClick={() => (setFilter ? setFilter("Все") : null)}>
              <i className="fa fa-home" aria-hidden="true"></i> Все товары
            </a>
          </li>
          {goods.map((item) => {
            return (
              <li key={item.id}>
                <a
                  href="#"
                  onClick={() => (setFilter ? setFilter(item.type) : null)}
                >
                  <i className="fa fa-home" aria-hidden="true"></i> {item.type}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div></div>
    </div>
  );
};
