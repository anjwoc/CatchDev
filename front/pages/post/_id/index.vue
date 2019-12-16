<template>
  <div>
    
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    computed: {
      post() {
        return this.$store.state.posts.mainPosts.find(v => v.id === parseInt(this.$route.params.id, 10));
      }
    },
    fetch({ store, params }) {
      return store.dispatch('posts/loadPost', params.id);
    },
    
  }
</script>

<style scoped>

</style>