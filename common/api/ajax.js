import axios from 'axios'

export function getApi (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      console.log(err)
      reject(err.data)
    })
  })
}

export function postApi (url, data = {},config = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data, {
      headers: config
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      console.log(err)
      reject(err.data)
    })
  })
}
