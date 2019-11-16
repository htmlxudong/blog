<template>
  <div class="comment-wrap">
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column
        label="博客ID"
        prop="blogId">
      </el-table-column>
      <el-table-column
        label="评论时间"
        prop="commentTime">
      </el-table-column>
      <el-table-column
        label="用户名"
        prop="username">
      </el-table-column>
      <el-table-column
        label="评论内容"
        prop="content">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { _deleteComment, _updateArticle } from '../../common/api'
import { mapState } from 'vuex'
export default {
  name: 'admin-comment',
  data() {
    return {
      search: ''
    }
  },
  computed: {
    tableData() {
      return this.$store.state.commentList
    },
    ...mapState(['blogList'])
  },
  methods: {
    async handleDelete(index,row) {
      this.$store.commit('deleteComment',{index})
      let res = await _deleteComment(row._id)
      let comment = this.blogList[row.blogId].comment - 1
      console.log(res)
      if(res.code === 0){
        this. open2()
        let data = {
          id: row.blogId,
          comment
        }
        let result = await _updateArticle(data)
      }
    },
    // 消息提示
    open2() {
      this.$message({
        showClose: true,
        message: '删除成功',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
