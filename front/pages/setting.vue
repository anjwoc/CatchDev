<template>
  <div class="mainContent">
    <v-row justify="center" align="center">
      
      <v-col cols="8">
        <div class="emptySpace"></div>
        <v-card 
          elevation="0"
          class="cardSection"
        >
          <div class="d-flex row">
            <v-icon color="blue-grey darken-4" x-large>mdi-settings</v-icon>
            <h1 color="indigo darken-4">설정</h1>
          </div>
          <h2 class="mt-5 pt-5">프로필</h2>
          <div class="d-flex row">
            <v-col>
              <div>
                <v-avatar class="ma-0 pa-0" tile size="60%">
                  <img
                    max-width="160px" max-height="160px"
                    src="https://images.velog.io/images/anjwoc/profile/8646dff0-23c6-11ea-a50b-95f7993a19a1/cat-13903441920.png"
                    alt="John"
                  >
                </v-avatar>
                <v-btn>썸네일 변경</v-btn>
              </div>
            </v-col>
            <v-col>
              <v-card>
                
              </v-card>
            </v-col>

          </div>

        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    
    
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

</style>