<template >
  <v-app>
    <v-container
    class="fill-height background"
    fluid
    >
    <v-row
      class="mt-0 pt-0"
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
          

          <v-btn 
            x-large width="100%"
            type="submit"
            :disabled="!valid"
            color="grey darken-1"
            style="font-weight: bold; color: white;"
          >
            회원가입
          </v-btn>
          <alert-message
            :dialog="dialog"
            :userId="userId"
            :alertType="alertType"
            :message="msg"
            :type="type"
            />
          </v-form>
          <v-card-actions class="ma-0 pa-0" style="font-weight: bold; color: black;">
          <v-divider></v-divider>
            OR
          <v-divider></v-divider>
          </v-card-actions>
          <v-btn align="right" justify="end" nuxt to="/login" text color="primary" style="font-weight: bold;">로그인창으로 돌아가기</v-btn>
        </v-card-text>

        
        </v-container>
      </v-card>
      </v-col>
    </v-row>
    </v-container>
  </v-app>
</template>

<script>
  import wildcard  from 'wildcard';
  import AlertMessage from '~/components/AlertMessage';
  export default {
  data() {
    return {
      activeColor: 'green',
      valid: '',
      name: '',
      email: '',
      dialog: false,
      alertType: '',
      type: '',
      msg: '',
      userId: 0,
      password: '',
      passwordCheck: '',
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
      ],

    }
  },
  methods: {
    async onSubmitForm() {
    if(this.$refs.form.validate()){
      await this.$store.dispatch('users/signUp', {
      email: this.email,
      password: this.password,
      name: this.name,
      about: this.about,
      })
      .then((res)=>{
        const userId = res.data && res.data.id;
        if(res.response && wildcard('40*', res.response.status.toString())){
          this.dialog = true;
          this.userId = userId;
          this.alertType = 'signup'
          this.type = 'error'
          this.msg = "회원가입에 실패했습니다."
        }else if(res.status && wildcard('20*', res.status.toString())){
          this.dialog = true;
          this.userId = userId;
          this.alertType = 'signup'
          this.type = 'success'
          this.msg = "회원가입에 성공했습니다";
        }
      })
      .catch((err)=>{
        console.error(err);
      });
    }
    }

  },
  components: {
    AlertMessage,

  },
  middleware: 'anonymous',
  head() {
    title: '회원가입'
  }

  }
</script>

<style scoped>
.background{
  background-color: #38424B;
}

  
</style>