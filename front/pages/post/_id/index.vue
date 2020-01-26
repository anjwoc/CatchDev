<template>
  <div v-if="post">
    <post-page :post="post" :me="me" />
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
      },
      me(){
        return this.$store.state.users.me;
      }
    },
    fetch({ store, params }) {
      return Promise.all([
        store.dispatch('posts/loadPost', params.id),
        store.dispatch('posts/loadComments', {
          postId: parseInt(params.id)
        })
      ]);
    },
    components: {
      PostPage,
    },
    head(){
      return {
        title: `${this.post.user.nickname} 님의 게시글`,
        meta: [{
          name: 'description', content: this.post.content
        }, {
          hid: 'ogtitle', property: 'og:title', content: `${this.post.title}`
        }, {
          hid: 'ogdesc', property: 'og:description', content: this.post.content
        }, {
          // 게시글 페이지에서 이미지를 url로 불러와서 객체에 닮겨있지 않아서 따로 추출해야 넣을 수 있다.
          hid: 'ogdesc', property: 'og:image', content: ''
        },{
          property: 'og:url', content: 'https://delog.net/post/${this.post.id}'
        }],
      }
    }
    
  }
</script>

<style scoped>

</style>