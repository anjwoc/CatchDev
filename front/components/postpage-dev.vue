<template>
  <v-lazy ssr-only>
    <div>
      <v-row class="mr-8" justify="end">
        <v-spacer />
        <v-toolbar dense id="background" elevation="0">
        <v-spacer />
          <v-toolbar-items id="main-color">
            <div class="title mt-2">All Study</div>
            <v-divider class="ml-3 mr-3" dark inset vertical></v-divider>
            <v-icon id="main-color">mdi-home</v-icon>
            <v-icon id="main-color" small>mdi-chevron-right</v-icon>
            <p class="amber--text mt-3">Home</p>
            <v-icon id="main-color" small>mdi-chevron-right</v-icon>
            <p class="amber--text mt-3">{{routeName}}</p> 
          </v-toolbar-items>
        </v-toolbar>
      </v-row>


      <v-row justify="center" align="center">
        <v-container class="ma-6 pa-6">
          <v-container
            id="card-box"
            fluid
            outlined
            elevation="0"
            min-width="90%"
            height="100vh"

          >
            <v-row class="mr-8" justify="end">
              <v-toolbar dense id="card-color" elevation="0">
              <v-spacer />
                <v-toolbar-items id="main-color">
                  <p class="amber--text mt-3">Home</p>
                  <v-icon id="main-color" small>mdi-chevron-right</v-icon>
                  <p class="amber--text mt-3">{{routeName}}</p> 
                </v-toolbar-items>
              </v-toolbar>
            </v-row>
            <v-row>
              <v-col justify="center" align="center" v-for="p in mainPosts" :key="p.id" cols="12" class="ma-0 pa-0">
                <v-container>
                  <v-hover
                    v-slot:default="{ hover }"
                    :open-delay="openDelay"
                    :close-delay="closeDelay"
                    :disabled="disabled"
                    :value="value"
                  >
                    <post-card :hover="hover" :post=p />
                  </v-hover>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-container>
      </v-row>

      

      
    </div>
  </v-lazy>
</template>

<script>
import PostCard from '~/components/PostCard'
  export default {
    data() {
      return { 
        disabled: false,
        openDelay: '0',
        closeDelay: '0',
        value: false,
      }
    },
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
      },
      routeName(){
        return this.$route.name;
      }
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
    fetch({ store }) {
      return store.dispatch('posts/loadPosts', { reset: true });
    },
    mounted() {
      window.addEventListener('scroll', this.onScroll);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll);
    },
    middleware: 'authenticated'
    
    
  }
</script>

<style scoped>

#point-color{
  color: #b79b5f;
}
#tab-color{
  background-color: #343D46;
}
#background{
  background-color: #38424B;
}
#main-color{
  color: #A1A8B0;
}
#card-color{
  background-color: #434F5B;
}
#card-box{
  background-color: #434F5B;
  border-radius: 20px;
}
</style>