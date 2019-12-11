<template>
  <v-container class="ma-0 pa-0" height="600">

      <v-row no-gutters style="background: #E3F2FD;">
        <v-col cols="12" md="1"></v-col>
        <v-col cols="12" md="2">
          <div>
            <v-avatar size="160" class="mt-6 mb-6" fixed>
              <img
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="John"
              >
            </v-avatar>
          </div>
        </v-col>
        <v-col cols="12" md="5">
          <v-container class="mt-4"></v-container>
          <p style="color: #1A237E" class="ma-0 pa-0">{{ me.email }}</p>
          <v-divider></v-divider>
          <h2>{{ me.name }}</h2>
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
          v-model="tab"
          background-color="white"
          class="elevation-0 ml-1 pr-2"
          :centered="true"
          :grow="true"
          :icons-and-text="icons"
        >
          <v-tabs-slider></v-tabs-slider>
            <v-tab
              v-for="i in tabs"
              :key="i"
              :href="`#tab-${i}`"
            >
              <p class="font-weight-bold body-1 ma-0 pa-0">{{ tabNames[i] }}</p>
              <v-icon v-if="icons">mdi-phone</v-icon>
            </v-tab>

            <v-tab-item
              v-for="i in tabs"
              :key="i"
              :value="'tab-' + i"
            >
              <v-card
                color="white"
                flat
                tile
              >
              <v-container
                v-for="i in 5"
                :key="i"
              >
                <profile-card />
              </v-container>
              </v-card>
            </v-tab-item>

          </v-tabs>


      </v-col>
      <v-col cols="12" md="1"></v-col>
    </v-row>
  </v-container>

</template>

<script>
  import ProfileCard from '~/components/ProfileCard'
  export default {
    data() {
      return {
        tabs: 3,
        tabNames: ['', '글','진행중인 스터디','종료된 스터디'],
        text: 'test',
        job: '',
        location: '',
        github: '',
        gmail: '',
        linkedIn: '',
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
     
    },
    components: {
      ProfileCard,
    },
    computed: {
      me() { 
        return this.$store.state.users.me;
      }
    },
    middleware: 'authenticated',

  }
</script>

<style scoped>
</style>