<template>
    <form @submit.prevent="addPost">
            <div class="form-group">
                <textarea v-model="postText" name="" id="" cols="30" rows="10" class="form-input"></textarea>
            </div>
            <div class="form-actions">
                <button class="btn-blue">Submit Post</button>
            </div>
        </form>  
</template>

<script>
export default {
    props: {
        id: {
            required: true,
            type: String
        }
    },
    data(){
        return{
            postText: '',
        }
    },
    methods: {
        addPost(){
            if(this.postText === ''){
                alert('The Submit Field Cannot Be Empty')
            }else{
            const post = {
                text: this.postText,
                threadId: this.id,
            }
            this.postText = '';
            this.$emit('save', {post})
            this.$store.dispatch('createPost', post);
            }
        }
    },
}
</script>

<style>

</style>
