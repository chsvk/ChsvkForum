<template>
<div>
          <div class="forum-list">
            <forum-list-item v-for="forum in forums" :forumId="forum" :key="forum['.key']"/>
          </div>
</div>
</template>

<script>
import ForumListItem from './ForumListItem'
export default {
    components: {
        ForumListItem
    },
    props: {
        forums: {
            required: true,
            type: Array
        }
    },
}
</script>

<style>

</style>
