import React from "react";
import Card from "./Card";

export default function ProductsList({ productList }) {
  return (
    <>
      <div className="container-fluid">
        {productList.map((product) => {
          return <Card key={product.id} product={product} />;
        })}
      </div>
    </>
  );
}
