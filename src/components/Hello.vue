<template>
    <div v-if="dataStatus_ready" class="col-full">
        <h1>Welcome to the CHSVK Forum </h1>
        <category-list v-if="dataStatus_ready" :categories="categories"/>
    </div>
</template>

<script>
import CategoryList from './CategoryList'
import DataStatus from '@/Mixins/DataStatus'
export default {
  components: {
      CategoryList,
  },
  mixins: [DataStatus],
  beforeCreate(){var vm = this;
      this.$store.dispatch('fetchAllCategories').then(categories => 
        Promise.all(categories.map(category => {this.$store.dispatch('fetchForums', {ids: Object.keys(category.forums)})})))
        .then(()=> {
            vm.dataStatus_fetched();
        })
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
