<template>
  <v-container >
    <v-card
      :elevation="hover ? 13 : 2"
      max-width="410"
      max-height="450"
      height="450"
      :to="postUrl"
      outlined
    >
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="190px"
        
      ></v-img>
      <v-card-text text style="position: relative">
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
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            >
          </v-avatar>
        </v-btn>
      </v-card-text>
      <v-list-item three-line>
        <v-list-item-content>
          <div>postID: {{post.id}}</div>
          <!-- this.post.user가 없을때 email프로퍼티에 접근할 수도 있어서 and연산으로 user가 있는지 체크 -->
          <div class="mb-3 font-weight-regular" style="color: #7986CB;">{{this.post.user && this.post.user.email.split('@')[0]}}</div>

          <h2 class="mb-1" style="font-size: 25px;">{{post.title}}</h2>
          <v-list-item-subtitle style="color: #90A4AE;">{{diffTime}}일 전 / N개의 댓글</v-list-item-subtitle>
          
          <v-container></v-container>
          <v-divider></v-divider>
        </v-list-item-content>
      </v-list-item>
      <v-card-subtitle id="mainContent" class="mt-0 pt-0">
        
      </v-card-subtitle>
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
    }
  },
  data() {
    return {
      mainContent: null,
      postUrl: '/post/'+this.post.id,
      //profileUrl은 아직 구현 예정
      //'/profile/'+this.post.user.id
      profileUrl: '/profile',
    }
  },
  mounted() {
    this.mainContent = document.querySelector('#mainContent');
    this.mainContent.innerHTML = this.post.content;
  },
  computed:{
    diffTime() {
      const postDate = new Date(this.post.createdAt);
      const curDate = new Date();
      const diffTime = parseInt(curDate.getTime() - postDate.getTime()) / (1000*60*60*24);
      //floor는 반올림 버리기
      return Math.floor(diffTime);
    }

  },
  
  
  
}
</script>
<style scoped>
  #profileButton > img {
    z-index: 10;
  }

</style>