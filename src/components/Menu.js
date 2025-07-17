import React from "react";
import "./Menu.css";

import {useState} from "react";
import { Link } from "react-router-dom"

const Menu = () => {

      const [selectedmenu , setselectedmenu]= useState(0);
      const [isprofiledropdown , setisprofiledropdown]=useState(false);

      const handlemenuclick = (index)=>{
            setselectedmenu(index);
      }
      const profile_dropdown = (index)=>{
            setisprofiledropdown(!isprofiledropdown);
      }


      const old= "old-menu";    // declaring classnames to add properties for css to see visible changes
      const newchanges= "selected-menu"   // same .


  return (
    <div className="menu-container">
      <img src="dagonimg.jpeg" style={{ borderRadius:"100%" , width:"60px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link   to="/"   style={{textDecoration:"none"}} onClick={ () => handlemenuclick(0)}>
            <p className={selectedmenu==0  ? newchanges : old}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link to="/orders" style={{textDecoration:"none"}} onClick={()=> handlemenuclick(1)}>
            <p className={selectedmenu==1 ? newchanges : old}>Orders</p>
            </Link>
          </li>
          <li>
            <Link to="/holdings" style={{textDecoration:"none"}} onClick={()=> handlemenuclick(2)}>
            <p className={selectedmenu==2 ? newchanges : old}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link to="/positions" style={{textDecoration:"none"}} onClick={()=> handlemenuclick(3)}>
            <p className={selectedmenu==3 ? newchanges : old}>Positions</p>
            </Link>
          </li>
          <li>
            <Link to="/funds" style={{textDecoration:"none"}} onClick={()=> handlemenuclick(4)}>
            <p className={selectedmenu==4 ? newchanges : old}>Funds</p>
            </Link>
          </li>
          <li>
            <Link to="/apps" style={{textDecoration:"none"}} onClick={()=> handlemenuclick(5)}>
            <p className={selectedmenu==5 ? newchanges : old}>Apps</p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={()=> profile_dropdown } >
          <div className="avatar">ZU</div>
          <p className="username">USERID</p>
        </div>
        
      </div>
    </div>
  );
};

export default Menu;
