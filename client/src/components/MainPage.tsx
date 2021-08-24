import React from "react";
import { Header } from "./Header";
import { Sidebar } from "./SideBar";
import { Goods } from "./Goods";
import { Props } from "../App";

export const MainPage: React.FC<Props> = ({
  goods,
  isLoading,
  setFilter,
  filter,
}) => {
  return (
    <div>
      <Header />
      <div className="container">
        <Sidebar goods={goods} isLoading={isLoading} setFilter={setFilter} />
        <Goods goods={goods} isLoading={isLoading} filter={filter} />
      </div>
    </div>
  );
};
