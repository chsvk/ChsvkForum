<template>
    <div class="categories">
        <category-list-item v-for="category in categories" :categoryId ="category['.key']" :key="category['.key']"/>
    </div>
</template>

<script>
import CategoryListItem from './CategoryListItem'
export default {
    props: {
        categories: {
            required: true,
            type: Array
        }
    },
    components: {
        CategoryListItem
    }
}
</script>

<style>

</style>
