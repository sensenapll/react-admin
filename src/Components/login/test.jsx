import React from "react";
import axios from "axios";
import { message } from "antd";
export default function Test() {
  // 配置axios拦截器
  const axiosInstance = axios.create({
    baseURL: "/api", //基础路径(公共路径),后面所有请求路径都会以baseURL开头
    timeout: 20000, //20s,请求超时时间，请求一旦超过20s还没有反应，就会自动终断请求
    headers: {
      //   公共的请求头
      // 参数必须写死
    }
  });
  /**
   * 拦截器：
   *    是一个拦截请求/响应的函数
   * 作用：
   *    作为请求拦截器：设置公共的请求头/参数...
   *    作为响应拦截器：
   * 执行流程：
   *    1、执行请求拦截器函数
   *    2、发送请求
   *    3、执行响应拦截器函数(接收到了响应)
   *    4、执行axiosInstance().then/catch()
   */
  /**
   * axios发送POST请求
   *   默认的content-type:application/json请求体式json
   *   有可能发送的POST请求,需要的Content-type式application/x-www-form-urlencoded
   */
  // 设置拦截器
  // 设置请求拦截器(在发送请求之前调用)
  axiosInstance.interceptors.request.use(
    // 代码成功
    // config是一个对象，里面包含了所有发送请求的配置
    // 修改config配置
    // 添加动态的headers参数
    config => {
      console.log(config);

      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      // 判断请求是否时post请求
      // 看接口是否必须使用application/x-www-form-urlencoded发送请求
      if (config.method === "post") {
        // 修改参数
        /** 
         * data: {
            username: "admin",
            password: "admin"
      }
      ---->'username=admin&password=admin',  (不适合)
        */
        const keys = Object.keys(config.data);
        // prev上一次遍历的返回值，curr当前遍历的元素
        const data = keys
          .reduce((prev, curr) => {
            prev += `&${curr}=${config.data[curr]}`;
            return prev;
          }, "")
          .slice(1);
        console.log(data);
        config.data = data;
        config.headers['content-type']='application/x-www-form-urlencoded';
      }
      return config;
      
    }
    /*// 代码失败一般不用
    (err)=>{
      // err失败的原因，返回一个失败的对象
      return Promise.reject(err);
      
    }*/
  );
  // 设置响应拦截器(返回响应之后，触发axiosInstance.then/catch之前调用)
  axiosInstance.interceptors.response.use(
    // 请求/响应成功 -->200
    response => {
      if(response.data.status === 0){
        return response.data.data;
      }else{
        // 功能失败
        return Promise.reject(response);
      }
    },
    // 请求/响应失败 错误状态码：4xx  5xx
    err => {
      const errCode={
        401:'没有权限访问当前接口',
        403:'禁止访问当前接口',
        404:'当前资源未找到',
        500:'服务器发生位置的错误，请联系管理员'
      }
      let errMessage = '';

      if (err.response) {
        // 说明接受到了响应，响应是失败的响应
        // 根据响应状态码判断错误 401 403 404 500
        errMessage = errCode[err.response.status];
      } else {
        // 说明没有接受到响应，请求就失败了

        if (err.message.indexOf('Network Error') !== -1) {
          errMessage = '网络连接失败，请重连网络试试~';
        } else if (err.message.indexOf('timeout') !== -1) {
          errMessage = '网络超时，请连上wifi重试~';
        }
      }
      return Promise.reject(errMessage || '发生未知错误，请联系管理员');
    }
  );
  let token = "";
  let id = "";
  const handleClick1 = () => {
    axiosInstance({
      method: "POST",
      url: "/login",
      data: {
        username: "admin",
        password: "admin"
      },
      // data:'username=admin&password=admin',  (不适合)
      // headers: {
      //   "content-type": "application/x-www-form-urlencoded"
      // }
      /** 只有key值，没有value值，所有要修改data属性
       * {"username":"admin","password":"admin"}:
       */
    })
      .then(res => {
        if (res.data.status === 0) {
          token = res.data.data.token;
          message.success("登录成功");
        } else {
          message.error(res.data.msg);
        }
      })
      .catch(error => {
        console.log(error);
        message.error(error);
      });
  };
  const handleClick2 = () => {
    axiosInstance({
      method: "POST",
      url: "/category/add",
      data: {
        categoryName: "电脑"
      }
      //   看API文档有参数要求，因为是登录之后执行的操作，所以必须携带token，不然会报401错误
      // headers: {
      //   authorization: `Bearer ${token}`
      // }
    })
      .then(res => {
        if (res.data.status === 0) {
          id = res.data.data._id;
          console.log(res.data.data._id);

          message.success("添加分类成功");
        } else {
          message.error(res.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
        message.error("网络错误");
      });
  };
  const handleClick3 = () => {
    axiosInstance({
      method: "POST",
      url: "category/delete",
      data: {
        categoryId: id
      }
      //   看API文档有参数要求，因为是登录之后执行的操作，所以必须携带token，不然会报401错误
      // headers: {
      //   authorization: `Bearer ${token}`
      // }
    })
      .then(res => {
        if (res.data.status === 0) {
          message.success("删除分类成功");
        } else {
          message.error(res.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
        message.error("网络错误");
      });
  };
  return (
    <div>
      <button onClick={handleClick1}>按钮1</button>
      <button onClick={handleClick2}>按钮2</button>
      <button onClick={handleClick3}>按钮3</button>
    </div>
  );
}

{
  /*export default function Test() {
  let token = "";
  let id = "";
  const handleClick1 = () => {
    axios({
      method: "POST",
      url: "/api/login",
      data: {
        username: "admin",
        password: "admin"
      }
    })
      .then(res => {
        if (res.data.status === 0) {
          token = res.data.data.token;
          message.success("登录成功");
        } else {
          message.error(res.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
        message.error("网络错误");
      });
  };
  const handleClick2 = () => {
    axios({
      method: "POST",
      url: "/api/category/add",
      data: {
        categoryName: "电脑"
      },
      //   看API文档有参数要求，因为是登录之后执行的操作，所以必须携带token，不然会报401错误
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.data.status === 0) {
          id = res.data.data._id;
          console.log(res.data.data._id);
          
          message.success("添加分类成功");
        } else {
          message.error(res.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
        message.error("网络错误");
      });
  };
  const handleClick3 = () => {
    axios({
      method: "POST",
      url: "/api/category/delete",
      data: {
        categoryId: id
      },
      //   看API文档有参数要求，因为是登录之后执行的操作，所以必须携带token，不然会报401错误
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.data.status === 0) {
          message.success("删除分类成功");
        } else {
          message.error(res.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
        message.error("网络错误");
      });
  };
  return (
    <div>
      <button onClick={handleClick1}>按钮1</button>
      <button onClick={handleClick2}>按钮2</button>
      <button onClick={handleClick3}>按钮3</button>
    </div>
  );
}*/
}
