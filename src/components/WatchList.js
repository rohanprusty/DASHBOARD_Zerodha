import React, { useState } from "react";
import "./WatchList.css";

import { Tooltip, Grow } from "@mui/material"; // to acess the hover effect through mui
import { watchlist } from "../data/data";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import BarChartIcon from '@mui/icons-material/BarChart';
import BoltIcon from '@mui/icons-material/Bolt';

const WatchList = () => {
  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Find your favourite stock here..."
          className="search"
        />
        <span className="counts"> {watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => {
          return <WatchListItems stock={stock} key={index} />;
        })}
      </ul>
    </div>
  );
};

export default WatchList;

// function to add watchlist data with hover effect

const WatchListItems = ({ stock }) => {
  const [showWatchList, setshowWatchList] = useState(false);

  const handleMouseEnter = (e) => {
    setshowWatchList(true);
  };
  const handleMouseExit = (e) => {
    setshowWatchList(false);
  };

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {showWatchList && <WatchListActions uid={stock.name} />}
    </li>
  );
};

// hover effect options to buy and sell other options ---->

const WatchListActions = ({ uid }) => {
  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="buy">Buy</button>
        </Tooltip>
        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="sell">Sell</button>
        </Tooltip>
        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action"><BarChartIcon className="icon"/></button>
        </Tooltip>
        <Tooltip
          title="Thunder (T)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action"><BoltIcon className="icon"/></button>
        </Tooltip>
      </span>
    </span>
  );
};
