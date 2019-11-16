<template>
  <div class="user-wrap">
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column
        label="用户名"
        prop="username">
      </el-table-column>
      <el-table-column
        label="用户密码"
        prop="password">
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
import { _deleteUser } from '../../common/api'
export default {
  name: 'admin-user',
  data() {
    return {
      search: ''
    }
  },
  computed: {
    tableData() {
      return this.$store.state.userList
    }
  },
  methods: {
    async handleDelete(index,row) {
      this.$store.commit('deleteUser', { index})
      let res = await _deleteUser(row.username)
      if(res.code === 0){
        let msg = '删除成功'
        this. open2(msg)
      }
    },
    // 消息提示
    open2(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: 'success'
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
