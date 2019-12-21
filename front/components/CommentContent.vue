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
          <v-avatar class="mr-2 mb-6" size="60">
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            >
          </v-avatar>
          <div style="display: inline-block;">
            <!-- c.user && c.user.email && c.user.email.split('@')[0] -->
            <p class="ma-0 pa-0 subtitle-1 font-weight-black">{{ c.user && c.user.email && c.user.email.split('@')[0]  }}</p>
            <p class="ma-0 pa-0 subtitle-2" style="opacity: 0.5;">{{diffTime(c.createdAt)}}</p>
          </div>
        </div>
        <div>{{ c.content }}</div>
      </v-container>
    </v-card>
    <div id="bottomSpace"></div>
  </div>
  
</template>

<script>
  export default {
    props: {
      postCreatedAt: {
        type: String,
        default: new Date(),
        required: true,
      },
      comments: {
        type: Array,
      }
    },
    // async asyncData({ store }) {

    // },
    data() {
      return {
      }
    },
    mounted() {
      
    },
    computed: { 
      nickname() {
        return this.comments.user && this.comments.user.email && this.comments.user.email.split('@')[0];
      },
      
    },
    methods: {
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
</style>