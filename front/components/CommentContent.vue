<template>
  <div class="ma-0 pa-0 mt-6">
    <v-card
      class="mb-4"
      v-for="c in comments"
      :key="c.id"
      outlined
    >
      <v-container>
        <div>

          <v-avatar v-if="c.user && c.user.imgSrc" class="mr-2 mb-6" size="60">
            <v-img
              :src="c.user && c.user.imgSrc"
              :lazy-src="c.user && c.user.imgSrc"
              alt="profileImage"
            ></v-img>
          </v-avatar>
          <v-avatar v-else color="grey" class="mr-2 mb-6" size="60">
            <v-icon size="50">mdi-account</v-icon>
          </v-avatar>

          <div style="display: inline-block;">
            <p class="ma-0 pa-0 subtitle-1 font-weight-black">{{ c.user && c.user.email && c.user.email.split('@')[0]  }}</p>
            <p class="ma-0 pa-0 subtitle-2" style="opacity: 0.5;">{{$moment(c.createdAt).fromNow()}}</p>
          </div>
        </div>

        <!-- <div v-if="c.updateOpened">여기 업데이트</div> -->
        <v-container class="pb-0 pt-0">{{ c.content }}</v-container>
        <div align="end">
          <v-btn class="ma-0 pa-0" color="red darken-3" @click.prevent="onDeleteComment(c.id)" text outlined bottom right>삭제</v-btn>
        </div>
      </v-container>
    </v-card>
    <div id="bottomSpace"></div>
  </div>
  
</template>

<script>
  import CommentForm from '~/components/CommentForm';
  export default {
    props: {
      postId: {
        type: Number,
        required: true,
      },
      postCreatedAt: {
        type: String,
        default: new Date(),
        required: true,
      },
      comments: {
        type: Array,
      }
    },
    data() {
      return {
        updateOpened: false,
        updatedValue: '',
      }
    },
    components: {
      CommentForm,
    },
    computed: { 
      nickname() {
        return this.comments.user && this.comments.user.email && this.comments.user.email.split('@')[0];
      },
    },
    methods: {
      onDeleteComment(id){
        this.$store.dispatch('posts/deleteComment', {
          id: id,
          postId: this.postId
        });
      } 
    },
    

  }
</script>

<style scoped>
  #bottomSpace {
    min-height: 200px;
  }
  .v-lazy-image {
  filter: blur(10px);
  transition: filter 0.7s;
  }
  .v-lazy-image-loaded {
    filter: blur(0);
  }
</style>