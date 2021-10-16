import React from "react";
import { decrease, increase } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Card({ product }) {
  const dispatch = useDispatch();
  const priceMap = useSelector((state) => state.cart.quantity);
  // converting image data from uint8 array ro base64 string
  const b64 = Buffer.from(product.image.data.data).toString("base64");
  const imgSrc = "data:image/" + product.image.contentType + ";base64," + b64;
  let num_items = "x" + priceMap.get(product.name)
  if (num_items === "xundefined" | num_items === "x0") {num_items = ""}
  return (
    <>
      <div className=" m-5 max-w-xs mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-36 w-full object-cover md:h-full md:w-48"
              src={imgSrc}
              // src="https://pixahive.com/wp-content/uploads/2020/10/Gym-shoes-153180-pixahive.jpg"
              alt=""
            />
          </div>
          <div className="text-left p-5 pb-2 max-h-32 md:max-h-36 md:w-96">
            {priceMap.get(product.name) ? (
              <div className="uppercase tracking-wide text-lg text-black font-bold">
                {product.name} ${product.price} <p className="inline text-base font-normal opacity-50">{num_items}</p>
              </div>
            ) : (
              <div className="uppercase tracking-wide text-lg text-black font-bold">
                {product.name} ${product.price}
              </div>
            )}

            <p className="mt-2 text-gray-500">{product.description}</p>
          </div>
          <div className="text-center justify-items-end md:self-center">
            <button
              className="m-2 w-1/3 h-8 md:w-16 md:h-16  md:rounded-full md:justify-items-end drop-shadow-md text-white rounded-md bg-gray-600 hover:bg-gray-900"
              onClick={() => {
                dispatch(increase(product.name, product.price));
              }}
            >
              Add
            </button>
          </div>
          <div className="text-center justify-items-end md:self-center">
            <button
              className="m-2 w-1/3 h-8 md:w-16 md:h-16  md:rounded-full md:justify-items-end drop-shadow-md text-white rounded-md bg-gray-600 hover:bg-gray-900"
              onClick={() => dispatch(decrease(product.name, product.price))}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
