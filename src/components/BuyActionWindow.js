import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindows.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Use useContext to get the functions
  const { closeBuyWindow } = useContext(GeneralContext);

  const handleBuyClick = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await axios.post("https://zerodha-backend-siis.onrender.com/newOrders", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "BUY",
      });
      setSuccess("Order placed successfully!");
      setTimeout(() => {
        closeBuyWindow();
      }, 1200);
    } catch (err) {
      setError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      {/* Feedback messages */}
      {loading && <div className="feedback loading">Placing order...</div>}
      {success && <div className="feedback success">{success}</div>}
      {error && <div className="feedback error">{error}</div>}
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
              disabled={loading}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
              disabled={loading}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required: $14.65</span>
        <div>
          <button className="btn btn-blue" onClick={handleBuyClick} disabled={loading}>
            {loading ? "Buying..." : "Buy"}
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick} disabled={loading}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
