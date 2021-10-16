export const increase = (name, price) => {
  return {
    type: "INCREASE",
    name,
    price,
  };
};

export const decrease = (name, price) => {
  return {
    type: "DECREASE",
    name,
    price,
  };
};
