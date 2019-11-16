import { getApi, postApi } from "./ajax"

const _getBlogList = () => getApi (process.env.baseUrl+'/readArticle')
const _getCommentList = () => getApi (process.env.baseUrl+'/getComment')
const _getFileList = () => getApi (process.env.baseUrl+'/getFile')
const _getUserList = () => getApi (process.env.baseUrl+'/getUsers')
const _deleteBlog = (id) => getApi (process.env.baseUrl+'/deleteBlog?id='+id)
const _deleteComment = (_id) => getApi (process.env.baseUrl+'/deleteComment?_id='+_id)
const _deleteFile = (filename) => getApi (process.env.baseUrl+'/deleteFile?filename='+filename)
const _saveFile = (data) => postApi (process.env.baseUrl+'/saveFile', data)
const _deleteUser = (username) => getApi (process.env.baseUrl+'/deleteUser?username='+username)
const _updateBrowers = (data) => postApi (process.env.baseUrl+'/updateBrowers', data)
const _addComment = (data) => postApi (process.env.baseUrl+'/addComment', data)
const _updateArticle = (data) => postApi (process.env.baseUrl+'/updateArticle', data)
const _login = (data) => postApi (process.env.baseUrl+'/login', data)
const _getUserInfo = () => getApi (process.env.baseUrl+'/getUserInfo')
const _register = (data) => postApi (process.env.baseUrl+'/register', data)
const _query = (name) =>  getApi (process.env.baseUrl+'/query?name='+name)
const _writeArticle = (data) => postApi (process.env.baseUrl+'/saveArticle', data)
const _logout = () =>  getApi('/logout')

export  {
  _getBlogList,
  _getCommentList,
  _getFileList,
  _getUserList,
  _deleteBlog,
  _deleteComment,
  _deleteFile,
  _saveFile,
  _deleteUser,
  _updateBrowers,
  _addComment,
  _updateArticle,
  _login,
  _getUserInfo,
  _register,
  _query,
  _writeArticle,
  _logout,

}
