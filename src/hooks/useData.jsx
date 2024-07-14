import React, { useContext } from "react";
import { DataContext } from "../providers/DataProvider";

const useData = () => {
  const data = useContext(DataContext);

  return data;
};

export default useData;
