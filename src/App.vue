<template>
  <div id="app">
    <nav-bar/>
    <div class="container">
      <router-view v-show="ShowPage" @ready="onReady"/>
      <bounce class="loadingSpinner" v-show="!ShowPage" :loading="!ShowPage"></bounce>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import nprogress from 'nprogress'
export default {
  data(){
    return{
      ShowPage: false
    }
  },
  components: {
    NavBar
  },
  created(){
    nprogress.configure({
        speed: 200,
        showSpinner: false
      })
    nprogress.start();
    this.$router.beforeEach((to, from, next)=> {
      nprogress.start();
      this.ShowPage = false;
      next()
    })
  },
  methods: {
    onReady(){
      this.ShowPage = true;
      nprogress.done()
    }
  }
}
</script>


<style>
@import "assets/css/style.css";
@import "~nprogress/nprogress.css";

#nprogress .bar {
  background: #57Ad8D;
}

.loadingSpinner{
  position: relative;
  justify-content: center;
  align-items: center;
  margin-top: 20%;
}
</style>
