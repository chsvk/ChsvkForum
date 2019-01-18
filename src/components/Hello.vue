<template>
    <div class="col-full">
        <h1>Welcome to the CHSVK Forum </h1>
        <category-list :categories="categories"/>
    </div>
</template>

<script>
import CategoryList from './CategoryList'
export default {
  components: {
      CategoryList
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
