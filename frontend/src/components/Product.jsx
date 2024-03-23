import React from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const { barcode } = useParams();
  return <div>{barcode}</div>;
};

export default Product;
