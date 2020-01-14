/** 
 * 封装axios模块
*/
import axios from 'axios';


// 创建axios实例
const axiosInstance = axios.create({
    baseURL:'/api', //公共的请求路径前缀
    timeout: 20000, //请求超时
    headers:{
        // 公共请求头参数
    }
})


// 设置请求拦截器

//请求拦截器
axiosInstance.interceptors.request.use(config=>{
    //设置公共的参数
    
    

    // 问题：需要处理token
    let token='';
    if(token){
        config.headers.authorization=`Bearer ${token}`;
    }
})

// 设置响应拦截器
axiosInstance.interceptors.response.use(
   
    response=>{
        /** 
         * 成功返回成功得promise
         * 失败返回失败得promise
        */
       if(response.data.status === 0){
        return response.data.data;
       }else{
           return Promise.reject(response.data.msg);
       }
    },
    err=>{
        /** 
         * 根据不同的原因，提示不同的错误
        */
       let errMag ='';
       if(err.response){
        /** 
         * 接收到了响应，但是响应式错误的
         * 根据响应的状态判断错误的类型
        */
    //    errMag = errCode[err.response.status];

       }else{
           /** 
            * 没有接收到响应
            * 根据响应的message(错误信息)来判断错误的类型
           */
          if(err.message.indexOf('Network Error') !== -1){
            errMag = '网络连接失败，请重新连接网络试试';
          }else if(err.message.indexOf('timeout')!== -1){
            errMag = '网络连接超时，请连wifi试试';
          }
       }
       return  Promise.reject(errMag || '发生未知的错误，请联系管理员·')
    }
)
export default axiosInstance;