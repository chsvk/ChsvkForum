<template>
     <div class="flex-grid justify-center">
        <div class="col-2">

            <form @submit.prevent="Login" action="" class="card card-form">
                <h1 class="text-center">Login</h1>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input v-model="form.email" id="email" type="text" class="form-input">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input v-model="form.password" id="password" type="password" class="form-input">
                </div>

                <div class="push-top">
                    <button type="submit" class="btn-blue btn-block">Log in</button>
                </div>

                <div class="form-actions text-right">
                    <router-link :to="{name: 'register'}">Create an account?</router-link>
                </div>
            </form>

            <div class="push-top text-center">
                <button  class="btn-red btn-xsmall"><i class="fa fa-google fa-btn"></i>Sign in with Google</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            form: {
                email: null,
                password: null
            }
        }
    },
    created(){
        this.$emit('ready')
    },
    methods: {
        Login(){
            this.$store.dispatch('loginUserWithEmailAndPassword', this.form).then(()=>{
                this.$router.push('/')
            }).catch((error)=>{
                console.log('👩🏻‍💻 Error', error.message);
            })
        }
    }
}
</script>

<style>

</style>
