import React, { useState, useEffect } from "react";
import "./Holdings.css";
import axios from "axios"; // Axios used for API calls
import { VerticalGraph } from "./VerticleGraph";

// import { holdings } from "../data/data";

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    axios.get("https://zerodha-backend-siis.onrender.com/allHoldings").then((res) => {
      console.log(res.data);
      setHoldings(res.data);
    });
  }, []);

  // Prepare data for the vertical graph
  const labels = holdings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Prices",
        data: holdings.map((stock) => stock.price),
        backgroundColor: "#F8C8DC",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>

          {holdings.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isprofit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isprofit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            // tofixed --> get to two decimal values.

            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{curValue.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={profClass}>{stock.net}</td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
