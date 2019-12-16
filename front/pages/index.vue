<template>
  <div>
    <v-container />
    <v-container />
    <v-container />
    <v-container class="ma-0 pa-0 ml-4">
      <h2>지금 뜨고 있는 스터디</h2>
    </v-container>
    <v-row>
      <v-col v-for="p in mainPosts" :key="p.id" cols="12" xl="3" lg="4" md="6" sm="6" xs="12" class="ma-0 pa-0">
        <v-container>
          <post-card :post=p />
        </v-container>
      </v-col>
    </v-row>
      
    
  </div>
</template>

<script>
import PostCard from '~/components/PostCard'
import authenticated from '~/middleware/authenticated'
  export default {
    components: {
      PostCard,
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      },
      hasMorePost() {
        return this.$store.state.posts.hasMorePost;
      },
      mainPosts() {
        return this.$store.state.posts.mainPosts;
      }
    },
    fetch({ store }) {
      return store.dispatch('posts/loadPosts', { reset: true });
    },
    mounted() {
      window.addEventListener('scroll', this.onScroll);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll);
    },
    methods: {
      onScroll() {
        console.log('scroll');
        if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
          if (this.hasMorePost){
            this.$store.dispatch('posts/loadPosts');
          }
        }
      }
    },
    watch: {
      me: function (newValue){
        if(!this.me){
          this.$router.push({ path: '/login' });
        }
      }
    },
  }
</script>

<style scoped>

</style>