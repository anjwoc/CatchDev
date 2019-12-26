<template>
  <div>
    <v-dialog
      class="ma-0 pa-0"
      max-width="40%"
      persistent 
      v-model="dialog"
    >
      <v-card
        max-height="40%"
      >
        <v-alert
          class="mb-0"
          height="100%"
          border="top"
          colored-border  
          :color="color" 
        >
          <v-row>
            <v-col>
              <v-avatar icon>
                <v-icon :color="color" large>{{alertIcon}}</v-icon>
              </v-avatar>
              <p class="ma-0 pa-0" style="color: #455A64; font-size: 19px; display: inline-block;">{{message}}</p>
            </v-col>
              
          </v-row>
          <v-divider class="mt-4"></v-divider>
          <v-row
            class="ma-0 pa-0 d-flex row"
          >
            <v-col cols="12" align="center">
              <p class="font-weight-black" style="color: #455A64;">프로필 이미지와 추가정보를 입력해주세요!</p>
              <p class="font-weight-black" style="color: #455A64;">추가하지 않을 경우 기본 이미지로 설정됩니다.</p>
              
              <v-avatar color="grey">
                <v-icon x-large>mdi-account</v-icon>
              </v-avatar>
            </v-col>
            <v-col cols="12" class="ma-0 pa-0">
                <v-file-input
                v-model="files"
                :rules="imageRules"
                @change="onChangeImage"
                color="deep-purple accent-4"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Select your Profile Image(Only png, jpeg, bmp)"
                prepend-icon="mdi-camera"
                counter
                outlined
                :show-size="1000"
              >
                <template v-slot:selection="{ index, text }">
                  <v-chip
                    v-if="index < 2"
                    color="deep-purple accent-4"
                    dark
                    label
                    small
                  >
                    {{ text }}
                  </v-chip>
            
                  <span
                    v-else-if="index === 2"
                    class="overline grey--text text--darken-3 mx-2"
                  >
                    +{{ files.length - 2 }} File(s)
                  </span>
                </template>
              </v-file-input>
            </v-col>
            <v-col cols="6" class="ma-0 pa-0">
                <v-text-field
                v-model="job"
                outlined
                prepend-icon="mdi-account-card-details"
                placeholder="직업"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6" class="ma-0 pa-0">
              <v-text-field
                v-model="location"
                outlined
                prepend-icon="mdi-map-marker"
                placeholder="지역"
              >
              </v-text-field>
            </v-col>
            

            
          </v-row>
          <v-row class="ma-0 pa-0 d-flex row">
            <v-btn
              v-if="this.alertType === 'signup' && this.type === 'success'"
              color="info"
              @click="onProfileUpdate"
              text
            >
              추가 정보 반영하기
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              v-if="this.alertType === 'signup' && this.type === 'success'"
              color="info"
              @click="updateStatus"
              text
            >
              나중에 하기
            </v-btn>
            <v-btn v-else color="info" text>
              확인
            </v-btn>
            <div>
              {{this.imagePaths}}
            </div>
            
          </v-row>
        </v-alert>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      dialog: {
        type: Boolean,
        required: true
      },
      message: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      userId: {
        type: Number,
        required: true,
      },
      alertType: {
        type: String,
        required: true,
      }
    },
    data() {
      return {
        vlsible: false,
        files: [],
        job: '',
        location: '',
        imageRules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
      }
    },
    computed: {
      color() {
        if(this.type === 'success'){
          return 'green';
        }else{
          return 'red';
        }
      },
      alertIcon() {
        if(this.type === 'success'){
          return 'mdi-check-circle';
        }else{
          return 'mdi-alert'
        }
      },
      imagePaths() {
        return this.$store.state.users.imagePaths;
      }
    },
    created() {
      console.log(this.type);
      console.log(this.alertType);
    },
    methods: {
      updateStatus(){ 
        this.dialog = false;
        if(this.type === 'success'){
          this.$router.push({ path: '/' });
        }
      },
      onChangeImage(){
        console.log("현재 이미지");
        console.log(this.files);
        const imageFormData = new FormData();
        imageFormData.append('image', this.files);
        this.$axios.post(`/user/image`, imageFormData, {
          withCredentials: true,
        })
          .then((files) => {
            console.log(`files: ${files}`)
            console.log(files.data);
            this.$store.commit('users/updateImagePaths', files.data);
          });
      }, 
      onProfileUpdate() {
        console.log(this.files);
        this.$store.dispatch('users/updateProfile', {
          userId: this.userId,
          job: this.job,
          location: this.location
        })
          .then((res)=>{

          })
          .catch((err)=>{
            console.log(err);
          });
        
      }

    }
  }
</script>

<style scoped>

</style>