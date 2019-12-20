<template>
  <div v-if="post">
    <post-page :post="post" />
  </div>
  <div v-else>
    <div>게시글이 없습니다.</div>
  </div>
</template>

<script>
  import PostPage from '~/components/PostPage'
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
    async fetch({ store, params }) {
      return await Promise.all([
        store.dispatch('posts/loadPost', params.id),
        store.dispatch('posts/loadComments', {
          postId: parseInt(params.id)
        })
      ]);
    },
    components: {
      PostPage,
    }
    
  }
</script>

<style scoped>

</style>