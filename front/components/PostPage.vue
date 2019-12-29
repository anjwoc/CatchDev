<template>
  <v-app>
    <v-row id="test" class="fill-height white ma-0 pa-0">
      <v-col cols="12" md="2"></v-col>
      <v-col cols="12" md="8">
        <h1 id="mainTitle" style="font-size: 40px;">{{post.title}}</h1>

        <v-row>
          <div>
            <v-avatar v-if="this.post && this.post.user && this.post.user.imgSrc" class="mr-2 mb-6" size="60">
              <img
                :src="this.post.user.imgSrc"
                alt="profileImage"
              >
            </v-avatar>
            <v-avatar v-else color="grey" class="mr-2 mb-6" size="60">
              <v-icon size="50">mdi-account</v-icon>
            </v-avatar>
            
            <div style="display: inline-block;">
              <p class="ma-0 pa-0 title font-weight-medium">{{ nickname }}</p>
              <p class="ma-0 pa-0 subtitle-2" style="opacity: 0.5;">{{ post.user && post.user.about }}</p>
            </div>
          </div>
          <v-spacer></v-spacer>       
          <div v-if="this.isMe">
            <!-- 내가 작성한 게시글일 때만 버튼 표시 -->
            <v-btn class="ma-0 pa-0"  color="blue-grey" text right>수정</v-btn>
            <v-btn class="ma-0 pa-0" @click="onDeletePost" color="blue-grey" text right>삭제</v-btn>
          </div>
          
          
        </v-row>
        <v-row>
          <v-card class="ma-0 pa-0 elevation-0" >
            <v-chip
              v-for="tag in this.hashtags"
              :key="tag"
              class="ma-0 font-weight-regular"
              color="grey lighten-4" 
              outlined
              text-color="blue-grey"
              to="/"
            >
              #{{tag}}
            </v-chip>
          </v-card>
        </v-row>
        
        <v-subheader class="ma-0 pa-0" style="font-size: 18px;">{{ $moment(post.createdAt).format("YYYY년 MM월 DD일") }}</v-subheader>

        <v-divider></v-divider>
        <div class="mt-8" id="mainContent">
        </div>
        <h2 class="mb-1">{{commentsLength}}개의 댓글</h2>
        <comment-form class="mb-6" :postId="this.post && this.post.id" />
        
        <v-divider></v-divider>
        <comment-content :comments="post.Comments" :postId="post.id" :postCreatedAt="post.createdAt"  />

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
      },
      me: {
        type: Object,
        required: true,
      }
    },
    methods: {
      onDeletePost() {
        this.$store.dispatch('posts/remove', {
          postId: this.post.id,
          hashtags: this.hashtags,
        })
          .then((res)=>{
            this.$router.push({ path: '/' });
          })
      },
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
      },
      hashtags() {
      if(this.post && this.post.hashtags){
        const tags = [];
        tags.unshift(this.post.hashtags.map(tag => tag.name));
        return tags[0];
      }
      return null;
      },
      isMe() {
        // 해당 게시글이 내가 쓴 게시글인지 판단
        return this.post.user.id === this.me.id;
      },
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