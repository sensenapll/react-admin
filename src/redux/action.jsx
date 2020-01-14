/**
 * 用来创建action对象工厂函数模块
 * 同步action
 * 异步action
 */
import { reqLogin } from "../api";
import { setItem } from "../utils/storage";
import { SAVE_USER } from "../redux/action-types";

const saveUser = user => ({ type: SAVE_USER, data: user });
export const saveUserAsync = (username, password) => {
  return dispatch => {
    // 异步操作
    // 当前函数返回值，作为将来组件调用的时的返回值
    return reqLogin(username, password).then(response => {
      // 登录成功
      /**
       * 存储用户数据和token
       * 存在redux中(内存存储，一旦刷新就没了)
       *    还需要持久化存储，localStorage
       *    还因为频繁操作localStorage性能不好，如果存储在redux中，性能更好
       *
       * 存储：localStorage和redux
       * 读取：先从localStorage中读取，存在redux中，后面通过redux读取使用
       */
      setItem("user", response);
      // 触发更新
      dispatch(saveUser(response));
      //  跳转到主页
      // this.props.history.replace("/");
    });
    //       .catch(msg => {
    //         // 登录失败
    //         message.error(msg);
    //         // 清空密码
    //         this.props.form.resetFields(["password"]);
    //       });
    //   };
  };
};
