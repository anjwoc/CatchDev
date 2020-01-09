<template>
  <div class="mainContent">
    <v-row justify="center" align="center">
      <v-col cols="8">
        <div class="emptySpace"></div>

        <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
            <v-card 
            elevation="0"
            class="cardSection"
          >
            <div class="d-flex row">
              <v-icon color="blue-grey darken-4" x-large>mdi-settings</v-icon>
              <h1 color="indigo darken-4">설정</h1>
            </div>
            <h2 class="mt-5 pt-5">프로필</h2>
            <v-row>
              <v-col cols="12" md="4">
                <v-card elevation="0">
                  <v-img
                    class="mb-2"
                    contain
                    aspect-ratio="1.5"
                    :src="me.imgSrc"
                    :lazy-src="me.imgSrc"
                  >
                  </v-img>
                  <v-btn width="100%" @click="onClickImageUpload" dark color="blue-grey darken-2">프로필 사진 변경</v-btn>
                  <input ref="imageInput" type="file" hidden @change="onChangeImage">
                </v-card>
              </v-col>
              <v-col cols="12" md="8">
                <h1 class="userId">anjwoc</h1>
                <h3 class="aboutText mt-4">한 줄 소개란</h3>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <h3 class="mt-2">개인 정보 수정</h3>
            <v-subheader class="pa-0">프로필의 내용을 수정해주십시오.</v-subheader>
            <p class="font-weight-bold title ma-0 pa-0">Email</p>
            <v-text-field
              outlined
              clearable
              disabled
              :placeholder="me && me.email"
              dense
            >
            </v-text-field>

            <p class="font-weight-bold title ma-0 pa-0">Name</p>
            <v-text-field
              v-model="name"
              outlined
              clearable
              dense
            >
            </v-text-field>
            <v-row>
              <v-col cols="6">
                <p class="font-weight-bold title ma-0 pa-0">Job</p>
                <v-text-field
                  v-model="job"
                  width="48%"
                  outlined
                  clearable
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <p class="font-weight-bold title ma-0 pa-0">Location</p>
                <v-text-field
                  v-model="location"
                  width="48%"
                  outlined
                  clearable
                  dense
                >
                </v-text-field>
              </v-col>
            </v-row>
            

            <p class="font-weight-bold title ma-0 pa-0">About</p>
            <v-textarea
              v-model="about"
              outlined
              clearable
              dense
              :rules="aboutRules"
            >
            </v-textarea>

            <p class="font-weight-bold title ma-0 pa-0">github</p>
            <v-text-field 
              v-model="github"
              outlined
              clearable
              dense
              placeholder="https://www.github.com/"
            >
            </v-text-field>

            <p class="font-weight-bold title ma-0 pa-0">Gmail</p>
            <v-text-field 
              v-model="gmail"
              outlined
              clearable
              dense
              placeholder="example@gmail.com"
            >
            </v-text-field>

            <p class="font-weight-bold title ma-0 pa-0">LinkedIn</p>
            <v-text-field
              v-model="linkedIn"
              outlined
              clearable
              dense
              placeholder="https://www.github.com/"
            >
            </v-text-field>
            <v-btn class="pa-0 mb-8" type="submit" dark color="blue-grey darken-2" width="100%">저장하기</v-btn>
            <v-divider></v-divider>

            <v-checkbox
              class="pa-0 ma-0 font-weight-black"
              label="비밀번호 변경"
              v-model="isChanged"
            >

            </v-checkbox>
            <p class="font-weight-bold title ma-0 pa-0 mt-4">Password</p>
            <v-text-field
              v-model="password"
              outlined
              clearable
              :disabled="!isChanged"
              :rules="passwordRules"
              label="password"
              type="password"
              dense
            >
            </v-text-field>
            <p class="font-weight-bold title ma-0 pa-0">Password Check</p>
            <v-text-field
              v-model="passwordCheck"
              outlined
              clearable
              :disabled="!isChanged"
              :rules="passwordCheckRules"
              label="passwordCheck"
              type="password"
              dense
            >
            </v-text-field>
            <v-btn
              class="pa-0 mb-8"
              @click="onUpdatePassword"
              dark
              color="blue-grey darken-2"
              width="100%"
            >
              비밀번호 변경
            </v-btn>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
    <div class="bottomSpace"></div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        isChanged: false,
        password: '',
        passwordCheck: '',
        email: '',
        name: '',
        valid: false,
        job: '',
        imgSrc: '',
        location: '',
        about: '',
        github: '',
        linkedIn: '',
        gmail: '',
        passwordRules: [
          v => !!v || '비밀번호는 필수입니다.',
        ], 
        passwordCheckRules: [
          v => !!v || '비밀번호는 필수입니다.',
          v => v === this.password || '비밀번호가 일치하지 않습니다.'
        ],
        aboutRules: [
          v => v.length <= 80 || 'Max 80 Characters',
        ],

      }
    },
    mounted() {
      this.name = this.me && this.me.name;
      this.about = this.me && this.me.about;
      this.job = this.me.job || '';
      this.location = this.me.location || '';
      this.github = this.me.sn ? this.me.sn.github : 'https://www.github.com/';
      this.gmail = this.me.sn ? this.me.sn.gmail : 'example@gmail.com';
      this.linkedIn = this.me.sn ? this.me.sn.linkedIn : 'https://www.linkedin.com/in';
    },
    methods: {
      onChangeImage(e){
        const imageFormData = new FormData();
        imageFormData.append('userId', this.me.id);
        console.log(`userId: ${this.me.id} , type: ${typeof(this.me.id)}`)
        imageFormData.append('image', e.target.files[0]);
        this.$store.dispatch('users/updateProfileImage', imageFormData)
          .then((data) => {
            this.imgSrc = data;
          })
        
      },
      onClickImageUpload() {
        this.$refs.imageInput.click();
      },  
      onUpdateSns(){
        this.$store.dispatch('users/updateSns', {
          userId: this.me.id,
          github: this.github,
          gmail: this.gmail,
          linkedIn: this.linkedIn
        },{
          withCredentials: true,
        })
          .then((res) => {
            console.log(res);
            const { github, gmail, linkedIn } = res;
            this.github = github;
            this.gmail = gmail;
            this.linkedIn = linkedIn;
          });
      },
      onUpdateProfile() {
        console.log(this.files);
        this.$store.dispatch('users/updateProfile', {
          userId: this.me.id,
          name: this.name,
          job: this.job,
          location: this.location,
          about: this.about,
        })
          .then((res)=>{
            console.log(res);
            const { name, job, location, imgSrc } = res;
            this.name = name;
            this.job = job;
            this.location = location;
            this.imgSrc = imgSrc;
          })
      },
      async onSubmitForm() {
        await this.onUpdateProfile();
        await this.onUpdateSns();
      },
      onUpdatePassword(){
        this.$axios.post('user/password', {
          password: this.password,
          id: this.me.id,
        },{
          withCredentials: true,
        })
          .then((res)=>{
            if(res.status === 200){
              this.isChanged = false;
            }
          })
      }


    },
    computed: {
      me(){
        return this.$store.state.users.me;
      }
    },
    middleware: 'authenticated',
    
  }
</script>

<style scoped>
.mainContent{
  background-color: white;
  min-height: 1000px;
}
.cardSection{
  height: 100%;
}
.emptySpace{
  min-height: 100px;
}
.bottomSpace{
  min-height: 300px;
}
.aboutText{
  opacity: 0.6;
}
.title{
  color: #455A64;
}
</style>