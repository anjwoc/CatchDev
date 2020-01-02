<template>
  <div class="ma-0 pa-0" height="600">
    <v-row no-gutters style="background: #E3F2FD;">
      <v-col cols="12" md="1"></v-col>
      <v-col cols="12" md="2">
        <div v-if="me && me.imgSrc">
          <v-avatar size="90%"  class="mt-8 mb-6" fixed>
            <img
              max-width="160px" max-height="160px"
              :src="me.imgSrc"
              alt="profileIcon"
            >
          </v-avatar>
        </div>
        
        <div v-else>
          <v-avatar icon color="grey" size="140" class="mt-8 mb-6" fixed>
            <v-icon size="120">mdi-account</v-icon>
          </v-avatar>
        </div>

      </v-col>
      <v-col cols="12" md="5">
        <v-container class="mt-4"></v-container>
        <p style="color: #1A237E" class="ma-0 pa-0">{{ me && me.email }}</p>
        <v-divider></v-divider>
        <h2>{{ me && me.name }}</h2>
        <div>
          {{ me.job === null ? '직업을 추가해주세요' : me.job }}
        </div>
        
        <div style="font-size: 13px; margin: 0px 0px 0px 0px;">
          <v-icon v-if="me.location" regular>mdi-map-marker</v-icon>
          {{ me.location === null ? '지역을 추가해주세요' : me.location }}
        </div>
        <v-divider></v-divider>
        <div class="black--text mt-2">
          {{ me.about }}
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <v-container></v-container>
        <v-container></v-container>
        
        <v-btn icon><v-icon color="black">mdi-github-box</v-icon></v-btn>
        <v-btn icon><v-icon color="black">mdi-google-plus-box</v-icon></v-btn>
        <v-btn icon><v-icon color="indigo">mdi-linkedin-box</v-icon></v-btn>
        
      </v-col>
      <v-col cols="12" md="1"></v-col>
    </v-row>
    <v-row no-gutters style="background-color:white;">
      <v-col cols="12" md="1"></v-col>
      <v-col cols="12" md="10">
        <v-tabs
          background-color="white"
          class="elevation-0 ml-1 pr-2"
          :centered="true"
          :grow="true"
        >
          <v-tabs-slider></v-tabs-slider>
            <v-tab
              v-for="(item, index) in tabs"
              :key="index"
              :href="`#tab-${index}`"
            >
              <p class="font-weight-bold body-1 ma-0 pa-0">{{ tabNames[index] }}</p>
            </v-tab>

            <v-tab-item
              v-for="(item, index) in Object.values(profileData)"
              :key="index"
              :value="'tab-'+ index"
            > 
              <v-card
                id="cardSection"
                color="white"
                flat
                tile
              >
                <profile-card :post="Object.values(item)" />
                
              </v-card>
            </v-tab-item>
          </v-tabs>
      </v-col>
      <v-col cols="12" md="1"></v-col>
    </v-row>
  </div>

</template>

<script>
  import ProfileCard from '~/components/ProfileCard'
  export default {
    data() {
      return {
        tabs: 3,
        tabNames: ['전체 글','진행중인 스터디','종료된 스터디'],
        profileDataNames: ['allPosts', 'recruitingPosts', 'closedPosts'],
        text: 'test',
        job: '',
        location: '',
        github: '',
        gmail: '',
        linkedIn: '',
      }
    },
    async fetch({ store, params }) {
      return await Promise.all([
        store.dispatch('users/loadConnectionUser', {
          id: params.id,
        }),
        store.dispatch('users/loadPosts', {
          userId: params.id,
          reset: true,
        }),
        store.dispatch('users/loadClosedPosts', {
          userId: params.id,
          reset: true,
        }),
        store.dispatch('users/loadRecruitingPosts', {
          userId: params.id,
          reset: true,
        }),
      ])       
    },
    computed: {
      me() { 
        return this.$store.state.users.me;
      },
      profileData() {
        return this.$store.state.users.profileData;
      }
    },
    methods: {
      addInfo() {
        this.$store.dispatch('users/addAdditionalInfo', {
          job: this.job,
          location: this.location,
          github: this.github,
          gmail: this.gmail,
          linkedIn: this.linkedIn,
        })
          .then(()=>{
          })
          .catch((err)=>{
            console.error(err);
          });
      },
      onScroll() {
        console.log('scroll');
        if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
          if (this.hasMorePost){
            this.$store.dispatch('posts/loadPosts');
          }
        }
      }
    },
    mounted() {
      window.addEventListener('scroll', this.onScroll);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll);
    },
    components: {
      ProfileCard,
    },
    middleware: 'authenticated',

  }
</script>

<style scoped>
  #cardSection{
    min-height: 1000px;
  }
</style>