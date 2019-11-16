<template>
  <div class="home-footer">
    <div class="footer-content-left">
      <p class="author">东的个人博客</p>
    </div>
    <div class="footer-content-right">
      <p class="footer-word">
        <span class="browse">{{totalBrowse}}</span> 浏览  <span class="articles">{{blogList && blogList.length}}</span> 文章 <span class="comments">{{totalComment}}</span>评论
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'home-footer',
  computed: {
    ...mapState(['blogList']),
    totalBrowse () {
      return this.$store.getters.totalBrowse
    },
    totalComment () {
      return this.$store.getters.totalComment
    }
  }
}
</script>

<style lang="less" scoped>
  .home-footer{
    box-sizing: border-box;
    border-top: 1px solid #e5e5e5;
    width: 100%;
    height: 65px;
    color: snow;
    line-height: 50px;
    background: #090a0b;
    text-align: center;
    font-size: 16px;
    .footer-content-left{
      width: 48%;
      float: left;
      height: 40px;
      letter-spacing: 1px;
      .author{
        font-weight: 600;
        padding-bottom: 5px;
      }
      a{
        color: orangered;
      }
    }
    .footer-content-right{
      letter-spacing: 1px;
      width: 48%;
      float: left;
      height: 40px;
    }
  }
</style>
