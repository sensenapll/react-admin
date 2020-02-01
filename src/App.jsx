import React, { Component } from "react";
import { BrowserRouter as Router, Route ,Switch} from "react-router-dom";
import Home from "./Components/home";
import Login from "./containers/login";
import BasicLayout from './Components/basic-layout';
import "./index.less";
export default class App extends Component {
  render() {
    /**
     * 判断是否登录过： 从redux -->user
     *    获取访问地址：
     *        router的三大属性：
     *            1、history     用来跳转
     *            2、location     location.pathname获取路径部分
     *            3、match  获取parma参数
     * 如果登录过：
     *    访问/,可以访问
     *    访问/login,跳转到/
     * 如果没有登录过：
     *    访问/,跳转到/login
     *    访问/login,可以访问
     */

     /** 
      * Switch从上到下匹配
     */
    return (
      <Router>
        <Switch>
        <Route path="/login" exact component={Login} />
        <BasicLayout>
          <Route path="/" exact component={Home} />
          </BasicLayout>
          </Switch>
      </Router>
    );
  }
}
