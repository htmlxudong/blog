const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
let bodyParser = require('koa-bodyparser')
let session = require('koa-session')

const app = new Koa()

app.use(bodyParser())
let { Mongoose } =  require('./config/mongodb')
Mongoose.connect()
let index =  require('./router')
let blog = require('./router/blog')

//配置session
app.keys = ['some secret hurr']; // cookie的签名
const CONFIG =  {
  key: 'session-blog',
  maxAge: 1000*60*60*24,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false
}
app.use(session(CONFIG, app))

// 路由配置
app.use(index.routes(),index.allowedMethods)
app.use(blog.routes(), blog.allowedMethods)


// 中间件
app.use(async(ctx, next) => {
  console.log(new Date())
  await next()
  ctx.req.session = ctx.session
})


// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)
  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
