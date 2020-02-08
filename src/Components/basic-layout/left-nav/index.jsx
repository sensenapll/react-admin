import React, { Component } from "react";
import { Menu, Icon } from "antd";
import menus from "../../../config/menus";
import { Link, withRouter } from "react-router-dom";
const { SubMenu, Item } = Menu;

@withRouter
class LeftNav extends Component {
  createMenus = menus => {
    return menus.map(menu => {
      if (menu.children) {
        // 二级菜单
        return (
          <SubMenu
            key={menu.key}
            title={
              <span>
                <Icon type={menu.icon} />
                <span>{menu.title}</span>
              </span>
            }
          >
            {menu.children.map(cMenu => this.createMenuItem(cMenu))}
          </SubMenu>
        );
      } else {
        //一级菜单
        return this.createMenuItem(menu);
      }
    });
  };

  createMenuItem = menu => {
    return (
      <Item key={menu.key}>
        <Link to={menu.path}>
          <Icon type={menu.icon} />
          <span>{menu.title}</span>
        </Link>
      </Item>
    );
  };
  render() {
    return (
      <Menu
        theme="dark" //主题色
        defaultSelectedKeys={["1"]} //默认选中的菜单
        mode="inline"
      >
        {this.createMenus(menus)}
      </Menu>
    );
  }
}
export default LeftNav;
