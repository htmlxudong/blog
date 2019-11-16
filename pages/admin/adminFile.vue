<template>
<div class="file-wrap">
  <div class="add-file">
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="链接名称">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="链接描述">
        <el-input v-model="formLabelAlign.desc"></el-input>
      </el-form-item>
      <el-form-item label="链接地址">
        <el-input v-model="formLabelAlign.address"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="warning" plain @click.native="toAdd">添加分享</el-button>
  </div>
  <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="链接名称"
      prop="filename">
    </el-table-column>
    <el-table-column
      label="链接描述"
      prop="desc">
    </el-table-column>
    <el-table-column
      label="链接地址"
      prop="link">
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
import { _deleteFile, _saveFile } from '../../common/api'
export default {
  name: "admin-file",
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        desc: '',
        address: ''
      },
      search: ''
    }
  },
  computed: {
    tableData() {
      return this.$store.state.fileList
    }
  },
  methods: {
    async handleDelete(index,row) {
      this.$store.commit('deleteFile', { index})
      let res = await _deleteFile(row.filename)
      if(res.code === 0){
        let msg = '删除成功'
        this. open2(msg)
      }
    },
    async toAdd () {
      let data = {
        filename: this.formLabelAlign.name,
        desc: this.formLabelAlign.desc,
        link: this.formLabelAlign.address,
      }
      this.$store.commit('addFile', { data })
      let res = await _saveFile(data)
      if(res.code === 0 ){
        let msg = '添加成功'
        this.open2(msg)
        this.formLabelAlign = {
          name: '',
          desc: '',
          address: ''
        }
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
.file-wrap{
  width: 100%;
  .add-file{
    width: 80%;
    box-sizing: border-box;
    padding: 20px 0;
  }
}
</style>
