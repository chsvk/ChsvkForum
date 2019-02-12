<template>
    <div class="col-full">
        <nav-bar/>
        <h1>Welcome to the CHSVK Forum </h1>
        <category-list v-if="!loading" :categories="categories"/>
    </div>
</template>

<script>
import CategoryList from './CategoryList'
import NavBar from './NavBar'
export default {
  components: {
      CategoryList,
      NavBar
  },
  data(){
      return{
          loading: true
      }
  },
  beforeCreate(){var vm = this;
      this.$store.dispatch('fetchAllCategories').then(categories => categories.forEach(category => {
          this.$store.dispatch('fetchForums', {ids: Object.keys(category.forums)}).then(()=>{
              vm.loading = false;
          })
      }))
  },
  computed:{
      categories(){
          return (Object.values(this.$store.state.categories)) 
      }
  }
}
</script>

<style>

</style>
