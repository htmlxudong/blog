let mongoose = require('mongoose')

let commentSchema = new mongoose.Schema({
    blogId: { type: String, required: true },
    commentTime: { type: Number, required: true },
    logo: { type: String, require: true },
    username: {type: String, required: true },
    content: { type: String, required: true  }
})

let commentModel = mongoose.model('comment', commentSchema)

let save = async (data) => {
    let comment = new commentModel(data)
    return comment.save()
        .then(() => {
            console.log('保存成功')
            return true
        })
        .catch((e) => {
          console.log(e)
            return false
        })
}

let find = async () => {
    return commentModel.find()
}

let deleteComment = async ({_id}) => {
  return commentModel.deleteOne({_id})
    .then(() => {
      return true
    })
    .catch((e) => {
      console.log(e)
      return false
    })
}

module.exports = {
  save,
  find,
  deleteComment
}
