<template>
    <div :class="$style.notFound">
        <h1 :class="$style.headingLarge">Page Not Found</h1>
        <p :class="$style.textLarge">The page you are looking for doesnt exist!.</p>
        <router-link :to="{name: 'home'}">Redirect to Home instead?</router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style module>
    .notFound{
        text-align: center;
    }
    .headingLarge{
        font-size: 100px
    }
    .textLarge{
        font-size: 50px;
    }
</style>
