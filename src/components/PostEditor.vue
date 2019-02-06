<template>
    <form @submit.prevent="addPost">
            <div class="form-group">
                <textarea v-model="postText" name="" id="" cols="70" rows="10" class="form-input"></textarea>
            </div>
            <div class="form-actions">
                <button v-if="isUpdate" @click.prevent="cancel" class="btn btn-ghost">Cancel</button>
                <button class="btn-blue">{{isUpdate? "Update": "Create"}} Post</button>
            </div>
        </form>  
</template>

<script>
export default {
    props: {
        id: {
            required: false,
            type: String
        },
        post: {
            type: Object,
            validator: obj => {
                const keyIsValid = typeof obj['.key'] === 'string'
                const textIsValid = typeof obj.text === 'string'
                return keyIsValid && textIsValid
            }
        }
    },
    data(){
        return{
            postText: this.post? this.post.text: '',
        }
    },
    computed: {
        isUpdate(){
            return !!this.post
        }
    },
    methods: {
        appropriateMethod(){
            return this.isUpdate? this.updatePost() : this.createPost()
        },
        addPost(){
            this.appropriateMethod().then(post =>{
                this.$emit('save', {post})
            })
        },
        createPost(){
            if(this.postText === ''){
                alert('The Submit Field Cannot Be Empty')
            }else{
            const post = {
                text: this.postText,
                threadId: this.id,
            }
            this.postText = '';
            return this.$store.dispatch('createPost', post);
            }
        },
        updatePost(){
            const payload = {
                postId: this.post['.key'],
                text: this.postText
            }
            return this.$store.dispatch('updatePost', payload)
        },
        cancel(){
            this.$emit('cancel');
        }
    },
}
</script>

<style>

</style>
