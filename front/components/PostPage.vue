<template>
  <v-app>
    
    <v-row id="test" class="fill-height white ma-0 pa-0">
      <v-col cols="12" md="2"></v-col>
      <v-col cols="12" md="8">
        <!-- <div>{{post}}</div> -->
        <h1 id="mainTitle" style="font-size: 40px;">{{post.title}}</h1>
        <div>
          <v-avatar class="mr-2 mb-6" size="60">
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            >
          </v-avatar>
          <div style="display: inline-block;">
            <p class="ma-0 pa-0 title font-weight-black">{{ nickname }}</p>
            <p class="ma-0 pa-0 subtitle-2" style="opacity: 0.5;">{{ post.user && post.user.about }}</p>
          </div>
        </div>
        
        <v-subheader class="ma-0 pa-0" style="font-size: 18px;">{{ $moment(post.createdAt).format("YYYY년 MM월 DD일") }}</v-subheader>
        <v-divider></v-divider>
        <div class="mt-8" id="mainContent">
        </div>
        <h2 class="mb-1">{{commentsLength}}개의 댓글</h2>
        <comment-form class="mb-6" :postId="this.post && this.post.id" />
        
        <v-divider></v-divider>
        <comment-content :comments="post.Comments" :postCreatedAt="post.createdAt"  />
      </v-col>
      <v-col cols="12" md="2"></v-col>
    </v-row>
  </v-app>
</template>

<script>
  import CommentForm from '~/components/CommentForm'
  import CommentContent from '~/components/CommentContent'
  
  export default {
    props: {
      post: {
        type: Object,
        required: true,
      }
    },
    mounted() {
      this.content = document.querySelector('#mainContent');
      this.content.innerHTML = this.post.content;
    },
    computed: {
      nickname() {
        return this.post.user && this.post.user.email.split('@')[0];
      },
      commentsLength() {
        return this.post.Comments && this.post.Comments.length;
      }
    },
    components: {
      CommentForm,
      CommentContent,

    }
  }
</script>

<style scoped>
  #emptySpace {
    min-height: 200px;
  }
  #mainContent {
    min-height: 500px;
  }
  
</style>