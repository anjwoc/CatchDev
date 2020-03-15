<template>
  <v-lazy ssr-only>
    <!-- 페이지 헤더 컴포넌트로 분리시켜서 재사용하도록 추후 리팩토링 -->
    <div>
      <v-row class="mr-8" justify="end">
        <v-spacer />
        <v-toolbar dense id="background" elevation="0">
        <v-spacer />
          <v-toolbar-items id="main-color">
            <div class="title mt-2">All Study</div>
            <v-divider dark inset vertical></v-divider>
            <v-icon id="main-color">mdi-home</v-icon>
            <v-icon id="main-color" small>mdi-chevron-right</v-icon>
            <p class="amber--text mt-3">Home</p>
            <v-icon id="main-color" small>mdi-chevron-right</v-icon>
            <p class="amber--text mt-3">{{routeName}}</p> 
          </v-toolbar-items>
        </v-toolbar>
      </v-row>

      
      <v-row>
        <v-col align="center" justify="center" v-for="p in mainPosts" :key="p.id" cols="12">
          <v-container>
            <v-hover
              v-slot:default="{ hover }"
              :open-delay="openDelay"
              :close-delay="closeDelay"
              :disabled="disabled"
              :value="value"
            >
              <post-category-card class="card-component" :hover="hover" :post=p />
            </v-hover>
          </v-container>
        </v-col>
      </v-row>
    </div>
  </v-lazy>
</template>


<script>
import PostCard from '~/components/PostCard'
import PostCategoryCard from '~/components/PostCategoryCard'

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
      PostCategoryCard
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
      routeName() {
        return this.$route.params.name;
      }
      
    },
    methods: {
      onScroll() {
        if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
          if (this.hasMorePost){
            this.$store.dispatch('posts/loadCategoryPosts');
          }
        }
      }
    },
    fetch({ store, params }) {
      return store.dispatch('posts/loadCategoryPosts', {
        item: params.name,
        reset: true,
      });
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

.card-component {
  max-width: 850px;
}

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