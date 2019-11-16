let mongoose = require('mongoose')
// 视图数据
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

let userSchema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: true} },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    logo: { type: String, required: true }
})

let userModel = mongoose.model('uesr', userSchema)
userModel.createIndexes() // 让唯一值 index字段生效

let save = async (data) => {
    let user = new userModel(data)
    return user.save()
        .then(() => {
            console.log('添加成功')
            return true
        })
        .catch((e) => {
            console.log(e)
            return false
        })
}

let findLogin = async (data) => {
    return userModel.findOne(data)
}

let findAll = async () => {
  return userModel.find()
}

let deleteUser = async ({username}) => {
  return userModel.deleteOne({username})
    .then(() => {
      return true
    }).catch(() => {
      return false
    })
}

module.exports = {
  save,
  findAll,
  findLogin,
  deleteUser
}
