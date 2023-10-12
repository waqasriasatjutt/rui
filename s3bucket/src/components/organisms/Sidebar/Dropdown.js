import React from "react";
import { NavLink } from "react-router-dom";
function Dropdown(props) {
  const { options, to } = props;
  return (
    <div className="w-full transition-all">
      <div className="w-full transition-all">
        {options.map((item, key) => {
          let Icon = item?.Icon;
          return  (
            <div className="w-full transition-all" key={key}>
              <NavLink
                title={item.label}
                to={`${to}/${item.to}`}
                className="hover:no-underline no-underline hover:text-[#828282] page_link group text-[#828282] flex items-center py-[3px] pl-10 w-full outline-none border-0 cursor-pointer transition-all"
                // style={{ paddingLeft: "2.5rem" }}
              >
                <Icon className="group-hover:text-primary-100 icons" />
                 <span className="ml-1">{item.label}</span>
              </NavLink>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Dropdown;
