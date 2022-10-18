import React from "react";

//Components
import MenuItem from "../../Suplemetary/MenuItem/MenuItem";

// data
import { menuList } from "../../../../data/menu";

//styles
import "./styles.scss";
import { useSelector } from "react-redux";
import { authUserIdSelector } from "../../../../store/auth/selectors";

const Menu = () => {
  const userId = useSelector(authUserIdSelector);

  return (
    <div className="menu">
      <section className="menu__ready">
        <h2 className="menu__title">Menu</h2>
        <ul className="menu__items">
          {menuList.prod.map((item) => {
            return (
              <MenuItem
                key={item.name}
                unicon={item.unicon}
                name={item.name}
                link={`${item.link}${item.addUserId ? "/" : ""}${
                  item.addUserId ? userId : ""
                }`}
              />
            );
          })}
        </ul>
      </section>
      <section className="menu__dev">
        <h2 className="menu__title">More Pages</h2>
        <div className="menu__items">
          {menuList.dev.map((item) => {
            return (
              <MenuItem
                key={item.name}
                unicon={item.unicon}
                name={item.name}
                link={item.link}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Menu;
