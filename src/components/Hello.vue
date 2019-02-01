<template>
    <div class="col-full">
        <nav-bar/>
        <h1>Welcome to the CHSVK Forum </h1>
        <category-list :categories="categories"/>
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
  computed:{
      categories(){
          return (Object.values(this.$store.state.categories))
      }
  }
}
</script>

<style>

</style>
