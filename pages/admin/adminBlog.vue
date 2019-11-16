<template>
  <div class="blog-wrap">
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column
        label="博客ID"
        prop="id">
      </el-table-column>
      <el-table-column
        label="发表时间"
        prop="time">
      </el-table-column>
      <el-table-column
        label="博客主题"
        prop="blogTitle">
      </el-table-column>
      <el-table-column
        label="博客标签"
        prop="tags">
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
import { _deleteBlog } from '../../common/api'
export default {
  name: "admin-blog",
  data() {
    return {
      search: ''
    }
  },
  computed: {
    tableData() {
      return this.$store.state.blogList
    }
  },
  methods: {
    async handleDelete(index,row) {
      this.$store.commit('deleteBlog', { index})
      let res = await _deleteBlog(row.id)
      if(res.code === 0) {
        this.open2()
      }
    },
    // 消息提示
    open2() {
      this.$message({
        showClose: true,
        message: '博客删除成功',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
