let Router = require('koa-router')
let qiniu =require('qiniu')

let router = new Router( )


let config = {
  // 七牛云加载模块
  'accessKey':'Ec9xCi2GQLJfd8hgP9XG3XVKTpRcBTKbqWtB0-KT',
  'secretKey': 'TXEauMgB4ajW2yh38b4luXxiNwsngu_a8N42LwOV',
  'bucket': 'xdblogs'
}
// 获取七牛云token
router.get('/getToken', async(ctx) => {
  let mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey);
  let data = {}
  let options = {
    scope: config.bucket,
    expires: 3600 * 24
  }
  let putPolicy = new qiniu.rs.PutPolicy(options)
  let uploadToken = putPolicy.uploadToken(mac)
  if (uploadToken) {
    data.uploadToken = uploadToken;
    ctx.body = {
      code: 0,
      data
    }
  } else {
    ctx.body = {
      code: 1,
      data
    }
  }
})
router.get('/xudong', async(ctx) => {
  ctx.body = 'hhhh'
})

module.exports = router
