let articleModel = require('../model/article.js')
let userModel = require('../model/user.js')
let commentModel = require('../model/comment.js')
let fileModel = require('../model/file.js')
// 保存文章到数据库
let saveArticle = async (ctx) =>  {
    let data = await ctx.request.body
    let result = await articleModel.save(data)
    if(result) {
        ctx.body = {
            code: 0
        }
    } else {
        ctx.body = {
            code: -1
        }
    }

}

// 读取数据库文章
let readArticle = async (ctx) => {
    let blogs = await articleModel.readAll()
    if(blogs){
      ctx.body = {
        code: 0,
        data:blogs.reverse()
      }
    } else {
      ctx.body = {
        code: -1
      }
    }

}

// 用户注册
let register = async (ctx) => {
    let data = ctx.request.body
    let res = await userModel.save(data)
    if(res) {
        ctx.body = {
            code: 0
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '用户名已存在'
        }
    }
}

// 用户登录
let login  = async (ctx) => {
    let data = ctx.request.body
    let res = await userModel.findLogin(data)
    if(res) {
        ctx.session.user = res
        ctx.body = {
            code: 0
        }
    } else {
        ctx.body = {
            code: -1
        }
    }

}

// 用户退出登录
let logout = async (ctx) => {
    ctx.session.user = {}
    ctx.body = {
        code: 0
    }
}

// 获取用户信息
let getUserInfo = async (ctx) => {
    let username = ctx.session.user.username
    if(username) {
        let data = await userModel.findLogin({username})
        ctx.body = {
            code: 0,
            data
        }
    } else {
        ctx.body = {
            code: -1
        }
    }
}

// 添加评论
let addComment = async (ctx) => {
    let data = ctx.request.body
    let res = await commentModel.save(data)
    if(res) {
        ctx.body = {
            code: 0
        }
    } else {
        ctx.body = {
            code: -1
        }
    }
}

// 获取评论
let getComment = async (ctx) => {
    let data = await commentModel.find()
    if(data){
      ctx.body = {
        code: 0,
        data
      }
    } else {
      ctx.body = {
        code: -1
      }
    }

}

// 更新文章信息
let updateArticle = async (ctx) => {
    let { id ,comment } = ctx.request.body
    let res = await articleModel.updateBlog({_id: id, comment})

    if(res) {
        ctx.body = {
            code: 0
        }
    } else {
        ctx.body = {
            code: -1
        }
    }
}

// 更新文章浏览量
let updateBrowers = async (ctx) => {
    let data = ctx.request.body
    let res = await articleModel.updateBrowse({_id: data._id , browse: data.browse })
    if(res) {
        ctx.body = {
            code: 0
        }
    } else {
        ctx.body = {
            code: -1
        }
    }
}

// 模糊查询
let query = async (ctx) => {
    let name = new RegExp(ctx.query.name)
    let res =await articleModel.query(name)
    if(res) {
        ctx.body = {
            code: 0,
            data: res
        }
    } else {
      ctx.body = {
        code: -1
      }
    }
}

// 删除博客
let deleteBlog = async (ctx) => {
  let id = parseInt(ctx.query.id)
  let result = await articleModel.deleteBlog({id})
  if(result){
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
}

// 查询用户
let getUsers = async (ctx) => {
  let result = await userModel.findAll()
  if(result){
    ctx.body = {
      code: 0,
      data: result
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
}

// 删除用户
let deleteUser = async (ctx) => {
  let username = ctx.query.username
  let result = await userModel.deleteUser({username})
  if(result){
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
}

// 删除评论
let deleteComment = async (ctx) => {
  let _id = ctx.query._id
  let result = await commentModel.deleteComment({_id})
  if(result){
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
}

// 保存分享
let saveFile = async (ctx) => {
  let  file = ctx.request.body
  let result = await fileModel.save(file)
  if(result){
    ctx.body ={
      code: 0
    }
  } else {
    ctx.body ={
      code: -1
    }
  }
}

// 获取分享
let getFile = async (ctx) => {
  let data = await fileModel.find()
  if(data){
    ctx.body = {
      code: 0,
      data
    }
  } else {
    ctx.body ={
      code: -1
    }
  }

}

//删除分享
let deleteFile = async (ctx) => {
  let filename = ctx.query.filename
  let result = await fileModel.deleteFile({filename})
  if(result){
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
}


module.exports = {
  saveArticle,
  readArticle,
  register,
  login,
  logout,
  getComment,
  addComment,
  getUserInfo,
  updateArticle,
  updateBrowers,
  query,
  deleteBlog,
  getUsers,
  deleteUser,
  deleteComment,
  saveFile,
  getFile,
  deleteFile
}
