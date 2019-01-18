<template>
<div>
    <div class="col-full push-top">
      </div>

      <div class="col-full">
          <div class="forum-list">
              <h2 class="list-title">
                  <router-link :to="{name: 'Category', params: {categoryId: category['.key']}}">{{category.name}}</router-link>
              </h2>
          </div>
      </div>
      <forum-list :forums="forums" />
    </div>
</template>

<script>
import ForumList from './ForumList'
export default {
    components: {
        ForumList
    },
    props: {
        categoryId: {
            required: true,
            type: String
        }
    },
    computed: {
        forums(){
            return Object.values(this.category.forums)
        },
        category(){
            return this.$store.state.categories[this.categoryId];
        }
    }
}
</script>

<style>

</style>
