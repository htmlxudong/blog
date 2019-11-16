import {
  _getBlogList,
  _getCommentList,
  _getFileList,
  _getUserList
} from '../common/api'
import format from 'date-fns/format'

export const state = () => ({
  blogList: '' ,  //博客内容
  userInfo : '',  // 用户信息
  commentList: '',  // 评论数组
  fileList: '',  // 分享
  userList: ''   // 用户信息
})

export const getters = {
  // 计算博客的总浏览量和总评论和总文章
  totalBrowse(state) {
    if (!state.blogList) {
      return
    }
    let result = state.blogList.reduce((acc, cur) => {
      return acc + cur.browse
    }, 0)
    return result
  },
  totalComment(state) {
    if (!state.blogList) {
      return
    }
    let result = state.blogList.reduce((acc, cur) => {
      return acc + cur.comment
    }, 0)
    return result
  },
  // 标签数组
  tagsList(state) {
    if (!state.blogList) {
      return
    }
    let result = []
    for(let i = 0;i < state.blogList.length;i++) {
      result.push({
        tags: state.blogList[i].tags,
        count: 1
      })
    }
    // 数组处理
    for (let i = 0; i < result.length; i++) {
      for (let j = i + 1; j < result.length; j++) {
        if (result[j].tags === result[i].tags) {
          result[i].count++
          result.splice(j, 1)
          j--
        }
      }
    }
    return result
  }
}
export const mutations = {
  // 《--- 管理员管理数数据
  deleteComment (state, { index }) {
    state.commentList.splice(index, 1)
  },
  deleteBlog (state, { index }) {
    state.blogList.splice(index, 1)
  },
  deleteFile (state, { index }) {
    state.fileList.splice(index, 1)
  },
  deleteUser (state, { index }) {
    state.userList.splice(index, 1)
  },
  addFile (state, { data }) {
    state.fileList.push(data)
  },
  // 管理员管理数数据 ---》
  setUserList (state, params) {
    state.userList = params.userList
  },
  // 保存的分享
  setFileList (state, params) {
    state.fileList = params.fileList
  },
  // 保存的博客内容
  setBlogContent (state, params) {
    state.blogList = params.blogList
  },
  // 博客列表 + 1
  plusBlogContent (state, params) {
    state.blogList.unshift(params)
  },
  // 设置用户信息
  setUserInfo (state, params) {
    state.userInfo = params.userInfo
  },
  // 设置评论信息
  setCommentList (state, params) {
    state.commentList = params.commentList
  },
  // 更新浏览量
  updateBrowers (state, index) {
    state.blogList[index].browse ++
  },
  setBlogComment (state,{index}) {
    state.blogList[index].comment ++
  }
}
export const actions = {
  async nuxtServerInit ({ dispatch, commit }, { req,store }) {
    await dispatch('getBlogContent')
    await dispatch('getCommentList')
    await dispatch('getFileList')
    await dispatch('getUserList')

    let userInfo = req.session.user
    if(userInfo){
      store.commit('setUserInfo',{ userInfo })
    }
  },
  // 获取博客
  async getBlogContent ({commit}) {
    let res = await _getBlogList()
    if(res.code === 0) {
      let blogList = res.data
      blogList.forEach(item => {
        item.time = format(item.time,'yyyy-MM-dd')
      })
      commit('setBlogContent', {blogList})
    }
  },
  // 获取评论
  async getCommentList ({ commit }) {
    let res = await _getCommentList()
    if(res.code === 0) {
      let commentList = res.data
      commentList.forEach(item => {
        item.commentTime = format(item.commentTime,'yyyy-MM-dd')
      })
      commit('setCommentList', { commentList })
    }
  },
  // 获取分享
  async getFileList ({ commit }) {
    let res = await _getFileList()
    if(res.code === 0) {
      let fileList = res.data
      commit('setFileList', { fileList })
    }
  },
  async getUserList ({commit}) {
    let res = await _getUserList()
    if(res.code === 0) {
      let userList = res.data
      commit('setUserList', { userList })
    }
  }
}



