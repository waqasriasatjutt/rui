import { sideMenu } from "./menu.config";
import { FaPowerOff } from "react-icons/fa";

import { Link, NavLink, useLocation } from "react-router-dom";

import Dropdown from "./Dropdown";
import React from "react";
import { FaAngleDown } from "react-icons/fa";
import { login_log } from "../../../images";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/authSlice";

const Sidebar2 = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  const location = useLocation();
  const [clickedOn, setClickedOn] = React.useState("");
  React.useEffect(() => {
    let route = location.pathname.split("/")[1];
    setClickedOn(`/${route}`);
  }, [location.pathname]);

  return (
    <div
      className={`fixed w-[220px] top-0 bottom-0 border-r-2 border-[#e8e9eb] z-[99] !overflow-y-hidden transition-all`}
    >
      <div className="p-3.7 pb-1 border-b border-[#d5d5d5] !overflow-y-hidden">
        <Link to="/">
          <img src={login_log} alt="Callrings CRM" />
        </Link>
        <div className="!mt-2 text-right flex w-full justify-center">
          <small>Beta Version 0.3.6</small>
        </div>
      </div>

      <div className={`overflow-y-auto scrollbar`}>
        {sideMenu.map((item, key) => {
          const { label, to, Icon, children, onClick } = item;
          return (
            <div className="w-full" key={key}>
              {item?.children ? (
                <>
                  <div
                    className="transition-all page_link group hover:text-[#828282] hover:no-underline text-[#828282] transition flex items-center justify-between py-[3px] !px-5 w-full outline-none border-0 cursor-pointer transition-all"
                    onClick={() => {
                      setClickedOn(clickedOn === to ? "" : to);
                      setIsOpen(!isOpen);
                    }}
                  >
                    <div className="flex items-center">
                      <Icon className="icons group-hover:text-primary-100" />
                      <span className="!ml-1">{label}</span>
                    </div>
                    <FaAngleDown />
                  </div>
                  {clickedOn === to && (
                    <Dropdown
                      label={label}
                      to={to}
                      Icon={Icon}
                      options={children}
                      key={key}
                    />
                  )}
                </>
              ) : (
                <NavLink
                  title={label}
                  to={to}
                  onClick={onClick}
                  className="page_link group hover:text-[#828282] hover:no-underline no-underline text-[#828282] flex items-center py-[3px] !px-5 w-full outline-none border-0 cursor-pointer transition-all"
                >
                  <Icon className="icons group-hover:text-primary-100" />

                  <span className="ml-1">{label}</span>
                </NavLink>
              )}
            </div>
          );
        })}
        <NavLink
          to
          onClick={logoutHandler}
          className="group hover:text-[#828282] hover:no-underline no-underline text-[#828282] flex items-center py-[3px] !px-5 w-full outline-none border-0 cursor-pointer transition-all"
        >
          <FaPowerOff className="group-hover:text-primary-100" />
          <span className="ml-1">Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar2;
