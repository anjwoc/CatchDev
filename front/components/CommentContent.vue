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
            <p class="ma-0 pa-0 subtitle-2" style="opacity: 0.5;">{{diffTime(c.createdAt)}}</p>
          </div>
        </div>

        <!-- <div v-if="c.updateOpened">여기 업데이트</div> -->
        <v-container class="pb-0 pt-0">{{ c.content }}</v-container>
        <div align="end">
          <v-btn class="ma-0 pa-0" @click="onToggleUpdate(c.content, c.id, c.updateOpened)" color="blue-grey" text bottom right>수정</v-btn>
          <v-btn class="ma-0 pa-0" color="red" text bottom right>삭제</v-btn>
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
      onToggleUpdate(content, commentId, updateOpened){
        this.$store.commit('posts/updateToggleComment', {
          postId: this.postId,
          commentId: commentId,
          updateOpened: updateOpened,
        });
      },
      diffTime(commentDate) {
        const first = this.$moment();
        const second = this.$moment(commentDate);
        const diffTime = first.diff(second);
        const duration = this.$moment.duration(diffTime);
        const years = duration.years(),
        months = duration.months(),
        days = duration.days(),
        hours = duration.hours(),
        minutes = duration.minutes(),
        seconds = duration.seconds();
        if(years) {
          return `${year}년 ${month}개월 전`
        }else if(years === 0 && months){
          return `${motnh}개월 전`
        }else if(years === 0 && months ===0 && days) {
          return `${days}일 전`
        }else if(months ===0 && days===0 && hours){
          return `${hours}시간 전`
        }else if(days===0 && hours ===0 && minutes){
          return `${minutes}분 전`
        }else{
          return `방금 전`
        }
      },

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