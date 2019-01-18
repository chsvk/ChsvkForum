<template>
    <div class="col-full">
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
    computed:{
        category(){
            return this.$store.state.categories[this.categoryId]
        }
    }
}
</script>

<style>

</style>
