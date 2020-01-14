import React, { Component } from "react";
import { Form, Input, Button, Icon, message } from "antd";
import { connect } from "react-redux";
import { saveUserAsync } from "../../redux/action";
import logo from "./logo.png";
import "./index.less";
const { Item } = Form;
// import create from "antd/lib/icon/IconFont";
@Form.create()
@connect(null, { saveUserAsync })
class Login extends Component {
  // 自定义表单验证
  validator = (rule, value, callback) => {
    // callback必须调用，否则会出问题
    // console.log(rule,value);

    const reg = /^\w+$/;
    const name = rule.field === "username" ? "用户名" : "密码";
    if (!value) {
      callback(`${name}不能为空`);
    } else if (value.length < 4) {
      callback(`${name}不能小于4位数`);
    } else if (value.length > 12) {
      callback(`${name}不能大于12位数`);
    } else if (!reg.test(value)) {
      callback(`${name}只能包含英文、数字、下划线`);
    }
    callback();
  };
  /**
   * 配置axios拦截器
   *    拦截器：
   *      是一个拦截请求/响应的函数
   *    作用：
   *      作为请求拦截器：设置公共的请求头 / 参数 ...
   *      作为响应拦截器
   *    执行流程：
   *      1、执行请求拦截器函数
   *      2、发送请求
   *      3、执行响应拦截器函数(接收到了响应)
   *      4、执行axios().then()/catch()
   */

  /**
   * callback()调用不传参,代表表单校验成功
   * callback()调用传参，代表表单校验失败,提示message里的错误
   */
  /**
   * 自己创建axios实例，可以修改axios默认配置
   *
   */

  handleSubmit = e => {
    // 禁止默认行为
    e.preventDefault();
    // 校验表单并收集表单数据
    this.props.form.validateFields((err, values) => {
      /**
       * err错误对象
       *  如果表达那校验失败，就有错误，值是对象
       *  如果表单校验成功，就没有错误，值为null
       * values
       *  收集 的表单数据
       */
      if (!err) {
        console.log("err错误对象", values);
        // 表单校验成功
        const { username, password } = values;
        // 发送请求,请求登录
        //#region
        /*axios
          .post("/api/login", { username, password })
          .then(res => {
            // 判断是否登录成功
            if (res.data.status === 0) {
              // 登录成功
              // 跳转到home页面
              // 不能跳转(只能用于render方法中)路由链接跳转
              // return<Redirect to ="/"/>

              // 编程式导航(用于非return方法中)
              // history是路由传过来的属性(三个属性)
              this.props.history.replace("/");
            } else {
              // 登陆失败，提示错误
              message.error(res.data.msg);
              // 登录失败清空密码框
              this.props.form.resetFields(["password"]);
            }
          })
          .catch(() => {
            // 网络错误，提示
            message.error("网络错误");
            // 清除密码框
            this.props.form.resetFields(["password"]);
          });*/
        //#endregion
        // 得到登录成功/失败
        this.props
          .saveUserAsync(username, password)
          .then(() => {
            this.props.history.replace("/");
          })
          .catch(msg => {
            message.error(msg);
            this.props.form.resetFields(['password']);
          });
      }
    });
  };

  render() {
    //   getFieldDecorator 高阶组件，用来进行表单验证
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="图片" />
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className="login-section">
          <h3>用户登录</h3>
          <Form className="login-form" onSubmit={this.handleSubmit}>
            <Item>
              {getFieldDecorator("username", {
                rules: [
                  {
                    validator: this.validator
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="请输入用户名"
                />
              )}
            </Item>
            <Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    validator: this.validator
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="请输入密码"
                />
              )}
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-button">
                登录
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    );
  }
}
// Form.create()(Login)高阶组件,给login传递form属性
// export default Form.create()(Login);
export default Login;
