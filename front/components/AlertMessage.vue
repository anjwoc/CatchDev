<template>
  <div>
    <v-dialog
      class="ma-0 pa-0"
      max-width="40%"
      v-model="dialog"
    >
      <v-card
        max-height="40%"
      >
        <v-alert
          class="mb-0"
          height="100%"
          border="left" 
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
              <p class="font-weight-black">프로필 이미지를 추가해주세요!</p>
              <p class="font-weight-black">추가하지 않을 경우 기본 이미지로 설정됩니다.</p>
              
              <v-avatar color="grey">
                <v-icon x-large>mdi-account</v-icon>
              </v-avatar>
            </v-col>
            <v-file-input
              v-model="files"
              @change="onChangeFiles"
              color="deep-purple accent-4"
              counter
              placeholder="Select your Profile Image"
              prepend-icon="mdi-paperclip"
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
            
          </v-row>
          <v-row class="ma-0 pa-0 d-flex row">
            <v-btn
              v-if="this.alertType === 'signup' && this.type === 'success'"
              color="info"
              text
            >
              프로필 이미지 추가하기
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
      alertType: {
        type: String,
        required: true,
      }
    },
    data() {
      return {
        vlsible: false,
        files: [],
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
      }
    },
    created() {
      console.log(this.type);
      console.log(this.alertType);
    },
    methods: {
      updateStatus(){ 
        this.$emit('update', {
          dialog: false
        });
        if(this.type === 'success'){
          this.$router.push({ path: '/' });
        }
      },
      onChangeFiles() {
          
      },

    }
  }
</script>

<style scoped>

</style>