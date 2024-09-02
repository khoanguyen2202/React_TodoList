import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ThemeContext } from "./App";
import "./App.css";

function Cart() {
  const [nameProduct, setNameProduct] = useState();
  const [priceProduct, setPriceProduct] = useState();

  const [products, setProducts] = useState(() => {
    const localStorageProducts = JSON.parse(localStorage.getItem("products"));
    return localStorageProducts ?? [];
  });
  const handleAddProduct = () => {
    if (nameProduct && priceProduct) {
      let product = {
        name: nameProduct,
        price: +priceProduct,
      };
      setProducts((prev) => {
        return [...prev, product];
      });
      setNameProduct("");
      setPriceProduct("");
      nameRef.current.focus();
    }
  };
  const total = useMemo(() => {
    const totalProductPrice = products.reduce((result, product) => {
      return result + product.price;
    }, 0);
    return totalProductPrice;
  }, [products]);

  const nameRef = useRef();

  useEffect(() => {
    const jsonProduct = JSON.stringify(products);
    localStorage.setItem("products", jsonProduct);
  }, [products]);

  const handleClearProduct = () => {
    setProducts([]);
  };

  const handleRemove = (index) => {
    console.log(index);
    setProducts((prev) => {
      const newProducts = [...prev];
      newProducts.splice(index, 1);
      return newProducts;
    });
  };
  const theme = useContext(ThemeContext);
  return (
    <div className={theme}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          ref={nameRef}
          placeholder="Enter product"
          value={nameProduct}
          onChange={(e) => setNameProduct(e.target.value)}
          style={{ width: "200px" }}
        />
        <input
          type="number"
          placeholder="Enter price"
          value={priceProduct}
          onChange={(e) => setPriceProduct(e.target.value)}
          style={{ width: "200px" }}
        />
        <div style={{ display: "flex", gap: "20px" }}>
          <button
            style={{ width: "max-content", minWidth: "50px" }}
            onClick={handleAddProduct}
          >
            Submit
          </button>
          <button
            style={{
              width: "max-content",
              minWidth: "50px",
              backgroundColor: "red",
              color: "white",
              borderWidth: 0,
              borderRadius: "4px",
            }}
            onClick={handleClearProduct}
          >
            Clear Cart
          </button>
        </div>
      </div>
      Total: {total}
      <br />
      {products.map((product, index) => (
        <li key={index}>
          {product.name} - {product.price}
          <button
            style={{
              marginLeft: "10px",
              borderRadius: "50%",
              borderWidth: 0,
              backgroundColor: "red",
              color: "white",
              width: "max-content",
              minWidth: "50px",
            }}
            onClick={() => handleRemove(index)}
          >
            Remove
          </button>
        </li>
      ))}
    </div>
  );
}

export default Cart;
