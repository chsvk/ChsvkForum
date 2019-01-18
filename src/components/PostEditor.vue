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
            const postId = 'Chsvk' + Math.random();
            const post = {
                text: this.postText,
                publishedAt: Math.floor(Date.now()/1000),
                threadId: this.id,
                userId: 'ALXhxjwgY9PinwNGHpfai6OWyDu2',
                '.key': postId
            }
            this.postText = '';
            this.$emit('save', {post})
            }
        }
    },
}
</script>

<style>

</style>
