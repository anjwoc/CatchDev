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
        <p style="color: #1A237E" class="ma-0 mb-2">{{ me && me.email }}</p>
        <v-divider></v-divider>
        <h2 class="mt-2">{{ me && me.name }}</h2>
        <div v-if="me.job">
          {{me.job}}
        </div>
        <div class="font-weight-black d-flex row ml-0 mr-0 mt-2" v-else>
          직업을 추가해주세요
        </div>
        
        <div class="d-flex row font-weight-black ma-0 mt-3" style="font-size: 13px;">
          <v-icon regular>mdi-map-marker</v-icon>
          <div class="mt-1" v-if="me && me.location">
            {{me.location}}
          </div>
          <div v-else>
            지역을 추가해주세요
          </div>
        </div>

        <v-divider></v-divider>
        <div class="black--text mt-2">
          {{ me.about }}
        </div>
        
      </v-col>
      <v-col class="mt-6" cols="12" md="3">
        <v-container></v-container>
        <v-container></v-container>
        <div>
          <v-btn @click="moveToLink()" icon>
            <v-icon large color="black">mdi-github-box</v-icon>
            <div class="textTransform ma-0 pa-0">{{ this.github }}</div>
          </v-btn>
        </div>
        <div>
          <v-btn class="disabled-events" icon>
            <v-icon large color="black">mdi-google-plus-box</v-icon>
            <div class="textTransform ma-0 pa-0">{{ this.gmail }}</div>
          </v-btn>
        </div>
        <div>
          <v-btn icon>
            <v-icon large color="indigo">mdi-facebook-box</v-icon>
            <div class="textTransform ma-0 pa-0">{{ this.facebook }}</div>
          </v-btn>
        </div>
        
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
      },
      github() {
        if(!this.me.sn){
          return '';
        }
        return this.me.sn.github;
      },
      gmail() {
        if(!this.me.sn){
          return '';
        }
        return this.me.sn.gmail;
      },
      facebook() {
        if(!this.me.sn){
          return '';
        }
        return this.me.sn.facebook;
      },
      

    },
    methods: {
      addInfo() {
        this.$store.dispatch('users/addAdditionalInfo', {
          job: this.job,
          location: this.location,
          github: this.github,
          gmail: this.gmail,
          facebook: this.facebook,
        })
          .then(()=>{
          })
          .catch((err)=>{
            console.error(err);
          });
      },
      moveToLink(link){
        console.log("moveToLink");
        console.log(link);
        window.open(link, '_blank');
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
  .textTransform{
    text-transform: lowercase;
  }
  .disabled-events{
    pointer-events: none;
  }
</style>