import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'

const options = {
  color: 'rgba(255,69,0,.7)',
  failedColor: 'red',
  height: '5px',
}

Vue.use(VueProgressBar, options)
