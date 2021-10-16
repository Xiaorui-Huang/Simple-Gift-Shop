import produce from "immer";

const initialState = { total: 0, quantity: new Map() };
const counterReducer = (state = initialState, action) => {
  const productName = action.name;
  const found = state.quantity.has(productName);
  switch (action.type) {
    case "INCREASE":
      let newQuant;
      if (found) {
        newQuant = produce(state.quantity, (draft) => {
          draft.set(productName, state.quantity.get(productName) + 1);
        });
      } else {
        newQuant = produce(state.quantity, (draft) => {
          draft.set(productName, 1);
        });
      }
      return { total: state.total + action.price, quantity: newQuant };

    case "DECREASE":
      let newQuant2;
      if (found) {
        if (state.quantity.get(productName) > 0) {
          newQuant2 = produce(state.quantity, (draft) => {
            draft.set(productName, state.quantity.get(productName) - 1);
          });
        } else return state;
        return { total: state.total - action.price, quantity: newQuant2 };
      }
      return state;

    default:
      return state;
  }
};

export default counterReducer;
