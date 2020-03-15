<template>
  <v-card
    max-width="400"
    class="mx-auto"
  >
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card
            color="#385F73"
            dark
          >
            <v-card-title class="headline">Unlimited music now</v-card-title>

            <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>

            <v-card-actions>
              <v-btn text>Listen Now</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="12"
        >
          <v-card
            :color="item.color"
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  v-text="item.title"
                ></v-card-title>

                <v-card-subtitle v-text="item.artist"></v-card-subtitle>
              </div>

              <v-avatar
                class="ma-3"
                size="125"
                tile
              >
                <v-img :src="coverImg"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
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
      // postUrl: '/post/'+this.post.id,
      // profileUrl: '/profile/' + this.post.userId,
      items: [
        {
          color: '#1F7087',
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People',
        },
        {
          color: '#952175',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Halcyon Days',
          artist: 'Ellie Goulding',
        },
      ],
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
    // onClickHeart() {
    //   if(!this.me){
    //     return alert('로그인이 필요합니다');
    //   }
    //   if(this.liked){
    //     return this.$store.dispatch('posts/unlikePost', {
    //       postId: this.post.id,
    //     });
    //   }
    //   return this.$store.dispatch('posts/likePost', {
    //     postId: this.post.id,
    //   });
    // },
    
  },
  computed:{
    me() {
      return this.$store.state.users.me;
    },
    // liked() {
    //   const me = this.$store.state.users.me;
    //   return !!(this.post.Likers || []).find(v => v.id === (me && me.id));
    // },
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
    // id() {
    //   return this.post.user && this.post.user.email.split('@')[0];
    // },
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
    },
    coverImg() {
      const image = this.post.images[0] && this.post.images[0].src;
      if(!image){
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