import "./App.css";
import Checkout from "./Checkout/checkout";
import ProductList from "./products/ProductsList";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar/navbar";
import Grid from "@mui/material/Grid";

function App() {
  const [productList, setProductList] = useState([]);

  //Load the product list data from backend
  //ProductList set once on component init, as [] never mutates
  useEffect(() => {
    getProducts().then((res) => {
      setProductList(res.products);
    });
  }, []);

  async function getProducts() {
    try {
      //Request product data form backend with proxy at port 5000
      const products = await axios.get("/products");
      return products.data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <Navbar />
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <ProductList productList={productList} />
        </Grid>
        <Grid item xs={12} md={5}>
            <Checkout />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
