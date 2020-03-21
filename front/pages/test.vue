<template>
  <div>
    
    <!-- <v-row class="mr-8" justify="end">
      <v-spacer />
      <v-toolbar dense id="background" elevation="0">
      <v-spacer />
        <v-toolbar-items id="main-color">
          <div class="title mt-2">All Study</div>
          <v-divider class="ml-3 mr-3" dark inset vertical></v-divider>
          <v-icon id="main-color">mdi-home</v-icon>
          <v-icon id="main-color" small>mdi-chevron-right</v-icon>
          <p class="amber--text mt-3">Home</p>
          <v-icon id="main-color" small>mdi-chevron-right</v-icon>
          <p class="amber--text mt-3">{{routeName}}</p> 
        </v-toolbar-items>
      </v-toolbar>
    </v-row> -->

    
    <!-- <v-row>
      <v-col align="center" v-for="(c, idx) in card" :key="idx" cols="12" xs="12" sm="6" md="6">
        <info-card :info="c" :infoType="c.type" />
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center" cols="12" xs="12" md="6">
        <v-card
          elevation="0"
        >
          <img
            src="~assets/destinations.png"
          />
        </v-card>
      </v-col>
      <v-col align="center" cols="12" xs="12" md="6">
        <v-card
          elevation="0"
        >
          <img
            src="~assets/team.png"
          />
        </v-card>
      </v-col>
    </v-row> -->
  </div>
</template>


<script>
import InfoCard from '~/components/InfoCard'
  export default {
    data() {
      return { 
        card: [{
          title: "진행 중 스터디",
          icon: "mdi-new-box",
          number: "358",
          desc: "In progress or new study",
          type: "green"
        },{
          title: "완료 된 스터디",
          icon: "mdi-close-octagon",
          number: "358",
          desc: "closed study",
          type: "purple"
        }],
        
      }
    },
    components: {
      InfoCard,
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
            this.$store.dispatch('posts/loadPosts');
          }
        }
      }
    },
    // fetch({ store, params }) {
    //   return store.dispatch('posts/loadCategoryPosts', {
    //     item: params.name,
    //     reset: true,
    //   });
    // },
    mounted() {
      window.addEventListener('scroll', this.onScroll);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll);
    },
    
    
  }
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
  border-radius: 40%;
  opacity: 0.8;
  object-fit: contain;
}

#point-color{
  color: #b79b5f;
}
.background{
  background-color: white;
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