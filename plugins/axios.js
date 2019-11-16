import axios from 'axios'


const instance = axios.create({
  baseURL: process.env.baseUrl,
  withCredentials: true,
  headers: {'X-Custom-Header': 'foobar'},
  timeout: 10000,
})

// 添加客户端请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log(config)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})


// 添加客户端响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log(response)
  return response
}, function (error) {
  // 对响应错误做点什么
   console.log('error response', error.response)
  return Promise.reject(error.response.data)
})


