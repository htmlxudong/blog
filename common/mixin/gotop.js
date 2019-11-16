export default {
  data () {
    return {
      gotop: false,
      recommend: false,
      isFirst: true
    }
  },
  mounted() {
    window.addEventListener('scroll',this.handleScroll, true)
  },
  methods: {
    handleScroll() {
      let Top = document.documentElement.scrollTop || document.body.scrollTop
      this.gotop = Top >= 50 ?  true :  false
      if(this.isFirst){
        if(460 < Top && Top < 900) {
          this.recommend = true
        }
      }
    },
    toTop() {
      let timer = null;
      cancelAnimationFrame(timer)
      let that = this
      timer = requestAnimationFrame(function fn() {
        let oTop = document.documentElement.scrollTop || document.body.scrollTop
        if (oTop > 0) {
          document.documentElement.scrollTop =  document.body.scrollTop = oTop - 50
          timer = requestAnimationFrame(fn)
        } else {
          cancelAnimationFrame(timer)
        }
      })
    }
  }
}
