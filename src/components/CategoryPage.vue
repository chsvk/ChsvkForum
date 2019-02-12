<template>
    <div v-if="dataStatus_ready" class="col-full">
        <h1>{{category.name}}</h1>
        <category-list-item :categoryId="categoryId"/>
    </div>
</template>

<script>
import CategoryListItem from './CategoryListItem'
import DataStatus from '@/Mixins/DataStatus'
export default {
    mixins: [DataStatus],
    components: {
        CategoryListItem
    },
    props:{
        categoryId: {
            required: true,
            type: String
        }
    },
    created(){var vm = this;
        this.$store.dispatch('fetchCategory', {id: this.categoryId}).then((category)=> {
            this.$store.dispatch('fetchForums', {ids: category.forums}).then(()=>{
                vm.dataStatus_fetched();
            })
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
