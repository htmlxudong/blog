import Vue from 'vue'
import 'highlight.js/styles/googlecode.css'
import hljs from 'highlight.js'
// 注意要去googlecode.css改样式
// markdown 语法高亮
Vue.directive('highlight', function (el) {
  // 这里将会被 `bind` 和 `update` 调用
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})
