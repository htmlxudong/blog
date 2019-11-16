let mongoose = require('mongoose')

let fileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    desc: { type: String, required: true },
    link: {type: String, required: true }
})

let fileModel = mongoose.model('file', fileSchema)

let save = async (data) => {
    let file = new fileModel(data)
    return file.save()
        .then(() => {
            console.log('保存成功')
            return true
        })
        .catch(() => {
            return false
        })
}

let find = async () => {
    return fileModel.find()
}

let deleteFile = async ({filename}) => {
  return fileModel.deleteOne({filename})
    .then(() => {
      return true
    })
    .catch((e) => {
      return false
    })
}

module.exports = {
  save,
  find,
  deleteFile
}
