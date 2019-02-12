<template>
    <div v-if="category" class="col-full">
        <h1>{{category.name}}</h1>
        <category-list-item :categoryId="categoryId"/>
    </div>
</template>

<script>
import CategoryListItem from './CategoryListItem'
export default {
    components: {
        CategoryListItem
    },
    props:{
        categoryId: {
            required: true,
            type: String
        }
    },
    created(){
        this.$store.dispatch('fetchCategory', {id: this.categoryId}).then((category)=> {
            this.$store.dispatch('fetchForums', {ids: category.forums})
        })
    },
    computed:{
        category(){
            return this.$store.state.categories[this.categoryId]
        }
    }
}
</script>

<style>

</style>
