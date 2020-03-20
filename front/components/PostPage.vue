<template>
  <v-app>
    <v-row id="test" class="fill-height white ma-0 pa-0">
      <v-col cols="12" md="2" class="ma-0 pa-0"></v-col>
      <v-col cols="12" md="8">
        <h1 id="mainTitle" style="font-size: 3.2rem;">{{post.title}}</h1>
        <v-row>
          <div>
            <v-avatar class="mr-2 mb-8" size="60">
              <v-img
                :src="this.post.user && this.post.user.imgSrc"
                :lazy-src="this.post.user && this.post.user.imgSrc"
              ></v-img>
            </v-avatar>
            <div style="display: inline-block;">
              <p class="ma-0 pa-0 title font-weight-black">{{ nickname }}</p>
              <p class="ma-0 pa-0 subtitle-2" style="opacity: 0.5;">{{ post.user && post.user.about }}</p>
            </div>
          </div>
          
          <v-spacer></v-spacer>
          <div v-if="this.isMe">
            <!-- 내가 작성한 게시글일 때만 버튼 표시 -->
            <v-btn class="ma-0 pa-0" color="blue-grey" :to="updateLink"  text outlined right>수정</v-btn>
            <v-btn class="ma-0 pa-0" @click="onDeletePost" color="blue-grey" text outlined right>삭제</v-btn>
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

        <div class="d-flex row">
          <v-subheader style="font-size: 1rem;">{{ $moment(post.createdAt).format("YYYY년 MM월 DD일") }}</v-subheader>
          <v-spacer></v-spacer>
          <div class="ma-0 pa-0">
            <v-btn @click="onClickHeart" text small outlined color="blue-grey">
              <v-icon color="red" small>{{heartIcon}}</v-icon>
              &nbsp;좋아요
            </v-btn>
            <v-btn v-if="this.isMe" @click="onUpdateStatus" text small outlined color="blue-grey">모집 완료</v-btn>
          </div>
          
        </div>
        <v-divider class="ma-0 pa-0"></v-divider>
        <v-row>
          <div class="mt-8 ml-3 mr-3" v-html="this.post.content"></div>
        </v-row>
        <div class="emptySpace"></div>
        <h2 class="mb-1">{{commentsLength}}개의 댓글</h2>
        <comment-form class="mb-6" :postId="this.post && this.post.id" />
        <v-divider></v-divider>
        <comment-content :comments="post.Comments" :postId="post.id" :postCreatedAt="post.createdAt"  />
      </v-col>
      <v-col cols="12" md="2" class="ma-0 pa-0"></v-col>
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
      },
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
      onUpdateStatus() {
        this.$store.dispatch('posts/updatePostStatus', {
          postId: this.post.id,
          status: this.post.status,
        })
          .then((res) => {
            this.$router.push('/');
          })
      },
      onClickHeart() {
        if(!this.me){
          return alert('로그인이 필요합니다');
        }
        if(this.liked){
          return this.$store.dispatch('posts/unlikePost', {
            postId: this.post.id,
          });
        }
        return this.$store.dispatch('posts/likePost', {
          postId: this.post.id,
        });
      },
    },
    computed: {
      nickname() {
        return this.post.user && this.post.user.email.split('@')[0];
      },
      liked() {
        const me = this.me;
        return !!(this.post.Likers || []).find(v => v.id === (me && me.id));
      },
      heartIcon() {
        return this.liked ? 'mdi-heart' : 'mdi-heart-outline';
      },
      commentsLength() {
        const length = this.post.Comments && this.post.Comments.length;
        return length === undefined ? 0 : length;
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
      updateLink() {
        return `/write/${this.post.id}`;
      }
    },
    components: {
      CommentForm,
      CommentContent,

    }
  }
</script>

<style scoped>
  .emptySpace {
    min-height: 100px;
  }
  .mainContent {
    min-height: 500px;
  }
  
</style>