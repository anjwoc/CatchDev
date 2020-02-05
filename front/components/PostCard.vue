<template>
  <v-container>
    <v-card
      align="start"
      :elevation="hover ? 13 : 2"
      max-width="410"
      max-height="600"
      height="450"
      :ripple="false"
      :to="postUrl"
      outlined
    >
      <v-img
        v-if="coverImg"
        :src="coverImg"
        :lazy-src="coverImg"
        height="170px"
      ></v-img>
      <!-- <v-card
        v-else
        color="primary"
        elevation="0"
        height="170px"
      >
      </v-card> -->
      
      <v-card-text class="pa-1" text style="position: relative">
        <v-btn
          id="profileButton"
          absolute
          dark
          fab
          top
          right
          :to="profileUrl"
          color="white"
        >
          <v-avatar>
            <v-img
              :src="this.post.user && this.post.user.imgSrc"
              :lazy-src="this.post.user && this.post.user.imgSrc"
              alt="profileImage"
            ></v-img>
          </v-avatar>
        </v-btn>
      </v-card-text>
      <v-list-item three-line>
        <v-list-item-content>
          <!-- this.post.user가 없을때 email프로퍼티에 접근할 수도 있어서 and연산으로 user가 있는지 체크 -->
          <div class="mb-2 font-weight-regular" style="color: #7986CB;">{{id}}</div>
          <div><v-chip class="mb-2" color="blue-grey" small label outlined>{{ post.category }}</v-chip></div>
          <h2 class="mb-3" style="font-size: 1.3em;">{{post.title}}</h2>
          <!-- 게시글 페이지에 들어가야 Comments가 생성이 되서 length값을 어떻게 받아올지 생각해야함 -->
          <v-list-item-subtitle style="color: #90A4AE; ">{{$moment(post.createdAt).fromNow()}} / {{ post.Comments && post.Comments.length }}개의 댓글</v-list-item-subtitle>
          
          <div bottom class="ma-0 pa-0 d-flex align-end" style="display: inline-block;">
            <v-chip
            class="ma-0 mt-3 mr-1"
            :color="statusColor"
            small
            text-color="white"
            to="/"
            >
            <v-avatar left>
              <v-icon>{{statusIcon}}</v-icon>
            </v-avatar>
              {{ status }}
            </v-chip>
            <v-chip
            class="ma-0 mt-4"
            color="green"
            @click="onClickHeart"
            small
            text-color="white"
            to="/"
            >
            <v-avatar left>
              <v-icon>{{heartIcon}}</v-icon>
            </v-avatar>
              좋아요 {{ this.post.LikeCount }}
            </v-chip>
          </div>
          
            
          <v-container></v-container>
          <v-divider></v-divider>
          <div class="ma-0 pa-0">
            <v-chip
              v-for="(tag, index) in hashtags"
              :key="index"
              small
              class="ma-0 ml-1 mr-1 font-weight-regular"
              color="grey lighten-4" 
              outlined
              text-color="blue-grey"
              to="/"
            >
            #{{tag}}
            </v-chip>
          </div>
        </v-list-item-content>
      </v-list-item>
      

    </v-card>
        
  </v-container>
    
  
</template>
<script>

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
    hover: {
      type: Boolean,
      required: true,
    },
    styleNumber: {
      type: Number,
    }
  },
  data() {
    return {
      mainContent: null,
      postUrl: '/post/'+this.post.id,
      profileUrl: '/profile/' + this.post.userId,
    }
  },
  methods: {
    bodyContent(data){
      const bodyText = data.replace(/(<([^>]+)>)/ig,"");
      const result = this.lengthCheck(bodyText);
      return result;
    },
    lengthCheck(bodyText){
      let result = '';
      if(bodyText.length >= 150){
        result = bodyText.slice(0, 150);
        result += " ...";
      }else{
        result = bodyText;
      }
      return result;
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
  computed:{
    me() {
      return this.$store.state.users.me;
    },
    liked() {
      const me = this.$store.state.users.me;
      return !!(this.post.Likers || []).find(v => v.id === (me && me.id));
    },
    heartIcon() {
      return this.liked ? 'mdi-heart' : 'mdi-heart-outline';
    },
    status(){ 
      return this.post.status === "open" ? '모집중' : '모집마감';
    },
    statusColor() {
      return this.post.status === "open" ? 'indigo' : 'red';
    },
    statusIcon() {
      return this.post.status === "open" ? 'mdi-progress-clock' : 'mdi-alert';
    },
    id() {
      return this.post.user && this.post.user.email.split('@')[0];
    },
    hashtags() {
      if(this.post && this.post.hashtags){
        const tags = [];
        tags.unshift(this.post.hashtags.map(tag => tag.name));
        return tags[0];
      }
      return null;
    },
    diffTime() {
      const postDate = new Date(this.post.createdAt).toISOString();
      return postDate.split('T')[0];
      // const curDate = new Date();
      // const diffTime = parseInt(curDate.getTime() - postDate.getTime()) / (1000*60*60*24);
      // //floor는 반올림 버리기
      // return Math.floor(diffTime);
    },
    coverImg() {
      const isPresent = this.post.images[0] && this.post.images[0].src;
      const image = `${process.env.baseUrl}/${this.post.images[0] && this.post.images[0].src}`;
      if(!isPresent){
        return null;
      }
      return image;
    },
    test() {
      return process.env.VUE_APP_SERVER_HOST;
    }
  },
}
</script>
<style lang="scss" scoped>
#test{
  color: 'white';
  background-color: rgba(66, 239, 149, 0.8);
  
}
#profileButton > img {
  z-index: 10;
}
#post-link{
  color: black;
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
}
#point-color{
  color: #b79b5f;
}
#background{
  background-color: #38424B;
}
#card-title{
  background: rgba(121, 85, 72, 0.7);
  color: white;
}

#card-text{
  background: rgba(121, 85, 72, 0.3);
  color: white;
}
</style>