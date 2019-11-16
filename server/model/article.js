const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
let Schema = mongoose.Schema

let articleSchema = new Schema({
    browse: {type: Number   },
    time: { type: Number, required: true },
    id: { type: Number, required: true },
    blogTitle: { type: String, required: true },
    blogContent: { type: String, required: true },
    tags: {type: String, required: true },
    blogDesc: {type: String, required: true },
    imageUrl: { type: String, default: '//res.zixizixi.cn/image/illust/dev-links.jpg.coverimg' },
    comment: { type: Number  }
})

let articleModel = mongoose.model('article', articleSchema)
articleModel.createIndexes() // 让唯一值 index字段生效

let save = async (data) => {
    let article = new articleModel(data)
    return article.save()
        .then(() => {
            console.log('存到数据库')
            return true
        })
        .catch((e) => {
            console.log('save'+e)
            return false
        })
}

let readAll = async () => {
    return articleModel.find()
}

let updateBlog = async ({_id, comment}) => {
    return articleModel.updateOne({_id }, { $set: {comment} })
        .then(() => {
            return true
        }).catch((e) => {
        console.log(e)
            return false
        })
}
let updateBrowse = async ({ _id, browse}) => {
    return articleModel.updateOne({ _id }, { $set: {browse} })
        .then(() => {
            return true
        }).catch((e) => {
            return false
        })
}

let query = async (name) => {
    return articleModel.find({
        $or : [
            { blogTitle : {$regex : name, $options: '$i' }},
            { blogContent : {$regex : name, $options: '$i' }},
            { tags : {$regex : name, $options: '$i' }}
        ]
    } )
}

let deleteBlog = async ({id}) => {
  return articleModel.deleteOne({id})
    .then(() => {
      return true
    }).catch(() => {
      return false
    })
}

module.exports = {
    save,
    readAll,
    updateBlog,
    updateBrowse,
    query,
    deleteBlog
}
