import React, { Component } from "react";
import { Form, Input, Button, Icon } from "antd";
import logo from "./logo.png";
import "./index.less";
// import create from "antd/lib/icon/IconFont";
@Form.create()

class Login extends Component {
    // 自定义表单验证
    
    validator=(rule,value,callback)=>{
        // callback必须调用，否则会出问题
        // console.log(rule,value);

        const reg = /^\w+$/
        const name = rule.field === 'username' ? '用户名' : '密码';
        if(!value){
            callback(`${name}不能为空`)
        }else if(value.length < 6){
            callback(`${name}不能小于6位数`)
        }else if(value.length > 12){
            callback(`${name}不能大于12位数`)
        }else if(!reg.test(value)){
            callback(`${name}只能包含英文、数字、下划线`)
        }
        callback();
    }
    /** 
     * callback()调用不传参,代表表单校验成功
     * callback()调用传参，代表表单校验失败,提示message里的错误
    */
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
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
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [{
                    validator: this.validator
                }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="请输入用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{
                    validator:this.validator
                }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="请输入密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" className="login-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
// Form.create()(Login)高阶组件,给login传递form属性
// export default Form.create()(Login);
export default Login;
