<template >
  <v-app>
      <v-container
        class="fill-height blue-grey lighten-4"
        fluid
      >
        <v-row
          class="mt-0 pt-0"
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="10"
            md="7"
            lg="6"
          >
            <v-card class="elevation-12">
              <v-container>
                <v-card-text>
                  <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
                    <v-container></v-container>
                    <v-spacer></v-spacer>
                    <v-text-field
                      label="Name"
                      v-model="name"
                      prepend-inner-icon="mdi-tag-text"
                      required
                      outlined
                    />
                    <v-text-field
                      label="Email"
                      v-model="email"
                      prepend-inner-icon="person"
                      :rules="emailRules"
                      type="email"
                      required
                      outlined
                    />
                    <v-text-field
                      label="Password"
                      v-model="password"
                      prepend-inner-icon="lock"
                      :rules="passwordRules"
                      type="password"
                      required
                      outlined
                    />
                    <v-text-field
                      label="PasswordCheck"
                      prepend-inner-icon="lock"
                      v-model="passwordCheck"
                      type="password"
                      :rules="passwordCheckRules"
                      required
                      outlined
                    />
                    <v-textarea
                      label="About"
                      prepend-inner-icon="mdi-card-text"
                      v-model="about"
                      :rules="aboutRules"
                      counter
                      clearable
                      auto-grow
                      required
                      outlined
                    />
                    <v-file-input
                      v-model="files"
                      placeholder="Upload your profile image"
                      label="File input"
                      prepend-icon="mdi-camera"
                    >
                      <template v-slot:selection="{ text }">
                        <v-chip
                          small
                          label
                          dark
                          color="deep-purple accent-4"
                        >
                          {{ text }}
                        </v-chip>
                      </template>
                    </v-file-input>

                    <v-btn 
                      x-large width="100%"
                      type="submit"
                      :disabled="!valid"
                      color="grey darken-1"
                      style="font-weight: bold; color: white;"
                      @click="alert = !alert"
                    >
                      회원가입
                    </v-btn>
                    <!-- <alert-message :alert=true :success="success" :message="msg" /> -->
                  </v-form>

                  
                  <v-card-actions class="ma-0 pa-0" style="font-weight: bold; color: black;">
                    <v-divider></v-divider>
                    OR
                    <v-divider></v-divider>
                  </v-card-actions>

                  <v-row align="center" justify="center" style="margin-bottom: 20px; margin-top:20px;">
                    <v-btn x-large color="grey lighten-2" width="90%" dark style="color: black;">
                      <v-icon left x-large color="black">mdi-github-box</v-icon>&nbsp
                      Github로 가입하기
                    </v-btn>
                  </v-row>
                  <v-row align="center" justify="center" style="margin-bottom: 20px;"> 
                    <v-btn x-large color="red" width="90%" dark>
                      <v-icon left large>mdi-google</v-icon>&nbsp
                      Google로 가입하기
                    </v-btn>
                  </v-row>
                  <v-row align="center" justify="center" style="margin-bottom: 20px;">
                    <v-btn x-large color="blue" width="90%" dark>
                    <v-icon left large>mdi-facebook-box</v-icon>&nbsp
                      Facebook로 가입하기
                    </v-btn>
                  </v-row>
                  <v-divider></v-divider>
                  <v-row align="right" justify="end">
                    <v-btn nuxt to="/login" text color="primary" style="font-weight: bold;">로그인창으로 돌아가기</v-btn>
                  </v-row>
                </v-card-text>

              
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </v-app>
</template>

<script>
  import AlertMessage from '~/components/AlertMessage';
  export default {
    data() {
      return {
        activeColor: 'green',
        valid: '',
        email: '',
        password: '',
        passwordCheck: '',
        msg: '이미 가입된 회원이거나 양식을 다시 확인해주십시오.',
        about: '',
        success: true,
        emailRules: [
          v => !!v || '이메일은 필수입니다.',
          v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.',
        ],
        passwordRules: [
          v => !!v || '비밀번호는 필수입니다.',
        ],
        passwordCheckRules: [
          v => !!v || '비밀번호는 필수입니다.',
          v => v === this.password || '비밀번호가 일치하지 않습니다.'
        ],
        aboutRules: [
          v => v.length <= 80 || 'Max 80 Characters',
        ]
      }
    },
    methods: {
      onSubmitForm() {
        if(this.$refs.form.validate()){
          console.log(this.email);
          console.log(this.password);
          this.$store.dispatch('users/signUp', {
            email: this.email,
            password: this.password,
            name: this.name,
            about: this.about,
          })
            .then((res)=>{
              console.log(res);
              this.$router.push({
                path: '/'
              });
              success = true;
            })
            .catch((err)=>{
              console.error(err);
              success = false;
            });
        }
      },
      onSuccessCheck() {
        this.success === false ? false : true;
      }
    },
    component: {
      AlertMessage,

    },
    middleware: 'anonymous',
    head() {
      title: '회원가입'
    }

  }
</script>

<style scoped>
  

  
</style>