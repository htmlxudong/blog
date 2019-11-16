<template>
  <div class="tags-wrap">
    <div class="container">
      <div class="content">
        <div class="wall">
          <div class="wall-wrap">
            <h5 class="all-tags"><span class="icont">#</span>共<span class="total-count">  {{tagCount}}  </span>个标签</h5>
            <div class="wall-tags">
              <ul class="list-tags">
                <li class="tag" @click="toTagsDetail(tag)" v-for="(tag, index) in tags" :key="index">{{tag.tags}} <span class="tag-count">({{tag.count}})</span></li>
              </ul>
            </div>
          </div>
        </div>
        <blogger/>
      </div>
    </div>
  </div>
</template>

<script>
import blogger from '../../components/blogger/blogger.vue'
export default {
  name: 'index.vue',
  data () {
    return {
      tagCount: 0
    }
  },
  computed: {
    tags () {
      return this.$store.getters.tagsList
    }
  },
  beforeRouteEnter (from, to, next) {
    next(vm => {
      vm.computeTag()
    })
  },
  methods: {
    computeTag () {
      if(this.tags.length === 0){
        return
      }
      let timer = setInterval(() => {
        this.tagCount ++
        if(this.tagCount >= this.tags.length) {
          clearInterval(timer)
        }
      },100)
    },
    toTagsDetail (tag) {
      this.$router.push({
        path: '/tagsDetail',
        query: {
          count: tag.count,
          name: tag.tags
        }
      })
    }
  },
  components: {
    blogger
  }
}
</script>

<style lang="less" scoped>
  .w-h-f(@w,@h,@f){
    width: @w;
    height: @h;
    float: @f;
  }
  @media all and (min-width: 1200px) {
    .tags-wrap{
      width: 100%;
      padding-top: 120px;
      padding-bottom: 30px;
      background-color: #eee;
      .container{
        width: 100%;
        padding-left: 10px;
        box-sizing: border-box;
        overflow: hidden;
        .content{
          margin: 0 auto;
          width: 1200px;
          overflow: hidden;
          .wall{
            background-color: rgba(255,255,255,.9);
            width: 65%;
            height: 620px;
            float: left;
            .wall-wrap{
              .w-h-f(100%,100%,right);
              .all-tags{
                font-size: 18px;
                width: 95%;
                padding: 10px 0;
                margin: 0 auto;
                height: 30px;
                border-bottom: 1px solid #DCDFE6;
                .icont{
                  padding-right: 2px;
                  color: #f39c12;
                }
              }
              .wall-tags{
                margin: 0 auto;
                padding-top: 15px;
                width: 95%;
                height: 80%;
                .list-tags{
                  width: 100%;
                  height: 100%;
                  .tag{
                    border: 1px solid #aaa;
                    float: left;
                    font-size: 16px;
                    color: rgba(0,0,0,0.6);
                    margin: 5px;
                    cursor: pointer;
                    border-radius: 2px;
                    padding: 5px;
                    &:hover{
                      color: orangered;
                      border: 1px solid orangered;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  @media all and (max-width: 1200px ) and (min-width: 960px) {
    .tags-wrap{
      width: 100%;
      background-color: #eee;
      padding-top: 110px;
      padding-bottom: 30px;
      .container{
        width: 100%;
        padding-left: 10px;
        box-sizing: border-box;
        .content{
          width: 960px;
          overflow: hidden;
          .wall{
            background-color: rgba(255,255,255,.9);
            width: 65%;
            height: 620px;
            float: left;
            .wall-wrap{
              .w-h-f(100%,100%,right);
              .all-tags{
                font-size: 18px;
                width: 95%;
                padding: 10px 0;
                margin: 0 auto;
                height: 30px;
                border-bottom: 1px solid #DCDFE6;
                .icont{
                  padding-right: 2px;
                  color: #f39c12;
                }
              }
              .wall-tags{
                margin: 0 auto;
                padding-top: 15px;
                width: 95%;
                height: 80%;
                .list-tags{
                  width: 100%;
                  height: 100%;
                  .tag{
                    border: 1px solid #aaa;
                    float: left;
                    font-size: 16px;
                    color: rgba(0,0,0,0.6);
                    margin: 5px;
                    cursor: pointer;
                    border-radius: 2px;
                    padding: 5px;
                    &:hover{
                      color: orangered;
                      border: 1px solid orangered;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  @media all and (max-width: 960px ) and (min-width: 768px) {
    .tags-wrap{
      width: 100%;
      background-color: #eee;
      padding-top: 110px;
      padding-bottom: 30px;
      .container{
        width: 100%;
        padding-left: 10px;
        box-sizing: border-box;
        overflow: hidden;
        .content{
          overflow: hidden;
          width: 768px;
          .wall{
            background-color: rgba(255,255,255,.9);
            width: 60%;
            height: 680px;
            float: left;
            .wall-wrap{
              .w-h-f(100%,100%,right);
              .all-tags{
                font-size: 18px;
                width: 95%;
                padding: 10px 0;
                margin: 0 auto;
                height: 30px;
                border-bottom: 1px solid #DCDFE6;
                .icont{
                  padding-right: 2px;
                  color: #f39c12;
                }
              }
              .wall-tags{
                margin: 0 auto;
                padding-top: 15px;
                width: 95%;
                height: 80%;
                .list-tags{
                  width: 100%;
                  height: 100%;
                  .tag{
                    border: 1px solid #aaa;
                    float: left;
                    font-size: 16px;
                    color: rgba(0,0,0,0.6);
                    margin: 5px;
                    cursor: pointer;
                    border-radius: 2px;
                    padding: 5px;
                    &:hover{
                      color: orangered;
                      border: 1px solid orangered;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  @media all and (max-width: 768px ) {
    .tags-wrap{
      width: 100%;
      background-color: #eee;
      padding-top: 2.5rem;
      .container{
        width: 100%;
        overflow: hidden;
        .content{
          width: 100%;
          .wall{
            background-color: rgba(255,255,255,.9);
            width: 100%;
            .wall-wrap{
              width: 100%;
              .all-tags{
                font-size: 0.5rem;
                width: 90%;
                padding: 0.3rem 0;
                margin: 0 auto;
                height: 0.88rem;
                border-bottom: 1px solid #DCDFE6;
                .icont{
                  padding-right: 2px;
                  color: #f39c12;
                }
              }
              .wall-tags{
                min-height: 10rem;
                margin: 0 auto;
                padding-top: 0.3rem;
                width: 95%;
                height: 80%;
                .list-tags{
                  width: 100%;
                  height: 100%;
                  overflow: hidden;
                  .tag{
                    border: 1px solid #aaa;
                    float: left;
                    font-size: 16px;
                    color: rgba(0,0,0,0.6);
                    margin: 5px;
                    cursor: pointer;
                    border-radius: 2px;
                    padding: 5px;
                    &:hover{
                      color: orangered;
                      border: 1px solid orangered;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
